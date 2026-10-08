// Auto-updates README project tables from the live GitHub API.
// Usage:  node scripts/update-readme.mjs
//         node scripts/update-readme.mjs --profile  (also writes PROFILE-README.live.md preview)
// Env:    GITHUB_TOKEN (optional, raises rate limit 60 → 5000/hr)

import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const USERNAME = 'viratcore01';
const PINNED = ['virasat', 'GharYaad', 'EchoVault', 'DAM', 'STOIC_SAP', 'dummy-browser'];
const EXCLUDED = new Set(['viratcore01']);
const TOKEN = process.env.GITHUB_TOKEN;

const headers = {
  Accept: 'application/vnd.github+json',
  'User-Agent': 'viratcore01-readme-bot',
  ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
};

async function api(path) {
  const res = await fetch(`https://api.github.com${path}`, { headers });
  if (!res.ok) throw new Error(`GitHub API ${res.status} for ${path}`);
  return res.json();
}

const timeAgo = (iso) => {
  const s = Math.floor((Date.now() - +new Date(iso)) / 1000);
  if (s < 3600) return `${Math.max(1, Math.floor(s / 60))}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  const d = Math.floor(s / 86400);
  if (d < 30) return `${d}d ago`;
  const mo = Math.floor(d / 30);
  if (mo < 12) return `${mo}mo ago`;
  return `${Math.floor(mo / 12)}y ago`;
};

const prettify = (n) =>
  n
    .replace(/[-_]+/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());

function projectRows(repos) {
  return repos
    .filter((r) => !r.archived && !r.disabled && !EXCLUDED.has(r.name) && !r.fork)
    .sort((a, b) => {
      const ap = PINNED.includes(a.name) ? 0 : 1;
      const bp = PINNED.includes(b.name) ? 0 : 1;
      if (ap !== bp) return ap - bp;
      return +new Date(b.pushed_at) - +new Date(a.pushed_at);
    })
    .map((r) => {
      const demo = r.homepage?.trim() ? ` · [Live](${r.homepage.trim()})` : '';
      const lang = r.language ? ` \`${r.language}\`` : '';
      const desc = (r.description ?? 'Shipped & live — see repo for details.').replace(/\n/g, ' ').slice(0, 140);
      return `| [${prettify(r.name)}](${r.html_url}) | ${desc} |${lang} | ⭐ ${r.stargazers_count} | Updated ${timeAgo(r.pushed_at)} | [Code](${r.html_url})${demo} |`;
    })
    .join('\n');
}

function replaceBetween(md, start, end, replacement) {
  const s = md.indexOf(start);
  const e = md.indexOf(end);
  if (s === -1 || e === -1 || e < s) {
    console.warn(`Markers not found: ${start} … ${end} — skipping`);
    return md;
  }
  return md.slice(0, s + start.length) + '\n' + replacement + '\n' + md.slice(e);
}

const [profile, repos] = await Promise.all([
  api(`/users/${USERNAME}`),
  api(`/users/${USERNAME}/repos?sort=updated&per_page=100`),
]);

const updated = new Date().toISOString().slice(0, 10);
const rows = projectRows(repos);
const count = rows.split('\n').filter(Boolean).length;
const stars = repos.reduce((s, r) => s + r.stargazers_count, 0);

const table = `<!-- auto-generated: ${updated} — ${count} repos, ${stars} stars, ${profile.followers} followers. Do not edit by hand; run \`npm run readme:sync\`. -->
| Project | What it is | Stack | Stars | Activity | Links |
|---|---|---|---|---|---|
${rows}

> 🔄 Auto-synced from [github.com/${USERNAME}](https://github.com/${USERNAME}) on ${updated}. New repos appear here automatically via GitHub Actions.`;

const statsLine = `![Stats](https://github-readme-stats.vercel.app/api?username=${USERNAME}&show_icons=true&theme=transparent&hide_border=true) ![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=${USERNAME}&layout=compact&theme=transparent&hide_border=true) ![Streak](https://streak-stats.demolab.com?user=${USERNAME}&theme=transparent&hide_border=true)

📊 **${profile.public_repos}** public repos · **${stars}** stars · **${profile.followers}** followers · updated ${updated}`;

// 2) LeetCode block (from public/leetcode.snapshot.json — refresh via `npm run leetcode:sync`)
let leetLine = null;
try {
  const snap = JSON.parse(readFileSync('public/leetcode.snapshot.json', 'utf8'));
  const top = snap.topLanguages?.[0]?.name ?? '—';
  leetLine =
    `<!-- auto-generated: ${snap.updated} — source: leetcode.com/u/viratcore_01. Do not edit by hand. -->\n` +
    `| Solved | Easy | Medium | Hard | Streak | Active days | Top language |\n` +
    `|---|---|---|---|---|---|---|\n` +
    `| **${snap.totalSolved}** | ${snap.easySolved} | ${snap.mediumSolved} | ${snap.hardSolved} | 🔥 ${snap.streak} days | ${snap.totalActiveDays} days | \`${top}\` |\n` +
    `\n> 🔄 Synced from [leetcode.com/u/viratcore_01](https://leetcode.com/u/viratcore_01) on ${snap.updated}. Refreshed daily.`;
} catch {
  console.warn('leetcode.snapshot.json missing — run `npm run leetcode:sync` first');
}

// 1) Portfolio README
const readmePath = 'README.md';
if (existsSync(readmePath)) {
  let md = readFileSync(readmePath, 'utf8');
  md = replaceBetween(md, '<!-- PROJECTS:START -->', '<!-- PROJECTS:END -->', table);
  md = replaceBetween(md, '<!-- STATS:START -->', '<!-- STATS:END -->', statsLine);
  if (leetLine) md = replaceBetween(md, '<!-- LEETCODE:START -->', '<!-- LEETCODE:END -->', leetLine);
  md = md.replace(/Last synced: .*?(\n|$)/, `Last synced: ${updated}\n`);
  writeFileSync(readmePath, md);
  console.log(`✓ README.md updated (${count} projects${leetLine ? ' + leetcode' : ''})`);
} else {
  console.warn('README.md not found — skipping');
}

// 2) Snapshot the portfolio site can fall back to (offline / rate-limited)
writeFileSync(
  'public/projects.snapshot.json',
  JSON.stringify(
    {
      updated,
      username: USERNAME,
      stats: { repos: profile.public_repos, stars, followers: profile.followers },
      projects: repos
        .filter((r) => !EXCLUDED.has(r.name) && !r.fork && !r.archived)
        .map((r) => ({
          name: r.name,
          url: r.html_url,
          description: r.description,
          homepage: r.homepage,
          language: r.language,
          stars: r.stargazers_count,
          pushed_at: r.pushed_at,
        })),
    },
    null,
    2,
  ),
);
console.log('✓ public/projects.snapshot.json written');

// 3) Profile README preview (copy this file's inner content into viratcore01/viratcore01 README)
if (process.argv.includes('--profile')) {
  const tpl = existsSync('PROFILE-README.md') ? readFileSync('PROFILE-README.md', 'utf8') : '';
  let out = tpl;
  out = replaceBetween(out, '<!-- PROJECTS:START -->', '<!-- PROJECTS:END -->', table);
  out = replaceBetween(out, '<!-- STATS:START -->', '<!-- STATS:END -->', statsLine);
  if (leetLine) out = replaceBetween(out, '<!-- LEETCODE:START -->', '<!-- LEETCODE:END -->', leetLine);
  writeFileSync('PROFILE-README.live.md', out);
  console.log('✓ PROFILE-README.live.md preview written');
}
