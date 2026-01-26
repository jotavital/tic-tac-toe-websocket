"use client";

import { motion } from "motion/react";
import { useEffect } from "react";
import { RoomCodeDisplay } from "@/components/screens/WaitingRoom/RoomCodeDisplay";
import { WaitingOpponentIndicator } from "@/components/screens/WaitingRoom/WaitingOpponentIndicator";
import { Button } from "@/components/ui/Button";
import { ArrowLeftIcon } from "@/components/ui/icons/ArrowLeftIcon";
import { useGameScreensNavigation } from "@/contexts/NavigationContext";
import { useSocket } from "@/contexts/SocketContext";
import { GAME_SCREENS } from "@/types/Game";

export function WaitingRoomScreen() {
  const { navigateToScreen } = useGameScreensNavigation();
  const { createdRoomCode: roomCode, emitLeaveRoom } = useSocket();

  const handleBackToMainMenu = () => {
    emitLeaveRoom();
  };

  useEffect(() => {
    if (!roomCode) {
      return navigateToScreen(GAME_SCREENS.MAIN_MENU);
    }
  }, [roomCode, navigateToScreen]);

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

        <RoomCodeDisplay roomCode={roomCode} />

        <WaitingOpponentIndicator />

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
