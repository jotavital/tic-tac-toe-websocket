import { motion } from "motion/react";

interface Props {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  colorClass: string;
}

export function WinningLine({ x1, x2, y1, y2, colorClass }: Props) {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 300 300"
    >
      <motion.line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        className={colorClass}
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
    </svg>
  );
}
