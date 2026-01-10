import { useEffect, useRef, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
  shape: "circle" | "triangle" | "square" | "hexagon";
}

export const FuturisticBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const animationRef = useRef<number>();

  useEffect(() => {
    const shapes: Particle["shape"][] = ["circle", "triangle", "square", "hexagon"];
    const initialParticles: Particle[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 40 + 20,
      speedX: (Math.random() - 0.5) * 0.02,
      speedY: (Math.random() - 0.5) * 0.02,
      opacity: Math.random() * 0.08 + 0.02,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 0.3,
      shape: shapes[Math.floor(Math.random() * shapes.length)],
    }));
    setParticles(initialParticles);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const animate = () => {
      setParticles((prev) =>
        prev.map((p) => ({
          ...p,
          x: ((p.x + p.speedX + 100) % 100),
          y: ((p.y + p.speedY + 100) % 100),
          rotation: p.rotation + p.rotationSpeed,
        }))
      );
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  const getShapePath = (shape: Particle["shape"]) => {
    switch (shape) {
      case "triangle":
        return "M12 2L22 20H2L12 2Z";
      case "square":
        return "M4 4H20V20H4V4Z";
      case "hexagon":
        return "M12 2L21.5 7V17L12 22L2.5 17V7L12 2Z";
      default:
        return "";
    }
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {/* Parallax gradient layers */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(ellipse 80% 50% at ${50 + (mousePos.x / window.innerWidth - 0.5) * 10}% ${30 + (mousePos.y / window.innerHeight - 0.5) * 10}%, hsl(var(--primary) / 0.08), transparent)`,
          transform: `translateY(${scrollY * 0.1}px)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at ${70 + (mousePos.x / window.innerWidth - 0.5) * 15}% ${60 + (mousePos.y / window.innerHeight - 0.5) * 15}%, hsl(var(--primary) / 0.06), transparent 50%)`,
          transform: `translateY(${scrollY * 0.05}px)`,
        }}
      />

      {/* Floating geometric particles */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="particleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        {particles.map((p) => {
          const parallaxOffset = scrollY * (0.02 + p.id * 0.005);
          const yPos = ((p.y + parallaxOffset * 0.01) % 100);
          
          return (
            <g
              key={p.id}
              style={{
                transform: `translate(${p.x}%, ${yPos}%) rotate(${p.rotation}deg)`,
                transformOrigin: "center",
                opacity: p.opacity,
              }}
            >
              {p.shape === "circle" ? (
                <circle
                  cx={p.size / 2}
                  cy={p.size / 2}
                  r={p.size / 2}
                  fill="none"
                  stroke="url(#particleGradient)"
                  strokeWidth="1"
                />
              ) : (
                <path
                  d={getShapePath(p.shape)}
                  fill="none"
                  stroke="url(#particleGradient)"
                  strokeWidth="1"
                  style={{
                    transform: `scale(${p.size / 24})`,
                    transformOrigin: "center",
                  }}
                />
              )}
            </g>
          );
        })}
      </svg>

      {/* Glowing cursor trail */}
      <div
        className="glow-orb"
        style={{
          left: mousePos.x,
          top: mousePos.y,
        }}
      />

      {/* Grid overlay */}
      <div className="absolute inset-0 futuristic-grid opacity-[0.03]" />
    </div>
  );
};
