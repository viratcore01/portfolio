// Refreshes public/leetcode.snapshot.json from LeetCode's GraphQL API.
// Usage: node scripts/update-leetcode.mjs
// Runs server-side (CI + local) — no CORS issues. No auth needed for public data.

import { writeFileSync } from 'node:fs';

const USERNAME = 'viratcore_01';

const QUERY = `query {
  matchedUser(username: "${USERNAME}") {
    username
    profile { ranking reputation }
    submitStatsGlobal { acSubmissionNum { difficulty count } }
    languageProblemCount { languageName problemsSolved }
    userCalendar { streak totalActiveDays }
    badges { id }
  }
  userContestRanking(username: "${USERNAME}") {
    rating attendedContestsCount globalRanking
  }
  recentAcSubmissionList(username: "${USERNAME}", limit: 8) {
    title titleSlug timestamp
  }
}`;

const res = await fetch('https://leetcode.com/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': 'Mozilla/5.0',
    Referer: 'https://leetcode.com',
  },
  body: JSON.stringify({ query: QUERY }),
});
if (!res.ok) throw new Error(`LeetCode API ${res.status}`);
const { data } = await res.json();
if (!data?.matchedUser) throw new Error('LeetCode user not found');

const u = data.matchedUser;
const num = Object.fromEntries(
  (u.submitStatsGlobal?.acSubmissionNum ?? []).map((d) => [d.difficulty, d.count]),
);
const contest = data.userContestRanking;

const snapshot = {
  username: u.username,
  totalSolved: num.All ?? 0,
  easySolved: num.Easy ?? 0,
  mediumSolved: num.Medium ?? 0,
  hardSolved: num.Hard ?? 0,
  ranking: u.profile?.ranking ?? null,
  reputation: u.profile?.reputation ?? 0,
  streak: u.userCalendar?.streak ?? 0,
  totalActiveDays: u.userCalendar?.totalActiveDays ?? 0,
  topLanguages: (u.languageProblemCount ?? [])
    .map((l) => ({ name: l.languageName, solved: l.problemsSolved }))
    .sort((a, b) => b.solved - a.solved)
    .slice(0, 4),
  badges: (u.badges ?? []).length,
  contestRating: contest?.rating ? Math.round(contest.rating) : null,
  contestsAttended: contest?.attendedContestsCount ?? 0,
  recent: (data.recentAcSubmissionList ?? []).map((r) => ({
    title: r.title,
    titleSlug: r.titleSlug,
    timestamp: Number(r.timestamp),
  })),
  updated: new Date().toISOString().slice(0, 10),
};

writeFileSync('public/leetcode.snapshot.json', JSON.stringify(snapshot, null, 2));
console.log(
  `✓ leetcode.snapshot.json: ${snapshot.totalSolved} solved, streak ${snapshot.streak}d, ${snapshot.totalActiveDays} active days`,
);
