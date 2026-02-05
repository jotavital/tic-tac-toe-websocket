"use client";

import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { useGame } from "@/contexts/GameContext";

export function RematchModal() {
  const {
    opponentWantsToPlayAgain,
    isWaitingToPlayAgain,
    handlePlayAgain,
    handleQuitGame,
  } = useGame();

  const showModal = opponentWantsToPlayAgain && !isWaitingToPlayAgain;

  return (
    <AnimatePresence>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/20 dark:bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 15, stiffness: 300 }}
            className="relative w-full max-w-sm bg-white dark:bg-slate-900 border-2 border-amber-500 rounded-2xl shadow-[0_0_40px_-10px_rgba(245,158,11,0.5)] overflow-hidden"
          >
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-50" />

            <div className="p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mb-4 ring-2 ring-amber-500/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-8 h-8 text-amber-500 animate-pulse"
                >
                  <path d="M14.5 17.5L3 6V3h3l11.5 11.5" />
                  <path d="m22 22-5-5" />
                  <path d="m9.5 12.5-5 5" />
                  <path d="M9.5 17.5L21 6V3h-3L6.5 14.5" />
                  <path d="m2 22 5-5" />
                  <path d="m14.5 12.5 5 5" />
                </svg>
              </div>

              <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-wider mb-2">
                Revanche?
              </h3>

              <p className="text-slate-600 dark:text-slate-400 mb-6 font-medium">
                Oponente quer jogar novamente!
              </p>

              <div className="flex w-full gap-3">
                <Button
                  variant="secondary"
                  onClick={handleQuitGame}
                  className="flex-1"
                >
                  Recusar
                </Button>

                <Button
                  variant="primary"
                  onClick={handlePlayAgain}
                  className="flex-1"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  Aceitar
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
