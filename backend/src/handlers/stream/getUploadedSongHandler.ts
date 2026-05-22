import type { Request, Response } from "express";
import { prismaClient } from "../../utils/prisma.js";

export const getUploadedSongHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        error: "User Id missing",
      });
    }

    const songs = await prismaClient.stream.findMany({
      where: {
        addedById: userId,
      },

      select: {
        id: true,
        sThumbnail: true,
        title: true,
        url: true,
      },
    });

    return res.status(200).json({
      success: true,
      songs,
    });

  } catch (error) {
    console.error("Get Uploaded Song Error:", error);

    return res.status(500).json({
      success: false,
      error: "Something went wrong",
    });
  }
};