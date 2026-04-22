"use client"
import { ArrowBigDown, ArrowBigUp, Disc } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";

function SongList({props}:any) {
  return (
    <>
      <motion.div
        layout
        key={25}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98 }}
        className={`flex items-center justify-between p-4 bg-white/5 rounded-2xl hover:bg-white/[0.08] transition-all group cursor-pointer border border-transparent shadow-sm 
        }`}
        // after shadow-sm above ${ currentSong?.id === song.id ? "bg-white/[0.1] border-white/10" : ""
        // onClick={() => setCurrentSong(song)}
      >
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <span className="text-white/20 font-mono text-sm w-4 flex-shrink-0">
            {/* {(index + 1).toString().padStart(2, "0")} */}
          </span>
          <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 shadow-md relative group-hover:shadow-indigo-500/20 transition-all">
            {/* <img
              src={song.cover}
              alt={song.title}
              className="w-full h-full object-cover"
            /> */}
            {/* {currentSong?.id === song.id && isPlaying && ( */}
              <div className="absolute inset-0 bg-brand/40 flex items-center justify-center backdrop-blur-[2px]">
                <Disc className="w-6 h-6 text-white animate-spin-slow" />
              </div>
            {/* )} */}
          </div>
          <div className="truncate">
            <p
              // className={`font-bold truncate tracking-tight ${
              //   currentSong?.id === song.id ? "text-brand-light" : ""
              // }`}
              className={`font-bold truncate tracking-tight text-brand-light `}
            >
              {/* {song.title} */}
              Animals
            </p>
            <p className="text-xs text-white/40 font-medium truncate">
              {/* {song.artist} */}
              Martin Garix
            </p>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <motion.div
            className="text-right"
            initial={false}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.3 }}
          >
            {/* <p className="text-xs font-bold text-brand-light">+{song.votes}</p> */}
            <p className="text-xs font-bold text-brand-light">+35</p>
            <p className="text-[9px] text-white/30 uppercase font-black tracking-tighter">
              Votes
            </p>
          </motion.div>
          <div className="flex items-center gap-1 bg-black/20 p-1 rounded-full border border-white/5">
            <button
              //  onClick={(e) => {
              //    e.stopPropagation();
              //    handleVote(song.id, 1);
              //  }}
              className="p-2 rounded-full border border-transparent hover:bg-brand hover:border-brand text-white transition-all active:scale-90"
            >
              <ArrowBigUp className="w-4 h-4 fill-current" />
            </button>
            <button
              //  onClick={(e) => {
              //    e.stopPropagation();
              //    handleVote(song.id, -1);
              //  }}
              className="p-2 rounded-full border border-transparent hover:bg-red-500 hover:border-red-500 text-white transition-all active:scale-90"
            >
              <ArrowBigDown className="w-4 h-4 fill-current" />
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default SongList;
