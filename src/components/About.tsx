import { motion } from 'framer-motion';
import { User, MapPin, GraduationCap, Rocket, Heart, Coffee } from 'lucide-react';
import { useGitHubProfile } from '../hooks/useGitHub';
import { SITE } from '../config/site';

const highlights = [
  { icon: Rocket, label: '22+ public repos', desc: 'Shipped & iterating' },
  { icon: GraduationCap, label: 'MERN + AI focus', desc: 'Modern full-stack' },
  { icon: Heart, label: 'Product-minded', desc: 'UX-first builds' },
  { icon: Coffee, label: 'Freelance-ready', desc: 'Fast communicator' },
];

export function About() {
  const { profile } = useGitHubProfile();

  return (
    <section id="about" className="py-24 relative">
      <div className="container px-4 md:px-6 mx-auto max-w-6xl">
        <div className="grid md:grid-cols-5 gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 glass-panel p-8 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
            <img
              src={profile?.avatar_url ?? `https://github.com/${SITE.username}.png`}
              alt={SITE.name}
              className="w-36 h-36 rounded-full mx-auto border-4 border-white/10 object-cover relative"
              loading="lazy"
            />
            <h3 className="mt-5 text-2xl font-bold relative">{SITE.name}</h3>
            <p className="text-sm text-muted-foreground relative">{SITE.role}</p>
            <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted-foreground relative">
              <MapPin className="w-3.5 h-3.5" /> {SITE.location} ·{' '}
              <span className="text-emerald-300 font-medium">Open to work</span>
            </p>
            <div className="mt-5 flex justify-center gap-3 relative">
              <a
                href={SITE.socials.github}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-full bg-white text-black text-sm font-semibold hover:scale-105 transition-transform"
              >
                GitHub
              </a>
              <a
                href={SITE.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-full bg-white/5 border border-white/15 text-sm font-semibold hover:bg-white/10 transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-3"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <User className="w-4 h-4" /> About me
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter leading-tight">
              I turn ideas into <span className="text-gradient">fast, intelligent</span> products.
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Hi, I'm {SITE.name} — a {SITE.role} based in {SITE.location}. I specialise in the
              MERN stack with TypeScript, plus AI integration (LLMs, RAG, agents) so products
              feel smart out of the box.
            </p>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              My workflow: clean architecture, sharp UI, real deployments. Every repo on my
              GitHub is a live artefact — this portfolio reads them automatically, so what you
              see is always what I've actually shipped.
            </p>
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {highlights.map((h) => (
                <div
                  key={h.label}
                  className="rounded-2xl bg-white/5 border border-white/10 p-4 hover:border-white/25 transition-colors"
                >
                  <h.icon className="w-5 h-5 text-primary mb-2" />
                  <p className="text-sm font-bold">{h.label}</p>
                  <p className="text-xs text-muted-foreground">{h.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
