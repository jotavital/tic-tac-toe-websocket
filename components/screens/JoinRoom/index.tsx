"use client";

import { motion } from "motion/react";
import { type KeyboardEvent, useEffect, useState } from "react";
import { CodeInput } from "@/components/screens/JoinRoom/CodeInput";
import { Button } from "@/components/ui/Button";
import { ArrowLeftIcon } from "@/components/ui/icons/ArrowLeftIcon";
import { EnterIcon } from "@/components/ui/icons/EnterIcon";
import { useGameScreensNavigation } from "@/contexts/NavigationContext";
import { useSocket } from "@/contexts/SocketContext";
import { useToast } from "@/contexts/ToastProvider";
import { GAME_SCREENS } from "@/types/Game";

export function JoinRoomScreen() {
  const { navigateToScreen } = useGameScreensNavigation();
  const { emitJoinRoom, joinRoomErrorMessage, clearJoinError } = useSocket();
  const { showErrorToast } = useToast();

  const [code, setCode] = useState("");
  const [inputError, setInputError] = useState<string | null>(null);
  const [isJoining, setIsJoining] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase().slice(0, 4);

    setCode(value);
    setInputError(null);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleJoin();
    }
  };

  const handleJoin = async () => {
    if (code.length < 4) {
      setInputError("O código deve ter 4 números.");
      return;
    }

    setIsJoining(true);

    emitJoinRoom(code);
  };

  useEffect(() => {
    if (joinRoomErrorMessage) {
      showErrorToast(joinRoomErrorMessage);
      setIsJoining(false);
      clearJoinError();

      if (navigator.vibrate) navigator.vibrate(200);
    }
  }, [joinRoomErrorMessage, showErrorToast, clearJoinError]);

  return (
    <div className="flex flex-col items-center gap-8 text-center w-full max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-6 w-full"
      >
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-slate-700 dark:text-slate-200 uppercase tracking-widest">
            Digitar Código
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Insira o código de 4 números do seu amigo
          </p>
        </div>

        <CodeInput
          handleInputChange={handleInputChange}
          handleKeyDown={handleKeyDown}
          error={inputError}
          code={code}
        />

        <div className="flex flex-col gap-3 mt-4">
          <Button
            size="lg"
            onClick={handleJoin}
            disabled={code.length < 4 || isJoining}
            className={isJoining ? "opacity-80 cursor-wait" : ""}
            icon={!isJoining ? <EnterIcon className="w-6 h-6" /> : undefined}
          >
            {isJoining ? "Entrando..." : "Entrar na Sala"}
          </Button>

          <Button
            variant="secondary"
            size="md"
            icon={<ArrowLeftIcon className="w-5 h-5" />}
            onClick={() => navigateToScreen(GAME_SCREENS.MAIN_MENU)}
          >
            Voltar
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
