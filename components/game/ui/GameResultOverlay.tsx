"use client";

import { AnimatePresence, motion } from "motion/react";
import { useGame } from "@/contexts/GameContext";
import { cn } from "@/utils/cn";

export function GameResultOverlay() {
  const { isDraw } = useGame();

  const text = isDraw ? "VELHA!" : "VITÓRIA!";

  const textStyles = isDraw
    ? {
        className:
          "text-slate-600 dark:text-slate-100 drop-shadow-[0_6px_0_#cbd5e1] dark:drop-shadow-[0_6px_0_#475569]",
        strokeColor: "transparent",
      }
    : {
        className: "text-amber-400 drop-shadow-[0_6px_0_#d97706]",
        strokeColor: "#d97706",
      };

  return (
    <AnimatePresence>
      <motion.div
        className="absolute inset-0 z-20 flex items-center justify-center rounded-xl pointer-events-none overflow-hidden"
        initial={{ backdropFilter: "blur(0px)", opacity: 0 }}
        animate={{ backdropFilter: "blur(3px)", opacity: 1 }}
        exit={{ backdropFilter: "blur(0px)", opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", bounce: 0.6 }}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative"
          >
            <h2
              className={cn(
                "font-black text-6xl uppercase tracking-widest",
                textStyles.className,
              )}
              style={{
                WebkitTextStroke: `3px ${textStyles.strokeColor}`,
                paintOrder: "stroke fill",
              }}
            >
              {text}
            </h2>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
