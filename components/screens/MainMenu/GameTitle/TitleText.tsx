import { motion } from "motion/react";

export function TitleText() {
  return (
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
  );
}
