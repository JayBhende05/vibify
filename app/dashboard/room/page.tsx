"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Music, LogIn, Plus, Hash } from "lucide-react";

export default function DashboardHome() {
  const router = useRouter();
  const { data: session } = useSession();

  const [roomName, setRoomName] = useState("");
  const [userNameCreate, setUserNameCreate] = useState("");


  const [roomCode, setRoomCode] = useState("");
  const [userNameJoin, setUserNameJoin] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  
  const handleCreateRoom = async () => {
    if (!roomName.trim()) return setError("Room name required");
    if (!session?.user && !userNameCreate.trim())
      return setError("Name required");

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/room/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomName,
          userName: session?.user?.name || userNameCreate,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      router.push(`/dashboard/room/${data.roomId}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  const handleJoinRoom = async () => {
    if (!roomCode.trim()) return setError("Room code required");
    if (!userNameJoin.trim() && !session?.user)
      return setError("Name required");

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/room/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomCode,
          userName: session?.user?.name || userNameJoin,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      router.push(`/dashboard/room/${data.roomId}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mt-10">
      
   
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Plus className="w-5 h-5 text-brand" />
          <h2 className="text-lg font-bold">Create Room</h2>
        </div>

        <input
          placeholder="Room name"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          className="w-full mb-3 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm"
        />

        {!session?.user && (
          <input
            placeholder="Your name"
            value={userNameCreate}
            onChange={(e) => setUserNameCreate(e.target.value)}
            className="w-full mb-3 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm"
          />
        )}

        <button
          onClick={handleCreateRoom}
          className="w-full bg-brand text-black py-2 rounded-lg font-semibold hover:opacity-90"
        >
          Create Room
        </button>
      </div>

     
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Hash className="w-5 h-5 text-brand" />
          <h2 className="text-lg font-bold">Join Room</h2>
        </div>

        <input
          placeholder="Room code or link"
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value)}
          className="w-full mb-3 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm"
        />

        {!session?.user && (
          <input
            placeholder="Your name"
            value={userNameJoin}
            onChange={(e) => setUserNameJoin(e.target.value)}
            className="w-full mb-3 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm"
          />
        )}

        <button
          onClick={handleJoinRoom}
          className="w-full bg-white text-black py-2 rounded-lg font-semibold hover:opacity-90"
        >
          Join Room
        </button>
      </div>

      {error && (
        <p className="col-span-2 text-center text-red-400 text-sm mt-2">
          {error}
        </p>
      )}
    </div>
  );
}