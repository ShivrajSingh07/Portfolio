import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCountUp } from '../hooks/useCountUp';
import { useCursorStore } from '../stores/useCursorStore';
import { Trophy, FileBadge, FileText, Target } from 'lucide-react';

const stats = [
  { label: 'DSA Solved', value: 250, suffix: '+', icon: Target },
  { label: 'Tech Stack', value: 15, suffix: '+', icon: Trophy },
  { label: 'Certifications', value: 3, suffix: '+', icon: FileBadge },
  { label: 'Major Projects', value: 4, suffix: '+', icon: FileText },
];


export const About: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const setCursor = useCursorStore((state: any) => state.setVariant);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Line draw animation
      gsap.fromTo(lineRef.current, 
        { scaleX: 0 },
        { 
          scaleX: 1, 
          duration: 1.5, 
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          }
        }
      );

      // Title assembly
      gsap.from('.about-title-char', {
        opacity: 0,
        x: () => (Math.random() - 0.5) * 400,
        y: () => (Math.random() - 0.5) * 400,
        rotationZ: () => (Math.random() - 0.5) * 180,
        duration: 1.5,
        stagger: 0.05,
        ease: "back.out(1.5)",
        scrollTrigger: { trigger: containerRef.current, start: "top 75%" }
      });

      // Bio paragraphs
      gsap.from('.bio-p', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: { trigger: rightColRef.current, start: "top 80%" }
      });

      // Text highlights
      gsap.utils.toArray<HTMLElement>('.highlight').forEach(el => {
        gsap.to(el, {
          backgroundPosition: "0 0",
          duration: 1,
          scrollTrigger: { trigger: el, start: "top 85%" }
        });
      });

      // Image reveal
      gsap.from('.about-image-wrapper', {
        clipPath: "circle(0% at 50% 50%)",
        duration: 1.5,
        ease: "power3.inOut",
        scrollTrigger: { trigger: leftColRef.current, start: "top 70%" }
      });

      // Trigger stats counter
      ScrollTrigger.create({
        trigger: '.stats-container',
        start: "top 85%",
        onEnter: () => setStatsVisible(true)
      });
      
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={containerRef} className="relative w-full py-24 px-6 max-w-7xl mx-auto overflow-hidden">
      <div ref={lineRef} className="absolute top-0 left-0 w-full h-[1px] bg-gradient-custom origin-left opacity-30"></div>
      
      <div className="mb-16 flex items-center justify-center md:justify-start pt-10">
        <span className="text-[var(--brand-primary)] font-mono text-xl mr-4 opacity-70">{'<'}</span>
        <h2 className="text-5xl md:text-6xl font-heading font-bold text-white uppercase tracking-tight flex whitespace-pre">
          {"About Me".split('').map((char, i) => (
            <span key={i} className={`about-title-char inline-block ${char === ' ' ? 'w-4' : ''}`}>{char}</span>
          ))}
        </h2>
        <span className="text-[var(--brand-primary)] font-mono text-xl ml-4 opacity-70">{'/>'}</span>
      </div>

      <div className="flex flex-col md:flex-row gap-16 relative z-10">
        {/* Left Column - Image */}
        <div ref={leftColRef} className="w-full md:w-2/5 flex flex-col items-center">
          <div className="relative w-64 h-64 md:w-80 md:h-80 about-image-wrapper group rounded-full p-2">
            <div className="absolute inset-0 rounded-full border border-white/10 group-hover:border-[var(--brand-primary)]/50 transition-colors duration-500 animate-[spin_10s_linear_infinite]"></div>
            
            <div className="w-full h-full rounded-full overflow-hidden relative cursor-none"
                 onMouseEnter={() => setCursor('hover', 'VIEW')}
                 onMouseLeave={() => setCursor('default')}>
              <div className="absolute inset-0 bg-[var(--brand-primary)] mix-blend-overlay opacity-20 group-hover:opacity-0 transition-opacity duration-300 z-10"></div>
              <img
                src="/images/avatar.jpg"
                alt="Shiv Nathawat"
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="absolute top-0 right-0 glass px-3 py-1 rounded-md text-[10px] font-mono text-[var(--brand-primary)] animate-[bounce_3s_ease-in-out_infinite]">
              import pandas as pd
            </div>
            <div className="absolute bottom-10 left-[-20px] glass px-3 py-1 rounded-md text-[10px] font-mono text-[var(--brand-secondary)] animate-[bounce_4s_ease-in-out_infinite_reverse]">
              accuracy = 0.97
            </div>
          </div>
        </div>

        {/* Right Column - Bio & Stats */}
        <div ref={rightColRef} className="w-full md:w-3/5 flex flex-col justify-center">
          <div className="space-y-6 text-text-secondary md:text-lg mb-12 relative z-20">
            <p className="bio-p leading-relaxed">
              I'm a passionate Computer Science student at Lovely Professional University, 
              specializing in <span className="highlight bg-gradient-to-r from-[var(--brand-secondary)]/40 to-[var(--brand-primary)]/40 bg-[length:200%_100%] bg-[100%_0] text-white px-1 rounded transition-all duration-300">Data Science and Machine Learning</span>.
            </p>
            <p className="bio-p leading-relaxed">
              My journey into tech spans across building highly accurate predictive models, exploring web development, and rigorously sharpening my problem-solving logic.
            </p>
            <p className="bio-p leading-relaxed">
              To date, I have solved 250+ combined Data Structures and Algorithm problems on LeetCode and GeeksforGeeks, and actively participate in Kaggle machine learning competitions.
            </p>
          </div>

          {/* Stats Row */}
          <div className="stats-container grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16 relative z-20">
            {stats.map((stat, i) => (
              <StatCard key={i} stat={stat} isVisible={statsVisible} />
            ))}
          </div>
        </div>
      </div>

    </section>
  );
};

const StatCard = ({ stat, isVisible }: { stat: any, isVisible: boolean }) => {
  const count = useCountUp(stat.value, 2000, isVisible);
  const setCursor = useCursorStore((state: any) => state.setVariant);
  
  return (
    <div 
      className="glass-card p-4 rounded-xl flex flex-col items-center justify-center text-center transform transition-all duration-300 hover:-translate-y-2 hover:border-[var(--brand-primary)]/50 relative overflow-hidden group cursor-none"
      onMouseEnter={() => setCursor('hover')}
      onMouseLeave={() => setCursor('default')}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--brand-primary)_0,transparent_100%)] opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
      
      <stat.icon className="text-text-secondary mb-3 group-hover:text-[var(--brand-primary)] transition-colors duration-300" size={24} />
      
      <div className="text-3xl font-heading font-bold text-white mb-1">
        {count}{stat.suffix}
      </div>
      
      <div className="text-xs text-text-secondary font-mono uppercase tracking-wider">
        {stat.label}
      </div>
    </div>
  );
};
