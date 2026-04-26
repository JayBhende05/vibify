"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Hash, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { JoinRoomInput, joinRoomSchema } from "@/types/room/joinRoom";
import { zodResolver } from "@hookform/resolvers/zod";
import { joinRoom } from "@/actions/room.actions";

export default function JoinRoom() {
  const router = useRouter();
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JoinRoomInput>({
    resolver: zodResolver(joinRoomSchema),
  });
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (data: any) => {
    setError("");

    setLoading(true);

    const res = await joinRoom(data, session?.user.id!);

    if (!res.success) {
      setError(res.error?.toString() || "Failed to create room");
      setLoading(false);
      return;
    }

    router.push(`/dashboard/room/${res.roomId}`);
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white/5 border border-white/10 rounded-2xl p-8 shadow-lg">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <Hash className="w-5 h-5 text-brand" />
        <h1 className="text-xl font-bold">Join a Room</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Room Code */}
        <div className="mb-4">
          <label className="text-xs text-white/60">Room Code / Link</label>
          <input
            type="text"
            {...register("roomName", { required: true })}
            placeholder="Enter room code..."
            className="w-full mt-2 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-brand/40"
          />
        </div>

        {/* Error */}
        {error && <p className="text-xs text-red-400 mb-3">{error}</p>}

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-white text-black font-semibold py-2 rounded-lg hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Joining...
            </>
          ) : (
            "Join Room"
          )}
        </button>
      </form>
    </div>
  );
}
