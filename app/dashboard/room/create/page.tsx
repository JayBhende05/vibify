"use client";

import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Music, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import {createRoom} from "@/actions/room.actions";
import { CreateRoomInput, createRoomSchema } from "@/schemas/room/createRoom";
import { zodResolver } from "@hookform/resolvers/zod";


export default function CreateRoom() {
  const { data: session, status } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateRoomInput>({
   resolver : zodResolver(createRoomSchema)
  });
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (data: any) => {
    setLoading(true);

  const res = await createRoom(data, session?.user.id!);

  if (!res.success) {
    setError(res.error?.toString() || "Failed to create room");
    setLoading(false);
    return;
  }

  router.push(`/dashboard/room/${res.roomId}`);
  };

  if (!session?.user) {
    redirect("/auth/login");
  }
  return (
    <div className="max-w-xl mx-auto mt-10 bg-white/5 border border-white/10 rounded-2xl p-8 shadow-lg">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <Music className="w-5 h-5 text-brand" />
        <h1 className="text-xl font-bold">Create a Room</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Room Name */}
        <div className="mb-4">
          <label className="text-xs text-white/60">Room Name</label>
          <input
            type="text"
            {...register("roomName", { required: true })}
            placeholder="e.g. Chill Vibes, Party Mode..."
            className="w-full mt-2 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-brand/40"
          />
          {errors.roomName && (
            <p className="text-xs text-red-400 mt-1">Room Name is required</p>
          )}
        </div>

        {/* Error */}
        {error && <p className="text-xs text-red-400 mb-3">{error}</p>}

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-brand text-black font-semibold py-2 rounded-lg hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Creating...
            </>
          ) : (
            "Create Room"
          )}
        </button>
      </form>
    </div>
  );
}