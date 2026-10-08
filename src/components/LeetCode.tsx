import { motion } from 'framer-motion';
import { Code2, Flame, ArrowUpRight, Trophy, CalendarCheck2, ChevronRight } from 'lucide-react';
import { useLeetCode } from '../hooks/useLeetCode';
import { leetTimeAgo } from '../lib/leetcode';
import { SITE } from '../config/site';

const diffBar = [
  { key: 'easySolved', label: 'Easy', color: 'bg-emerald-400', text: 'text-emerald-300' },
  { key: 'mediumSolved', label: 'Medium', color: 'bg-amber-400', text: 'text-amber-300' },
  { key: 'hardSolved', label: 'Hard', color: 'bg-rose-400', text: 'text-rose-300' },
] as const;

export function LeetCode() {
  const { stats, loading } = useLeetCode();
  const total = Math.max(stats.totalSolved, 1);

  return (
    <section id="leetcode" className="py-20 relative">
      <div className="container px-4 md:px-6 mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
          >
            <Code2 className="w-4 h-4" />
            Coding Profile
            <span className="ml-1 inline-flex items-center gap-1 rounded-full bg-emerald-400/15 px-2 py-0.5 text-[11px] font-semibold text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {stats.live ? 'Live' : 'Auto-synced'}
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold tracking-tighter"
          >
            LeetCode at a glance
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-4 text-muted-foreground max-w-2xl mx-auto"
          >
            Problem-solving progress for{' '}
            <a
              href={SITE.socials.leetcode}
              target="_blank"
              rel="noreferrer"
              className="font-mono underline underline-offset-4 hover:text-white"
            >
              @{stats.username}
            </a>{' '}
            — refreshed daily, no manual updates.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-panel p-8 md:p-10 relative overflow-hidden"
        >
          <div className="absolute -bottom-28 -left-28 w-96 h-96 bg-amber-400/10 rounded-full blur-[100px] pointer-events-none" />
          {loading ? (
            <div className="grid md:grid-cols-2 gap-8 animate-pulse">
              <div className="space-y-4">
                <div className="h-14 w-40 bg-white/10 rounded" />
                <div className="h-3 w-full bg-white/5 rounded-full" />
                <div className="h-3 w-5/6 bg-white/5 rounded-full" />
              </div>
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-10 bg-white/5 rounded-xl" />
                ))}
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-10 relative">
              {/* Left: solved + difficulty */}
              <div>
                <div className="flex items-end gap-3">
                  <p className="text-6xl font-bold tracking-tighter">{stats.totalSolved}</p>
                  <p className="text-sm text-muted-foreground pb-2">
                    problems
                    <br />
                    solved
                  </p>
                </div>

                <div className="mt-6 space-y-3">
                  {diffBar.map((d) => (
                    <div key={d.key}>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className={`font-semibold ${d.text}`}>{d.label}</span>
                        <span className="text-muted-foreground">{stats[d.key]}</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(stats[d.key] / total) * 100}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8 }}
                          className={`h-full rounded-full ${d.color}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  <div className="rounded-2xl bg-white/5 border border-white/10 p-4 text-center">
                    <Flame className="w-5 h-5 mx-auto text-orange-400 mb-1.5" />
                    <p className="text-xl font-bold">{stats.streak}</p>
                    <p className="text-[11px] text-muted-foreground">day streak</p>
                  </div>
                  <div className="rounded-2xl bg-white/5 border border-white/10 p-4 text-center">
                    <CalendarCheck2 className="w-5 h-5 mx-auto text-emerald-300 mb-1.5" />
                    <p className="text-xl font-bold">{stats.totalActiveDays}</p>
                    <p className="text-[11px] text-muted-foreground">active days</p>
                  </div>
                  <div className="rounded-2xl bg-white/5 border border-white/10 p-4 text-center">
                    <Trophy className="w-5 h-5 mx-auto text-yellow-300 mb-1.5" />
                    <p className="text-xl font-bold">
                      {stats.contestRating ? stats.contestRating : '—'}
                    </p>
                    <p className="text-[11px] text-muted-foreground">contest rating</p>
                  </div>
                </div>

                <p className="mt-4 text-xs text-muted-foreground">
                  Main weapon:{' '}
                  <span className="font-semibold text-white">
                    {stats.topLanguages[0]?.name ?? '—'}
                  </span>
                  {stats.topLanguages[0] && ` · ${stats.topLanguages[0].solved} solved`}
                  {stats.contestsAttended === 0 &&
                    ' · yet to debut in contests — road to the first one'}
                </p>
              </div>

              {/* Right: recent solves */}
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                  Recently solved
                </h3>
                {stats.recent.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    Recent solves will appear here on next sync.
                  </p>
                ) : (
                  <ul className="space-y-2.5">
                    {stats.recent.slice(0, 5).map((r) => (
                      <li key={`${r.titleSlug}-${r.timestamp}`}>
                        <a
                          href={`https://leetcode.com/problems/${r.titleSlug}/`}
                          target="_blank"
                          rel="noreferrer"
                          className="group flex items-center gap-3 rounded-xl bg-white/5 border border-white/10 px-4 py-3 hover:border-white/30 hover:bg-white/10 transition-colors"
                        >
                          <ChevronRight className="w-4 h-4 text-primary shrink-0" />
                          <span className="flex-1 min-w-0">
                            <span className="block text-sm font-medium truncate group-hover:text-primary transition-colors">
                              {r.title}
                            </span>
                            <span className="block text-[11px] text-white/35">
                              {leetTimeAgo(r.timestamp)}
                            </span>
                          </span>
                          <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-white transition-colors shrink-0" />
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
                <a
                  href={SITE.socials.leetcode}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black text-sm font-semibold hover:scale-105 transition-transform"
                >
                  View full LeetCode profile <ArrowUpRight className="w-4 h-4" />
                </a>
                {stats.updated && (
                  <p className="mt-3 text-[11px] text-white/30">
                    Snapshot {stats.updated}
                    {stats.live ? ' · refreshed live just now' : ' · auto-refreshes daily'}
                  </p>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
