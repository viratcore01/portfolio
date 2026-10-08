import { motion } from 'framer-motion';
import { Github, Users, BookOpen, Star, Activity } from 'lucide-react';
import { useGitHubProfile, useGitHubRepos } from '../hooks/useGitHub';
import { SITE } from '../config/site';

export function GitHubStats() {
  const { profile } = useGitHubProfile();
  const { projects } = useGitHubRepos();

  const stars = projects.reduce((s, p) => s + p.stars, 0);
  const cards = [
    { icon: BookOpen, value: String(profile?.public_repos ?? '22+'), label: 'Public repos' },
    { icon: Star, value: String(stars), label: 'Stars earned' },
    { icon: Users, value: String(profile?.followers ?? 3), label: 'Followers' },
    { icon: Activity, value: String(projects.length), label: 'Tracked live here' },
  ];

  return (
    <section id="github" className="py-20 relative">
      <div className="container px-4 md:px-6 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-panel p-8 md:p-10 relative overflow-hidden"
        >
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="flex flex-col md:flex-row md:items-center gap-8 relative">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/10 text-emerald-300 text-xs font-semibold mb-3">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                AUTO-SYNCED WITH GITHUB
              </div>
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
                <Github className="w-8 h-8" /> Building in public
              </h2>
              <p className="mt-2 text-sm text-muted-foreground max-w-lg">
                This site reads <span className="font-mono">api.github.com/users/{SITE.username}</span>{' '}
                at runtime (cached 1h). Push a repo → it shows up in Projects, stats and the README
                workflow without touching this code.
              </p>
              <div className="mt-5">
                <img
                  src={`https://github-readme-stats.vercel.app/api?username=${SITE.username}&show_icons=true&theme=transparent&hide_border=true&title_color=fff&text_color=aaa&icon_color=fff`}
                  alt="GitHub stats"
                  loading="lazy"
                  className="max-w-full opacity-90"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 md:w-72 shrink-0">
              {cards.map((c) => (
                <div
                  key={c.label}
                  className="rounded-2xl bg-white/5 border border-white/10 p-5 text-center"
                >
                  <c.icon className="w-5 h-5 mx-auto text-primary mb-2" />
                  <p className="text-2xl font-bold">{c.value}</p>
                  <p className="text-xs text-muted-foreground">{c.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
