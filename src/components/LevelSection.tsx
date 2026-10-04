import type { Level, Move } from "../types";
import MoveCard from "./MoveCard";

export default function LevelSection({
  level,
  moves,
}: {
  level: Level;
  moves: Move[];
}) {
  return (
    <section id={`level-${level.id}`}>
      <div className="sec-head">
        <span className="sec-dot" style={{ background: level.colorVar }} />
        <span className="t">
          Level {level.id} — {level.name}
        </span>
        <span className="c mono">{moves.length} moves</span>
      </div>
      <p className="sec-sub">{level.description}</p>
      <div className="cards">
        {moves.length === 0 ? (
          <p className="sec-sub" style={{ padding: 0 }}>
            Moves for this level are still being researched — see PLAN.md.
          </p>
        ) : (
          moves.map((move) => <MoveCard key={move.id} move={move} level={level} />)
        )}
      </div>
    </section>
  );
}
