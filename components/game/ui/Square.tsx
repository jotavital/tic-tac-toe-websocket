import { motion, type Variants } from "motion/react";
import { OIcon } from "@/components/ui/icons/OIcon";
import { XIcon } from "@/components/ui/icons/XIcon";
import { GameSymbolsEnum } from "@/types/Player";

interface SquareProps {
  value: string | null;
  onClick: () => void;
  disabled?: boolean;
}

const iconVariants: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
  },
};

export function Square({ value, onClick, disabled }: SquareProps) {
  return (
    <div className="flex items-center justify-center p-2">
      <button
        type="button"
        className="flex h-full w-full items-center justify-center rounded-xl transition-colors hover:bg-slate-500/10 focus:outline-none focus:ring-4 focus:ring-slate-400/20 disabled:cursor-default disabled:hover:bg-transparent cursor-pointer"
        onClick={onClick}
        disabled={disabled || value !== null}
      >
        {value && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={iconVariants}
            className="flex items-center justify-center"
          >
            {value === GameSymbolsEnum.X ? <XIcon /> : <OIcon />}
          </motion.div>
        )}
      </button>
    </div>
  );
}
