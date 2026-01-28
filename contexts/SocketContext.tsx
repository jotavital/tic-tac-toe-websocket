"use client";

import type React from "react";
import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { io, type Socket } from "socket.io-client";

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  roomCode: string | null;
  joinRoomErrorMessage: string | null;
  emitCreateRoom: () => void;
  emitLeaveRoom: () => void;
  emitJoinRoom: (roomCode: string) => void;
  clearJoinError: () => void;
  setJoinRoomErrorMessage: Dispatch<SetStateAction<string | null>>;
}

const SocketContext = createContext<SocketContextType | null>(null);

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [roomCode, setRoomCode] = useState<string | null>(null);
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
    if (socket && roomCode) {
      socket.emit("leave_room", roomCode);

      console.log(
        "Evento 'leave_room' emitido ao servidor para a sala:",
        roomCode,
      );
    }
  }, [socket, roomCode]);

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

      setRoomCode(id);
    });

    socket.on("room_joined", (id: string) => {
      console.log("Entrou na sala:", id);

      setRoomCode(id);
      setJoinRoomErrorMessage(null);
    });

    socket.on("failed_to_join_room", (message: string) => {
      setJoinRoomErrorMessage(message);
    });

    socket.on("room_left", () => {
      console.log("Saiu da sala com sucesso.");

      setRoomCode(null);
    });

    return () => {
      socket.off("room_created");
      socket.off("room_left");
      socket.off("room_joined");
      socket.off("failed_to_join_room");
    };
  }, [socket]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        isConnected,
        joinRoomErrorMessage,
        setJoinRoomErrorMessage,
        emitCreateRoom,
        roomCode: roomCode,
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
