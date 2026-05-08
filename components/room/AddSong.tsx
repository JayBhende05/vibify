"use client";

import React, { useState } from "react";
import { Plus, Music2, Link as LinkIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useRoomDetails } from "@/store/room";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
// import { param } from "framer-motion/client";

type FormValues = {
  url: string;
};

export default function AddSong({roomId } ) {
  const [isExpanding, setIsExpanding] = useState(false);
  
  console.log("Room id in add song", roomId )
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const url = watch("url");
const router = useRouter()
  async function onSubmit(data: FormValues) {
    console.log("FORM SUBMITTED:", data);

    if (!session?.user?.id) {
      console.log("No session");
      return;
    }

    if (!roomId) {
      console.log("Jooin a Room");
      return;
    }

    try {
      console.log({
        url: data.url,
        userId: session.user.id,
        roomId: roomId,
      })
      const res = await axios.post("/api/stream", {
        url: data.url,
        creatorId: session.user.id,
        roomId: roomId,
      });

      console.log("✅ API success:", res.data);
      reset()
    } catch (err) {
      console.error("❌ API error:", err);
    }
  }

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-black tracking-tight">Contributing</h3>
        <div className="flex items-center gap-3">
          <Music2 className="w-5 h-5 text-emerald-400 opacity-60" />
          <span className="text-[10px] uppercase font-black text-white/30 tracking-widest">
            Supported links
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="relative group">
        {/* Icon */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-white/40 group-focus-within:text-brand-light transition-colors group-focus-within:bg-brand/10 group-focus-within:border-brand/20">
          <LinkIcon className="w-4 h-4" />
        </div>

        {/* Input */}
        <input
          type="text"
          placeholder="Paste a YouTube or Spotify URL here..."
          {...register("url", { required: "URL is required" })}
          className="w-full bg-white/5 border border-white/10 rounded-[2rem] py-6 pl-16 pr-44 text-base focus:outline-none focus:border-brand/40 focus:bg-white/[0.07] transition-all font-medium placeholder:text-white/20 shadow-inner group-hover:border-white/20"
          onFocus={() => setIsExpanding(true)}
        />

        {/* Error */}
        {errors.url && (
          <p className="text-red-500 text-xs mt-2 ml-4">
            {errors.url.message}
          </p>
        )}

        {/* Button */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
          <button
            type="submit"
            disabled={!url?.trim() || isSubmitting || !session}
            className="px-8 py-4 bg-brand text-white rounded-full font-black text-xs uppercase tracking-widest hover:bg-brand-light transition-all active:scale-95 shadow-xl shadow-brand/40 disabled:opacity-50 disabled:bg-white/10 disabled:shadow-none flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            {isSubmitting ? "Adding..." : "Add to Vibe"}
          </button>
        </div>
      </form>

      <p className="mt-4 text-[10px] text-white/20 font-medium text-center uppercase tracking-[0.2em]">
        Collaborative queue: Everyone gets a say in the sound.
      </p>
    </div>
  );
}