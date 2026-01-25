"use client";

import { type HTMLMotionProps, motion } from "motion/react";
import type { MouseEvent, ReactNode } from "react";
import { useGameSounds } from "@/hooks/useGameSounds";
import type { ButtonSoundType } from "@/types/Game";
import { cn } from "@/utils/cn";

interface ButtonProps extends HTMLMotionProps<"button"> {
  children: ReactNode;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg" | "xl";
  icon?: ReactNode;
  sound?: ButtonSoundType;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  icon,
  className,
  onClick,
  sound = "tap",
  ...props
}: ButtonProps) {
  const { playTapSound } = useGameSounds();

  const soundMap: Partial<Record<ButtonSoundType, (() => void) | undefined>> = {
    tap: playTapSound,
  };

  const variants = {
    primary: cn(
      "bg-amber-400 border-amber-600 text-slate-900",
      "hover:bg-amber-300 hover:border-amber-500",
      "dark:bg-amber-500 dark:border-amber-700 dark:text-white",
      "dark:hover:bg-amber-400 dark:hover:border-amber-600",
    ),
    secondary: cn(
      "bg-white border-slate-200 text-slate-600",
      "hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300",
      "dark:bg-slate-700 dark:border-slate-900 dark:text-slate-200",
      "dark:hover:bg-slate-600 dark:hover:text-white dark:hover:border-slate-800",
    ),
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs border-b-[2px] active:mt-[2px] min-h-[32px]",
    md: "px-6 py-3 text-base border-b-[3px] active:mt-[3px] min-h-[48px]",
    lg: "px-8 py-4 text-lg border-b-[4px] active:mt-[4px] min-h-[64px]",
    xl: "px-10 py-5 text-2xl border-b-[4px] active:mt-[4px] min-h-[80px]",
  };

  const getClickDepth = () => {
    if (size === "xl" || size === "lg") return 4;
    if (size === "md") return 3;
    return 2;
  };

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const playButtonSound = soundMap[sound];

    if (playButtonSound) {
      playButtonSound();
    }

    onClick?.(e);
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95, y: getClickDepth() }}
      className={cn(
        "group relative flex cursor-pointer items-center justify-center gap-3 overflow-hidden rounded-xl font-bold uppercase tracking-wider shadow-sm transition-colors",
        "active:border-b-0 active:shadow-none",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {icon && (
        <span
          className={
            "flex items-center justify-center transition-transform duration-300 group-hover:-translate-x-1"
          }
        >
          {icon}
        </span>
      )}

      <span
        className={cn(
          "relative z-10 flex items-center gap-2",
          variant === "primary" &&
            "drop-shadow-[1px_2px_0_rgba(0,0,0,0.15)] tracking-[0.10em]",
        )}
      >
        {children}
      </span>

      {variant === "primary" && (
        <div className="absolute inset-0 z-0 bg-linear-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:animate-shimmer group-hover:opacity-100" />
      )}
    </motion.button>
  );
}
