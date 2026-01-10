import { useEffect, useRef, useState } from "react";

export const FuturisticBackground = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const gradientRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const phaseRef = useRef(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || !gradientRef.current) return;

    // Ultra-slow gradient movement - measured in minutes
    const animate = () => {
      phaseRef.current += 0.00008; // Very slow phase increment
      
      if (gradientRef.current) {
        const x1 = 30 + Math.sin(phaseRef.current) * 15;
        const y1 = 20 + Math.cos(phaseRef.current * 0.7) * 10;
        const x2 = 70 + Math.cos(phaseRef.current * 0.5) * 20;
        const y2 = 80 + Math.sin(phaseRef.current * 0.8) * 15;

        gradientRef.current.style.background = `
          radial-gradient(ellipse 100% 60% at ${x1}% ${y1}%, hsl(var(--primary) / 0.04) 0%, transparent 60%),
          radial-gradient(ellipse 80% 50% at ${x2}% ${y2}%, hsl(var(--primary) / 0.03) 0%, transparent 50%)
        `;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {/* Slow-moving ambient gradient - barely perceptible */}
      <div
        ref={gradientRef}
        className="absolute inset-0 will-change-[background]"
        style={{
          background: `
            radial-gradient(ellipse 100% 60% at 30% 20%, hsl(var(--primary) / 0.04) 0%, transparent 60%),
            radial-gradient(ellipse 80% 50% at 70% 80%, hsl(var(--primary) / 0.03) 0%, transparent 50%)
          `,
        }}
      />

      {/* Secondary ultra-subtle layer */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          background: `linear-gradient(
            135deg,
            hsl(var(--primary) / 0.1) 0%,
            transparent 40%,
            transparent 60%,
            hsl(var(--primary) / 0.08) 100%
          )`,
        }}
      />
    </div>
  );
};
