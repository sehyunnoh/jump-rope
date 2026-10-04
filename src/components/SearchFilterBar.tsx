export default function SearchFilterBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="searchrow">
      <label className="pill-input">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search moves (한글 OK)…"
          aria-label="Search moves"
        />
      </label>
      <button className="pill-btn" type="button" disabled title="Filters coming later">
        Filter
      </button>
    </div>
  );
}
