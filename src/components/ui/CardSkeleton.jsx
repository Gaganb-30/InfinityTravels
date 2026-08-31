// src/components/ui/CardSkeleton.jsx
export default function CardSkeleton({ width = 300, height = 340, count = 4, inline = true }) {
  const items = Array.from({ length: count });
  return (
    <div style={{ display: "flex", gap: 16, flexWrap: inline ? "nowrap" : "wrap", overflow: "hidden" }}>
      {items.map((_, i) => (
        <div key={i} className="skeleton" style={{ width, minWidth: width, height, borderRadius: 16 }} />
      ))}
    </div>
  );
}
