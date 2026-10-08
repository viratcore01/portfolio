// ─── Central site config. Edit here, everything else auto-updates. ───

export const SITE = {
  username: 'viratcore01',
  name: 'Virat Shishodia',
  handle: 'viratcore01',
  role: 'MERN Stack & AI Full-Stack Developer',
  email: 'viratcore01@gmail.com',
  phone: '+91 9313005400',
  location: 'India',
  availability: 'Available for freelance & full-time roles',
  socials: {
    github: 'https://github.com/viratcore01',
    linkedin: 'https://www.linkedin.com/in/virat-shishodia-58349a367/',
    email: 'mailto:viratcore01@gmail.com',
    portfolio: 'https://viratcore01.vercel.app',
    leetcode: 'https://leetcode.com/u/viratcore_01/',
  },
  leetcode: {
    username: 'viratcore_01',
  },
  // Live GitHub sync settings — no rebuild needed when you push new repos.
  github: {
    // How many repos to show in the "Featured" grid. The "All work" grid shows all.
    featuredCount: 6,
    // Repos to always pin to the top (by exact repo name). The rest sort by pushed_at.
    pinned: ['virasat', 'GharYaad', 'EchoVault', 'DAM', 'STOIC_SAP', 'dummy-browser'],
    // Repos to hide from the portfolio (profile README repo, forks, experiments).
    // NOTE: `viratcore01` is your profile repo — hidden by default.
    excluded: ['viratcore01'],
    // Hide forked repos by default (set false to show them).
    hideForks: true,
  },
} as const;

// ─── Curated overrides ───
// GitHub descriptions are empty for most repos, so this map provides
// rich titles / descriptions / tags / images. Anything NOT listed here
// still appears automatically — it just uses the GitHub fallback.
export interface CuratedProject {
  displayName?: string;
  description: string;
  tags: string[];
  image?: string;
  accent?: string;
}

export const CURATED: Record<string, CuratedProject> = {
  virasat: {
    displayName: 'VIRASAT',
    description:
      'Secure digital legacy platform — store documents, credentials & memories with AES-grade practices and pass them to designated nominees.',
    tags: ['React', 'Node.js', 'MongoDB', 'JWT Auth', 'Vercel'],
    image:
      'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=800',
  },
  GharYaad: {
    description:
      'Nostalgia-first memories app — capture, organise and revisit home memories with a warm, fast, mobile-first experience.',
    tags: ['JavaScript', 'React', 'Vercel', 'PWA'],
    image:
      'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&q=80&w=800',
  },
  EchoVault: {
    description:
      'Realtime voice / notes vault with instant search and clean playback — built for speed and privacy.',
    tags: ['TypeScript', 'React', 'Vercel', 'Web Audio'],
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
  },
  DAM: {
    displayName: 'DAM Studio',
    description:
      'Digital asset workspace — upload, organise and ship creative assets with a premium studio-grade UI.',
    tags: ['TypeScript', 'Next.js', 'Tailwind', 'Vercel'],
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
  },
  STOIC_SAP: {
    description:
      'Stoic productivity & analytics toolkit in Python — routines, journaling primitives and data pipelines.',
    tags: ['Python', 'Automation', 'Analytics'],
    image:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800',
  },
  'dummy-browser': {
    displayName: 'Dummy Browser',
    description:
      'Playful in-browser browser mock — tabs, history and URL sandboxing rendered entirely client-side.',
    tags: ['TypeScript', 'React', 'Vercel'],
    image:
      'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=800',
  },
  'handwriting-': {
    displayName: 'Handwriting AI',
    description:
      'Handwriting-to-digital experience — smooth canvas inking with export to clean, shareable output.',
    tags: ['JavaScript', 'Canvas', 'Vercel'],
    image:
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=800',
  },
  handson: {
    displayName: 'HandsOn Labs',
    description:
      'Interactive JS playground — bite-size experiments, DOM drills and rapid prototypes.',
    tags: ['JavaScript', 'Vite', 'Learning'],
    image:
      'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?auto=format&fit=crop&q=80&w=800',
  },
  fakenews: {
    displayName: 'FakeNews Detector',
    description:
      'News-veracity explorer — heuristics and UI for spotting misinformation patterns fast.',
    tags: ['JavaScript', 'AI', 'NLP'],
    image:
      'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=800',
  },
};
