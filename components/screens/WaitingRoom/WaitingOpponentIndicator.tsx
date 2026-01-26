export function WaitingOpponentIndicator() {
  return (
    <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400 bg-white/50 dark:bg-black/20 px-6 py-3 rounded-full animate-pulse">
      <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" />
      <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.15s]" />
      <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.3s]" />
      <span className="text-sm font-bold ml-1">AGUARDANDO OPONENTE...</span>
    </div>
  );
}
