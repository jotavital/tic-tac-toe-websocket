import { motion } from "motion/react";
import { GameTitleSubtext } from "@/components/game/ui/game-title/GameTitleSubtext";

export function GameTitle() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3,
          },
        },
      }}
      className="flex flex-col items-center space-y-4 text-center"
    >
      <h1 className="flex flex-wrap justify-center gap-x-3 text-7xl font-black tracking-tighter md:text-8xl select-none">
        <motion.span
          variants={{
            hidden: { y: 20, opacity: 0, scale: 0.8 },
            visible: {
              y: 0,
              opacity: 1,
              scale: 1,
              transition: { type: "spring", bounce: 0.5 },
            },
          }}
          className="bg-linear-to-b from-rose-400 to-rose-600 bg-clip-text text-transparent drop-shadow-[0_4px_0_rgba(225,29,72,0.5)] dark:from-rose-500 dark:to-rose-700"
        >
          TIC
        </motion.span>

        <motion.span
          variants={{
            hidden: { y: 20, opacity: 0, scale: 0.8 },
            visible: {
              y: 0,
              opacity: 1,
              scale: 1,
              transition: { type: "spring", bounce: 0.5 },
            },
          }}
          className="bg-linear-to-b from-emerald-400 to-emerald-600 bg-clip-text text-transparent drop-shadow-[0_4px_0_rgba(16,185,129,0.5)] dark:from-emerald-500 dark:to-emerald-700"
        >
          TAC
        </motion.span>

        <motion.span
          variants={{
            hidden: { y: 20, opacity: 0, scale: 0.8 },
            visible: {
              y: 0,
              opacity: 1,
              scale: 1,
              transition: { type: "spring", bounce: 0.5 },
            },
          }}
          className="bg-linear-to-b from-cyan-400 to-cyan-600 bg-clip-text text-transparent drop-shadow-[0_4px_0_rgba(6,182,212,0.5)] dark:from-cyan-500 dark:to-cyan-700"
        >
          TOE
        </motion.span>
      </h1>

      <GameTitleSubtext />
    </motion.div>
  );
}
