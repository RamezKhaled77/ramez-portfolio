import { useState, useEffect } from "react";

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const mainContainer = document.querySelector('.snap-y');
    
    const handleScroll = () => {
      const container = mainContainer || document.documentElement;
      const scrollTop = mainContainer?.scrollTop || window.scrollY;
      const scrollHeight = (mainContainer?.scrollHeight || document.documentElement.scrollHeight) - window.innerHeight;
      const scrollProgress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setProgress(Math.min(scrollProgress, 100));
    };

    mainContainer?.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      mainContainer?.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-1 bg-border/30">
      <div 
        className="h-full bg-gradient-to-r from-primary via-primary to-accent transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
      {/* Glow effect */}
      <div 
        className="absolute top-0 h-full bg-primary/50 blur-sm transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ScrollProgress;