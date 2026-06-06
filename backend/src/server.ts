import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import { WebSocketServer, WebSocket } from "ws";

import roomRoutes from "./routes/roomRoutes.js";
import songRoutes from "./routes/songRoutes.js";
import streamRoutes from "./routes/streamRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/room", roomRoutes);
app.use("/song", songRoutes);
app.use("/stream", streamRoutes);

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

type User = {
  id: string;
  name: string;
};

type Room = {
  users: Map<string, User>;
  sockets: Set<WebSocket>;
};

const rooms = new Map<string, Room>();

function getOrCreateRoom(roomId: string): Room {
  let room = rooms.get(roomId);

  if (!room) {
    room = {
      users: new Map(),
      sockets: new Set(),
    };
    rooms.set(roomId, room);
  }

  return room;
}

function broadcastToRoom(roomId: string, payload: unknown) {
  const room = rooms.get(roomId);
  if (!room) return;

  const message = JSON.stringify(payload);
console.log("Room Broadcast  is ", room);
  room.sockets.forEach((ws) => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(message);
    }
  });
}

wss.on("connection", (ws) => {
  console.log("✅ Client connected");

  ws.send(
    JSON.stringify({
      type: "SERVER_WELCOME",
      message: "Connected successfully",
    })
  );

  ws.on("message", (msg) => {
    try {
      const data = JSON.parse(msg.toString());
      console.log(data)
      switch (data.type) {
        case "JOIN_ROOM": {
          const { roomId, userId, userName } = data;

          const room = getOrCreateRoom(roomId);
            console.log("Room Got is ", room)
          room.users.set(userId, {
            id: userId,
            name: userName,
          });

          room.sockets.add(ws);
          
          (ws as any).roomId = roomId;
          (ws as any).userId = userId;

          console.log(`👤 ${userName} joined room ${roomId}`);

          broadcastToRoom(roomId, {
            type: "JOIN_ROOM_ACK",
            userId,
            userName,
          });

          break;
        }

        case "CREATE_ROOM":{
          const {roomId , userId,userName} = data;

          const room = getOrCreateRoom(roomId);

          room.users.set(userId,{
            id: userId,
            name : userName
          })

          room.sockets.add(ws);
          
          (ws as any).roomId = roomId;
          (ws as any).userId = userId;
          
          break;
        }
        case "HEALTH": {
          ws.send(
            JSON.stringify({
              type: "HEALTH_RESPONSE",
              message: "OK",
            })
          );
          break;
        }

        default:
          break;
      }
    } catch (err) {
      console.error("❌ Invalid message", err);
    }
  });

  ws.on("close", () => {
    const roomId = (ws as any).roomId;
    const userId = (ws as any).userId;

    if (!roomId) return;

    const room = rooms.get(roomId);
    if (!room) return;

    room.sockets.delete(ws);
    room.users.delete(userId);

    console.log(`❌ User left room ${roomId}`);
  });

  ws.on("error", (err) => {
    console.error("WebSocket error:", err);
  });
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`🚀 Server running on ${PORT}`);
});