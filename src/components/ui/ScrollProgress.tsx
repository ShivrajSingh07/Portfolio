import React, { useEffect, useState } from 'react';

export const ScrollProgress: React.FC = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const updateProgress = () => {
            const scrollPx = document.documentElement.scrollTop;
            const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            setProgress((scrollPx / winHeightPx) * 100);
        };
        
        window.addEventListener('scroll', updateProgress);
        return () => window.removeEventListener('scroll', updateProgress);
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full h-[3px] z-[9999] pointer-events-none">
            <div 
                className="h-full bg-gradient-custom shadow-[0_0_10px_var(--brand-primary)] transition-all duration-75"
                style={{ width: `${progress}%` }}
            ></div>
        </div>
    );
};
