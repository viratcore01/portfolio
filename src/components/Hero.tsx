import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowRight, Terminal, Sparkles } from 'lucide-react';
import { SplineScene } from './ui/splite';

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
              <a href="https://github.com/viratcore01" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
              <a href="https://www.linkedin.com/in/virat-shishodia-58349a367/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
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
