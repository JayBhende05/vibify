import React, { useState } from 'react';
import { Copy, Check, ExternalLink, Link } from 'lucide-react';
import {  UploadedSong } from '@/types';

interface UploadedLinkProps {
  song: UploadedSong 
}

export default function UploadedLink({ song }: UploadedLinkProps ) {
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(song.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/[0.08] transition-all group">
      <div className="flex items-center gap-4 min-w-0">
        <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-white/10 flex-shrink-0">
          <img src={song?.sThumbnail || ""} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
            {/* <Link className="w-5 h-5 text-white" /> */}
          </div>
        </div>
        <div className="truncate pr-4">
          <p className="text-sm font-bold text-white truncate mb-0.5">{song.title}</p>
          <div className="flex items-center gap-2">
             <span className="text-[10px] text-white/30 font-medium truncate max-w-[200px]">{song.url}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button 
          onClick={copyLink}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
            copied ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-3 h-3" />
              Copied
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              Copy URL
            </>
          )}
        </button>
        <a 
          href={song.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-1.5 rounded-xl bg-white/5 text-white/40 hover:bg-white/10 hover:text-white transition-all"
        >
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}