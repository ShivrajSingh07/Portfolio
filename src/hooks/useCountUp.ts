import { useState, useEffect } from 'react';

export const useCountUp = (end: number, duration: number = 2000, startLoading: boolean = false) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startLoading) return;
    
    let startTime: number | null = null;
    let animationFrame: number;

    const easeOutQuart = (x: number): number => 1 - Math.pow(1 - x, 4);

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percent = Math.min(progress / duration, 1);
      
      setCount(Math.floor(end * easeOutQuart(percent)));

      if (progress < duration) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, startLoading]);

  return count;
};
