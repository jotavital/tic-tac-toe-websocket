import { Square } from "@/components/game/Square";

interface BoardProps {
  squares: (string | null)[];
  onPlay: (index: number) => void;
  disabled?: boolean;
}

export function Board({ squares, onPlay, disabled }: BoardProps) {
  return (
    <div className="relative h-72 w-72 sm:h-96 sm:w-96">
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full text-slate-300"
        viewBox="0 0 300 300"
        aria-hidden="true"
      >
        <g stroke="currentColor" strokeWidth="10" strokeLinecap="round">
          {/* vertical lines */}
          <line x1="100" y1="10" x2="100" y2="290" />
          <line x1="200" y1="10" x2="200" y2="290" />

          {/* horizontal lines */}
          <line x1="10" y1="100" x2="290" y2="100" />
          <line x1="10" y1="200" x2="290" y2="200" />
        </g>
      </svg>

      <div className="relative z-10 grid h-full w-full grid-cols-3 grid-rows-3">
        {squares?.map((square, i) => (
          <div key={i} className="flex items-center justify-center p-2">
            <Square
              value={square}
              onClick={() => onPlay(i)}
              disabled={disabled}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
