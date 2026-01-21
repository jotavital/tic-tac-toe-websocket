"use client";

import { type HTMLMotionProps, motion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

interface ButtonProps extends HTMLMotionProps<"button"> {
  children: ReactNode;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  icon,
  className,
  ...props
}: ButtonProps) {
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
      "dark:bg-slate-800 dark:border-slate-950 dark:text-slate-400",
      "dark:hover:bg-slate-700 dark:hover:text-slate-200",
    ),
  };

  const sizes = {
    sm: "px-4 py-2 text-xs border-b-[2px] active:mt-[2px]",
    md: "px-6 py-3 text-sm border-b-[3px] active:mt-[3px]",
    lg: "px-8 py-4 text-2xl border-b-[4px] active:mt-[4px]",
  };

  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95, y: size === "lg" ? 4 : size === "md" ? 3 : 2 }}
      className={cn(
        "group relative flex cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-xl font-bold uppercase tracking-wider shadow-sm transition-colors",
        "active:border-b-0 active:shadow-none",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {icon && (
        <span
          className={cn(
            "flex items-center justify-center transition-transform duration-300",
            variant === "secondary" && "group-hover:-translate-x-1",
          )}
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
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:animate-shimmer group-hover:opacity-100" />
      )}
    </motion.button>
  );
}
