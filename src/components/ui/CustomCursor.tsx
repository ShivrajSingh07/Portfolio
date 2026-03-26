import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useCursorStore } from '../../stores/useCursorStore';
import { Search, Crosshair } from 'lucide-react';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const { variant, text } = useCursorStore();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create quick setters for performance
      const xToRing = gsap.quickTo(ringRef.current, "x", { duration: 0.6, ease: "power3.out" });
      const yToRing = gsap.quickTo(ringRef.current, "y", { duration: 0.6, ease: "power3.out" });
      
      const xToDot = gsap.quickTo(dotRef.current, "x", { duration: 0.1, ease: "none" });
      const yToDot = gsap.quickTo(dotRef.current, "y", { duration: 0.1, ease: "none" });

      const onMouseMove = (e: MouseEvent) => {
        xToDot(e.clientX);
        yToDot(e.clientY);
        xToRing(e.clientX);
        yToRing(e.clientY);
      };
      
      window.addEventListener('mousemove', onMouseMove);
      return () => window.removeEventListener('mousemove', onMouseMove);
    });
    
    return () => ctx.revert();
  }, []);

  const ringClass = variant === 'hover' || variant === 'project' || variant === '3d' 
    ? 'w-16 h-16 bg-[var(--brand-primary)]/20 border-[var(--brand-primary)] backdrop-blur-sm' 
    : 'w-8 h-8 border-white/30 bg-transparent';
    
  return (
    <div className="pointer-events-none fixed inset-0 z-[10000] hidden md:block overflow-hidden mix-blend-difference">
      <div 
        ref={ringRef} 
        className={`absolute top-0 left-0 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-300 ease-out ${ringClass}`}
      >
        {variant === 'hover' && text && <span className="text-[10px] uppercase font-bold text-white font-mono">{text}</span>}
        {variant === 'hover' && !text && <span className="text-[10px] uppercase font-bold text-white font-mono">Click</span>}
        {variant === 'project' && <Search size={16} className="text-white" />}
        {variant === '3d' && <Crosshair size={16} className="text-[var(--brand-primary)]" />}
      </div>
      <div 
        ref={dotRef} 
        className="absolute top-0 left-0 w-2 h-2 bg-[var(--brand-primary)] rounded-full -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
};
