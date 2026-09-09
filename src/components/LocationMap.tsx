import type React from "react";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

interface LocationMapProps {
  location?: string;
  coordinates?: string;
  className?: string;
}

export function LocationMap({
  location = "Institute of Engineering & Technology (IET), DDUGU",
  coordinates = "Gorakhpur · Uttar Pradesh · India",
  className = "",
}: LocationMapProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-80, 80], [5, -5]);
  const rotateY = useTransform(mouseX, [-80, 80], [-5, 5]);

  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={containerRef}
      className={`location-map ${className}`.trim()}
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={() => setIsExpanded(v => !v)}
      role="button"
      tabIndex={0}
      aria-expanded={isExpanded}
      aria-label={`${location}. Click to ${isExpanded ? "collapse" : "expand"} the map.`}
      onKeyDown={e => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setIsExpanded(v => !v);
        }
      }}
    >
      <motion.div
        className="location-map-card"
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
        }}
        animate={{
          width: isExpanded ? "100%" : "86%",
          height: isExpanded ? 430 : 285,
        }}
        transition={{ type: "spring", stiffness: 360, damping: 34 }}
      >
        <div className="location-map-glow" />

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="location-map-expanded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, delay: 0.05 }}
            >
              <svg className="location-map-roads" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                <motion.line x1="0" y1="35" x2="100" y2="35" className="road-main" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.7, delay: 0.14 }} />
                <motion.line x1="0" y1="66" x2="100" y2="66" className="road-main" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.7, delay: 0.22 }} />
                <motion.line x1="30" y1="0" x2="30" y2="100" className="road-mid" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.55, delay: 0.3 }} />
                <motion.line x1="70" y1="0" x2="70" y2="100" className="road-mid" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.55, delay: 0.38 }} />
                {[20, 50, 80].map((y, i) => (
                  <motion.line key={`h-${i}`} x1="0" y1={y} x2="100" y2={y} className="road-minor" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.45, delay: 0.48 + i * 0.06 }} />
                ))}
                {[15, 45, 55, 85].map((x, i) => (
                  <motion.line key={`v-${i}`} x1={x} y1="0" x2={x} y2="100" className="road-minor" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.45, delay: 0.56 + i * 0.06 }} />
                ))}
              </svg>

              <motion.div className="map-building building-a" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.38 }} />
              <motion.div className="map-building building-b" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.46 }} />
              <motion.div className="map-building building-c" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.54 }} />
              <motion.div className="map-building building-d" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.43 }} />
              <motion.div className="map-building building-e" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }} />

              <motion.div
                className="location-map-pin"
                initial={{ scale: 0, y: -18 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 420, damping: 20, delay: 0.22 }}
              >
                <svg width="38" height="38" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Z" fill="currentColor" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div className="location-map-grid" animate={{ opacity: isExpanded ? 0 : 1 }} transition={{ duration: 0.25 }} />

        <div className="location-map-content">
          <div className="location-map-topline">
            <motion.svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="location-map-icon"
              animate={{
                opacity: isExpanded ? 0 : 1,
                filter: isHovered ? "drop-shadow(0 0 10px rgba(255,213,41,.62))" : "drop-shadow(0 0 4px rgba(255,213,41,.25))",
              }}
            >
              <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
              <line x1="9" x2="9" y1="3" y2="18" />
              <line x1="15" x2="15" y1="6" y2="21" />
            </motion.svg>

            <motion.div className="location-map-status" animate={{ scale: isHovered ? 1.04 : 1 }}>
              <i />
              <span>Campus</span>
            </motion.div>
          </div>

          <div className="location-map-bottom">
            <motion.h3 animate={{ x: isHovered ? 4 : 0 }} transition={{ type: "spring", stiffness: 380, damping: 25 }}>
              {location}
            </motion.h3>
            <AnimatePresence>
              {isExpanded && (
                <motion.p initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22 }}>
                  {coordinates}
                </motion.p>
              )}
            </AnimatePresence>
            <motion.div className="location-map-underline" initial={{ scaleX: 0.24 }} animate={{ scaleX: isHovered || isExpanded ? 1 : 0.24 }} transition={{ duration: 0.35 }} />
          </div>
        </div>
      </motion.div>

      <motion.p className="location-map-hint" initial={{ opacity: 0 }} animate={{ opacity: isHovered && !isExpanded ? 1 : 0, y: isHovered ? 0 : 4 }} transition={{ duration: 0.18 }}>
        Click to expand
      </motion.p>
    </motion.div>
  );
}
