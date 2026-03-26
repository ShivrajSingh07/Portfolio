import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { skills, type Skill } from '../data/skills';
import { Canvas } from '@react-three/fiber';
import { SkillSphere } from '../components/canvas/SkillSphere';
import { OrbitControls } from '@react-three/drei';
import { useCursorStore } from '../stores/useCursorStore';

export const Skills: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const setCursor = useCursorStore((state: any) => state.setVariant);
  
  const categoriesMap = skills.reduce((acc: Record<string, Skill[]>, skill: Skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Matrix rain effect for title
      gsap.from('.skills-title-item', {
        y: -50,
        opacity: 0,
        color: '#00f0ff',
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.skills-header',
          start: 'top 80%'
        }
      });

      // Animate progress bars
      const bars = gsap.utils.toArray<HTMLDivElement>('.skill-fill');
      bars.forEach(bar => {
        const percentage = bar.getAttribute('data-percentage') || '0';
        gsap.to(bar, {
          width: `${percentage}%`,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: bar,
            start: 'top 95%'
          }
        });
      });
      
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={containerRef} className="relative w-full py-24 bg-bg-primary overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-custom opacity-30"></div>
      <div className="container mx-auto px-6 max-w-7xl pt-10">
        
        <div className="mb-16 skills-header font-heading text-5xl md:text-6xl font-bold uppercase tracking-tight flex justify-center text-white cursor-none">
          {"SKILLS".split('').map((char, i) => (
            <span key={i} className="skills-title-item inline-block">{char}</span>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Left - 3D Sphere */}
          <div 
            className="w-full lg:w-1/2 aspect-square lg:aspect-auto lg:h-[600px] cursor-none relative z-10"
            onMouseEnter={() => setCursor('3d')}
            onMouseLeave={() => setCursor('default')}
          >
             <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 2]}>
               <ambientLight intensity={0.5} />
               <SkillSphere skills={skills.map((s: Skill) => s.name)} />
               <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
             </Canvas>
          </div>

          {/* Right - Skill Bars list */}
          <div className="w-full lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6 relative z-20">
            {Object.entries(categoriesMap).map(([category, items]: [string, Skill[]]) => (
              <div key={category} className="glass-card p-6 rounded-xl border border-white/5 h-fit">
                <h3 className="text-sm font-heading font-bold text-white mb-6 uppercase tracking-widest text-[var(--brand-primary)]">
                  {category}
                </h3>
                <div className="space-y-4">
                  {items.map((skill: Skill) => (
                    <div key={skill.name} className="flex flex-col gap-2 group cursor-none"
                         onMouseEnter={() => setCursor('hover')}
                         onMouseLeave={() => setCursor('default')}>
                      <div className="flex justify-between items-center text-xs font-mono text-text-secondary group-hover:text-white transition-colors">
                        <span>{skill.name}</span>
                        <span className="text-[var(--brand-secondary)]">{skill.proficiency}%</span>
                      </div>
                      
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden relative">
                        {/* The animated fill bar */}
                        <div 
                          className="skill-fill h-full bg-gradient-custom w-0 rounded-full relative"
                          data-percentage={skill.proficiency}
                        >
                          {/* Glowing dot at the end */}
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_var(--brand-primary)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
};
