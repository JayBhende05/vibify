import type { Request, Response } from "express";
import { getRoomDetailsSchema } from "../../schemas/room/getRoomDetails.schema.js";
import { prismaClient } from "../../utils/prisma.js";

export const getRoomDetailsHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const data = req.body;

    const parsed = getRoomDetailsSchema.safeParse(data);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        error: parsed.error,
      });
    }

    const room = await prismaClient.room.findUnique({
      where: {
        id: parsed.data.roomId,
      },
    });

    if (!room) {
      return res.status(404).json({
        success: false,
        error: "Room not found",
      });
    }

    const host = await prismaClient.user.findUnique({
      where: {
        id: room.hostId,
      },
    });

    return res.json({
      success: true,
      roomId: room.id,
      roomName: room.name,
      hostId: room.hostId,
      hostName: host?.name || "Host",
    });
  } catch (error) {
    console.error("Get Room Details Error:", error);

    return res.status(500).json({
      success: false,
      error: "Something went wrong",
    });
  }
};