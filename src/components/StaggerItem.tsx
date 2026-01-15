import { ReactNode, useEffect, useRef, useState } from "react";

interface StaggerItemProps {
  children: ReactNode;
  index: number;
  className?: string;
  baseDelay?: number;
  staggerDelay?: number;
}

const StaggerItem = ({ 
  children, 
  index, 
  className = "",
  baseDelay = 0,
  staggerDelay = 100
}: StaggerItemProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={elementRef}
      className={`transition-all duration-700 ease-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0) scale(1)" : "translateY(30px) scale(0.95)",
        transitionDelay: isVisible ? `${baseDelay + index * staggerDelay}ms` : "0ms",
      }}
    >
      {children}
    </div>
  );
};

export default StaggerItem;