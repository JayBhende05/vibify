import type { Request, Response } from "express";
import { createRoomSchema } from "../../schemas/room/createRoom.schema.js";
import { prismaClient } from "../../utils/prisma.js";

export const createRoomHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const parsed = createRoomSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        error: parsed.error.flatten(),
      });
    }

   const user = await prismaClient.user.findUnique({
  where: {
    id: parsed.data.userId,
  },
});

if (!user) {
  return res.status(404).json({
    success: false,
    error: "User not found",
  });
}

const room = await prismaClient.room.create({
  data: {
    name: parsed.data.roomName,
    hostId: user.id,
  },
});

const participant = await prismaClient.participant.create({
  data: {
    role: "HOST",
    userId: user.id,
    roomId: room.id,
  },
});

    return res.status(201).json({
      success: true,
      roomId: room.id,
      participantId: participant.id,
    });

  } catch (error) {
    console.error("Create Room Error:", error);

    return res.status(500).json({
      success: false,
      error: "Something went wrong",
    });
  }
};