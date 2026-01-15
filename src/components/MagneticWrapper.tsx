import { ReactNode, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

interface MagneticWrapperProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  radius?: number;
}

const MagneticWrapper = ({ 
  children, 
  className,
  strength = 0.35, 
  radius = 120 
}: MagneticWrapperProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const element = wrapperRef.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    if (distance < radius) {
      const pull = (1 - distance / radius) * strength;
      element.style.transform = `translate(${deltaX * pull}px, ${deltaY * pull}px)`;
      element.style.transition = 'transform 0.15s ease-out';
    }
  }, [strength, radius]);

  const handleMouseLeave = useCallback(() => {
    const element = wrapperRef.current;
    if (!element) return;
    element.style.transform = 'translate(0px, 0px)';
    element.style.transition = 'transform 0.3s ease-out';
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={cn("inline-block", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};

export default MagneticWrapper;
