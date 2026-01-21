export function XIcon() {
  return (
    <svg className="h-16 w-16 text-game-x" viewBox="0 0 100 100">
      <path
        d="M 25 25 L 75 75 M 75 25 L 25 75"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
        fill="transparent"
      />
    </svg>
  );
}

export function OIcon() {
  return (
    <svg className="h-16 w-16 text-game-o" viewBox="0 0 100 100">
      <circle
        cx="50"
        cy="50"
        r="30"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
        fill="transparent"
      />
    </svg>
  );
}
