import type { IconProps } from "@/types/Icon";
import { cn } from "@/utils/cn";

export function ArrowLeftIcon({ className, ...props }: IconProps) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
      aria-hidden="true"
      className={cn(className)}
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
