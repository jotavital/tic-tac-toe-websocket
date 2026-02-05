"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
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

interface GameContextData {
  winnerSymbol: string | null;
  boardState: (string | null)[];
  handlePlay: (index: number) => void;
  isGameOver: boolean;
  hasWon: boolean;
  isDraw: boolean;
  isMyTurn: boolean;
  victoryCombination: VictoryCombination | null;
  mySymbol: string | null;
  isWaitingToPlayAgain: boolean;
  handlePlayAgain: () => void;
  handleQuitGame: () => void;
  opponentWantsToPlayAgain: boolean;
}

const GameContext = createContext<GameContextData>({} as GameContextData);

export function GameProvider({ children }: { children: ReactNode }) {
  const { navigateToScreen } = useGameScreensNavigation();
  const { showSuccessToast, showErrorToast, showInfoToast } = useToast();
  const { playMoveSound, playWinSound, playDrawSound } = useGameSounds();
  const { socket, setJoinRoomErrorMessage, roomCode } = useSocket();

  const [boardState, setBoardState] = useState<(string | null)[]>(
    Array(9).fill(null),
  );

  const [opponentWantsToPlayAgain, setOpponentWantsToPlayAgain] =
    useState(false);

  const [victoryCombination, setVictoryCombination] =
    useState<VictoryCombination | null>(null);

  const [isWaitingToPlayAgain, setIsWaitingToPlayAgain] = useState(false);
  const [isMyTurn, setIsMyTurn] = useState<boolean>(false);
  const [mySymbol, setMySymbol] = useState<string | null>(null);
  const [winnerSymbol, setWinnerSymbol] = useState<string | null>(null);
  const [isDraw, setIsDraw] = useState<boolean>(false);
  const [hasWon, setHasWon] = useState(false);

  const isGameOver = !!winnerSymbol || isDraw;

  const resetLocalState = useCallback(() => {
    setBoardState(Array(9).fill(null));
    setWinnerSymbol(null);
    setIsDraw(false);
    setVictoryCombination(null);
    setHasWon(false);
    setOpponentWantsToPlayAgain(false);
  }, []);

  const handlePlayAgain = () => {
    if (socket && roomCode) {
      setIsWaitingToPlayAgain(true);
      socket.emit("play_again", roomCode);
    }
  };

  const handleQuitGame = useCallback(() => {
    resetLocalState();
    navigateToScreen(GAME_SCREENS.MAIN_MENU);

    if (socket && roomCode) {
      socket.emit("leave_room", roomCode);
    }
  }, [navigateToScreen, resetLocalState, roomCode, socket]);

  const handlePlay = (index: number) => {
    if (
      !socket ||
      !roomCode ||
      !mySymbol ||
      !isMyTurn ||
      boardState[index] ||
      isGameOver
    ) {
      return;
    }

    const nextSquares = [...boardState];
    nextSquares[index] = mySymbol;

    setBoardState(nextSquares);
    setIsMyTurn(false);

    playMoveSound();

    socket.emit("make_move", {
      roomCode,
      index,
    });
  };

  useEffect(() => {
    if (!socket) return;

    socket.on("waiting_opponent_play_again", () => {
      showInfoToast("Aguardando o oponente aceitar...");
    });

    socket.on("game_started", (data) => {
      setIsWaitingToPlayAgain(false);
      setJoinRoomErrorMessage(null);
      resetLocalState();

      const playerData = data.players[String(socket.id)];
      const symbol = playerData?.symbol;

      if (!symbol) {
        showErrorToast("Erro ao sincronizar dados do jogador.");
        return;
      }

      setMySymbol(symbol);
      setIsMyTurn(symbol === GameSymbolsEnum.X);

      navigateToScreen(GAME_SCREENS.GAME);
      showSuccessToast("Partida iniciada!");
    });

    socket.on("game_state_updated", (data) => {
      setBoardState(data.board);
      setIsMyTurn(data.currentTurn === mySymbol);
    });

    socket.on("opponent_left", () => {
      setIsWaitingToPlayAgain(false);
      resetLocalState();
      navigateToScreen(GAME_SCREENS.MAIN_MENU);

      showInfoToast("Oponente saiu da partida.");
    });

    socket.on("game_over", (data) => {
      setBoardState(data.board);
      setWinnerSymbol(data.winnerSymbol);
      setVictoryCombination(data.victoryCombination);
      setIsDraw(data.isDraw);
      setIsMyTurn(false);

      const didIWin =
        data.winnerSymbol && mySymbol && data.winnerSymbol === mySymbol;

      setHasWon(didIWin);

      if (didIWin) {
        playWinSound();
      } else {
        playDrawSound();
      }
    });

    socket.on("opponent_wants_play_again", () => {
      setOpponentWantsToPlayAgain(true);
      showInfoToast("Oponente quer jogar novamente!");
    });

    return () => {
      socket.off("game_started");
      socket.off("game_state_updated");
      socket.off("game_over");
      socket.off("opponent_left");
      socket.off("waiting_opponent_play_again");
      socket.off("opponent_wants_play_again");
    };
  }, [
    socket,
    mySymbol,
    navigateToScreen,
    showErrorToast,
    showSuccessToast,
    setJoinRoomErrorMessage,
    resetLocalState,
    playWinSound,
    playDrawSound,
    showInfoToast,
  ]);

  return (
    <GameContext.Provider
      value={{
        winnerSymbol,
        boardState,
        isWaitingToPlayAgain,
        handlePlay,
        isGameOver,
        hasWon,
        isMyTurn,
        isDraw,
        victoryCombination,
        mySymbol,
        handlePlayAgain,
        handleQuitGame,
        opponentWantsToPlayAgain,
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
