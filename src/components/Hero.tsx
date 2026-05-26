import { motion } from 'framer-motion';
import { Mail, ArrowRight, Terminal, Sparkles } from 'lucide-react';
import { SplineScene } from './ui/splite';

const GitHubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.164 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.373-3.661-1.09-3.661-1.09-.454-1.155-1.11-1.47-1.11-1.47-.908-.62.069-.608.069-.608 1.205.084 1.531 1.03 1.531 1.03.896 1.53 2.343 1.088 2.91.832-.554.896-.674 2.11-.292 3.272 0 0 .255.482.822-.151a7.09 7.09 0 0 0 2.225-3.133c0 0 .255-.151.822.151C19.138 19.165 22 17.653 22 12c0-5.523-4.477-10-10-10z"/>
  </svg>
);

const LinkedInIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.268c-.966 0-1.718-.756-1.718-1.732s.753-1.732 1.72-1.732c.965 0 1.718.756 1.718 1.732s-.753 1.732-1.72 1.732zm13.5 10.268h-3v-4.5c0-1.078-.02-2.472-1.504-2.472-1.504 0-1.735 1.172-1.735 2.388v4.588h-3v-9h2.881v1.233h.041c.2-.396.693-1.004 1.548-1.004 1.602 0 1.949.996 1.949 2.338v5.428z"/>
  </svg>
);

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden">
      {/* Background Grid & Effects */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      
      <div className="container relative z-10 px-4 md:px-6 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Content Column */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm font-medium mb-6 backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              Available for new opportunities
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-6 leading-none"
            >
              Building modern web experiences with <br />
              <span className="text-gradient">MERN Stack</span>.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base md:text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed"
            >
              Hi, I'm Virat Shishodia. A MERN stack full-stack developer crafting premium, scalable, and modern digital products (including AI integration).
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-12"
            >
              <a
                href="#projects"
                className="w-full sm:w-auto px-6 py-3 bg-white text-black rounded-full font-medium flex items-center justify-center gap-2 hover:scale-105 transition-transform animate-pulse-glow"
              >
                Explore Work <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                className="w-full sm:w-auto px-6 py-3 bg-white/5 border border-white/10 text-white rounded-full font-medium flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
              >
                <Terminal className="w-4 h-4" /> Let's Talk
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="flex items-center gap-6 text-muted-foreground"
            >
              <a href="https://github.com/viratcore01" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><GitHubIcon className="w-5 h-5" /></a>
              <a href="https://www.linkedin.com/in/virat-shishodia-58349a367/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><LinkedInIcon className="w-5 h-5" /></a>
              <a href="mailto:viratcore01@gmail.com" className="hover:text-white transition-colors"><Mail className="w-5 h-5" /></a>
            </motion.div>
          </div>

          {/* Right 3D Robot Spline Column */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-5 w-full h-[400px] lg:h-[550px] relative flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-gradient-radial from-white/[0.03] to-transparent blur-3xl rounded-full pointer-events-none" />
            <SplineScene 
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
