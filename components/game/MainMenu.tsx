import { motion } from "motion/react";
import { useGameScreensNavigation } from "@/contexts/NavigationContext";
import { GAME_SCREENS } from "@/types/Game";

export function MainMenu() {
  const { navigateToScreen } = useGameScreensNavigation();

  return (
    <div className="flex flex-col items-center gap-12 text-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <h1 className="text-6xl font-black tracking-tighter text-rose-500">
          TIC <span className="text-green-400">TAC</span>{" "}
          <span className="text-cyan-300"> TOE</span>
        </h1>
        <p className="text-slate-400">O clássico jogo da velha.</p>
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigateToScreen(GAME_SCREENS.GAME)}
        className="rounded-2xl bg-white px-12 py-6 text-2xl font-bold text-slate-950 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] transition-colors hover:bg-slate-200 cursor-pointer"
      >
        JOGAR AGORA
      </motion.button>
    </div>
  );
}
