import { useEffect, useState } from 'react';
import { loadLeetCode, LEETCODE_FALLBACK, type LeetCodeStats } from '../lib/leetcode';

export function useLeetCode() {
  const [stats, setStats] = useState<LeetCodeStats>(LEETCODE_FALLBACK);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    loadLeetCode()
      .then((s) => {
        if (!cancelled) {
          setStats(s);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { stats, loading };
}
