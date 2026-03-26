import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { certificates, type Certificate } from '../data/certificates';
import { useCursorStore } from '../stores/useCursorStore';
import { Award, ExternalLink } from 'lucide-react';

export const Certificates: React.FC = () => {
    const containerRef = useRef<HTMLElement>(null);
    const scrollWrapperRef = useRef<HTMLDivElement>(null);
    const setCursor = useCursorStore((state: any) => state.setVariant);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const sections = gsap.utils.toArray('.cert-card');
            
            // Horizontal scroll implementation
            if (window.innerWidth > 768) {
                gsap.to(sections, {
                    xPercent: -100 * (sections.length - 1),
                    ease: "none",
                    scrollTrigger: {
                        trigger: scrollWrapperRef.current,
                        pin: true,
                        scrub: 1,
                        snap: 1 / (sections.length - 1),
                        end: () => "+=" + (scrollWrapperRef.current?.offsetWidth || 0)
                    }
                });
            } else {
                gsap.from(sections, {
                    opacity: 0,
                    y: 50,
                    stagger: 0.2,
                    duration: 0.8,
                    scrollTrigger: { trigger: scrollWrapperRef.current, start: "top 80%" }
                })
            }
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="certificates" ref={containerRef} className="relative w-full bg-bg-secondary py-24 md:py-0 md:pt-24 overflow-hidden">
            <div className="container mx-auto px-6 mb-12 flex justify-center">
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-white uppercase tracking-tight flex items-center justify-center gap-4 cursor-none">
                   <Award className="text-[var(--brand-primary)]" size={40} /> Certificates
                </h2>
            </div>
            
            <div ref={scrollWrapperRef} className="md:h-screen flex flex-col md:flex-row items-center overflow-hidden w-full md:pl-[10vw] gap-8 md:gap-0 px-6 md:px-0">
                {certificates.map((cert: Certificate) => (
                    <div 
                        key={cert.id} 
                        className="cert-card flex-shrink-0 w-full md:w-[60vw] lg:w-[40vw] md:px-4"
                        onMouseEnter={() => setCursor('hover')}
                        onMouseLeave={() => setCursor('default')}
                    >
                        <div className="glass-card rounded-2xl p-8 h-[400px] md:h-[500px] flex flex-col items-center justify-center text-center transform transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_30px_var(--brand-primary)] cursor-none relative overflow-hidden group border border-white/5">
                           {/* Holographic sweep */}
                           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--brand-primary)]/10 to-transparent -translate-x-full group-hover:animate-[holographic_1.5s_ease-in-out_infinite] z-10 pointer-events-none"></div>
                           
                           <Award className="text-text-secondary group-hover:text-[var(--brand-primary)] transition-colors mb-6 z-20" size={64} />
                           
                           <h3 className="text-2xl font-bold text-white mb-4 z-20">{cert.title}</h3>
                           <p className="text-[var(--brand-secondary)] font-mono mb-2 z-20">{cert.issuer}</p>
                           <p className="text-sm text-text-secondary mb-8 z-20">{cert.date}</p>
                           
                           <a href={cert.credentialUrl} className="mt-auto z-20 px-6 py-2 rounded-full border border-white/10 hover:border-[var(--brand-primary)] text-text-primary hover:text-[var(--brand-primary)] font-medium flex items-center gap-2 transition-all">
                               Verify Credential <ExternalLink size={16} />
                           </a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
