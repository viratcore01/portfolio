import { Code2, Mail } from 'lucide-react';

const GitHubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.164 6.839 9.489.5.092.682-.217.682-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.454-1.155-1.11-1.47-1.11-1.47-.908-.62.069-.608.069-.608 1.205.084 1.531 1.03 1.531 1.03.896 1.53 2.343 1.088 2.91.832-.554.896-.674 2.11-.292 3.272 0 0 .255.482.822-.151a7.09 7.09 0 0 0 2.225-3.133c0 0 .255-.151.822.151C19.138 19.165 22 17.653 22 12c0-5.523-4.477-10-10-10z"/>
  </svg>
);

const LinkedInIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.268c-.966 0-1.718-.756-1.718-1.732s.753-1.732 1.72-1.732c.965 0 1.718.756 1.718 1.732s-.753 1.732-1.72 1.732zm13.5 10.268h-3v-4.5c0-1.078-.02-2.472-1.504-2.472-1.504 0-1.735 1.172-1.735 2.388v4.588h-3v-9h2.881v1.233h.041c.2-.396.693-1.004 1.548-1.004 1.602 0 1.949.996 1.949 2.338v5.428z"/>
  </svg>
);

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
            <a href="https://github.com/viratcore01" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-white transition-colors"><GitHubIcon className="w-5 h-5" /></a>
            <a href="https://www.linkedin.com/in/virat-shishodia-58349a367/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-white transition-colors"><LinkedInIcon className="w-5 h-5" /></a>
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