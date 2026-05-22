import type { Request, Response } from "express";
+
import { prismaClient } from "../../utils/prisma.js";
import { getJoinRoomSchema } from "../../schemas/room/getJoinedRoom.schema.js";

export const getJoinedRoomsHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const parsedData = getJoinRoomSchema.safeParse(req.body);

    if (!parsedData.success) {
      return res.status(400).json({
        success: false,
        error: parsedData.error.flatten(),
      });
    }

    const joinedRooms = await prismaClient.participant.findMany({
      where: {
        userId: parsedData.data.userId,
        role: "USER",
      },

      select: {
        room: {
          select: {
            id: true,
            name: true,
            hostId: true,

            host: {
              select: {
                name: true,
              },
            },

            _count: {
              select: {
                participants: true,
              },
            },
          },
        },
      },
    });

    return res.status(200).json({
      success: true,

      rooms: joinedRooms.map((item) => ({
        roomId: item.room.id,
        roomName: item.room.name,
        hostId: item.room.hostId,
        hostName: item.room.host.name,
        activeUsers: item.room._count.participants,
      })),
    });
  } catch (error) {
    console.error("Get Joined Rooms Error:", error);

    return res.status(500).json({
      success: false,
      error: "Something went wrong",
    });
  }
};