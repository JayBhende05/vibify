import type { Request, Response } from "express";
import { prismaClient } from "../../utils/prisma.js";
import { joinRoomSchema } from "../../schemas/room/joinRoom.schema.js";

export const joinRoomHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const roomData = req.body;

    const parsed = joinRoomSchema.safeParse(roomData);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        error: parsed.error.flatten(),
      });
    }

    const room = await prismaClient.room.findUnique({
      where: {
        name: parsed.data.roomName,
      },
    });

    if (!room) {
      return res.status(404).json({
        success: false,
        error: "Room does not exist",
      });
    }

    const isHost = room.hostId === parsed.data.userId;

    const existing = await prismaClient.participant.findUnique({
      where: {
        userId_roomId: {
          userId: parsed.data.userId,
          roomId: room.id,
        },
      },
    });

    if (existing) {
      return res.status(200).json({
        success: true,
        roomId: room.id,
        participantId: existing.id,
        role: isHost ? "HOST" : "USER",
        alreadyJoined: true,
      });
    }

    const participant = await prismaClient.participant.create({
      data: {
        userId: parsed.data.userId,
        roomId: room.id,
      },
    });

    return res.status(201).json({
      success: true,
      roomId: room.id,
      participantId: participant.id,
      role: isHost ? "HOST" : "USER",
      alreadyJoined: false,
    });
  } catch (error) {
    console.error("Join Room Error:", error);

    return res.status(500).json({
      success: false,
      error: "Something went wrong",
    });
  }
};