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
  
  return (
    <div 
      ref={ref} 
      className={`scroll-animate ${isVisible ? 'visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};
