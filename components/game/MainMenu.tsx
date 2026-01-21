import { motion } from "motion/react";
import { useGameScreensNavigation } from "@/contexts/NavigationContext";
import { GAME_SCREENS } from "@/types/Game";

export function MainMenu() {
  const { navigateToScreen } = useGameScreensNavigation();

  return (
    <div className=" flex flex-col items-center gap-12 text-center">
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
            className="bg-gradient-to-b from-rose-400 to-rose-600 bg-clip-text text-transparent drop-shadow-[0_4px_0_rgba(225,29,72,0.5)] dark:from-rose-500 dark:to-rose-700"
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
            className="bg-gradient-to-b from-emerald-400 to-emerald-600 bg-clip-text text-transparent drop-shadow-[0_4px_0_rgba(16,185,129,0.5)] dark:from-emerald-500 dark:to-emerald-700"
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
            className="bg-gradient-to-b from-cyan-400 to-cyan-600 bg-clip-text text-transparent drop-shadow-[0_4px_0_rgba(6,182,212,0.5)] dark:from-cyan-500 dark:to-cyan-700"
          >
            TOE
          </motion.span>
        </h1>

        <motion.p
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { duration: 0.8, ease: "easeOut" },
            },
          }}
          className="text-xl font-medium"
        >
          O clássico jogo da velha!
        </motion.p>
      </motion.div>

      <motion.button
        type="button"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, type: "spring" }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95, y: 4 }}
        onClick={() => navigateToScreen(GAME_SCREENS.GAME)}
        className="
        group relative overflow-hidden rounded-xl px-8 py-4 text-2xl font-black uppercase tracking-wider shadow-lg cursor-pointer
        bg-amber-400 border-b-4 border-amber-600
        hover:bg-amber-300 hover:border-amber-500
        active:border-b-0 active:mt-1 active:shadow-none
        dark:bg-amber-500 dark:border-amber-700
        dark:hover:bg-amber-400 dark:hover:border-amber-600
        transition-colors
      "
      >
        <span className="relative z-10 flex items-center gap-2 drop-shadow-[1px_2px_0_rgba(0,0,0,0.15)] tracking-[0.10em]">
          <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
          Jogar Agora
        </span>

        <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:animate-shimmer group-hover:opacity-100" />
      </motion.button>
    </div>
  );
}
