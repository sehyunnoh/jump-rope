import { useEffect, useRef, useState } from "react";
import { Metronome } from "../lib/metronome";

const BAR_COUNT = 10;

export default function PaceDock({ initialBpm = 90 }: { initialBpm?: number }) {
  const [bpm, setBpm] = useState(initialBpm);
  const [running, setRunning] = useState(false);
  const [heights, setHeights] = useState<number[]>(Array(BAR_COUNT).fill(6));
  const metronomeRef = useRef<Metronome | null>(null);

  useEffect(() => {
    const m = new Metronome(bpm, () => {
      setHeights((prev) => [6 + Math.random() * 14, ...prev.slice(0, BAR_COUNT - 1)]);
    });
    metronomeRef.current = m;
    return () => m.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    metronomeRef.current?.setBpm(bpm);
  }, [bpm]);

  function toggle() {
    const m = metronomeRef.current;
    if (!m) return;
    if (running) {
      m.stop();
      setRunning(false);
    } else {
      m.start();
      setRunning(true);
    }
  }

  return (
    <div className="dock">
      <div className="dock-pill">
        <button className="dock-play" onClick={toggle} aria-label={running ? "Stop pace" : "Start pace"}>
          {running ? (
            <svg width="12" height="12" viewBox="0 0 24 24">
              <rect x="5" y="5" width="14" height="14" fill="#12201a" />
            </svg>
          ) : (
            <svg width="13" height="13" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" fill="#12201a" />
            </svg>
          )}
        </button>
        <div className="dock-bpm">
          <span className="n mono">{bpm}</span>
          <span className="u">JPM</span>
        </div>
        <div className="dock-wave" aria-hidden="true">
          {heights.map((h, i) => (
            <i key={i} style={{ height: `${running ? h : 6}px` }} />
          ))}
        </div>
        <div className="dock-steppers">
          <button onClick={() => setBpm((b) => Math.max(40, b - 5))} aria-label="Slower">
            −
          </button>
          <button onClick={() => setBpm((b) => Math.min(220, b + 5))} aria-label="Faster">
            +
          </button>
        </div>
      </div>
    </div>
  );
}
