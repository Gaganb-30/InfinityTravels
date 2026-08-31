// src/components/ui/Rail.jsx — horizontal scroller with edge arrows + optional auto-scroll
import { useRef, useState, useEffect, useCallback } from "react";
import Icon from "./Icon";

export default function Rail({ children, gap = 16, autoScroll = false, speed = 0.45 }) {
  const ref = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [playing, setPlaying] = useState(autoScroll);
  const hovering = useRef(false);
  const frame = useRef(0);
  const carry = useRef(0);

  const sync = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    sync();
    el.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => { el.removeEventListener("scroll", sync); window.removeEventListener("resize", sync); };
  }, [sync, children]);

  // Auto-scroll loop — pauses on hover/touch, respects reduced motion, loops at the end
  useEffect(() => {
    if (!playing) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduce) return;

    const step = () => {
      const el = ref.current;
      if (el && !hovering.current) {
        const max = el.scrollWidth - el.clientWidth;
        if (max > 2) {
          carry.current += speed;
          const whole = Math.floor(carry.current);
          if (whole >= 1) {
            carry.current -= whole;
            el.scrollLeft = el.scrollLeft >= max - 1 ? 0 : el.scrollLeft + whole;
          }
        }
      }
      frame.current = requestAnimationFrame(step);
    };
    frame.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame.current);
  }, [playing, speed]);

  const nudge = (dir) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.max(el.clientWidth * 0.8, 260), behavior: "smooth" });
  };

  return (
    <div style={{ position: "relative" }}>
      <button className="rail-btn" onClick={() => nudge(-1)} disabled={atStart && !playing}
              aria-label="Previous" style={{ left: -14 }}>
        <Icon name="chevronLeft" size={18} />
      </button>

      <div
        ref={ref} className="rail no-scrollbar" style={{ gap }}
        onMouseEnter={() => { hovering.current = true; }}
        onMouseLeave={() => { hovering.current = false; }}
        onTouchStart={() => { hovering.current = true; }}
        onTouchEnd={() => { hovering.current = false; }}
      >
        {children}
      </div>

      <button className="rail-btn" onClick={() => nudge(1)} disabled={atEnd && !playing}
              aria-label="Next" style={{ right: -14 }}>
        <Icon name="chevronRight" size={18} />
      </button>

      {autoScroll && (
        <div style={{ display: "flex", justifyContent: "center", marginTop: 14 }}>
          <button
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? "Pause auto-scroll" : "Resume auto-scroll"}
            style={TOGGLE}
          >
            <Icon name={playing ? "pause" : "play"} size={11} />
            {playing ? "Auto-scrolling" : "Paused"}
          </button>
        </div>
      )}
    </div>
  );
}

const TOGGLE = {
  display: "inline-flex", alignItems: "center", gap: 6,
  background: "transparent", border: "1px solid var(--line)", borderRadius: 999,
  padding: "5px 13px", cursor: "pointer", fontFamily: "inherit",
  fontSize: 11, fontWeight: 700, color: "var(--ink-faint)",
};
