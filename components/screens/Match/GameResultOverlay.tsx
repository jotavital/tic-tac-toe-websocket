"use client";

import { AnimatePresence, motion } from "motion/react";
import { useMemo } from "react";
import { useGame } from "@/contexts/GameContext";
import { cn } from "@/utils/cn";

export function GameResultOverlay() {
  const { isDraw, isGameOver, hasWon } = useGame();

  const resultConfig = useMemo(() => {
    if (isDraw) {
      return {
        text: "VELHA!",
        className: "text-slate-200 drop-shadow-[0_6px_0_#475569]",
        strokeColor: "#475569", // Slate 600
        fontSize: "text-6xl",
      };
    }

    if (hasWon) {
      return {
        text: "VITÓRIA!",
        className: "text-amber-400 drop-shadow-[0_6px_0_#d97706]",
        strokeColor: "#b45309", // Amber 700
        fontSize: "text-6xl",
      };
    }

    return {
      text: "DERROTA",
      className: "text-rose-500 drop-shadow-[0_6px_0_#9f1239]",
      strokeColor: "#881337", // Rose 900
      // Diminuído levemente para caber no container em telas menores
      fontSize: "text-5xl md:text-6xl",
    };
  }, [isDraw, hasWon]);

  if (!isGameOver) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="absolute inset-0 z-20 flex items-center justify-center rounded-xl overflow-hidden pointer-events-none"
        initial={{ backdropFilter: "blur(0px)", opacity: 0 }}
        animate={{ backdropFilter: "blur(3px)", opacity: 1 }}
        exit={{ backdropFilter: "blur(0px)", opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", bounce: 0.6, duration: 0.8 }}
          className="relative z-10"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <h2
              className={cn(
                "font-black uppercase tracking-widest text-center",
                resultConfig.fontSize,
                resultConfig.className,
              )}
              style={{
                WebkitTextStroke: `2.5px ${resultConfig.strokeColor}`,
                paintOrder: "stroke fill",
              }}
            >
              {resultConfig.text}
            </h2>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
