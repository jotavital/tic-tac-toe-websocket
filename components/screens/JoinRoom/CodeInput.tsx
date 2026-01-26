import { motion } from "motion/react";

interface Props {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  error: string | null;
  code: string;
}

export function CodeInput({
  handleInputChange,
  handleKeyDown,
  error,
  code,
}: Props) {
  return (
    <div className="relative group">
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        autoComplete="off"
        value={code}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="0000"
        maxLength={4}
        className={`
              w-full bg-slate-100 dark:bg-slate-800 
              border-2 text-center text-5xl md:text-6xl font-black font-mono tracking-[0.2em]
              text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-700
              rounded-2xl py-6 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all
              ${error ? "border-red-500 focus:border-red-500" : "border-slate-300 dark:border-slate-700 focus:border-blue-500"}
            `}
      />

      {error && (
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -bottom-6 left-0 right-0 text-red-500 text-sm font-bold"
        >
          {error}
        </motion.span>
      )}
    </div>
  );
}
