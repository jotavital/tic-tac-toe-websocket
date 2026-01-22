import type { ComponentProps } from "react";
import { cn } from "@/utils/cn";

interface Props extends ComponentProps<"svg"> {}

export function ArrowLeftIcon({ className, ...props }: Props) {
  return (
    <svg
      className={cn(className)}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
      aria-hidden="true"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10 19l-7-7m0 0l7-7m-7 7h18"
      />
    </svg>
  );
}
