import type { CSSProperties, MouseEvent, ReactNode } from "react";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface InteractiveSurfaceProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  lift?: number;
  style?: CSSProperties;
  ariaLabel?: string;
}

export function InteractiveSurface({
  children,
  className = "",
  strength = 4,
  lift = 6,
  style,
  ariaLabel,
}: InteractiveSurfaceProps) {
  const ref = useRef<HTMLDivElement>(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const rotateYRaw = useTransform(pointerX, [-0.5, 0.5], [-strength, strength]);
  const rotateXRaw = useTransform(pointerY, [-0.5, 0.5], [strength, -strength]);
  const rotateX = useSpring(rotateXRaw, { stiffness: 320, damping: 28, mass: 0.55 });
  const rotateY = useSpring(rotateYRaw, { stiffness: 320, damping: 28, mass: 0.55 });

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    pointerX.set(x - 0.5);
    pointerY.set(y - 0.5);
    ref.current.style.setProperty("--mx", `${x * 100}%`);
    ref.current.style.setProperty("--my", `${y * 100}%`);
  };

  const reset = () => {
    pointerX.set(0);
    pointerY.set(0);
    ref.current?.style.setProperty("--mx", "50%");
    ref.current?.style.setProperty("--my", "50%");
  };

  return (
    <motion.div
      ref={ref}
      className={`interactive-surface ${className}`.trim()}
      style={{
        ...style,
        rotateX,
        rotateY,
        transformPerspective: 1100,
        transformStyle: "preserve-3d",
        "--mx": "50%",
        "--my": "50%",
      } as never}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      whileHover={{ y: -lift, scale: 1.008 }}
      whileTap={{ scale: 0.992 }}
      transition={{ type: "spring", stiffness: 360, damping: 26 }}
      aria-label={ariaLabel}
    >
      <span className="interactive-sheen" aria-hidden="true" />
      <div className="interactive-content">{children}</div>
    </motion.div>
  );
}
