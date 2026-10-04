import { useMemo, useState } from "react";
import LevelSection from "../components/LevelSection";
import LevelTabs from "../components/LevelTabs";
import PaceDock from "../components/PaceDock";
import SearchFilterBar from "../components/SearchFilterBar";
import Shell from "../components/Shell";
import { LEVELS } from "../data/levels";
import { getAllMoves } from "../data/moves";

export default function MoveListPage() {
  const [query, setQuery] = useState("");
  const allMoves = useMemo(() => getAllMoves(), []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allMoves;
    return allMoves.filter(
      (m) => m.name.toLowerCase().includes(q) || m.alias?.toLowerCase().includes(q),
    );
  }, [query, allMoves]);

  const essentialCount = filtered.length;

  return (
    <div className="app-shell">
      <Shell right={<span className="prog mono">{allMoves.length} moves</span>} />
      <SearchFilterBar value={query} onChange={setQuery} />
      <LevelTabs />
      <div className="status-strip">
        <span>
          <span className="mono">{essentialCount}</span> move{essentialCount === 1 ? "" : "s"}
          {query ? " matching" : " across 5 levels"}
        </span>
        {query ? (
          <button type="button" className="clear" onClick={() => setQuery("")}>
            Clear search
          </button>
        ) : (
          <span>No filters</span>
        )}
      </div>

      {LEVELS.map((level) => {
        const moves = filtered.filter((m) => m.level === level.id);
        if (query && moves.length === 0) return null;
        return <LevelSection key={level.id} level={level} moves={moves} />;
      })}

      <PaceDock />
    </div>
  );
}
