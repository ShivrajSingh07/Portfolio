import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useLoaderStore } from '../stores/useLoaderStore';
import { useCursorStore } from '../stores/useCursorStore';
import { useScrambleText } from '../hooks/useScrambleText';
import { Canvas } from '@react-three/fiber';
import { NeuralBrain } from '../components/canvas/NeuralBrain';
import { ArrowRight, Code, Briefcase, Mail } from 'lucide-react';

export const Hero: React.FC = () => {
    const { isLoaded } = useLoaderStore();
    const setCursor = useCursorStore((state: any) => state.setVariant);
    const containerRef = useRef<HTMLElement>(null);
    const textGroupRef = useRef<HTMLDivElement>(null);
    
    const [isHoverName, setIsHoverName] = useState(false);
    const unscrambledName = useScrambleText("SHIVRAJ S. NATHAWAT", isHoverName, 600);

    useEffect(() => {
        if (!isLoaded || !textGroupRef.current) return;
        
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();
            // Staggered sequence defined in spec
            tl.from('.hero-greeting', { opacity: 0, x: -20, duration: 0.6, ease: "power2.out" })
              .from('.hero-name-char', { 
                  opacity: 0, 
                  y: -50, 
                  duration: 0.8, 
                  stagger: 0.05, 
                  ease: "bounce.out" 
              }, "-=0.2")
              .from('.hero-tagline', { opacity: 0, x: -20, duration: 0.8 }, "-=0.4")
              .from('.hero-intro', { opacity: 0, duration: 1 }, "-=0.4")
              .from('.hero-cta', { opacity: 0, scale: 0, duration: 0.8, stagger: 0.2, ease: "elastic.out(1, 0.5)" }, "-=0.6")
              .from('.hero-social', { opacity: 0, y: 20, duration: 0.5, stagger: 0.1 }, "-=0.4");
        }, textGroupRef);
        
        return () => ctx.revert();
    }, [isLoaded]);

    return (
        <section id="hero" ref={containerRef} className="relative w-full h-screen flex flex-col md:flex-row items-center justify-center pt-20 px-6 max-w-7xl mx-auto">
            
            {/* Left side text */}
            <div ref={textGroupRef} className="w-full md:w-1/2 z-20 flex flex-col justify-center h-full">
                <div className="hero-greeting font-mono text-brand-primary text-lg mb-4 flex items-center">
                    {`> Hello, I'm`}
                    <span className="inline-block w-2.5 h-5 bg-brand-primary ml-2 animate-pulse"></span>
                </div>
                
                <h1 
                    className="text-5xl md:text-7xl lg:text-7xl xl:text-8xl font-heading font-bold text-white mb-6 uppercase tracking-tight cursor-none"
                    onMouseEnter={() => { setIsHoverName(true); setCursor('hover'); }}
                    onMouseLeave={() => { setIsHoverName(false); setCursor('default'); }}
                >
                    {isHoverName ? (
                        <span className="text-brand-primary break-words">{unscrambledName}</span>
                    ) : (
                        "SHIVRAJ S. NATHAWAT".split(' ').map((word, wordIndex) => (
                            <span key={wordIndex} className="inline-block whitespace-nowrap mr-3 md:mr-5">
                                {word.split('').map((char, charIndex) => (
                                    <span key={charIndex} className="hero-name-char inline-block">{char}</span>
                                ))}
                            </span>
                        ))
                    )}
                </h1>
                
                <div className="hero-tagline flex flex-wrap items-center gap-3 text-brand-secondary font-mono text-sm md:text-base mb-8">
                    <span>Data Scientist</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse hidden md:block"></span>
                    <span className="hidden md:block">ML Engineer</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse hidden lg:block"></span>
                    <span className="hidden lg:block">Web Developer</span>
                </div>
                
                <p className="hero-intro text-text-secondary md:text-lg mb-12 max-w-lg leading-relaxed mix-blend-difference">
                    Transforming raw data into actionable intelligence. I build predictive models, craft visualizations, and engineer ML pipelines that drive real-world decisions.
                </p>
                
                <div className="flex flex-wrap gap-4 mb-12 relative z-30">
                    <button 
                        onMouseEnter={() => setCursor('hover')}
                        onMouseLeave={() => setCursor('default')}
                        className="hero-cta relative overflow-hidden group px-8 py-3 rounded-full border border-[var(--brand-primary)] cursor-none"
                        onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                        <span className="absolute inset-0 bg-gradient-custom opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        <span className="relative z-10 font-bold group-hover:text-[var(--bg-primary)] transition-colors flex items-center gap-2">
                            Explore My Work <ArrowRight size={16} />
                        </span>
                    </button>
                </div>
                
                <div className="flex gap-4 relative z-30">
                    {[
                        { Icon: Code, href: 'https://github.com/shivrajsingh07' },
                        { Icon: Briefcase, href: 'https://linkedin.com/in/shivraj-singh-nathawat/' },
                        { Icon: Mail, href: 'mailto:shivrajsingh2459@gmail.com' }
                    ].map(({Icon, href}, i) => (
                        <a 
                            key={i} 
                            href={href} 
                            className="hero-social w-12 h-12 rounded-full glass flex items-center justify-center text-text-secondary hover:text-[var(--brand-primary)] hover:border-[var(--brand-primary)] hover:-translate-y-1 transition-all duration-300 cursor-none"
                            onMouseEnter={() => setCursor('hover')}
                            onMouseLeave={() => setCursor('default')}
                        >
                            <Icon size={20} />
                        </a>
                    ))}
                </div>
            </div>
            
            {/* Right side 3D Canvas */}
            <div 
                className="absolute top-0 right-0 w-full h-[50vh] md:h-full md:w-1/2 md:relative z-10 touch-none pointer-events-auto cursor-none opacity-40 md:opacity-100"
                onMouseEnter={() => setCursor('3d')}
                onMouseLeave={() => setCursor('default')}
            >
                <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 1.5]}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} color="#00f0ff" />
                    <pointLight position={[-10, -10, -10]} intensity={0.5} color="#7b2ff7" />
                    <NeuralBrain />
                </Canvas>
            </div>
            
            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-50 animate-bounce cursor-none pointer-events-none z-10 hidden md:flex">
                <span className="text-xs uppercase tracking-widest text-[#888899] font-mono mb-2">Scroll</span>
                <div className="w-[1px] h-8 bg-gradient-to-b from-[#00f0ff] to-transparent"></div>
            </div>
        </section>
    );
};
