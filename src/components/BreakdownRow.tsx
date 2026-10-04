import { Fragment } from "react";
import RopeMark from "./RopeMark";

export default function BreakdownRow({ breakdown }: { breakdown: string[] }) {
  if (breakdown.length < 2) return null;
  return (
    <div className="breakdown">
      {breakdown.map((part, i) => (
        <Fragment key={part}>
          {i > 0 && <RopeMark size={12} color="#8ea498" />}
          <div className="bchip">
            <span className="n">{part}</span>
          </div>
        </Fragment>
      ))}
    </div>
  );
}
