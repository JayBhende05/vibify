"use client"
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, MoreVertical, PauseIcon, PlayIcon, SkipBack, SkipForward, Volume2 } from 'lucide-react'
import { Play } from 'next/font/google'
import React from 'react'

function Playbar() {
  return (
    <>
     <AnimatePresence>
        {/* {currentSong && ( */}
          <motion.footer 
            initial={{ y: 150, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="fixed bottom-0 left-0 right-0 h-24 bg-black/40 backdrop-blur-xl border-t border-white/10 px-8 flex items-center justify-between z-50 text-white"
          >
            <div className="flex items-center gap-4 w-1/3">
              <div className="w-12 h-12 bg-white/10 rounded-lg overflow-hidden border border-white/20 shadow-lg group relative cursor-pointer">
                {/* <img src={currentSong.cover} alt="Now Playing" className="w-full h-full object-cover" /> */}
                <div className="absolute inset-0 bg-brand/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <ChevronRight className="w-5 h-5 rotate-90 text-white" />
                </div>
              </div>
              <div className="min-w-0">
                {/* <p className="text-sm font-bold truncate tracking-tight">{currentSong.title}</p> */}
                <p className="text-sm font-bold truncate tracking-tight">Animals</p>
                {/* <p className="text-xs text-white/40 font-medium truncate">{currentSong.artist}</p> */}
                <p className="text-xs text-white/40 font-medium truncate">Martin Garix</p>
              </div>
            </div>
            
            <div className="flex flex-col items-center gap-2 w-1/3">
              <div className="flex items-center gap-6">
                <SkipBack className="w-5 h-5 text-white/40 hover:text-white cursor-pointer transition-colors active:scale-90" />
                <button 
                  //  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center cursor-pointer shadow-lg shadow-white/10 hover:scale-105 active:scale-95 transition-all outline-none"
                >
                  {/* {isPlaying ? <PauseIcon className="w-5 h-5 fill-current" /> : <PlayIcon className="w-5 h-5 fill-current ml-1" />} */}
                  <PauseIcon className="w-5 h-5 fill-current" /> 
                </button>
                <SkipForward className="w-5 h-5 text-white/40 hover:text-white cursor-pointer transition-colors active:scale-90" />
              </div>
              <div className="flex items-center gap-3 w-full max-w-md">
                <span className="text-[10px] text-white/30 font-mono">1:42</span>
                <div className="flex-1 h-1 bg-white/10 rounded-full relative overflow-hidden group cursor-pointer">
                  <motion.div 
                    className="absolute inset-0 bg-brand-gradient" 
                    // animate={{ width: isPlaying ? '100%' : '45%' }}
                    // transition={{ duration: isPlaying ? 210 : 0.5, ease: "linear" }}
                  />
                </div>
                {/* <span className="text-[10px] text-white/30 font-mono">{currentSong.duration}</span> */}
                <span className="text-[10px] text-white/30 font-mono">4.55</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-6 w-1/3">
              <div className="flex items-center gap-3 w-32 group">
                 <Volume2 className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
                 <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                   <div className="w-[70%] h-full bg-white/60 rounded-full"></div>
                 </div>
              </div>
              <MoreVertical className="w-4 h-4 text-white/40 hover:text-white cursor-pointer transition-colors" />
            </div>
          </motion.footer>
        {/* )} */}
      </AnimatePresence>
      
    </>
  )
}

export default Playbar
