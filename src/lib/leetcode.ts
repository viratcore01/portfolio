// ─── LeetCode data layer ───
// Snapshot-first (daily GitHub Action), live-upgrade best-effort in browser.
// LeetCode's own GraphQL blocks browser CORS, so live refresh goes through
// a public CORS-friendly mirror; if it fails we keep the snapshot. Always renders.

import { SITE } from '../config/site';

export interface LeetCodeSolve {
  title: string;
  titleSlug: string;
  timestamp: number; // unix seconds
}

export interface LeetCodeStats {
  username: string;
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  ranking: number | null;
  reputation: number;
  streak: number;
  totalActiveDays: number;
  topLanguages: { name: string; solved: number }[];
  badges: number;
  contestRating: number | null;
  contestsAttended: number;
  recent: LeetCodeSolve[];
  updated: string; // ISO date of snapshot
  live: boolean; // true if refreshed live this session
}

const SNAPSHOT_URL = '/leetcode.snapshot.json';
// Public mirror with CORS enabled (cold-starts can be slow — we race it with a timeout).
const MIRROR = `https://alfa-leetcode-api.onrender.com/${SITE.leetcode.username}`;

export const LEETCODE_FALLBACK: LeetCodeStats = {
  username: SITE.leetcode.username,
  totalSolved: 14,
  easySolved: 4,
  mediumSolved: 10,
  hardSolved: 0,
  ranking: null,
  reputation: 0,
  streak: 2,
  totalActiveDays: 7,
  topLanguages: [{ name: 'C++', solved: 14 }],
  badges: 0,
  contestRating: null,
  contestsAttended: 0,
  recent: [],
  updated: '2026-10-08',
  live: false,
};

interface SnapshotRaw {
  username?: unknown;
  totalSolved?: unknown;
  easySolved?: unknown;
  mediumSolved?: unknown;
  hardSolved?: unknown;
  ranking?: unknown;
  reputation?: unknown;
  streak?: unknown;
  totalActiveDays?: unknown;
  topLanguages?: unknown;
  badges?: unknown;
  contestRating?: unknown;
  contestsAttended?: unknown;
  recent?: unknown;
  updated?: unknown;
}

const num = (v: unknown, d = 0): number => (typeof v === 'number' ? v : d);
const str = (v: unknown, d = ''): string => (typeof v === 'string' ? v : d);

function normaliseSnapshot(raw: SnapshotRaw): LeetCodeStats {
  return {
    username: str(raw.username, SITE.leetcode.username),
    totalSolved: num(raw.totalSolved),
    easySolved: num(raw.easySolved),
    mediumSolved: num(raw.mediumSolved),
    hardSolved: num(raw.hardSolved),
    ranking:
      typeof raw.ranking === 'number' && raw.ranking < 1_000_000 ? raw.ranking : null,
    reputation: num(raw.reputation),
    streak: num(raw.streak),
    totalActiveDays: num(raw.totalActiveDays),
    topLanguages: Array.isArray(raw.topLanguages)
      ? (raw.topLanguages as { name: string; solved: number }[])
      : [],
    badges: num(raw.badges),
    contestRating: typeof raw.contestRating === 'number' ? raw.contestRating : null,
    contestsAttended: num(raw.contestsAttended),
    recent: Array.isArray(raw.recent) ? (raw.recent as LeetCodeSolve[]) : [],
    updated: str(raw.updated),
    live: false,
  };
}

async function withTimeout<T>(p: Promise<T>, ms: number): Promise<T> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  try {
    return await p;
  } finally {
    clearTimeout(t);
  }
}

async function fetchJson(url: string, ms = 8000): Promise<unknown> {
  const res = await withTimeout(fetch(url), ms);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json() as Promise<unknown>;
}

/** Try the public mirror for fresher numbers. Returns null on any failure. */
async function fetchLive(): Promise<Partial<LeetCodeStats> | null> {
  try {
    const [solved, profile, contest] = (await Promise.all([
      fetchJson(`${MIRROR}/solved`),
      fetchJson(`${MIRROR}`),
      fetchJson(`${MIRROR}/contest`),
    ])) as [
      {
        solvedProblem?: number;
        totalSolved?: number;
        easySolved?: number;
        mediumSolved?: number;
        hardSolved?: number;
      },
      { ranking?: number; reputation?: number },
      { contestRating?: number; contestAttend?: number },
    ];
    return {
      totalSolved: solved.solvedProblem ?? solved.totalSolved,
      easySolved: solved.easySolved,
      mediumSolved: solved.mediumSolved,
      hardSolved: solved.hardSolved,
      ranking:
        typeof profile.ranking === 'number' && profile.ranking < 1_000_000
          ? profile.ranking
          : null,
      reputation: profile.reputation,
      contestRating: contest.contestRating || null,
      contestsAttended: contest.contestAttend ?? 0,
      live: true,
    };
  } catch {
    return null;
  }
}

export async function loadLeetCode(): Promise<LeetCodeStats> {
  // 1) Snapshot (same-origin, always works, refreshed daily by CI).
  let stats: LeetCodeStats = LEETCODE_FALLBACK;
  try {
    const raw = (await fetchJson(SNAPSHOT_URL, 8000)) as SnapshotRaw;
    stats = normaliseSnapshot(raw);
  } catch {
    /* dist without snapshot yet — fallback above */
  }

  // 2) Best-effort live upgrade in background.
  const live = await fetchLive();
  if (live) {
    stats = {
      ...stats,
      totalSolved: live.totalSolved ?? stats.totalSolved,
      easySolved: live.easySolved ?? stats.easySolved,
      mediumSolved: live.mediumSolved ?? stats.mediumSolved,
      hardSolved: live.hardSolved ?? stats.hardSolved,
      ranking: live.ranking ?? stats.ranking,
      contestRating: live.contestRating ?? stats.contestRating,
      contestsAttended: live.contestsAttended ?? stats.contestsAttended,
      live: true,
    };
  }
  return stats;
}

export function leetTimeAgo(tsSeconds: number): string {
  const s = Math.floor(Date.now() / 1000 - tsSeconds);
  if (s < 60) return 'just now';
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d}d ago`;
  return `${Math.floor(d / 30)}mo ago`;
}
