import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useRef, useEffect, useState } from "react";

interface ScrollSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Animation variant: 'fade' (default), 'slide-up', 'slide-left', 'slide-right' */
  variant?: 'fade' | 'slide-up' | 'slide-left' | 'slide-right';
}

export const ScrollSection = ({ 
  children, 
  className = "",
  delay = 0,
  variant = 'fade'
}: ScrollSectionProps) => {
  const { ref, isVisible } = useScrollAnimation(0.12);
  const [scrollProgress, setScrollProgress] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  
  // Scroll-linked subtle parallax effect
  useEffect(() => {
    const element = elementRef.current;
    if (!element || !isVisible) return;
    
    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate progress from 0 to 1 as element moves through viewport
      const progress = Math.max(0, Math.min(1, 
        (windowHeight - rect.top) / (windowHeight + rect.height)
      ));
      setScrollProgress(progress);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible]);
  
  // Subtle scroll-linked transform (very restrained)
  const scrollTransform = isVisible 
    ? `translateY(${(1 - scrollProgress) * 4}px)` 
    : undefined;
  
  return (
    <div 
      ref={(node) => {
        // Merge refs
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        (elementRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }}
      className={`scroll-animate ${isVisible ? 'visible' : ''} ${className}`}
      style={{ 
        transitionDelay: `${delay}ms`,
        transform: scrollTransform
      }}
    >
      {children}
    </div>
  );
};
