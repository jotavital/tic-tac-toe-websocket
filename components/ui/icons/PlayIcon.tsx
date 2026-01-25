import type { ComponentProps } from "react";
import { cn } from "@/utils/cn";

interface IconProps extends ComponentProps<"svg"> {}

export function PlayIcon({ className, ...props }: IconProps) {
  return (
    <svg
      fill="currentColor"
      stroke="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(className)}
      {...props}
    >
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
