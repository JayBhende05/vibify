"use client"
export function ActivityToggle({ icon, user, action, track, time }: any) {
  return (
    <div className="flex items-start gap-4">
      <span className="text-xl leading-none">{icon}</span>
      <div className="min-w-0">
        <p className="text-[13px] font-medium leading-tight text-white/60">
          <span className="text-white font-bold">{user}</span> {action} <span className="text-brand-light font-bold truncate">{track}</span>
        </p>
        <span className="text-[10px] text-white/20 font-bold uppercase tracking-widest mt-1 block">{time}</span>
      </div>
    </div>
  );
}