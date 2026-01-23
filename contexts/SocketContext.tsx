"use client";

import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { io, type Socket } from "socket.io-client";

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextType | null>(null);

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

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

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
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
