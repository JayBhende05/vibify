"use client"
import React, { useEffect, useState } from 'react';
import { Share2, Check, Copy, Users } from 'lucide-react';


export default function RoomHeader({ room }:any) {
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if(!room){
    return <div> 
     Loading
    </div>
  }

console.log(room);

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
      <div>
        <div className="flex items-center gap-3 mb-1">
          <h1 className="text-3xl font-black tracking-tighter">{room.roomName}</h1>
          <span className="px-2 py-0.5 bg-brand/20 text-brand-light text-[10px] font-black uppercase rounded border border-brand/20">LIVE</span>
        </div>
        <div className="flex items-center gap-4 text-sm font-medium text-white/40">
          <p>Hosted by <span className="text-white">{room.hostName}</span></p>
          <div className="w-1 h-1 bg-white/20 rounded-full"></div>
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4" />
            {/* <span>{rooom.activeUsers || "+99"} curating</span> */}
            {/* <span>{ "+99"} curating</span> */}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center bg-white/5 rounded-2xl p-1 border border-white/10">
          <div className="px-4 py-2 text-xs font-mono text-white/40 hidden sm:block">
            {room.roomId}
          </div>
          <button 
            onClick={copyLink}
            className="flex items-center gap-2 px-5 py-2.5 bg-white text-black rounded-xl font-bold text-xs hover:bg-white/90 transition-all active:scale-95 shadow-lg shadow-white/10"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy Id
              </>
            )}
          </button>
        </div>
        
        <button className="p-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all text-white/60 hover:text-white">
          <Share2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
