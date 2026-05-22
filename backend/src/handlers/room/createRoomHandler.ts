import type { Request, Response } from "express";
import { createRoomSchema } from "../../schemas/room/createRoom.schema.js";
import { prismaClient } from "../../utils/prisma.js";

export const createRoomHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const roomData = req.body;

    const parsed = createRoomSchema.safeParse(roomData);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        error: parsed.error.flatten(),
      });
    }

    const result = await prismaClient.$transaction(async (tx) => {
      const room = await tx.room.create({
        data: {
          name: parsed.data.roomName,
          host: {
            connect: {
              id: parsed.data.userId,
            },
          },
        },
      });

      const participant = await tx.participant.create({
        data: {
          role: "HOST",
          user: {
            connect: {
              id: parsed.data.userId,
            },
          },
          room: {
            connect: {
              id: room.id,
            },
          },
        },
      });

      return {
        room,
        participant,
      };
    });

    return res.status(201).json({
      success: true,
      roomId: result.room.id,
      participantId: result.participant.id,
    });

  } catch (error) {
    console.error("Create Room Error:", error);

    return res.status(500).json({
      success: false,
      error: "Something went wrong",
    });
  }
};