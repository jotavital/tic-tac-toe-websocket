import { motion } from "motion/react";
import { Button } from "@/components/game/ui/Button";
import { useGameScreensNavigation } from "@/contexts/NavigationContext";
import { GAME_SCREENS } from "@/types/Game";

export function MainMenu() {
  const { navigateToScreen } = useGameScreensNavigation();

  return (
    <div className="flex flex-col items-center gap-12 text-center">
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

      <Button
        size="lg"
        onClick={() => navigateToScreen(GAME_SCREENS.GAME)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, type: "spring", stiffness: 300, damping: 20 }}
        icon={
          <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        }
      >
        Jogar Agora
      </Button>
    </div>
  );
}
