export default function CountGrid({ rotationsPerJump }: { rotationsPerJump: number }) {
  if (rotationsPerJump < 2) return null;
  const cells = Array.from({ length: rotationsPerJump }, (_, i) => ({
    beat: i % 2 === 0 ? "&" : String(Math.ceil((i + 1) / 2)),
    label: i === rotationsPerJump - 1 ? "land" : `spin ${i + 1}`,
  }));
  return (
    <div className="count-wrap">
      <span className="lbl">Count — one cell per rotation</span>
      <div className="count-grid">
        {cells.map((c, i) => (
          <div key={i}>
            <span className="cn">{c.beat}</span>
            <span className="cl">{c.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
