"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useGameScreensNavigation } from "@/contexts/NavigationContext";
import { useSocket } from "@/contexts/SocketContext";
import { useToast } from "@/contexts/ToastProvider";
import { useGameSounds } from "@/hooks/useGameSounds";
import { GAME_SCREENS, type VictoryCombination } from "@/types/Game";
import { GameSymbolsEnum } from "@/types/Player";
import { calculateWinner } from "@/utils/game-logic";

interface GameContextData {
  winnerSymbol: GameSymbolsEnum | null;
  boardState: (string | null)[];
  handlePlay: (index: number) => void;
  isGameOver: boolean;
  isDraw: boolean;
  isMyTurn: boolean;
  victoryCombination: VictoryCombination | null;
  handleRestartGame: () => void;
}

const GameContext = createContext<GameContextData>({} as GameContextData);

export function GameProvider({ children }: { children: ReactNode }) {
  const { navigateToScreen } = useGameScreensNavigation();
  const { showSuccessToast, showErrorToast } = useToast();
  const { playMoveSound, playWinSound, playDrawSound } = useGameSounds();
  const { socket, setJoinRoomErrorMessage, roomCode } = useSocket();

  const [isMyTurn, setIsMyTurn] = useState<boolean>(false);
  const [mySymbol, setMySymbol] = useState<GameSymbolsEnum | null>(null);
  const [boardState, setBoardState] = useState(Array(9).fill(null));

  const { winnerSymbol, victoryCombination, isDraw } =
    calculateWinner(boardState);

  const isGameOver = !!winnerSymbol || isDraw;

  const handleRestartGame = () => {
    setBoardState(Array(9).fill(null));
  };

  const handlePlay = (index: number) => {
    if (!mySymbol || !isMyTurn) return;

    playMoveSound();

    if (boardState[index] || winnerSymbol) {
      return;
    }

    const nextSquares = [...boardState];
    nextSquares[index] = mySymbol;

    setBoardState(nextSquares);

    if (socket && roomCode && isMyTurn && !boardState[index] && !winnerSymbol) {
      socket.emit("make_move", { roomCode, index });
    }
  };

  useEffect(() => {
    if (winnerSymbol) {
      playWinSound();
    } else if (isDraw) {
      playDrawSound();
    }
  }, [winnerSymbol, isDraw, playDrawSound, playWinSound]);

  useEffect(() => {
    if (!socket) return;

    // TODO tipar
    socket.on("game_started", (initialGameData) => {
      setJoinRoomErrorMessage(null);

      console.log("Jogo iniciado com dados:", initialGameData);

      const myInitialData = initialGameData.players[String(socket.id)];

      if (!myInitialData) {
        showErrorToast("Erro ao entrar na sala.");
        return;
      }

      setIsMyTurn(myInitialData === GameSymbolsEnum.X);
      setMySymbol(myInitialData as GameSymbolsEnum);

      navigateToScreen(GAME_SCREENS.GAME);

      showSuccessToast("Jogo iniciado.");
    });

    socket.on("game_state_updated", (data) => {
      setBoardState(data.board);
      setIsMyTurn(data.currentTurn === mySymbol);
    });
  }, [
    socket,
    navigateToScreen,
    showErrorToast,
    showSuccessToast,
    mySymbol,
    setJoinRoomErrorMessage,
  ]);

  return (
    <GameContext.Provider
      value={{
        winnerSymbol,
        boardState,
        handlePlay,
        isGameOver,
        isMyTurn,
        isDraw,
        victoryCombination,
        handleRestartGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}
