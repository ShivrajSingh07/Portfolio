import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects, type Project } from '../data/projects';
import { useCursorStore } from '../stores/useCursorStore';
import { ExternalLink, Code } from 'lucide-react';

export const Projects: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const featuredRefs = useRef<(HTMLDivElement | null)[]>([]);

  const setCursor = useCursorStore((state: any) => state.setVariant);

  const featuredProjects = projects.filter((p: Project) => p.featured);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pinned featured projects
      featuredRefs.current.forEach((el) => {
        if (!el) return;
        ScrollTrigger.create({
          trigger: el,
          start: "top top",
          end: "+=100%",
          pin: true,
          pinSpacing: false,
          animation: gsap.to(el.querySelector('.featured-content'), {
            scale: 0.95,
            opacity: 0,
            y: -50,
            ease: "none"
          }),
          scrub: true,
        });
      });
      
      // Title terminal animation
      gsap.from('.projects-title-char', {
        scrollTrigger: {
          trigger: '.projects-header',
          start: "top 80%",
        },
        opacity: 0,
        y: 30,
        rotationX: -90,
        stagger: 0.05,
        duration: 0.8,
        ease: "back.out(1.5)"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={containerRef} className="relative w-full bg-bg-secondary pt-24 pb-32">
      
      <div className="container mx-auto px-6 mb-16 projects-header">
        <h2 className="text-2xl md:text-4xl font-mono text-white projects-title flex flex-wrap h-auto min-h-10">
          {"Projects Built with Purpose".split('').map((char, i) => (
            <span key={i} className={`projects-title-char inline-block ${char === ' ' ? 'w-4' : ''}`}>{char}</span>
          ))}
        </h2>
      </div>

      {/* Featured Projects - Full Height immersive */}
      <div className="w-full">
        {featuredProjects.map((project: Project, i: number) => (
          <div 
            key={project.id} 
            ref={el => { featuredRefs.current[i] = el; }}
            className="w-full h-screen relative flex items-center justify-center p-6 border-b border-white/5 overflow-hidden bg-bg-primary z-10"
          >
            {/* Background Map Placeholder since WebGL scenes are heavy - could incorporate canvas here later */}
            <div className="absolute inset-0 opacity-20 pointer-events-none grid-bg"></div>

            <div className="featured-content max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-20">
              <div className="order-2 lg:order-1 flex flex-col items-start text-left">
                <div className="flex gap-2 mb-4">
                  {project.category.map((cat: string) => (
                    <span key={cat} className="text-xs font-mono text-[var(--brand-primary)] px-2 py-1 rounded bg-[var(--brand-primary)]/10 border border-[var(--brand-primary)]/20">
                      {cat}
                    </span>
                  ))}
                </div>
                <h3 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 uppercase">
                  {project.title}
                </h3>
                <p className="text-text-secondary text-lg mb-8 max-w-lg">
                  {project.fullDescription}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.techStack.map((tech: string) => (
                    <span key={tech} className="text-sm font-mono text-text-primary px-3 py-1 rounded-full bg-white/5 border border-white/10">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <a href={project.githubUrl} 
                     onMouseEnter={() => setCursor('hover')} onMouseLeave={() => setCursor('default')}
                     className="px-6 py-3 rounded-full border border-white/20 hover:border-white text-white font-medium flex items-center gap-2 transition-all cursor-none">
                    <Code size={18} /> GitHub
                  </a>
                  {project.liveUrl && (
                    <a href={project.liveUrl} 
                       onMouseEnter={() => setCursor('hover')} onMouseLeave={() => setCursor('default')}
                       className="px-6 py-3 bg-[var(--brand-primary)] text-[var(--bg-primary)] rounded-full hover:bg-white font-medium flex items-center gap-2 transition-all cursor-none shadow-[0_0_20px_rgba(0,240,255,0.3)]">
                      <ExternalLink size={18} /> Live Demo
                    </a>
                  )}
                </div>
              </div>

              <div className="order-1 lg:order-2 w-full aspect-video rounded-xl overflow-hidden glass-card relative group cursor-none"
                   onMouseEnter={() => setCursor('project')} onMouseLeave={() => setCursor('default')}>
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)]/80 to-transparent z-10"></div>
                <img src={project.thumbnailUrl} alt={project.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
              </div>
            </div>
          </div>
        ))}
      </div>



    </section>
  );
};
