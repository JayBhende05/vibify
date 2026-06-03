"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Plus, Hash } from "lucide-react";
import { getSocket } from "@/lib/websocket";

export default function DashboardHome() {
  const router = useRouter();
  const { data: session } = useSession();

  const [socket, setSocket] = useState<WebSocket | null>(null);

  // Initialize WebSocket once
  useEffect(() => {
    const ws = getSocket();

    ws.onopen = () => {
      console.log("WebSocket connected");

      ws.send(
        JSON.stringify({
          type: "HEALTH",
        })
      );
    };

    ws.onmessage = (event) => {
      console.log("WS Message:", event.data);
    };

    ws.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
    };

    setSocket(ws);

    return () => {
      // Uncomment if you want to close connection on unmount
      // ws.close();
    };
  }, []);

  // CREATE ROOM
  const [roomName, setRoomName] = useState("");
  const [userNameCreate, setUserNameCreate] = useState("");

  // JOIN ROOM
  const [roomCode, setRoomCode] = useState("");
  const [userNameJoin, setUserNameJoin] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCreateRoom = async () => {
    if (!roomName.trim()) {
      setError("Room name required");
      return;
    }

    if (!session?.user && !userNameCreate.trim()) {
      setError("Name required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/room/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roomName,
          userName: session?.user?.name || userNameCreate,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      router.push(`/dashboard/room/${data.roomId}`);
    } catch (err: any) {
      setError(err.message || "Failed to create room");
    } finally {
      setLoading(false);
    }
  };

  const handleJoinRoom = async () => {
    if (!roomCode.trim()) {
      setError("Room code required");
      return;
    }

    if (!session?.user && !userNameJoin.trim()) {
      setError("Name required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/room/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roomCode,
          userName: session?.user?.name || userNameJoin,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      if (socket?.readyState === WebSocket.OPEN) {
        socket.send(
          JSON.stringify({
            type: "JOIN_ROOM",
            roomId: data.roomId,
            userId: data.userID,
          })
        );
      } else {
        console.error("WebSocket is not connected");
      }

      router.push(`/dashboard/room/${data.roomId}`);
    } catch (err: any) {
      setError(err.message || "Failed to join room");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mt-10">
      {/* CREATE ROOM */}
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
          disabled={loading}
          onClick={handleCreateRoom}
          className="w-full bg-brand text-black py-2 rounded-lg font-semibold hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Room"}
        </button>
      </div>

      {/* JOIN ROOM */}
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
          disabled={loading}
          onClick={handleJoinRoom}
          className="w-full bg-white text-black py-2 rounded-lg font-semibold hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Joining..." : "Join Room"}
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