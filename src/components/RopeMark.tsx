export default function RopeMark({
  size = 18,
  color = "var(--pulse)",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 46 46" fill="none">
      <path
        d="M6 30 C 10 10, 18 42, 23 23 S 34 6, 40 20"
        stroke={color}
        strokeWidth={size < 20 ? 7 : 4.5}
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
