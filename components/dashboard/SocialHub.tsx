"use client"
import { TrendingUp } from 'lucide-react'
import React from 'react'
import ActivityItem from './ActivityItem'

function SocialHub() {
  return (
    <>
      <aside className="col-span-12 lg:col-span-4">
              <h2 className="text-xl font-bold tracking-tight mb-6 text-white">Social Hub</h2>
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col gap-6 shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[40px] rounded-full group-hover:bg-indigo-500/20 transition-all"></div>
                
                <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-1">Live Activity</p>
                <div className="flex flex-col gap-4 relative z-10">
                  <ActivityItem emoji="🔥" user="Sarah J." action="upvoted" track="Heat Waves" time="2 mins ago" />
                  <ActivityItem emoji="✨" user="Mike D." action="shared" track="Late Night Room" time="15 mins ago" />
                  <ActivityItem emoji="🎧" user="Elena K." action="listening" track="Stardust" time="Jut now" />
                </div>

                <div className="h-px bg-white/10 my-1"></div>
                
                <div className="space-y-4">
                  <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">142 Active in Room</p>
                  <div className="flex -space-x-2">
                    {[1,2,3,4,5].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-surface bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center text-[10px] font-bold shadow-lg">
                        {String.fromCharCode(64 + i)}
                      </div>
                    ))}
                    <div className="w-8 h-8 rounded-full bg-white/10 border-2 border-surface flex items-center justify-center text-[10px] font-bold text-white/60">
                      +137
                    </div>
                  </div>
                </div>

                <button className="w-full py-3 bg-white/5 border border-white/10 rounded-2xl text-xs font-bold hover:bg-white/10 transition-all uppercase tracking-widest">
                  Invite Friends
                </button>
              </div>

              <div className="mt-8 p-6 glass rounded-3xl border-indigo-500/20 bg-indigo-500/5">
                 <h4 className="font-bold text-sm mb-2 flex items-center gap-2 tracking-tight">
                   <TrendingUp className="w-4 h-4 text-indigo-400" />
                   Upvoting Tips
                 </h4>
                 <p className="text-[11px] text-white/50 leading-relaxed">
                   The song at position #01 is played automatically. Keep voting to keep your favorite tracks alive!
                 </p>
              </div>
            </aside>
      
    </>
  )
}

export default SocialHub
