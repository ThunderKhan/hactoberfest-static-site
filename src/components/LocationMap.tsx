import type React from "react";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

interface LocationMapProps {
  location?: string;
  coordinates?: string;
  className?: string;
}

const horizontalRoads = [18, 35, 52, 68, 84];
const verticalRoads = [14, 31, 48, 67, 84];

export function LocationMap({
  location = "Institute of Engineering & Technology (IET), DDUGU",
  coordinates = "Gorakhpur · Uttar Pradesh · India",
  className = "",
}: LocationMapProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-90, 90], [5.5, -5.5]);
  const rotateY = useTransform(mouseX, [-90, 90], [-5.5, 5.5]);
  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (reduceMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - (rect.left + rect.width / 2));
    mouseY.set(e.clientY - (rect.top + rect.height / 2));
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const toggle = () => setIsExpanded(v => !v);
  const springTransition = reduceMotion ? { duration: 0.12 } : { type: "spring" as const, stiffness: 360, damping: 34 };
  const quickTransition = reduceMotion ? { duration: 0.12 } : { duration: 0.35 };

  return (
    <motion.div
      ref={containerRef}
      className={`location-map ${className}`.trim()}
      style={{ perspective: reduceMotion ? undefined : 1000 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={toggle}
      role="button"
      tabIndex={0}
      aria-expanded={isExpanded}
      aria-label={`${location}. ${isExpanded ? "Collapse" : "Expand"} campus map.`}
      onKeyDown={e => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle();
        }
      }}
    >
      <motion.div
        className="location-map-card"
        style={reduceMotion ? undefined : {
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
        }}
        animate={{
          width: isExpanded ? "100%" : "96%",
          height: isExpanded ? 470 : 350,
          y: reduceMotion ? 0 : isHovered ? -5 : 0,
        }}
        transition={springTransition}
      >
        <div className="location-map-glow" />

        <motion.div
          className="location-map-canvas"
          animate={{ opacity: isExpanded ? 1 : 0.92, scale: reduceMotion ? 1 : isExpanded ? 1.015 : 1 }}
          transition={quickTransition}
        >
          <svg className="location-map-roads" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {horizontalRoads.map((y, i) => (
              <motion.line
                key={`h-${y}`}
                x1="0"
                y1={y}
                x2="100"
                y2={y}
                className={i === 1 || i === 3 ? "road-main" : "road-minor"}
                initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={reduceMotion ? { duration: 0 } : { duration: 0.65, delay: 0.05 + i * 0.045 }}
              />
            ))}
            {verticalRoads.map((x, i) => (
              <motion.line
                key={`v-${x}`}
                x1={x}
                y1="0"
                x2={x}
                y2="100"
                className={i === 1 || i === 3 ? "road-mid" : "road-minor"}
                initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={reduceMotion ? { duration: 0 } : { duration: 0.58, delay: 0.12 + i * 0.045 }}
              />
            ))}
            <motion.path
              d="M-5 78 C18 66 29 88 50 73 S79 57 106 69"
              className="road-curve"
              fill="none"
              initial={reduceMotion ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 1.1, delay: 0.16 }}
            />
          </svg>

          <div className="map-building building-a" />
          <div className="map-building building-b" />
          <div className="map-building building-c" />
          <div className="map-building building-d" />
          <div className="map-building building-e" />
          <div className="map-building building-f" />
          <div className="map-building building-g" />

          <span className="map-district district-a">CIVIL LINES</span>
          <span className="map-district district-b">DDUGU</span>
          <span className="map-district district-c">GORAKHPUR</span>

          <motion.div
            className="location-map-pin"
            animate={{
              y: reduceMotion ? 0 : isHovered ? -4 : 0,
              scale: reduceMotion ? 1 : isExpanded ? 1.08 : 1,
            }}
            transition={reduceMotion ? { duration: 0.12 } : { type: "spring", stiffness: 420, damping: 22 }}
          >
            <span className="location-map-pin-ring" />
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Z" fill="currentColor" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
          </motion.div>

          <AnimatePresence initial={false}>
            {isExpanded && (
              <motion.div
                className="map-expanded-details"
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduceMotion ? 0.1 : 0.24 }}
              >
                <span className="map-node node-a" />
                <span className="map-node node-b" />
                <span className="map-node node-c" />
                <span className="map-node node-d" />
                <span className="map-route-label">CAMPUS ROUTE</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <div className="location-map-grid" />

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
                filter: reduceMotion
                  ? "drop-shadow(0 0 4px rgba(255,213,41,.3))"
                  : isHovered
                    ? "drop-shadow(0 0 10px rgba(255,213,41,.72))"
                    : "drop-shadow(0 0 4px rgba(255,213,41,.3))",
              }}
            >
              <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
              <line x1="9" x2="9" y1="3" y2="18" />
              <line x1="15" x2="15" y1="6" y2="21" />
            </motion.svg>

            <motion.div className="location-map-status" animate={{ scale: reduceMotion ? 1 : isHovered ? 1.04 : 1 }}>
              <i />
              <span>Campus map</span>
            </motion.div>
          </div>

          <div className="location-map-bottom">
            <motion.h3 animate={{ x: reduceMotion ? 0 : isHovered ? 4 : 0 }} transition={{ duration: reduceMotion ? 0.1 : 0.22 }}>
              {location}
            </motion.h3>
            <motion.p
              animate={{ opacity: isExpanded ? 0.88 : 0.62, y: reduceMotion ? 0 : isExpanded ? 0 : 2 }}
              transition={{ duration: reduceMotion ? 0.1 : 0.22 }}
            >
              {coordinates}
            </motion.p>
            <motion.div
              className="location-map-underline"
              initial={reduceMotion ? false : { scaleX: 0.24 }}
              animate={{ scaleX: reduceMotion ? 1 : isHovered || isExpanded ? 1 : 0.32 }}
              transition={{ duration: reduceMotion ? 0.1 : 0.35 }}
            />
          </div>
        </div>
      </motion.div>

      <motion.p
        className="location-map-hint"
        initial={false}
        animate={{ opacity: reduceMotion ? 1 : isHovered ? 1 : 0, y: reduceMotion ? 0 : isHovered ? 0 : 4 }}
        transition={{ duration: reduceMotion ? 0.1 : 0.18 }}
      >
        {isExpanded ? "Click to collapse" : "Click to expand"}
      </motion.p>
    </motion.div>
  );
}
