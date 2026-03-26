import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Mail, MapPin, Copy, Check } from 'lucide-react';
import { useCursorStore } from '../stores/useCursorStore';


export const Contact: React.FC = () => {
    const [emailCopied, setEmailCopied] = useState(false);
    const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const containerRef = useRef<HTMLElement>(null);
    const setCursor = useCursorStore((state: any) => state.setVariant);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.contact-anim', {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%"
                }
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    const copyEmail = () => {
        navigator.clipboard.writeText('shivrajsingh2459@gmail.com');
        setEmailCopied(true);
        setTimeout(() => setEmailCopied(false), 2000);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormStatus('loading');

        const formData = new FormData(e.currentTarget);
        formData.append('access_key', 'ffaa9977-14c2-458d-ad0e-a3defbf4cce0');

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();

            if (data.success) {
                setFormStatus('success');
                (e.target as HTMLFormElement).reset();
                setTimeout(() => setFormStatus('idle'), 4000);
            } else {
                setFormStatus('error');
                setTimeout(() => setFormStatus('idle'), 4000);
            }
        } catch {
            setFormStatus('error');
            setTimeout(() => setFormStatus('idle'), 4000);
        }
    };

    return (
        <section id="contact" ref={containerRef} className="relative w-full py-32 bg-bg-secondary overflow-hidden">
            <div className="absolute inset-0 grid-bg opacity-30"></div>
            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                
                <div className="mb-20">
                    <h2 className="text-5xl md:text-7xl font-heading font-bold text-white uppercase tracking-tight flex items-center gap-4 contact-anim cursor-none">
                       Get In Touch <span className="text-[var(--brand-primary)]">.</span>
                    </h2>
                </div>

                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Left Column - Info & Globe */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-between">
                        <div className="space-y-8 mb-12">
                            <div className="contact-anim">
                                <p className="text-text-secondary font-mono text-sm mb-2">Ready to collaborate?</p>
                                <p className="text-xl md:text-2xl text-white max-w-md">
                                    I am always open to discussing data science, machine learning projects, or exciting opportunities.
                                </p>
                            </div>
                            
                            <div 
                                onClick={copyEmail}
                                onMouseEnter={() => setCursor('hover', 'COPY')}
                                onMouseLeave={() => setCursor('default')}
                                className="contact-anim glass-card p-4 rounded-xl flex items-center justify-between cursor-none hover:border-[var(--brand-primary)]/50 transition-colors group w-fit pr-6"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-[var(--brand-primary)]/10 flex items-center justify-center text-[var(--brand-primary)]">
                                        <Mail size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-text-secondary font-mono uppercase mb-1">Email</p>
                                        <p className="text-white font-medium">shivrajsingh2459@gmail.com</p>
                                    </div>
                                </div>
                                <div className="ml-8 text-text-secondary group-hover:text-white transition-colors">
                                    {emailCopied ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
                                </div>
                            </div>
                            
                            <div className="contact-anim flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <p className="text-xs text-text-secondary font-mono uppercase mb-1">Location</p>
                                    <p className="text-white font-medium">Jaipur, Rajasthan</p>
                                </div>
                            </div>
                        </div>

                        {/* India Map Visualization */}
                        <div 
                            className="contact-anim w-full h-[300px] border border-[var(--brand-primary)]/20 rounded-2xl overflow-hidden glass cursor-none relative flex flex-col items-center justify-center bg-black/40"
                            onMouseEnter={() => setCursor('hover', 'LOCATE')}
                            onMouseLeave={() => setCursor('default')}
                        >
                            <img 
                                src="/india.png" 
                                alt="Holographic Map of India" 
                                className="h-full w-full object-cover opacity-80 mix-blend-screen"
                            />
                            
                            {/* Jaipur Location Marker - Positioning shifted slightly right */}
                            <div className="absolute top-[34%] left-[32%] md:left-[32%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group">
                                <div className="relative">
                                    <div className="w-5 h-5 bg-[var(--brand-primary)] rounded-full shadow-[0_0_20px_var(--brand-primary)] z-10 relative"></div>
                                    <div className="absolute top-0 left-0 w-5 h-5 bg-[var(--brand-primary)] rounded-full animate-ping opacity-75"></div>
                                </div>
                                <div className="mt-2 bg-black/80 backdrop-blur-md border border-[var(--brand-primary)]/30 px-3 py-1 rounded text-xs text-white font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                                    {'>'} Jaipur, Rajasthan
                                </div>
                            </div>

                            <div className="absolute bottom-4 left-4 text-[10px] font-mono text-[var(--brand-primary)] uppercase tracking-widest pointer-events-none flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-primary)] animate-pulse"></span>
                                Base of Operations
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Form */}
                    <div className="w-full lg:w-1/2 contact-anim">
                        <form onSubmit={handleSubmit} className="glass-card p-8 md:p-10 rounded-2xl flex flex-col gap-6 relative">
                            <h3 className="text-2xl font-bold text-white mb-2">Send a Message</h3>
                            
                            <div className="relative group cursor-none" onMouseEnter={() => setCursor('hover')} onMouseLeave={() => setCursor('default')}>
                                <input type="text" id="name" name="name" required placeholder=" " 
                                    className="peer w-full bg-transparent border-b border-white/20 px-0 py-3 text-white focus:outline-none focus:border-[var(--brand-primary)] transition-colors placeholder-transparent cursor-none" 
                                />
                                <label htmlFor="name" className="absolute left-0 top-3 text-text-secondary text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[var(--brand-primary)] peer-valid:-top-4 peer-valid:text-xs pointer-events-none">
                                    Your Name
                                </label>
                            </div>
                            
                            <div className="relative group cursor-none" onMouseEnter={() => setCursor('hover')} onMouseLeave={() => setCursor('default')}>
                                <input type="email" id="email" name="email" required placeholder=" " 
                                    className="peer w-full bg-transparent border-b border-white/20 px-0 py-3 text-white focus:outline-none focus:border-[var(--brand-primary)] transition-colors placeholder-transparent cursor-none" 
                                />
                                <label htmlFor="email" className="absolute left-0 top-3 text-text-secondary text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[var(--brand-primary)] peer-valid:-top-4 peer-valid:text-xs pointer-events-none">
                                    Your Email
                                </label>
                            </div>
                            
                            <div className="relative group cursor-none" onMouseEnter={() => setCursor('hover')} onMouseLeave={() => setCursor('default')}>
                                <textarea id="message" name="message" required placeholder=" " rows={5}
                                    className="peer w-full bg-transparent border-b border-white/20 px-0 py-3 text-white focus:outline-none focus:border-[var(--brand-primary)] transition-colors placeholder-transparent resize-none cursor-none" 
                                ></textarea>
                                <label htmlFor="message" className="absolute left-0 top-3 text-text-secondary text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[var(--brand-primary)] peer-valid:-top-4 peer-valid:text-xs pointer-events-none">
                                    Message
                                </label>
                            </div>
                            
                            <button 
                                type="submit" 
                                disabled={formStatus === 'loading' || formStatus === 'success'}
                                onMouseEnter={() => setCursor('hover')} 
                                onMouseLeave={() => setCursor('default')}
                                className={`mt-4 w-full py-4 px-6 rounded-full font-bold transition-all duration-300 flex items-center justify-center gap-2 cursor-none
                                    ${formStatus === 'success' 
                                        ? 'bg-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.4)] border border-green-400' 
                                        : formStatus === 'error'
                                        ? 'bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)] border border-red-400'
                                        : 'bg-gradient-custom text-[var(--bg-primary)] hover:shadow-[0_0_20px_rgba(0,240,255,0.4)]'
                                    }
                                `}
                            >
                                {formStatus === 'idle' && <span>Send Message <Mail size={16} className="inline-block ml-1" /></span>}
                                {formStatus === 'loading' && <span className="animate-pulse">Sending...</span>}
                                {formStatus === 'success' && <span>✓ Message Sent!</span>}
                                {formStatus === 'error' && <span>✕ Failed. Try again.</span>}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};
