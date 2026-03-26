import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { education, type Education } from '../data/education';
import { useCursorStore } from '../stores/useCursorStore';
import { GraduationCap } from 'lucide-react';
import { useCountUp } from '../hooks/useCountUp';

export const EducationSection: React.FC = () => {
    const containerRef = useRef<HTMLElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const setCursor = useCursorStore((state: any) => state.setVariant);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Draw central line
            gsap.fromTo(lineRef.current, 
                { scaleY: 0 },
                { 
                    scaleY: 1, 
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 50%",
                        end: "bottom 80%",
                        scrub: 0.5
                    }
                }
            );

            // Timeline cards animation
            gsap.utils.toArray<HTMLDivElement>('.timeline-card').forEach((card, i) => {
                const isLeft = i % 2 !== 0;
                gsap.from(card, {
                    opacity: 0,
                    x: isLeft ? -100 : 100,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 80%",
                        scrub: 0.5
                    }
                });
            });

            // Nodes pop animation
            gsap.utils.toArray<HTMLDivElement>('.timeline-node').forEach(node => {
                gsap.from(node, {
                    scale: 0,
                    opacity: 0,
                    duration: 0.5,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: node,
                        start: "top 75%",
                    }
                });
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="education" ref={containerRef} className="relative w-full bg-bg-primary py-32 overflow-hidden">
            <div className="container mx-auto px-6 max-w-5xl">

                <div className="mb-24 flex justify-center">
                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-white uppercase tracking-tight flex items-center justify-center gap-4 cursor-none">
                       <GraduationCap className="text-[var(--brand-secondary)]" size={40} /> Education
                    </h2>
                </div>

                <div className="relative w-full pb-10">
                    {/* The drawing line */}
                    <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 -ml-[0.5px] bg-white/10">
                        <div ref={lineRef} className="w-full h-full bg-gradient-custom origin-top shadow-[0_0_10px_var(--brand-primary)]"></div>
                    </div>

                    <div className="flex flex-col gap-16 md:gap-32 w-full">
                        {education.map((item: Education, index: number) => (
                            <TimelineItem 
                                key={item.id} 
                                item={item} 
                                index={index}
                                setCursor={setCursor}
                            />
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

const TimelineItem = ({ item, index, setCursor }: { item: Education, index: number, setCursor: any }) => {
    const isLeft = index % 2 !== 0;
    const [isVisible, setIsVisible] = useState(false);
    const pct = (item.gpa / item.maxGpa) * 100;
    const gpaDisplay = useCountUp(item.gpa * 10, 2000, isVisible); // Trick to animate floats

    useEffect(() => {
        ScrollTrigger.create({
            trigger: `#card-${item.id}`,
            start: "top 80%",
            onEnter: () => setIsVisible(true)
        });
    }, [item.id]);

    return (
        <div className={`relative flex items-center justify-between md:justify-normal w-full group ${isLeft ? 'md:flex-row-reverse' : 'md:flex-row'}`} id={`card-${item.id}`}>
            
            <div className="hidden md:block w-5/12"></div>

            {/* Timline Node */}
            <div className="z-20 flex items-center justify-center w-12 h-12 rounded-full absolute left-0 md:left-1/2 -ml-6 border-4 border-[var(--bg-primary)] bg-[var(--brand-secondary)] timeline-node shadow-[0_0_15px_var(--brand-secondary)]">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
            </div>

            <div 
                className={`w-full ml-16 md:ml-0 md:w-5/12 timeline-card glass-card p-6 md:p-8 rounded-2xl border border-white/5 hover:border-[var(--brand-secondary)]/50 transition-colors duration-300 cursor-none relative`}
                onMouseEnter={() => setCursor('hover')}
                onMouseLeave={() => setCursor('default')}
            >
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-1 group-hover:text-[var(--brand-secondary)] transition-colors">{item.degree}</h3>
                        <p className="text-text-secondary font-mono text-sm">{item.institution}</p>
                    </div>
                    <div className="text-sm font-mono text-[var(--brand-primary)] bg-[var(--brand-primary)]/10 px-3 py-1 rounded">
                        {item.date}
                    </div>
                </div>

                <div className="flex items-center gap-6 mb-6 pt-4 border-t border-white/5">
                    {/* SVG Circular Progress GPA */}
                    <div className="relative w-16 h-16 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                            <path 
                                className="text-white/10" 
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="3" 
                            />
                            <path 
                                className="text-[var(--brand-secondary)] transition-all duration-[2s] ease-out" 
                                strokeDasharray={`${isVisible ? pct : 0}, 100`}
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="3" 
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-xs">
                            <span className="font-bold text-white leading-none">{(gpaDisplay / 10).toFixed(1)}</span>
                            <span className="text-[8px] text-text-secondary">/{item.maxGpa.toFixed(1)}</span>
                        </div>
                    </div>
                    
                    <div className="flex-1">
                        <p className="text-sm text-text-secondary mb-2">Key Courses</p>
                        <div className="flex flex-wrap gap-2">
                           {item.courses.slice(0, 3).map(course => (
                               <span key={course} className="text-[10px] uppercase tracking-wider font-mono px-2 py-1 rounded bg-white/5 text-text-primary">
                                   {course}
                               </span>
                           ))}
                        </div>
                    </div>
                </div>

                <p className="text-sm text-[var(--brand-primary)] mt-2">
                    🏆 {item.achievements}
                </p>
            </div>

        </div>
    );
};
