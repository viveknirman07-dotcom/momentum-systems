import { useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";

interface ParallaxOptions {
  speed?: number;
  direction?: "up" | "down";
  offset?: [string, string];
}

export const useParallax = (options: ParallaxOptions = {}) => {
  const { speed = 0.5, direction = "up", offset = ["start end", "end start"] } = options;
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as any,
  });
  
  const multiplier = direction === "up" ? -1 : 1;
  const y = useTransform(scrollYProgress, [0, 1], [100 * speed * multiplier, -100 * speed * multiplier]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);
  
  return { ref, y, opacity, scale, scrollYProgress };
};

export const useHeroParallax = () => {
  const { scrollY } = useScroll();
  
  // Different speeds for different elements create depth
  const titleY = useTransform(scrollY, [0, 500], [0, 50]);
  const subtitleY = useTransform(scrollY, [0, 500], [0, 75]);
  const ctaY = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.95]);
  
  return { titleY, subtitleY, ctaY, opacity, scale };
};
