import { useState } from "react";
import { Link, useParams } from "react-router";
import BreakdownRow from "../components/BreakdownRow";
import CountGrid from "../components/CountGrid";
import PracticeConsole from "../components/PracticeConsole";
import VideoPanel from "../components/VideoPanel";
import { getLevel } from "../data/levels";
import { getAdjacentMoves, getMoveById, getMovesByLevel } from "../data/moves";
import type { YTPlayer } from "../lib/youtube";

export default function MoveDetailPage() {
  const { id = "" } = useParams();
  const move = getMoveById(id);
  const [player, setPlayer] = useState<YTPlayer | null>(null);
  const [mirrored, setMirrored] = useState(false);

  if (!move) {
    return (
      <div className="app-shell">
        <div className="appbar">
          <Link to="/" className="back-link">
            ‹ All moves
          </Link>
        </div>
        <p className="sec-sub">Move not found.</p>
      </div>
    );
  }

  const level = getLevel(move.level)!;
  const siblings = getMovesByLevel(move.level);
  const position = siblings.findIndex((m) => m.id === move.id) + 1;
  const { prev, next } = getAdjacentMoves(move.id);
  const primaryVideo = move.videos[0];

  return (
    <div className="app-shell">
      <div className="appbar">
        <Link to="/" className="back-link">
          ‹ All moves
        </Link>
        <span className="prog mono">
          Lv.{level.id} · {position}/{siblings.length}
        </span>
      </div>

      <div className="detail-title">
        <span className="en display">
          {move.name}
          {move.officialName === false && <span className="unnamed-tag">unnamed</span>}
        </span>
        {move.officialName === false && (
          <p className="unnamed-note">
            No recognized trick name exists for this — it's a descriptive placeholder for a move spotted in a practice video, not an official or community term.
          </p>
        )}
        <span className="ko">
          {move.alias ? (
            <>
              {move.alias} <span style={{ opacity: 0.6 }}>(confirmed)</span>
            </>
          ) : (
            "alias pending"
          )}
        </span>
      </div>

      <div className="tag-row">
        <span className="tag">
          <span className="dot" style={{ background: level.colorVar }} />
          Level {level.id} · {level.name}
        </span>
        <span className="tag">{move.category}</span>
        <span className="tag mono">
          {move.rotationsPerJump === 0 ? "swing" : `×${move.rotationsPerJump} / jump`}
        </span>
      </div>

      <VideoPanel video={primaryVideo} mirrored={mirrored} onPlayerReady={setPlayer} />

      <PracticeConsole
        player={player}
        video={primaryVideo}
        mirrored={mirrored}
        onToggleMirror={() => setMirrored((v) => !v)}
      />

      <BreakdownRow breakdown={move.breakdown} />
      <CountGrid rotationsPerJump={move.rotationsPerJump} />

      <div className="tips">
        {move.description && <div style={{ paddingBottom: 2 }}>{move.description}</div>}
        {move.tips.map((tip) => (
          <div key={tip}>
            <span className="d" />
            <span>{tip}</span>
          </div>
        ))}
      </div>

      <div className="nextnav">
        <Link to={prev ? `/moves/${prev.id}` : "/"}>
          <span className="lbl">Previous</span>
          {prev ? `‹ ${prev.name}` : "‹ All moves"}
        </Link>
        {next && (
          <Link to={`/moves/${next.id}`} style={{ textAlign: "right" }}>
            <span className="lbl">Next</span>
            {`${next.name} ›`}
          </Link>
        )}
      </div>
    </div>
  );
}
