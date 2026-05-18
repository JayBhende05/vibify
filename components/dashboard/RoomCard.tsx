
import React from 'react';
import { Users, ArrowRight } from 'lucide-react';
import { Room } from '@/types';

interface RoomCardProps {
  room: Room;
  role: 'host' | 'participant';
  onClick: () => void;
}

export default function RoomCard({ room, role, onClick }: RoomCardProps) {
  return (
    <div 
      onClick={onClick}
      className="group relative bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/[0.08] transition-all cursor-pointer overflow-hidden shadow-xl"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-brand/5 blur-2xl group-hover:bg-brand/10 transition-colors"></div>
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-gradient p-0.5 shadow-lg shadow-brand/20">
            <div className="w-full h-full bg-surface rounded-[14px] flex items-center justify-center overflow-hidden">
               {/* {room.cover ? (
                 <img src={room.cover} alt="" className="w-full h-full object-cover" />
               ) : ( */}
                 <div className="w-2 h-2 bg-brand rounded-full animate-pulse" />
               {/* )} */}
            </div>
          </div>
          <span className={`px-2 py-1 rounded text-[9px] font-black uppercase tracking-widest ${
            role === 'host' ? 'bg-brand/20 text-brand-light' : 'bg-emerald-500/10 text-emerald-400'
          }`}>
            {role === 'host' ? 'My Room' : 'Joined'}
          </span>
        </div>

        <h3 className="text-xl font-black tracking-tight mb-1 group-hover:text-brand-light transition-colors">{room.roomName}</h3>
        <p className="text-xs text-white/40 font-medium mb-6">Hosted by {room.hostName}</p>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-bold text-white/60">
            <Users className="w-3.5 h-3.5" />
            <span>{room.activeUsers}</span>
          </div>
          
          <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-light group-hover:translate-x-1 transition-transform">
            Enter Room
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
