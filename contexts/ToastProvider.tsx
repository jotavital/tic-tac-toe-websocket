"use client";

import type React from "react";
import { createContext, useCallback, useContext } from "react";
import { Toaster, toast } from "sonner";
import { useTheme } from "@/contexts/ThemeContext";

type ToastContextType = {
  showErrorToast: (message: string) => void;
  showSuccessToast: (message: string) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  const showErrorToast = useCallback((message: string) => {
    toast.error(message);
  }, []);

  const showSuccessToast = useCallback((message: string) => {
    toast.success(message);
  }, []);

  return (
    <ToastContext.Provider value={{ showErrorToast, showSuccessToast }}>
      {children}

      <Toaster position="top-center" richColors theme={theme} closeButton />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast deve ser usado dentro de um ToastProvider");
  }
  return context;
}
