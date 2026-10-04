import { Link } from "react-router";
import type { Level, Move } from "../types";

export default function MoveCard({ move, level }: { move: Move; level: Level }) {
  return (
    <Link to={`/moves/${move.id}`} className="move-card">
      <span className="corner-tab" style={{ background: level.colorVar }}>
        L{level.id}
      </span>
      <span className="body">
        <span className="en">{move.name}</span>
        <span className={`ko${move.alias ? "" : " pending"}`}>
          {move.alias ?? "alias pending"}
        </span>
      </span>
      <span className="rot mono">
        {move.rotationsPerJump === 0 ? "swing" : `×${move.rotationsPerJump}`}
      </span>
      <span className="chev">›</span>
    </Link>
  );
}
