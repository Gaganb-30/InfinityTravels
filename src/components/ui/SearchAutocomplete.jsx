// src/components/ui/SearchAutocomplete.jsx — live /api/search dropdown
import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../utils/api";
import Icon from "./Icon";

export default function SearchAutocomplete({
  placeholder = "Search destinations or packages…",
  onSubmitPath = "/packages",
  autoFocus = false,
  className = "field",
  style = {},
}) {
  const [term, setTerm] = useState("");
  const [res, setRes] = useState(null);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [active, setActive] = useState(-1);
  const boxRef = useRef(null);
  const navigate = useNavigate();

  // Debounced lookup
  useEffect(() => {
    const q = term.trim();
    if (q.length < 2) { setRes(null); setOpen(false); return; }
    let alive = true;
    setBusy(true);
    const t = setTimeout(async () => {
      try {
        const data = await api.search(q);
        if (!alive) return;
        setRes(data && !data.error ? data : { destinations: [], packages: [] });
        setOpen(true); setActive(-1);
      } catch {
        if (alive) { setRes({ destinations: [], packages: [] }); setOpen(true); }
      } finally { if (alive) setBusy(false); }
    }, 280);
    return () => { alive = false; clearTimeout(t); setBusy(false); };
  }, [term]);

  // Outside click / Escape
  useEffect(() => {
    const onDown = (e) => { if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDown); document.removeEventListener("keydown", onKey); };
  }, []);

  const flat = [
    ...(res?.destinations || []).map((d) => ({ kind: "destination", to: `/destinations/${d.slug}`, title: d.name, meta: [d.country, d.tier].filter(Boolean).join(" · "), img: d.heroImage })),
    ...(res?.packages || []).map((p) => ({ kind: "package", to: `/packages/${p.slug}`, title: p.name, meta: [p.location, p.duration].filter(Boolean).join(" · "), img: p.image })),
  ];

  const go = useCallback((item) => {
    setOpen(false); setTerm("");
    navigate(item.to);
  }, [navigate]);

  const onKeyDown = (e) => {
    if (!open || flat.length === 0) {
      if (e.key === "Enter" && term.trim()) {
        setOpen(false);
        navigate(`${onSubmitPath}?search=${encodeURIComponent(term.trim())}`);
      }
      return;
    }
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((i) => (i + 1) % flat.length); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((i) => (i - 1 + flat.length) % flat.length); }
    else if (e.key === "Enter") {
      e.preventDefault();
      if (active >= 0) go(flat[active]);
      else if (term.trim()) { setOpen(false); navigate(`${onSubmitPath}?search=${encodeURIComponent(term.trim())}`); }
    }
  };

  return (
    <div ref={boxRef} style={{ position: "relative", ...style }}>
      <Icon name="search" size={17} style={SEARCH_ICON} />
      <input
        className={className} style={{ paddingLeft: 42, paddingRight: 38, width: "100%" }}
        placeholder={placeholder} value={term} autoFocus={autoFocus}
        onChange={(e) => setTerm(e.target.value)}
        onFocus={() => flat.length && setOpen(true)}
        onKeyDown={onKeyDown}
        aria-label="Search" autoComplete="off"
      />
      {busy && <span style={SPINNER} />}
      {term && !busy && (
        <button onClick={() => { setTerm(""); setRes(null); setOpen(false); }}
                aria-label="Clear search" style={CLEAR}>
          <Icon name="close" size={15} />
        </button>
      )}

      {open && res && (
        <div style={PANEL}>
          {flat.length === 0 ? (
            <div style={{ padding: "18px 16px", textAlign: "center" }}>
              <p style={{ margin: "0 0 10px", color: "var(--ink-muted)", fontSize: ".86rem" }}>
                Nothing matched “{term}”.
              </p>
              <button
                onClick={() => { setOpen(false); navigate("/contact"); }}
                className="btn btn-orange btn-sm"
              >
                Ask us to plan it
              </button>
            </div>
          ) : (
            <>
              {(res.destinations || []).length > 0 && <div style={GROUP}>Destinations</div>}
              {(res.destinations || []).map((d, i) => (
                <Row key={`d${d.slug}`} item={flat[i]} active={active === i}
                     onHover={() => setActive(i)} onPick={() => go(flat[i])} />
              ))}
              {(res.packages || []).length > 0 && <div style={GROUP}>Packages</div>}
              {(res.packages || []).map((p, j) => {
                const i = (res.destinations || []).length + j;
                return (
                  <Row key={`p${p.slug}`} item={flat[i]} active={active === i}
                       onHover={() => setActive(i)} onPick={() => go(flat[i])} />
                );
              })}
              <button
                onClick={() => { setOpen(false); navigate(`${onSubmitPath}?search=${encodeURIComponent(term.trim())}`); }}
                style={ALL_ROW}
              >
                See all results for “{term}” <Icon name="arrowRight" size={14} />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function Row({ item, active, onHover, onPick }) {
  return (
    <button
      onMouseEnter={onHover} onClick={onPick}
      style={{ ...ROW, background: active ? "var(--surface-muted)" : "transparent" }}
    >
      {item.img
        ? <img src={item.img} alt="" style={THUMB} loading="lazy" />
        : <span style={{ ...THUMB, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--ink-faint)" }}>
            <Icon name={item.kind === "package" ? "tag" : "pin"} size={16} />
          </span>}
      <span style={{ minWidth: 0, textAlign: "left" }}>
        <span style={{ display: "block", fontWeight: 700, fontSize: ".87rem", color: "var(--navy)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {item.title}
        </span>
        {item.meta && (
          <span style={{ display: "block", fontSize: ".76rem", color: "var(--ink-faint)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {item.meta}
          </span>
        )}
      </span>
    </button>
  );
}

const SEARCH_ICON = { position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--ink-faint)", pointerEvents: "none", zIndex: 1 };
const CLEAR = { position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "transparent", border: "none", cursor: "pointer", color: "var(--ink-faint)", padding: 4, lineHeight: 0 };
const SPINNER = { position: "absolute", right: 14, top: "50%", width: 14, height: 14, marginTop: -7, borderRadius: "50%", border: "2px solid var(--line)", borderTopColor: "var(--orange)", animation: "im-spin .7s linear infinite" };
const PANEL = { position: "absolute", top: "calc(100% + 8px)", left: 0, right: 0, background: "#fff", borderRadius: 14, border: "1px solid var(--line)", boxShadow: "0 22px 48px rgba(15,45,94,.18)", zIndex: 60, overflow: "hidden", maxHeight: 400, overflowY: "auto" };
const GROUP = { padding: "10px 14px 6px", fontSize: 10, fontWeight: 800, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--orange-dark)" };
const ROW = { display: "flex", alignItems: "center", gap: 11, width: "100%", padding: "9px 14px", border: "none", cursor: "pointer", fontFamily: "inherit", transition: "background .12s ease" };
const THUMB = { width: 40, height: 40, borderRadius: 9, objectFit: "cover", flexShrink: 0, background: "var(--surface-sunken)" };
const ALL_ROW = { display: "flex", alignItems: "center", justifyContent: "center", gap: 7, width: "100%", padding: "12px 14px", background: "var(--surface-muted)", border: "none", borderTop: "1px solid var(--line)", cursor: "pointer", fontFamily: "inherit", fontSize: ".82rem", fontWeight: 700, color: "var(--navy)" };
