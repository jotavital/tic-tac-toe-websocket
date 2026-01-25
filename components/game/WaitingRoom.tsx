"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Button } from "@/components/game/ui/Button";
import { ArrowLeftIcon } from "@/components/ui/icons/ArrowLeftIcon";
import { CheckIcon } from "@/components/ui/icons/CheckIcon";
import { CopyIcon } from "@/components/ui/icons/CopyIcon";
import { useGameScreensNavigation } from "@/contexts/NavigationContext";
import { useSocket } from "@/contexts/SocketContext";
import { GAME_SCREENS } from "@/types/Game";

export function WaitingRoom() {
  const { navigateToScreen } = useGameScreensNavigation();
  const { roomId, emitLeaveRoom } = useSocket();

  const [codeCopiedToClipboard, setCodeCopiedToClipboard] = useState(false);

  const handleBackToMainMenu = () => {
    emitLeaveRoom();
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(roomId ?? "");
      setCodeCopiedToClipboard(true);

      setTimeout(() => setCodeCopiedToClipboard(false), 2000);
    } catch (err) {
      console.error("Falha ao copiar:", err);
    }
  };

  useEffect(() => {
    if (!roomId) {
      return navigateToScreen(GAME_SCREENS.MAIN_MENU);
    }
  }, [roomId, navigateToScreen]);

  return (
    <div className="flex flex-col items-center gap-8 text-center w-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-6 w-full"
      >
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-slate-700 dark:text-slate-200 uppercase tracking-widest">
            Código da Sala
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Envie este código para seu amigo entrar
          </p>
        </div>

        <div
          onClick={handleCopy}
          className="group relative flex items-center justify-center w-full bg-slate-100 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 rounded-2xl p-8 cursor-pointer hover:border-blue-400 dark:hover:border-blue-500 transition-colors"
        >
          <span className="text-5xl md:text-6xl font-black font-mono tracking-[0.2em] text-slate-900 dark:text-white select-all">
            {roomId}
          </span>

          <div className="absolute top-3 right-3 opacity-30 group-hover:opacity-100 transition-opacity">
            {codeCopiedToClipboard ? (
              <span className="text-green-500 text-xs font-bold flex items-center gap-1 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded">
                COPIADO <CheckIcon className="w-3 h-3" />
              </span>
            ) : (
              <span className="text-slate-400 text-xs font-bold flex items-center gap-1 bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded">
                COPIAR <CopyIcon className="w-3 h-3" />
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400 bg-white/50 dark:bg-black/20 px-6 py-3 rounded-full animate-pulse">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" />
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.15s]" />
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.3s]" />
          <span className="text-sm font-bold ml-1">AGUARDANDO OPONENTE...</span>
        </div>

        <Button
          variant="secondary"
          size="md"
          icon={<ArrowLeftIcon className="w-5 h-5" />}
          onClick={handleBackToMainMenu}
          className="mt-4 w-full max-w-50"
        >
          Cancelar
        </Button>
      </motion.div>
    </div>
  );
}
