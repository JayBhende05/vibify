
export default function ActivityItem({ emoji, user, action, track, time }: { emoji: string, user: string, action: string, track: string, time: string }) {
  return (
    <div className="flex gap-4 group cursor-pointer">
      <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 text-xs shadow-inner">
        {emoji}
      </div>
      <div className="text-[11px] leading-tight">
        <span className="font-bold text-white/90">{user}</span>
        <span className="text-white/40"> {action} </span>
        <span className="text-brand-light font-semibold tracking-tight">{track}</span>
        <p className="text-[10px] text-white/20 mt-1 font-medium">{time}</p>
      </div>
    </div>
  );
}