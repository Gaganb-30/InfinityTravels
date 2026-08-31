// src/components/ui/Countdown.jsx — live-ticking offer expiry
import { useState, useEffect } from "react";
import Icon from "./Icon";

function remaining(target) {
  const ms = new Date(target).getTime() - Date.now();
  if (ms <= 0) return null;
  return {
    d: Math.floor(ms / 86400000),
    h: Math.floor((ms / 3600000) % 24),
    m: Math.floor((ms / 60000) % 60),
    s: Math.floor((ms / 1000) % 60),
  };
}

export default function Countdown({ endsAt, compact = false }) {
  const [left, setLeft] = useState(() => remaining(endsAt));

  useEffect(() => {
    const t = setInterval(() => setLeft(remaining(endsAt)), 1000);
    return () => clearInterval(t);
  }, [endsAt]);

  if (!left) {
    return (
      <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11.5, fontWeight: 700, color: "var(--ink-faint)" }}>
        <Icon name="clock" size={12} /> Offer closed
      </span>
    );
  }

  if (compact) {
    return (
      <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11.5, fontWeight: 700, color: "var(--hot)" }}>
        <Icon name="clock" size={12} />
        {left.d > 0 ? `${left.d}d ${left.h}h left` : `${left.h}h ${left.m}m left`}
      </span>
    );
  }

  const cells = [
    { v: left.d, l: "days" }, { v: left.h, l: "hrs" },
    { v: left.m, l: "min" }, { v: left.s, l: "sec" },
  ];

  return (
    <div style={{ display: "flex", gap: 6 }}>
      {cells.map((c) => (
        <div key={c.l} style={CELL}>
          <span style={{ fontSize: ".92rem", fontWeight: 800, lineHeight: 1 }}>
            {String(c.v).padStart(2, "0")}
          </span>
          <span style={{ fontSize: 8.5, letterSpacing: ".08em", textTransform: "uppercase", opacity: .7 }}>
            {c.l}
          </span>
        </div>
      ))}
    </div>
  );
}

const CELL = {
  display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
  background: "var(--surface-sunken)", color: "var(--navy)",
  borderRadius: 7, padding: "5px 7px", minWidth: 34,
};
