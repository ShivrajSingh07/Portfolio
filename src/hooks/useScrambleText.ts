import { useState, useEffect } from 'react';

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+';

export const useScrambleText = (originalText: string, isHovering: boolean, duration: number = 800) => {
  const [displayText, setDisplayText] = useState(originalText);

  useEffect(() => {
    if (!isHovering) {
      setDisplayText(originalText);
      return;
    }

    let iteration = 0;
    const intervalTime = 40; // ms
    const maxIterations = duration / intervalTime;

    const interval = setInterval(() => {
      setDisplayText(originalText.split('').map((char, index) => {
        if (char === ' ') return ' ';
        if (index < iteration) {
          return originalText[index];
        }
        return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
      }).join(''));

      if (iteration >= originalText.length) {
        clearInterval(interval);
        setDisplayText(originalText);
      }
      
      iteration += (originalText.length / maxIterations);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [isHovering, originalText, duration]);

  return displayText;
};
