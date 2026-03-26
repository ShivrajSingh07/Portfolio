import React, { useEffect, useState } from 'react';
import { useNavStore } from '../../stores/useNavStore';
import { useCursorStore } from '../../stores/useCursorStore';

const navItems = ['About', 'Projects', 'Skills', 'Certificates', 'Education', 'Contact'];

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const { toggle, isOpen } = useNavStore();
  const setCursor = useCursorStore((state) => state.setVariant);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${scrolled ? 'glass py-4' : 'py-6 bg-transparent'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div 
          className="text-2xl font-heading font-bold text-white tracking-tighter cursor-none"
          onMouseEnter={() => setCursor('hover', 'HOME')}
          onMouseLeave={() => setCursor('default')}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          SN<span className="text-brand-primary">.</span>
        </div>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => handleScrollTo(item)}
              onMouseEnter={() => setCursor('hover', 'GO')}
              onMouseLeave={() => setCursor('default')}
              className="text-sm font-sans text-text-primary hover:text-brand-primary transition-colors relative group cursor-none"
            >
              <span className="relative z-10">{item}</span>
              <span className="absolute -bottom-2 left-1/2 w-1 h-1 bg-brand-primary rounded-full opacity-0 -translate-x-1/2 transition-all duration-300 group-hover:opacity-100 group-hover:-translate-y-1"></span>
            </button>
          ))}
          <button 
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              window.open('https://drive.google.com/file/d/19OTL5w72v4Trp5XsqsUwxUqB4iWdOxw5/view?usp=drive_link', '_blank');
            }}
            onMouseEnter={() => setCursor('hover')}
            onMouseLeave={() => setCursor('default')}
            className="px-5 py-2 rounded-full border border-brand-primary text-brand-primary text-sm font-medium hover:bg-brand-primary hover:text-bg-primary transition-all duration-300 cursor-none"
          >
            Hire Me
          </button>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden relative z-50 w-8 h-8 flex flex-col justify-center items-center gap-1.5 cursor-none"
          onClick={toggle}
          onMouseEnter={() => setCursor('hover')}
          onMouseLeave={() => setCursor('default')}
        >
          <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>
    </header>
  );
};
