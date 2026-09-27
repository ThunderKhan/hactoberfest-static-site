import type { CSSProperties, MouseEvent, KeyboardEvent } from "react";
import { useEffect, useRef, useState } from "react";

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
  const [reduceMotion, setReduceMotion] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const frameRef = useRef<number | null>(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const finePointerRef = useRef(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener?.("change", sync);
    return () => media.removeEventListener?.("change", sync);
  }, []);

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const resetTilt = () => {
    const element = containerRef.current;
    if (!element) return;
    element.style.setProperty("--map-rotate-x", "0deg");
    element.style.setProperty("--map-rotate-y", "0deg");
  };

  const queueTilt = () => {
    if (frameRef.current !== null) return;
    frameRef.current = window.requestAnimationFrame(() => {
      frameRef.current = null;
      const element = containerRef.current;
      const rect = rectRef.current;
      if (!element || !rect || reduceMotion) return;

      const rotateX = -(pointerRef.current.y - (rect.top + rect.height / 2)) / 90;
      const rotateY = (pointerRef.current.x - (rect.left + rect.width / 2)) / 90;
      element.style.setProperty("--map-rotate-x", `${rotateX}deg`);
      element.style.setProperty("--map-rotate-y", `${rotateY}deg`);
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    finePointerRef.current = !reduceMotion && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!finePointerRef.current) return;
    rectRef.current = containerRef.current?.getBoundingClientRect() ?? null;
  };

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (reduceMotion || !finePointerRef.current || !rectRef.current) return;
    pointerRef.current = { x: event.clientX, y: event.clientY };
    queueTilt();
  };

  const handleMouseLeave = () => {
    finePointerRef.current = false;
    rectRef.current = null;
    if (frameRef.current !== null) {
      window.cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
    resetTilt();
    setIsHovered(false);
  };

  const toggle = () => setIsExpanded(value => !value);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    toggle();
  };

  const styles = {
    "--map-rotate-x": "0deg",
    "--map-rotate-y": "0deg",
  } as CSSProperties;

  return (
    <div
      ref={containerRef}
      className={`location-map${isHovered ? " is-hovered" : ""}${isExpanded ? " is-expanded" : ""} ${className}`.trim()}
      style={styles}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={toggle}
      role="button"
      tabIndex={0}
      aria-expanded={isExpanded}
      aria-label={`${location}. Decorative campus illustration, not a navigation map. ${isExpanded ? "Hide" : "Show"} details.`}
      onKeyDown={handleKeyDown}
    >
      <div className="location-map-card">
        <div className="location-map-glow" />

        <div className="location-map-canvas">
          <svg className="location-map-roads" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {horizontalRoads.map((y, i) => (
              <line
                key={`h-${y}`}
                x1="0"
                y1={y}
                x2="100"
                y2={y}
                className={i === 1 || i === 3 ? "road-main" : "road-minor"}
                style={{ "--map-delay": `${0.05 + i * 0.045}s` } as CSSProperties}
              />
            ))}
            {verticalRoads.map((x, i) => (
              <line
                key={`v-${x}`}
                x1={x}
                y1="0"
                x2={x}
                y2="100"
                className={i === 1 || i === 3 ? "road-mid" : "road-minor"}
                style={{ "--map-delay": `${0.12 + i * 0.045}s`, "--map-road-duration": "0.58s" } as CSSProperties}
              />
            ))}
            <path
              d="M-5 78 C18 66 29 88 50 73 S79 57 106 69"
              className="road-curve"
              fill="none"
              style={{ "--map-delay": "0.16s", "--map-road-duration": "1.1s" } as CSSProperties}
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

          <div className="location-map-pin" aria-hidden="true">
            <span className="location-map-pin-ring" />
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Z" fill="currentColor" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
          </div>

          <div className={`map-expanded-details${isExpanded ? " visible" : ""}`} aria-hidden={!isExpanded}>
            <span className="map-node node-a" />
            <span className="map-node node-b" />
            <span className="map-node node-c" />
            <span className="map-node node-d" />
            <span className="map-route-label">ILLUSTRATIVE ROUTE</span>
          </div>
        </div>

        <div className="location-map-grid" />

        <div className="location-map-content">
          <div className="location-map-topline">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="location-map-icon"
              aria-hidden="true"
            >
              <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
              <line x1="9" x2="9" y1="3" y2="18" />
              <line x1="15" x2="15" y1="6" y2="21" />
            </svg>

            <div className="location-map-status">
              <i />
              <span>Campus illustration</span>
            </div>
          </div>

          <div className="location-map-bottom">
            <h3>{location}</h3>
            <p>{coordinates}</p>
            <div className={`location-map-underline${isHovered || isExpanded ? " active" : ""}`} />
          </div>
        </div>
      </div>

      <p className="location-map-hint" aria-hidden="true">
        {isExpanded ? "Hide illustration details" : "Show illustration details"}
      </p>
    </div>
  );
}
