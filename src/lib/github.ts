// ─── GitHub live-sync layer ───
// Runtime fetch (no rebuild needed) + build-time script shares these rules:
// pinned first → then by pushed_at desc → forks/excluded filtered out.

import { SITE, CURATED } from '../config/site';

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  topics: string[];
  fork: boolean;
  archived: boolean;
  disabled: boolean;
  pushed_at: string;
  updated_at: string;
  created_at: string;
  default_branch: string;
}

export interface GitHubProfile {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  location: string | null;
  blog: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

export interface ProjectVM {
  id: number;
  repoName: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  githubUrl: string;
  liveUrl: string | null;
  language: string | null;
  stars: number;
  forks: number;
  topics: string[];
  pushedAt: string;
  updatedAt: string;
  isPinned: boolean;
  isFork: boolean;
}

const API = 'https://api.github.com';
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour
const REPOS_KEY = 'viratcore01:repos:v1';
const PROFILE_KEY = 'viratcore01:profile:v1';

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800';

function readCache<T>(key: string): { at: number; data: T } | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { at: number; data: T };
    if (Date.now() - parsed.at > CACHE_TTL_MS) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeCache<T>(key: string, data: T) {
  try {
    localStorage.setItem(key, JSON.stringify({ at: Date.now(), data }));
  } catch {
    /* storage full / private mode — ignore */
  }
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    headers: { Accept: 'application/vnd.github+json' },
  });
  if (res.status === 403) {
    // Rate-limited — surface a typed error the UI can handle gracefully.
    throw new Error('RATE_LIMITED');
  }
  if (!res.ok) throw new Error(`GitHub API ${res.status}`);
  return res.json() as Promise<T>;
}

export async function fetchProfile(username = SITE.username): Promise<GitHubProfile> {
  const cached = readCache<GitHubProfile>(PROFILE_KEY);
  // Stale-while-revalidate: return cache instantly, refresh in background.
  if (cached) {
    fetchJson<GitHubProfile>(`${API}/users/${username}`)
      .then((p) => writeCache(PROFILE_KEY, p))
      .catch(() => {});
    return cached.data;
  }
  const profile = await fetchJson<GitHubProfile>(`${API}/users/${username}`);
  writeCache(PROFILE_KEY, profile);
  return profile;
}

export async function fetchRepos(username = SITE.username): Promise<GitHubRepo[]> {
  const cached = readCache<GitHubRepo[]>(REPOS_KEY);
  if (cached) {
    fetchJson<GitHubRepo[]>(`${API}/users/${username}/repos?sort=updated&per_page=100`)
      .then((r) => writeCache(REPOS_KEY, r))
      .catch(() => {});
    return cached.data;
  }
  const repos = await fetchJson<GitHubRepo[]>(
    `${API}/users/${username}/repos?sort=updated&per_page=100`,
  );
  writeCache(REPOS_KEY, repos);
  return repos;
}

// ─── Transform + ordering (shared with scripts/update-readme.mjs) ───

export function toProjectVM(repo: GitHubRepo): ProjectVM {
  const curated = CURATED[repo.name];
  const title = curated?.displayName ?? prettify(repo.name);
  const description =
    curated?.description ??
    repo.description ??
    'A project by Virat Shishodia — check the README on GitHub for details.';
  const tags = curated?.tags ?? [
    ...(repo.language ? [repo.language] : []),
    ...repo.topics.slice(0, 4),
  ].slice(0, 5);
  return {
    id: repo.id,
    repoName: repo.name,
    title,
    description,
    tags: tags.length ? tags : ['Project'],
    image: curated?.image ?? ogImageFor(repo),
    githubUrl: repo.html_url,
    liveUrl: repo.homepage?.trim() ? repo.homepage.trim() : null,
    language: repo.language,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    topics: repo.topics,
    pushedAt: repo.pushed_at,
    updatedAt: repo.updated_at,
    isPinned: (SITE.github.pinned as readonly string[]).includes(repo.name),
    isFork: repo.fork,
  };
}

export function visibleProjects(repos: GitHubRepo[]): ProjectVM[] {
  const excluded = new Set<string>(SITE.github.excluded as readonly string[]);
  return repos
    .filter((r) => !r.archived && !r.disabled && !excluded.has(r.name))
    .filter((r) => (SITE.github.hideForks ? !r.fork : true))
    .map(toProjectVM)
    .sort((a, b) => {
      if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
      return +new Date(b.pushedAt) - +new Date(a.pushedAt);
    });
}

export function prettify(name: string): string {
  return name
    .replace(/[-_]+/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Deterministic Unsplash image per repo so new repos never look broken. */
function ogImageFor(repo: GitHubRepo): string {
  const pool = [
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800',
  ];
  let h = 0;
  for (let i = 0; i < repo.name.length; i++) h = (h * 31 + repo.name.charCodeAt(i)) >>> 0;
  return pool[h % pool.length];
}

export const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Java: '#b07219',
  Go: '#00ADD8',
  Rust: '#dea584',
  Dart: '#00B4AB',
  EJS: '#a91e50',
};

export function languageColor(lang: string | null): string {
  if (!lang) return '#888';
  return LANGUAGE_COLORS[lang] ?? '#888';
}

export function timeAgo(iso: string): string {
  const s = Math.floor((Date.now() - +new Date(iso)) / 1000);
  if (s < 60) return 'just now';
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d}d ago`;
  const mo = Math.floor(d / 30);
  if (mo < 12) return `${mo}mo ago`;
  return `${Math.floor(mo / 12)}y ago`;
}

export { FALLBACK_IMAGE };
