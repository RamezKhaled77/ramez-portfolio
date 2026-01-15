import { useRef, useCallback } from "react";

interface MagneticOptions {
  strength?: number;
  radius?: number;
}

export const useMagnetic = (options: MagneticOptions = {}) => {
  const { strength = 0.3, radius = 100 } = options;
  const elementRef = useRef<HTMLElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const element = elementRef.current;
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
    }
  }, [strength, radius]);

  const handleMouseLeave = useCallback(() => {
    const element = elementRef.current;
    if (!element) return;
    element.style.transform = 'translate(0px, 0px)';
  }, []);

  return {
    ref: elementRef,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
  };
};
