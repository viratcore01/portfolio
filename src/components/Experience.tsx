import { motion } from 'framer-motion';
import { Briefcase, CalendarDays } from 'lucide-react';

const roles = [
  {
    period: '2024 — Present',
    title: 'Full-Stack Developer (MERN + AI)',
    org: 'Freelance / Independent',
    points: [
      'Shipped 10+ production builds (Virasat, GharYaad, EchoVault, DAM) with React/Next.js, Node and Vercel pipelines.',
      'Integrated LLMs, auth, payments and realtime features into client-ready products.',
      'Portfolio & GitHub fully automated: new repos surface on the site with zero manual updates.',
    ],
    current: true,
  },
  {
    period: '2023 — 2024',
    title: 'Frontend Developer',
    org: 'Projects & Hackathons',
    points: [
      'Built award-style hackathon entries (ApexVelocity) with realtime collab and visual tooling.',
      'Deepened TypeScript, Tailwind, Framer Motion and app-performance craftsmanship.',
    ],
    current: false,
  },
  {
    period: '2022 — 2023',
    title: 'Foundations & First Launches',
    org: 'Self-taught → Open source',
    points: [
      'Learned JavaScript → React → Node → MongoDB by shipping in public.',
      'Started the viratcore01 GitHub: 22+ public repos and counting.',
    ],
    current: false,
  },
];

export function Experience() {
  return (
    <section id="experience" className="py-24 relative">
      <div className="container px-4 md:px-6 mx-auto max-w-4xl">
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
          >
            <Briefcase className="w-4 h-4" /> Journey
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold tracking-tighter"
          >
            Experience
          </motion.h2>
        </div>

        <div className="relative pl-8 md:pl-0">
          <div className="absolute left-3 md:left-1/2 top-0 bottom-0 w-px bg-white/10" />
          <div className="space-y-8">
            {roles.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`relative md:grid md:grid-cols-2 md:gap-10 ${
                  i % 2 === 1 ? 'md:[&>*:first-child]:col-start-2' : ''
                }`}
              >
                <span
                  className={`absolute -left-8 md:left-1/2 top-1 md:-translate-x-1/2 h-4 w-4 rounded-full border-2 ${
                    r.current
                      ? 'bg-emerald-400 border-emerald-200 shadow-[0_0_16px_rgba(52,211,153,.8)]'
                      : 'bg-black border-white/30'
                  }`}
                />
                <div className="glass-panel p-6">
                  <p className="inline-flex items-center gap-1.5 text-xs font-mono text-white/50">
                    <CalendarDays className="w-3.5 h-3.5" /> {r.period}
                  </p>
                  <h3 className="mt-2 text-xl font-bold">{r.title}</h3>
                  <p className="text-sm text-primary/90 font-medium">{r.org}</p>
                  <ul className="mt-3 space-y-2 text-sm text-muted-foreground list-disc list-inside">
                    {r.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>
                <div />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
