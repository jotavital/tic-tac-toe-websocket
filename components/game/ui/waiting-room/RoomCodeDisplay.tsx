import { useState } from "react";
import { CheckIcon } from "@/components/ui/icons/CheckIcon";
import { CopyIcon } from "@/components/ui/icons/CopyIcon";

interface Props {
  roomCode: string | null;
}

export function RoomCodeDisplay({ roomCode }: Props) {
  const [codeCopiedToClipboard, setCodeCopiedToClipboard] = useState(false);

  const handleCopyCodeToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(roomCode ?? "");
      setCodeCopiedToClipboard(true);

      setTimeout(() => setCodeCopiedToClipboard(false), 2000);
    } catch (err) {
      console.error("Falha ao copiar:", err);
    }
  };

  return (
    <div
      onClick={handleCopyCodeToClipboard}
      className="group relative flex items-center justify-center w-full bg-slate-100 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 rounded-2xl p-8 cursor-pointer hover:border-blue-400 dark:hover:border-blue-500 transition-colors"
    >
      <span className="text-5xl md:text-6xl font-black font-mono tracking-[0.2em] text-slate-900 dark:text-white select-all">
        {roomCode}
      </span>

      <div className="absolute top-3 right-3 opacity-30 group-hover:opacity-100 transition-opacity">
        {codeCopiedToClipboard ? (
          <span className="text-green-500 text-xs font-bold flex items-center gap-1 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded">
            COPIADO <CheckIcon className="w-3 h-3" />
          </span>
        ) : (
          <span className="text-slate-400 text-xs font-bold flex items-center gap-1 bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded">
            COPIAR <CopyIcon className="w-3 h-3" />
          </span>
        )}
      </div>
    </div>
  );
}
