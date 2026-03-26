import React, { useEffect } from 'react';
import { Navbar } from '../components/ui/Navbar';
import { MobileMenu } from '../components/ui/MobileMenu';
import { Footer } from '../components/ui/Footer';
import { Preloader } from '../components/ui/Preloader';
import { CustomCursor } from '../components/ui/CustomCursor';
import { ScrollProgress } from '../components/ui/ScrollProgress';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
      const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
      let konamiIndex = 0;

      const keydownHandler = (e: KeyboardEvent) => {
          if (e.key === konamiCode[konamiIndex]) {
              konamiIndex++;
              if (konamiIndex === konamiCode.length) {
                  document.documentElement.style.fontFamily = '"Comic Sans MS", "Comic Sans", cursive';
                  setTimeout(() => alert("Just kidding 😄"), 100);
                  setTimeout(() => {
                      document.documentElement.style.fontFamily = '';
                  }, 5000);
                  konamiIndex = 0;
              }
          } else {
              konamiIndex = 0;
          }
      };
      
      window.addEventListener('keydown', keydownHandler);
      return () => window.removeEventListener('keydown', keydownHandler);
  }, []);

  return (
    <>
      <ScrollProgress />
      <Preloader />
      <CustomCursor />
      <Navbar />
      <MobileMenu />
      <main className="w-full min-h-screen bg-bg-primary relative z-10">
        <div className="grid-bg pointer-events-none" />
        {children}
      </main>
      <Footer />
    </>
  );
};
