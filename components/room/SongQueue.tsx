"use client";
import React from "react";
import { ArrowBigUp, Music, Trash2, Disc } from "lucide-react";
// import { Song, User } from '../types';
import { motion, AnimatePresence } from "framer-motion";
import useUserStore from "@/store/useUserStore";
import { removeSong, upvoteSong } from "@/actions/song.action";
import { useRouter } from "next/navigation";
import { Song } from "@/types";



interface SongQueueProps {
  songs: Song[];
  currentSongId?: string;
  isPlaying?: boolean;
}

export default function SongQueue({
  songs,
  currentSongId,
  isPlaying,
} : SongQueueProps) {

  const router = useRouter();
  const userRole = useUserStore((state) => state.role);

    const handleVote = async (songId: string) => {
    await upvoteSong(songId);
    router.refresh(); 
  };

  const handleRemoveSong = async (songId : string) => {
    await removeSong(songId);
    router.refresh();
  }
console.log("Data in prosp is ", songs)
  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-black tracking-tight mb-1">
            Upcoming Vibes
          </h2>
          <p className="text-sm text-white/40 font-medium">
            Songs are played based on community upvotes.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-2xl border border-white/10">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-glow shadow-emerald-400/50"></div>
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400/80">
            Real-time sync
          </span>
        </div>
      </div>

      <div className="space-y-4 overflow-y-auto max-h-full pr-2 custom-scrollbar">
        <AnimatePresence mode="popLayout" initial={false}>
          {songs.map((song, index) => (
            <motion.div
              layout
              key={song.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className={`flex items-center justify-between p-5 bg-white/[0.03] rounded-3xl hover:bg-white/[0.07] transition-all group border border-transparent shadow-sm ${
                currentSongId === song.id ? "bg-brand/5 border-brand/20" : ""
              }`}
            >
              <div className="flex items-center gap-6 flex-1 min-w-0">
                <span className="text-white/20 font-mono text-base w-6 flex-shrink-0 text-center font-bold">
                  {(index + 1).toString().padStart(2, "0")}
                </span>

                <div className="relative w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 shadow-2xl group-hover:shadow-brand/20 transition-all border border-white/10">
                  {song.sThumbnail && song.title  && (<img
                    src={song.sThumbnail}
                    alt={song.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />)}
                  {currentSongId === song.id && isPlaying && (
                    <div className="absolute inset-0 bg-brand/40 flex items-center justify-center backdrop-blur-[2px]">
                      <Disc className="w-8 h-8 text-white animate-spin-slow" />
                    </div>
                  )}
                </div>

                <div className="truncate pr-4">
                  <p
                    className={`text-lg font-black truncate tracking-tight mb-0.5 ${
                      currentSongId === song.id
                        ? "text-brand-light"
                        : "text-white"
                    }`}
                  >
                    {song.title}
                  </p>
                  <div className="flex items-center gap-2 overflow-hidden">
                    {/* <p className="text-sm text-white/40 font-bold truncate group-hover:text-white/60 transition-colors uppercase tracking-widest text-[10px]">
                      {song.artist}
                    </p> */}
                    <span className="w-1 h-1 bg-white/20 rounded-full flex-shrink-0"></span>
                    <p className="text-[10px] text-white/20 font-medium truncate italic">
                      Added by {song?.addedBy.name}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <motion.div
                  className="text-right hidden sm:block"
                  initial={false}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-xl font-black text-brand-light flex items-center justify-end">
                    <span className="text-xs mr-1 opacity-50">+</span>
                   {song?._count?.upvotes ?? 0}
                  </p>
                  <p className="text-[9px] text-white/20 uppercase font-black tracking-widest">
                    Votes
                  </p>
                </motion.div>

                <div className="flex items-center gap-2 bg-black/40 p-1.5 rounded-2xl border border-white/5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleVote(song.id)
                    }}
                    className="px-4 py-2 rounded-xl bg-brand/10 hover:bg-brand text-brand-light hover:text-white transition-all active:scale-95 flex items-center gap-2 border border-brand/20 hover:border-brand shadow-lg hover:shadow-brand/20"
                  >
                    <ArrowBigUp className="w-5 h-5 fill-current" />
                    <span className="text-xs font-black uppercase tracking-widest hidden sm:inline">
                      Upvote
                    </span>
                  </button>

                  {userRole === "HOST" && removeSong && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeSong(song.id);
                      }}
                      className="p-2.5 rounded-xl hover:bg-red-500/20 text-white/20 hover:text-red-400 transition-all group/trash"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {songs.length === 0 && (
          <div className="py-20 flex flex-col items-center justify-center text-white/10 gap-4 border-2 border-dashed border-white/5 rounded-[2rem]">
            <Music className="w-16 h-16 opacity-30 animate-pulse" />
            <div className="text-center">
              <p className="text-lg font-black uppercase tracking-widest mb-1 italic">
                Silent Room
              </p>
              <p className="text-xs font-medium opacity-50">
                Be the first to break the silence and add a vibe.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
