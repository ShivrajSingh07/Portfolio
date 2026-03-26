import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useNavStore } from '../../stores/useNavStore';
import { useCursorStore } from '../../stores/useCursorStore';

const navItems = ['About', 'Projects', 'Skills', 'Certificates', 'Education', 'Contact'];

export const MobileMenu: React.FC = () => {
  const { isOpen, setOpen } = useNavStore();
  const setCursor = useCursorStore(state => state.setVariant);
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (isOpen) {
      gsap.to(containerRef.current, { autoAlpha: 1, duration: 0.1 });
      gsap.to(bgRef.current, { opacity: 1, backdropFilter: 'blur(16px)', duration: 0.4, ease: 'power2.out' });
      gsap.fromTo(itemsRef.current, 
        { x: 50, opacity: 0 }, 
        { x: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: 'back.out(1.7)' }
      );
    } else {
      gsap.to(itemsRef.current, { x: 20, opacity: 0, stagger: 0.05, duration: 0.3, ease: 'power2.in' });
      gsap.to(bgRef.current, { 
        opacity: 0, 
        backdropFilter: 'blur(0px)', 
        duration: 0.4, 
        delay: 0.2,
        onComplete: () => {
          gsap.set(containerRef.current, { autoAlpha: 0 });
        }
      });
    }
  }, [isOpen]);

  const handleNav = (id: string) => {
    setOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id.toLowerCase());
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 400);
  };

  return (
    <div ref={containerRef} className="fixed inset-0 z-30 invisible md:hidden">
      <div ref={bgRef} className="absolute inset-0 bg-bg-primary/90 opacity-0" />
      <div className="relative z-10 h-full flex flex-col justify-center px-12">
        {navItems.map((item, i) => (
          <button
            key={item}
            ref={el => { itemsRef.current[i] = el; }}
            onClick={() => handleNav(item)}
            onMouseEnter={() => setCursor('hover')}
            onMouseLeave={() => setCursor('default')}
            className="text-left text-4xl font-heading font-medium text-white mb-6 hover:text-brand-primary transition-colors cursor-none flex items-baseline gap-4 group"
          >
            <span className="text-sm font-mono text-brand-secondary">0{i + 1}</span>
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};
