import { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  useSmoothScroll();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading screen
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <CustomCursor />
      
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 border-4 border-white/10 border-t-primary rounded-full animate-spin" />
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl font-bold tracking-tighter"
              >
                virat<span className="text-primary">core</span>01
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
        <Navbar />
        <main>
          <Hero />
          <Skills />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
