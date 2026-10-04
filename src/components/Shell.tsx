import type { ReactNode } from "react";
import { Link } from "react-router";
import RopeMark from "./RopeMark";

export default function Shell({ right }: { right?: ReactNode }) {
  return (
    <div className="appbar">
      <Link to="/" className="mini-mark">
        <RopeMark size={18} />
        <span className="display">RopeBeat</span>
      </Link>
      {right}
    </div>
  );
}
