"use client";

import type React from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { io, type Socket } from "socket.io-client";
import { useGame } from "@/contexts/GameContext";
import { useGameScreensNavigation } from "@/contexts/NavigationContext";
import { GAME_SCREENS } from "@/types/Game";

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  createdRoomCode: string | null;
  joinRoomErrorMessage: string | null;
  emitCreateRoom: () => void;
  emitLeaveRoom: () => void;
  emitJoinRoom: (roomCode: string) => void;
  clearJoinError: () => void;
}

const SocketContext = createContext<SocketContextType | null>(null);

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const { navigateToScreen } = useGameScreensNavigation();
  const { handleSetInitialGameData } = useGame();

  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [createdRoomCode, setCreatedRoomCode] = useState<string | null>(null);
  const [joinRoomErrorMessage, setJoinRoomErrorMessage] = useState<
    string | null
  >(null);

  const emitCreateRoom = useCallback(() => {
    if (socket) {
      socket.emit("create_room");

      console.log("Evento 'create_room' emitido ao servidor.");
    }
  }, [socket]);

  const emitLeaveRoom = useCallback(() => {
    if (socket && createdRoomCode) {
      socket.emit("leave_room", createdRoomCode);

      console.log(
        "Evento 'leave_room' emitido ao servidor para a sala:",
        createdRoomCode,
      );
    }
  }, [socket, createdRoomCode]);

  const emitJoinRoom = useCallback(
    (roomCode: string) => {
      setJoinRoomErrorMessage(null);

      if (socket && roomCode) {
        socket.emit("join_room", roomCode);

        console.log(
          "Evento 'join_room' emitido ao servidor para a sala:",
          roomCode,
        );
      }
    },
    [socket],
  );

  const clearJoinError = useCallback(() => {
    setJoinRoomErrorMessage(null);
  }, []);

  useEffect(() => {
    const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL;

    if (!socketUrl) {
      console.error("❌ ERRO: NEXT_PUBLIC_SOCKET_URL não definida!");
      return;
    }

    const socketInstance = io(socketUrl, {
      autoConnect: true,
      reconnectionAttempts: 5,
    });

    socketInstance.on("connect", () => {
      console.log("✅ Conectado ao servidor websocket! ID:", socketInstance.id);
      setIsConnected(true);
    });

    socketInstance.on("disconnect", () => {
      console.log("❌ Desconectado do servidor websocket.");
      setIsConnected(false);
    });

    socketInstance.on("connect_error", (err) => {
      console.log(`⚠️ Erro de conexão: ${err.message}`);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("room_created", (id: string) => {
      console.log("Sala criada recebida com sucesso:", id);

      setCreatedRoomCode(id);
    });

    socket.on("failed_to_join_room", (message: string) => {
      setJoinRoomErrorMessage(message);
    });

    // TODO tipar
    socket.on("game_started", (initialGameData) => {
      setJoinRoomErrorMessage(null);

      console.log("Jogo iniciado com dados:", initialGameData);

      const myInitialData = initialGameData.players[socket.id];

      if (myInitialData) {
        handleSetInitialGameData({
          mySymbol: myInitialData.symbol,
          shouldPlayFirst: myInitialData.shouldPlayFirst,
        });
      }

      navigateToScreen(GAME_SCREENS.GAME);
    });

    socket.on("room_left", () => {
      console.log("Saiu da sala com sucesso.");

      setCreatedRoomCode(null);
    });

    return () => {
      socket.off("room_created");
      socket.off("room_left");
      socket.off("failed_to_join_room");
      socket.off("game_started");
    };
  }, [socket, navigateToScreen, handleSetInitialGameData]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        isConnected,
        joinRoomErrorMessage,
        emitCreateRoom,
        createdRoomCode,
        emitLeaveRoom,
        emitJoinRoom,
        clearJoinError,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket deve ser usado dentro de um SocketProvider");
  }
  return context;
}
