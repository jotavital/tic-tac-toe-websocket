import { GameSymbolsEnum } from "@/types/Player";
import { OIcon, XIcon } from "./Icons";

interface SquareProps {
  value: string | null;
  onClick: () => void;
  disabled?: boolean;
}

export function Square({ value, onClick, disabled }: SquareProps) {
  return (
    <button
      type="button"
      className="flex h-full w-full items-center justify-center rounded-xl transition-colors hover:bg-slate-500/10 focus:outline-none focus:ring-4 focus:ring-slate-400/20 disabled:cursor-default disabled:hover:bg-transparent cursor-pointer"
      onClick={onClick}
      disabled={disabled || value !== null}
    >
      {value === GameSymbolsEnum.X && <XIcon />}
      {value === GameSymbolsEnum.O && <OIcon />}
    </button>
  );
}
