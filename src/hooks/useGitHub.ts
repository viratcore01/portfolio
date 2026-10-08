import { useEffect, useState } from 'react';
import {
  fetchRepos,
  fetchProfile,
  visibleProjects,
  type ProjectVM,
  type GitHubProfile,
} from '../lib/github';
import { SITE } from '../config/site';

interface ReposState {
  projects: ProjectVM[];
  loading: boolean;
  error: string | null;
  rateLimited: boolean;
  lastSynced: Date | null;
  refresh: () => void;
}

export function useGitHubRepos(): ReposState {
  const [projects, setProjects] = useState<ProjectVM[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rateLimited, setRateLimited] = useState(false);
  const [lastSynced, setLastSynced] = useState<Date | null>(null);
  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    let cancelled = false;
    fetchRepos()
      .then((repos) => {
        if (cancelled) return;
        setProjects(visibleProjects(repos));
        setLastSynced(new Date());
        setLoading(false);
      })
      .catch((e: Error) => {
        if (cancelled) return;
        if (e.message === 'RATE_LIMITED') {
          setRateLimited(true);
          setError('GitHub API rate limit reached — showing cached projects.');
        } else {
          setError('Could not reach GitHub — showing cached projects.');
        }
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [nonce]);

  return {
    projects,
    loading,
    error,
    rateLimited,
    lastSynced,
    refresh: () => {
      setLoading(true);
      setError(null);
      setNonce((n) => n + 1);
    },
  };
}

export function useGitHubProfile() {
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchProfile()
      .then((p) => {
        if (!cancelled) {
          setProfile(p);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          // Graceful fallback so Hero/Stats never break offline.
          setProfile({
            login: SITE.username,
            name: SITE.name,
            avatar_url: `https://github.com/${SITE.username}.png`,
            html_url: SITE.socials.github,
            bio: SITE.role,
            location: SITE.location,
            blog: null,
            public_repos: 22,
            followers: 3,
            following: 3,
            created_at: '2025-05-21T17:50:23Z',
          });
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { profile, loading };
}
