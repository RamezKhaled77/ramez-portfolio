import { useEffect, useRef, ReactNode } from "react";

type AnimationVariant = "fade-up" | "fade-down" | "fade-left" | "fade-right" | "scale" | "blur";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: AnimationVariant;
  duration?: number;
}

const ScrollReveal = ({ 
  children, 
  className = "", 
  delay = 0,
  variant = "fade-up",
  duration = 700
}: ScrollRevealProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const currentScrollY = window.scrollY;
          const isScrollingDown = currentScrollY > lastScrollY.current;
          lastScrollY.current = currentScrollY;

          if (entry.isIntersecting && isScrollingDown) {
            setTimeout(() => {
              entry.target.classList.add("scroll-reveal-visible");
              entry.target.classList.remove("scroll-reveal-hidden");
            }, delay);
          } else if (entry.isIntersecting && !entry.target.classList.contains("scroll-reveal-visible")) {
            // First load - show immediately without animation direction check
            entry.target.classList.add("scroll-reveal-visible");
            entry.target.classList.remove("scroll-reveal-hidden");
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -100px 0px" }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div 
      ref={elementRef} 
      className={`scroll-reveal scroll-reveal-${variant} ${className}`}
      style={{ 
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
