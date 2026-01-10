import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface ScrollSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const ScrollSection = ({ 
  children, 
  className = "",
  delay = 0 
}: ScrollSectionProps) => {
  const { ref, isVisible } = useScrollAnimation(0.15);
  
  // Stagger delay: 60-120ms range as per spec
  const staggerDelay = Math.min(delay, 360); // Cap at reasonable max
  
  return (
    <div 
      ref={ref} 
      className={`scroll-reveal ${isVisible ? 'is-visible' : ''} ${className}`}
      style={{ 
        transitionDelay: `${staggerDelay}ms`,
      }}
    >
      {children}
    </div>
  );
};
