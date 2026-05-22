import type { Request, Response } from "express";
import { prismaClient } from "../../utils/prisma.js";

export const upvoteSongHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { songId, userId } = req.body;

    if (!songId || !userId) {
      return res.status(400).json({
        success: false,
        error: "Data missing",
      });
    }

    const existingUpvote = await prismaClient.upvote.findUnique({
      where: {
        userId_streamId: {
          userId,
          streamId: songId,
        },
      },
    });

    if (existingUpvote) {
      return res.status(409).json({
        success: false,
        error: "Song already upvoted",
      });
    }

    await prismaClient.upvote.create({
      data: {
        streamId: songId,
        userId,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Song upvoted",
    });

  } catch (error) {
    console.error("Upvote Songs Error:", error);

    return res.status(500).json({
      success: false,
      error: "Something went wrong",
    });
  }
};