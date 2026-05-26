import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, FolderGit2 } from 'lucide-react';

const GitHubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.164 6.839 9.489.5.092.682-.217.682-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.454-1.155-1.11-1.47-1.11-1.47-.908-.62.069-.608.069-.608 1.205.084 1.531 1.03 1.531 1.03.896 1.53 2.343 1.088 2.91.832-.554.896-.674 2.11-.292 3.272 0 0 .255.482.822-.151a7.09 7.09 0 0 0 2.225-3.133c0 0 .255-.151.822.151C19.138 19.165 22 17.653 22 12c0-5.523-4.477-10-10-10z"/>
  </svg>
);

const projects = [
  {
    title: 'VIRASAT',
    description: 'A highly secure digital legacy platform allowing users to store and pass on sensitive information, documents, and credentials to designated nominees.',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=800',
    tags: ['React', 'Node.js', 'MongoDB', 'JWT Auth', 'AES Encryption'],
    links: {
      github: '#',
      live: '#'
    }
  },
  {
    title: 'Advocate Portal',
    description: 'A premium freelance website for legal services featuring case management, client booking system, and a modern CMS for legal articles.',
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800',
    tags: ['Next.js', 'Tailwind', 'Supabase', 'Stripe'],
    links: {
      github: '#',
      live: '#'
    }
  },
  {
    title: 'ApexVelocity',
    description: 'Award-winning hackathon project. A real-time collaborative workspace with visual architecture diagramming and rich code editing features.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    tags: ['MERN', 'Socket.io', 'TypeScript', 'Redis'],
    links: {
      github: '#',
      live: '#'
    }
  }
];

export function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="projects" className="py-24 relative">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
          >
            <FolderGit2 className="w-4 h-4" />
            Selected Work
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
            A selection of my best work, from secure platforms to AI-integrated applications.
          </motion.p>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              className="group relative rounded-3xl overflow-hidden glass-panel border-white/10 flex flex-col h-full"
            >
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                />
              </div>
              
              <div className="p-6 flex flex-col flex-grow relative z-20 bg-background/80 backdrop-blur-sm">
                <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                <p className="text-muted-foreground mb-6 flex-grow">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-xs font-medium px-2.5 py-1 rounded-md bg-white/5 border border-white/10">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                  <a href={project.links.github} className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
                    <GitHubIcon className="w-4 h-4" /> Code
                  </a>
                  <a href={project.links.live} className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
                    <ExternalLink className="w-4 h-4" /> Live Demo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
