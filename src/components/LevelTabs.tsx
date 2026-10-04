import { LEVELS } from "../data/levels";

export default function LevelTabs({ activeLevel }: { activeLevel?: number }) {
  return (
    <div className="tabs-row">
      {LEVELS.map((level) => (
        <a
          key={level.id}
          href={`#level-${level.id}`}
          className={`lv-tab${level.id === activeLevel ? " active" : ""}`}
          style={{ background: level.colorVar }}
        >
          <span className="n">{level.id}</span>
          <span className="t">{level.tabLabel}</span>
        </a>
      ))}
    </div>
  );
}
