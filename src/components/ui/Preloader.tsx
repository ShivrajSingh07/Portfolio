import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { useLoaderStore } from '../../stores/useLoaderStore';

const lines = [
  "> Initializing portfolio...",
  "> Loading neural networks... ██████████ 100%",
  "> Compiling experiences...   ██████████ 100%",
  "> Rendering universe...      ██████████ 100%",
  "> Welcome."
];

export const Preloader: React.FC = () => {
  const [currentLine, setCurrentLine] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const { isLoaded, setLoaded } = useLoaderStore();
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (isLoaded) return;
    
    // Typewriter effect simulation
    if (currentLine < lines.length) {
      const fullText = lines[currentLine];
      let charIndex = 0;
      
      const typeInterval = setInterval(() => {
        if (charIndex <= fullText.length) {
          setDisplayedText(fullText.substring(0, charIndex));
          charIndex++;
        } else {
          clearInterval(typeInterval);
          setTimeout(() => {
            setCurrentLine(prev => prev + 1);
            setDisplayedText("");
          }, 350 + Math.random() * 200); // Random pause between lines
        }
      }, 25 + Math.random() * 20); // Random typing speed
      
      return () => clearInterval(typeInterval);
    } else {
      // Completed sequence: shatter and fade out
      setTimeout(() => {
        gsap.to(containerRef.current, {
          opacity: 0,
          scale: 1.05,
          filter: 'blur(10px)',
          duration: 1.2,
          ease: "power3.inOut",
          onComplete: () => setLoaded(true)
        });
      }, 600);
    }
  }, [currentLine, isLoaded, setLoaded]);

  if (isLoaded) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-bg-primary flex flex-col items-start justify-center p-8 md:p-24 font-mono text-brand-primary overflow-hidden"
    >
      <div className="noise-overlay opacity-10" />
      <div className="relative z-10 w-full max-w-3xl">
        {lines.slice(0, currentLine).map((line, i) => (
          <div key={i} className="mb-3 text-sm md:text-base whitespace-pre-wrap">{line}</div>
        ))}
        {currentLine < lines.length && (
          <div className="mb-3 text-sm md:text-base whitespace-pre-wrap flex items-center">
            {displayedText}<span className="inline-block w-2.5 h-5 bg-brand-primary ml-1 animate-pulse"></span>
          </div>
        )}
      </div>
      <button 
        onClick={() => {
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => setLoaded(true)
          });
        }}
        className="absolute bottom-8 right-8 text-xs text-text-secondary hover:text-white transition-colors opacity-0 animate-[fadeIn_0.5s_ease-in_2s_forwards]"
      >
        [Skip]
      </button>
    </div>
  );
};
