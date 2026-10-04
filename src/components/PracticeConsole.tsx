import { useEffect, useRef, useState } from "react";
import type { MoveVideo } from "../types";
import type { YTPlayer } from "../lib/youtube";

const SPEEDS = [0.25, 0.5, 0.75, 1];

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function PracticeConsole({
  player,
  video,
  mirrored,
  onToggleMirror,
}: {
  player: YTPlayer | null;
  video: MoveVideo | undefined;
  mirrored: boolean;
  onToggleMirror: () => void;
}) {
  const [speed, setSpeed] = useState(1);
  const [loopA, setLoopA] = useState<number | null>(null);
  const [loopB, setLoopB] = useState<number | null>(null);
  const loopTimer = useRef<number | null>(null);

  useEffect(() => {
    player?.setPlaybackRate(speed);
  }, [player, speed]);

  useEffect(() => {
    if (loopTimer.current) window.clearInterval(loopTimer.current);
    if (player && loopA !== null && loopB !== null) {
      loopTimer.current = window.setInterval(() => {
        if (player.getCurrentTime() >= loopB) {
          player.seekTo(loopA, true);
        }
      }, 200);
    }
    return () => {
      if (loopTimer.current) window.clearInterval(loopTimer.current);
    };
  }, [player, loopA, loopB]);

  function setA() {
    if (!player) return;
    setLoopA(player.getCurrentTime());
  }
  function setB() {
    if (!player) return;
    setLoopB(player.getCurrentTime());
  }
  function clearLoop() {
    setLoopA(null);
    setLoopB(null);
  }
  function nudge(delta: number) {
    if (!player) return;
    player.seekTo(Math.max(0, player.getCurrentTime() + delta), true);
  }
  function jumpToKeyLoop() {
    if (!video?.loop || !player) return;
    setLoopA(video.loop.start);
    setLoopB(video.loop.end);
    player.seekTo(video.loop.start, true);
  }

  return (
    <div className="console-panel">
      <div className="crow">
        <span className="lbl">Speed</span>
        <div className="seg4">
          {SPEEDS.map((s) => (
            <button
              key={s}
              className={s === speed ? "active" : ""}
              onClick={() => setSpeed(s)}
            >
              {s}×
            </button>
          ))}
        </div>
      </div>
      <div className="crow">
        <span className="lbl">Loop</span>
        <div className="loop3">
          <button className={loopA !== null ? "set" : ""} onClick={setA}>
            Set A
          </button>
          <button className={loopB !== null ? "set" : ""} onClick={setB}>
            Set B
          </button>
          <button className={loopA === null && loopB === null ? "ghost" : ""} onClick={clearLoop}>
            Clear
          </button>
        </div>
      </div>
      {video?.loop && (
        <button className="quickloop" onClick={jumpToKeyLoop}>
          <span>⟲ Loop the key part</span>
          <span className="ts mono">
            {formatTime(video.loop.start)}–{formatTime(video.loop.end)}
          </span>
        </button>
      )}
      <div className="extra2">
        <button onClick={() => nudge(-5)}>−5s</button>
        <button onClick={() => nudge(5)}>+5s</button>
        <button className={mirrored ? "active" : ""} onClick={onToggleMirror}>
          ⇄ Mirror
        </button>
      </div>
    </div>
  );
}
