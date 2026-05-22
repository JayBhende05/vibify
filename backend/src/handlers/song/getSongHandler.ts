import type { Request, Response } from "express";
import { prismaClient } from "../../utils/prisma.js";

export const getSongHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { roomId } = req.body;

    if (!roomId) {
      return res.status(400).json({
        success: false,
        error: "RoomId is missing",
      });
    }

    const songs = await prismaClient.stream.findMany({
      where: {
        roomId,
        active: true,
      },

      include: {
        addedBy: {
          select: {
            id: true,
            name: true,
          },
        },

        _count: {
          select: {
            upvotes: true,
          },
        },
      },

      orderBy: {
        upvotes: {
          _count: "desc",
        },
      },
    });

    if (songs.length === 0) {
      return res.status(200).json({
        success: true,
        songs: [],
        message: "No songs added yet",
      });
    }

    return res.status(200).json({
      success: true,
      songs,
    });

  } catch (error) {
    console.error("Get Songs Error:", error);

    return res.status(500).json({
      success: false,
      error: "Something went wrong",
    });
  }
};