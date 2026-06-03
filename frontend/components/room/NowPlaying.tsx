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
import { Song } from "@/types";
import { strict } from "assert";

type PlayingSuccess = {
    id: string;
    type: "Youtube" | "Spotify";
    roomId: string;
    url: string;
    extractedId: string;
    sThumbnail: string | null;
    bThumbnail: string | null;
    active: boolean;
    addedById: string;
    createdAt: Date;
    updatedAt: Date;
    addedBy: {
      id: string;
      name: string;
      email: string;
      provider: "Google" | "Credentials";
    };
    _count: {
      upvotes: number;
    };
    title?: string | null | undefined;
 
};
interface UserRole{
  role : "HOST" | "USER"
}



interface NowPlayingProps {
  song?: PlayingSuccess;
  user: UserRole
  roomId : string
}

export default function NowPlaying({ song, user, roomId }: NowPlayingProps) {
  const [showPlayer, setShowPlayer] = useState<Boolean>(false);
  const [isPlaying, setIsPlaying] = useState<Boolean>(true);
  const [isMuted, setIsMuted] = useState<Boolean>(false);

  const playerRef = useRef<any>(null);

  const router = useRouter();

  const handleSkip = async () => {
    await removeSong(song?.id || "", roomId);
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
            src={song?.sThumbnail || ""}
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

              {user.role === "HOST" && (
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

              {user.role === "HOST" && (
                <button
                  onClick={handleSkip}
                  className="p-3 rounded-full bg-white/10 hover:bg-white/20"
                >
                  <SkipForward className="w-5 h-5 text-white" />
                </button>
              )}

              <div className="ml-4">
                <p className="text-white font-bold text-sm">{song.title}</p>
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
