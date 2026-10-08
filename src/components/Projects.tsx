import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  ExternalLink,
  FolderGit2,
  Star,
  GitFork,
  Search,
  RefreshCw,
  ArrowUpRight,
  Pin,
} from 'lucide-react';
import { useGitHubRepos } from '../hooks/useGitHub';
import { languageColor, timeAgo } from '../lib/github';
import { SITE } from '../config/site';

const GitHubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.164 6.839 9.489.5.092.682-.217.682-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.454-1.155-1.11-1.47-1.11-1.47-.908-.62.069-.608.069-.608 1.205.084 1.531 1.03 1.531 1.03.896 1.53 2.343 1.088 2.91.832-.554.896-.674 2.11-.292 3.272 0 0 .255.482.822-.151a7.09 7.09 0 0 0 2.225-3.133c0 0 .255-.151.822.151C19.138 19.165 22 17.653 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

type SortKey = 'recent' | 'stars' | 'az';

export function Projects() {
  const { projects, loading, error, lastSynced, refresh } = useGitHubRepos();
  const [query, setQuery] = useState('');
  const [language, setLanguage] = useState<string>('All');
  const [sort, setSort] = useState<SortKey>('recent');
  const [showAll, setShowAll] = useState(false);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  const languages = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => {
      if (p.language) set.add(p.language);
    });
    return ['All', ...Array.from(set).sort()];
  }, [projects]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = projects.filter((p) => {
      const matchQ =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      const matchL = language === 'All' || p.language === language;
      return matchQ && matchL;
    });
    if (sort === 'stars') list = [...list].sort((a, b) => b.stars - a.stars);
    else if (sort === 'az') list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    // 'recent' already sorted by pinned → pushed_at
    return list;
  }, [projects, query, language, sort]);

  const featuredCount = SITE.github.featuredCount;
  const visible = showAll ? filtered : filtered.slice(0, featuredCount);

  return (
    <section id="projects" className="py-24 relative">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
          >
            <FolderGit2 className="w-4 h-4" />
            Selected Work
            <span className="ml-1 inline-flex items-center gap-1 rounded-full bg-emerald-400/15 px-2 py-0.5 text-[11px] font-semibold text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live from GitHub
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold tracking-tighter"
          >
            Featured Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-4 text-muted-foreground max-w-2xl"
          >
            Synced automatically from{' '}
            <a
              href={SITE.socials.github}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4 hover:text-white"
            >
              @{SITE.username}
            </a>{' '}
            — push a new repo and it appears here, no redeploy needed.
            {lastSynced && (
              <span className="block mt-1 text-xs opacity-70">
                Last synced {lastSynced.toLocaleTimeString()} · {projects.length} repos tracked
              </span>
            )}
          </motion.p>
        </div>

        {/* Controls */}
        <div className="max-w-5xl mx-auto mb-10 flex flex-col md:flex-row gap-3 md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects, tags, languages…"
              className="w-full bg-white/5 border border-white/10 rounded-full pl-11 pr-4 py-3 text-sm placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-full px-4 py-3 text-sm focus:outline-none cursor-pointer [&>option]:bg-black"
              aria-label="Filter by language"
            >
              {languages.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="bg-white/5 border border-white/10 rounded-full px-4 py-3 text-sm focus:outline-none cursor-pointer [&>option]:bg-black"
              aria-label="Sort projects"
            >
              <option value="recent">Recently updated</option>
              <option value="stars">Most starred</option>
              <option value="az">A – Z</option>
            </select>
            <button
              onClick={refresh}
              className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-3 text-sm hover:bg-white/10 transition-colors"
              title="Re-sync from GitHub now"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Sync
            </button>
          </div>
        </div>

        {error && (
          <p className="text-center text-xs text-amber-300/90 mb-6">{error}</p>
        )}

        {/* Grid */}
        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          {loading &&
            Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-3xl overflow-hidden glass-panel border-white/10 h-[460px] animate-pulse"
              >
                <div className="h-56 bg-white/5" />
                <div className="p-6 space-y-3">
                  <div className="h-6 w-2/3 bg-white/10 rounded" />
                  <div className="h-4 w-full bg-white/5 rounded" />
                  <div className="h-4 w-5/6 bg-white/5 rounded" />
                </div>
              </div>
            ))}

          {!loading && visible.length === 0 && (
            <div className="col-span-full text-center py-16 text-muted-foreground">
              <p className="text-lg font-medium text-white">No projects match your search.</p>
              <p className="text-sm mt-1">Try a different keyword or language filter.</p>
            </div>
          )}

          {!loading &&
            visible.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: Math.min(index, 5) * 0.08 }}
                className="group relative rounded-3xl overflow-hidden glass-panel border-white/10 flex flex-col h-full hover:border-white/25 transition-colors"
              >
                <div className="relative h-56 overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-3 left-3 z-20 flex gap-2">
                    {project.isPinned && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-black/60 backdrop-blur border border-white/20">
                        <Pin className="w-3 h-3" /> Pinned
                      </span>
                    )}
                    {project.liveUrl && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-emerald-500/20 backdrop-blur border border-emerald-400/30 text-emerald-200">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Live
                      </span>
                    )}
                  </div>
                  <div className="absolute top-3 right-3 z-20 flex gap-2 text-[11px] font-medium">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur border border-white/20">
                      <Star className="w-3 h-3 text-yellow-300" /> {project.stars}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur border border-white/20">
                      <GitFork className="w-3 h-3" /> {project.forks}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow relative z-20 bg-background/80 backdrop-blur-sm">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  <p className="text-[11px] font-mono text-white/30 mb-2">
                    viratcore01/{project.repoName}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4 flex-grow line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.language && (
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-md bg-white/5 border border-white/10">
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: languageColor(project.language) }}
                        />
                        {project.language}
                      </span>
                    )}
                    {project.tags
                      .filter((t) => t !== project.language)
                      .slice(0, 4)
                      .map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-medium px-2.5 py-1 rounded-md bg-white/5 border border-white/10"
                        >
                          {tag}
                        </span>
                      ))}
                  </div>

                  <p className="text-[11px] text-white/30 mb-4">
                    Updated {timeAgo(project.pushedAt)}
                  </p>

                  <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
                    >
                      <GitHubIcon className="w-4 h-4" /> Code
                    </a>
                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" /> Live Demo
                      </a>
                    ) : (
                      <span className="text-xs text-white/25">No demo yet</span>
                    )}
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Open ${project.title} on GitHub`}
                      className="ml-auto text-white/40 hover:text-white transition-colors"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
        </div>

        {!loading && filtered.length > featuredCount && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAll((s) => !s)}
              className="px-8 py-3 rounded-full bg-white text-black text-sm font-semibold hover:scale-105 transition-transform"
            >
              {showAll
                ? 'Show less'
                : `View all ${filtered.length} projects (${filtered.length - featuredCount} more)`}
            </button>
            <p className="mt-3 text-xs text-white/40">
              New repos appear here automatically after you push to GitHub.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
