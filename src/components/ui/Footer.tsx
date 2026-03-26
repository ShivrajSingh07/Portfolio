import React from 'react';
import { Mail } from 'lucide-react';
import { useCursorStore } from '../../stores/useCursorStore';

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

export const Footer: React.FC = () => {
  const setCursor = useCursorStore(state => state.setVariant);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/10 bg-bg-primary pt-16 pb-8 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-custom opacity-50"></div>
      
      <div className="container mx-auto px-6 flex flex-col items-center text-center">
        <h3 className="text-2xl font-heading font-bold text-white mb-2">SN<span className="text-brand-primary">.</span></h3>
        <p className="text-text-secondary text-sm mb-8 max-w-sm">
          Data Science Portfolio <br/> 
          Made with ❤️ + ☕ + React/Three.js
        </p>
        
        <div className="flex gap-6 mb-12">
          {[
            { Icon: GithubIcon, href: 'https://github.com/shivrajsingh07' },
            { Icon: LinkedinIcon, href: 'https://linkedin.com/in/shivraj-singh-nathawat/' },
            { Icon: Mail, href: 'mailto:shivrajsingh2459@gmail.com' }
          ].map((social, i) => (
            <a
              key={i}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setCursor('hover')}
              onMouseLeave={() => setCursor('default')}
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-text-secondary hover:text-white hover:-translate-y-1 hover:border-brand-primary transition-all duration-300 cursor-none"
            >
              <social.Icon size={18} />
            </a>
          ))}
        </div>
        
        <div className="w-full flex flex-col md:flex-row justify-between items-center text-xs text-text-secondary border-t border-white/5 pt-8">
          <p>© {new Date().getFullYear()} All rights reserved</p>
          <button 
            onClick={scrollToTop}
            onMouseEnter={() => setCursor('hover', 'TOP')}
            onMouseLeave={() => setCursor('default')}
            className="mt-4 md:mt-0 flex items-center gap-2 hover:text-brand-primary transition-colors cursor-none group"
          >
            [↑ Back to Top] <span className="inline-block transition-transform duration-300 group-hover:-translate-y-2 opacity-0 group-hover:opacity-100">🚀</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
