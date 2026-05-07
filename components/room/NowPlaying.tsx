// "use client"
// // import React from 'react';
// // import { Heart, Play, TrendingUp } from 'lucide-react';
// // import { Song, User } from '../types';
// // import { motion } from 'framer-motion';
// import React, { useState } from 'react';
// import { Heart, Play, TrendingUp, Maximize2, Volume2 } from 'lucide-react';
// // import { Song, User } from '../types';
// // import { motion } from 'motion/react';
// // import { getYouTubeId } from '../lib/youtube';

// // interface NowPlayingProps {
// //   song?: Song;
// //   user: User;
// //   onSkip?: () => void;
// // }
// import { useRouter } from "next/navigation";
// import { removeSong } from '@/actions/song.action';
// export default function NowPlaying({ song, user }) {
//   const [showPlayer, setShowPlayer] = useState(false);
//   // const videoId = song ? getYouTubeId(song.url) : null;
// const router = useRouter();

// const handleSkip = async () => {
//   await removeSong(song.id);
//   router.refresh();
// };
//   if (!song) {
//     return (
//       <section className="h-72 relative rounded-[2rem] overflow-hidden shadow-2xl border border-white/5 bg-gradient-to-br from-white/5 to-white/[0.02] flex items-center justify-center">
//         <p className="text-white/20 italic font-medium">Waiting for the first video to be added...</p>
//       </section>
//     );
//   }

//   return (
//     <section className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 mb-12 bg-black min-h-[400px]">
//       {!showPlayer ? (
//         <>
//           <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-10"></div>
//           <img 
   
//             src={song.sThumbnail} 
//             alt="HeroBackground" 
//             className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
//           />
          
//           <div className="relative z-20 h-full p-10 flex flex-col justify-center min-h-[400px]">
//             <div className="flex items-center gap-2 mb-6">
//               <span className="bg-brand text-[10px] font-bold px-3 py-1 rounded-sm uppercase tracking-widest shadow-xl shadow-brand/40">Up Next</span>
//               <span className="text-white/60 text-[10px] font-black bg-white/10 px-3 py-1 rounded-full backdrop-blur-md border border-white/10 flex items-center gap-1.5 uppercase tracking-widest">
//                 <TrendingUp className="w-3 h-3 text-brand-light" />
//                 {song?._count?.upvotes ?? 0} Upvotes
//               </span>
//             </div>
            
//             <div
              
//             >
//               <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-2 tracking-tighter drop-shadow-2xl text-white">
//                 {song.title}
//               </h1>
//               {/* <p className="text-xl text-white/70 font-semibold mb-8 drop-shadow-lg">
//                 {song.artist}
//               </p> */}
//             </div>

//             <div className="flex items-center gap-4">
//               <button 
//                 onClick={() => setShowPlayer(true)}
//                 className="px-10 py-4 bg-white text-black rounded-full font-black text-sm uppercase tracking-widest hover:bg-white/90 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-black/50 flex items-center gap-2"
//               >
//                 <Play className="w-4 h-4 fill-current" />
//                 Start Stream
//               </button>
              
//               {user.role === 'host' && (
//                  <button 
//                     onClick={handleSkip}
//                     className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-white/20 transition-all active:scale-95"
//                   >
//                    Skip
//                  </button>
//               )}

//               <button className="p-4 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-brand/40 hover:border-brand/40 transition-all group active:scale-90 ml-auto">
//                 <Heart className="w-5 h-5 group-hover:fill-current text-white" />
//               </button>
//             </div>
//           </div>
//         </>
//       ) : (
//         <div className="aspect-video w-full h-full relative group">
//           <iframe 
//             src={`https://www.youtube.com/embed/${song.extractedId}?autoplay=1&controls=0&modestbranding=1&rel=0`}
            
//             className="w-full h-full"
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//             allowFullScreen
//           />
          
//           {/* Overlay controls for a more custom feel */}
//           <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between">
//             <div className="flex items-center gap-4">
//               <button 
//                 onClick={() => setShowPlayer(false)}
//                 className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
//               >
//                 <Maximize2 className="w-4 h-4" />
//               </button>
//               <div>
//                 <p className="text-xs font-bold text-white mb-0.5">{song.title}</p>
//                 <p className="text-[10px] text-white/60 uppercase tracking-widest">{song.artist}</p>
//               </div>
//             </div>
            
//             <div className="flex items-center gap-3">
//               <Volume2 className="w-4 h-4 text-white/60" />
//               <div className="w-24 h-1 bg-white/20 rounded-full overflow-hidden">
//                 <div className="w-2/3 h-full bg-brand"></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// }



"use client";

import React, { useRef, useState } from "react";
import YouTube from "react-youtube";
import {
  Heart,
  Play,
  Pause,
  TrendingUp,
  Maximize2,
  Volume2,
  VolumeX,
  SkipForward,
} from "lucide-react";

import { useRouter } from "next/navigation";
import { removeSong } from "@/actions/song.action";

export default function NowPlaying({ song, user }) {
  const [showPlayer, setShowPlayer] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  const playerRef = useRef<any>(null);

  const router = useRouter();

  const handleSkip = async () => {
    await removeSong(song.id);
    router.refresh();
  };

  const onReady = (event: any) => {
    playerRef.current = event.target;
  };

  const togglePlay = () => {
    if (!playerRef.current) return;

    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }

    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!playerRef.current) return;

    if (isMuted) {
      playerRef.current.unMute();
    } else {
      playerRef.current.mute();
    }

    setIsMuted(!isMuted);
  };

  const enterFullscreen = () => {
    const iframe = document.querySelector("iframe");

    if (iframe?.requestFullscreen) {
      iframe.requestFullscreen();
    }
  };

  if (!song) {
    return (
      <section className="h-72 relative rounded-[2rem] overflow-hidden shadow-2xl border border-white/5 bg-gradient-to-br from-white/5 to-white/[0.02] flex items-center justify-center">
        <p className="text-white/20 italic font-medium">
          Waiting for the first video to be added...
        </p>
      </section>
    );
  }

  return (
    <section className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 mb-12 bg-black min-h-[400px]">
      {!showPlayer ? (
        <>
          <img
            src={song.sThumbnail}
            alt="HeroBackground"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/50" />

          <div className="relative z-20 h-full p-10 flex flex-col justify-center min-h-[400px]">
            <h1 className="text-5xl font-black text-white mb-6">
              {song.title}
            </h1>

            <div className="flex gap-4">
              <button
                onClick={() => setShowPlayer(true)}
                className="px-8 py-4 bg-white text-black rounded-full font-bold flex items-center gap-2"
              >
                <Play className="w-4 h-4 fill-current" />
                Start Stream
              </button>

              {user.role === "host" && (
                <button
                  onClick={handleSkip}
                  className="px-8 py-4 bg-white/10 text-white rounded-full"
                >
                  Skip
                </button>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="relative aspect-video w-full group">
          <YouTube
            videoId={song.extractedId}
            onReady={onReady}
            opts={{
              width: "100%",
              height: "100%",
              playerVars: {
                autoplay: 1,
                controls: 0,
                modestbranding: 1,
                rel: 0,
              },
            }}
            className="w-full h-full"
          />

          {/* Custom Controls */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 text-white" />
                ) : (
                  <Play className="w-5 h-5 text-white fill-current" />
                )}
              </button>

              <button
                onClick={toggleMute}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20"
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5 text-white" />
                ) : (
                  <Volume2 className="w-5 h-5 text-white" />
                )}
              </button>

              {user.role === "host" && (
                <button
                  onClick={handleSkip}
                  className="p-3 rounded-full bg-white/10 hover:bg-white/20"
                >
                  <SkipForward className="w-5 h-5 text-white" />
                </button>
              )}

              <div className="ml-4">
                <p className="text-white font-bold text-sm">
                  {song.title}
                </p>
                <p className="text-white/60 text-xs">
                  {song.artist}
                </p>
              </div>
            </div>

            <button
              onClick={enterFullscreen}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20"
            >
              <Maximize2 className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

