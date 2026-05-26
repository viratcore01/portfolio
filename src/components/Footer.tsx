import { Code2, Github, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/50 backdrop-blur-xl py-12 relative z-10">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-xl font-bold tracking-tighter">
            <Code2 className="w-6 h-6 text-primary" />
            <span>virat<span className="text-primary">core</span>01</span>
          </div>
          
          <div className="flex items-center gap-6">
            <a href="https://github.com/viratcore01" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
            <a href="https://www.linkedin.com/in/virat-shishodia-58349a367/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
            <a href="mailto:viratcore01@gmail.com" className="text-muted-foreground hover:text-white transition-colors"><Mail className="w-5 h-5" /></a>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Virat Shishodia. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}