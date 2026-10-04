import { Fragment } from "react";
import { Link } from "react-router";
import RopeMark from "./RopeMark";

export default function BreakdownRow({
  breakdown,
  comboOf,
}: {
  breakdown: string[];
  /** Move ids matching `breakdown` 1:1 — when present, chips link to those moves' pages. */
  comboOf?: string[];
}) {
  if (breakdown.length < 2) return null;
  return (
    <div className="breakdown">
      {breakdown.map((part, i) => {
        const targetId = comboOf?.[i];
        const chip = (
          <div className="bchip">
            <span className="n">{part}</span>
          </div>
        );
        return (
          <Fragment key={part}>
            {i > 0 && <RopeMark size={12} color="#8ea498" />}
            {targetId ? (
              <Link to={`/moves/${targetId}`} className="bchip-link">
                {chip}
              </Link>
            ) : (
              chip
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
