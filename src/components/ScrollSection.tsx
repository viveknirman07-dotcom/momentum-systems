import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useRef, useEffect, useState, useMemo } from "react";

interface ScrollSectionProps {
  children: React.ReactNode;
  className?: string;
  /** Stagger delay in units (1 unit = 80ms) */
  delay?: number;
  /** Depth layer for timing-based depth illusion: 'front', 'mid', 'back' */
  depth?: 'front' | 'mid' | 'back';
  /** Reveal type: 'fade' (default), 'clip', 'clip-left' */
  reveal?: 'fade' | 'clip' | 'clip-left';
}

export const ScrollSection = ({ 
  children, 
  className = "",
  delay = 0,
  depth = 'mid',
  reveal = 'fade'
}: ScrollSectionProps) => {
  const { ref, isVisible } = useScrollAnimation(0.08);
  const [scrollInfluence, setScrollInfluence] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  
  // Subtle scroll-reactive layer (Layer 1)
  // Creates perceived depth through micro-movement
  useEffect(() => {
    const element = elementRef.current;
    if (!element || !isVisible) return;
    
    let rafId: number;
    
    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Calculate position influence (0-1) based on viewport position
        const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
        const influence = Math.max(0, Math.min(1, progress));
        setScrollInfluence(influence);
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isVisible]);
  
  // Depth-based micro-parallax (very subtle, 2-4px max)
  const depthMultiplier = useMemo(() => {
    switch (depth) {
      case 'front': return 0;
      case 'mid': return 2;
      case 'back': return 4;
      default: return 2;
    }
  }, [depth]);
  
  // Calculate stagger delay in ms (80ms per unit)
  const staggerDelay = delay * 80;
  
  // Reveal class based on type
  const revealClass = reveal === 'clip' 
    ? 'reveal-clip' 
    : reveal === 'clip-left' 
      ? 'reveal-clip-left' 
      : 'scroll-animate';
  
  // Depth class
  const depthClass = `depth-${depth}`;
  
  // Subtle scroll-linked transform for depth perception
  const scrollTransform = isVisible 
    ? `translateY(${(1 - scrollInfluence) * depthMultiplier}px)` 
    : undefined;
  
  return (
    <div 
      ref={(node) => {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        (elementRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }}
      className={`${revealClass} ${depthClass} ${isVisible ? 'visible' : ''} ${className}`}
      style={{ 
        transitionDelay: `${staggerDelay}ms`,
        transform: scrollTransform
      }}
    >
      {children}
    </div>
  );
};
