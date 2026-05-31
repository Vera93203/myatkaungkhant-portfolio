import React, { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface ScrollAccent {
  hex: string;
  glow: string;
  glowSoft: string;
}

export const SCROLL_ACCENTS: Record<string, ScrollAccent> = {
  cyan: {
    hex: "#0ea5e9",
    glow: "rgba(14, 165, 233, 0.65)",
    glowSoft: "rgba(14, 165, 233, 0.18)",
  },
  violet: {
    hex: "#a855f7",
    glow: "rgba(168, 85, 247, 0.65)",
    glowSoft: "rgba(168, 85, 247, 0.18)",
  },
  emerald: {
    hex: "#10b981",
    glow: "rgba(16, 185, 129, 0.65)",
    glowSoft: "rgba(16, 185, 129, 0.18)",
  },
  amber: {
    hex: "#f59e0b",
    glow: "rgba(245, 158, 11, 0.65)",
    glowSoft: "rgba(245, 158, 11, 0.18)",
  },
};

interface GlassScrollRailProps {
  children: React.ReactNode;
  presetId: string;
  className?: string;
  /** px to scroll per arrow click */
  scrollStep?: number;
}

export default function GlassScrollRail({
  children,
  presetId,
  className = "",
  scrollStep = 380,
}: GlassScrollRailProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const accent = SCROLL_ACCENTS[presetId] ?? SCROLL_ACCENTS.cyan;

  const syncScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const p = max > 0 ? el.scrollLeft / max : 0;
    setProgress(p);
    setCanLeft(el.scrollLeft > 6);
    setCanRight(max > 0 && el.scrollLeft < max - 6);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    syncScroll();
    el.addEventListener("scroll", syncScroll, { passive: true });
    const ro = new ResizeObserver(syncScroll);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", syncScroll);
      ro.disconnect();
    };
  }, [syncScroll, children]);

  const scrollBy = (dir: -1 | 1) => {
    trackRef.current?.scrollBy({ left: dir * scrollStep, behavior: "smooth" });
  };

  const railStyle = {
    "--scroll-accent": accent.hex,
    "--scroll-accent-glow": accent.glow,
    "--scroll-accent-soft": accent.glowSoft,
    "--scroll-progress": progress,
  } as React.CSSProperties;

  return (
    <div
      className={`glass-scroll-rail ${className}`.trim()}
      style={railStyle}
    >
      <div className="glass-scroll-rail__ambient" aria-hidden="true" />
      <div className="glass-scroll-rail__fade glass-scroll-rail__fade--left" aria-hidden="true" />
      <div className="glass-scroll-rail__fade glass-scroll-rail__fade--right" aria-hidden="true" />

      <div ref={trackRef} className="glass-scroll-rail__track horizontal-scroll-track">
        {children}
      </div>

      <div className="glass-scroll-rail__dock">
        <button
          type="button"
          aria-label="Scroll left"
          disabled={!canLeft}
          onClick={() => scrollBy(-1)}
          className="glass-scroll-rail__nav"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="glass-scroll-rail__slider" aria-hidden="true">
          <div className="glass-scroll-rail__slider-track">
            <div
              className="glass-scroll-rail__slider-fill"
              style={{ transform: `scaleX(${Math.max(progress, 0.02)})` }}
            />
            <div
              className="glass-scroll-rail__slider-thumb"
              style={{ left: `calc(${progress * 100}% - 0.5rem)` }}
            />
          </div>
          <div className="glass-scroll-rail__slider-shine" />
        </div>

        <button
          type="button"
          aria-label="Scroll right"
          disabled={!canRight}
          onClick={() => scrollBy(1)}
          className="glass-scroll-rail__nav"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
