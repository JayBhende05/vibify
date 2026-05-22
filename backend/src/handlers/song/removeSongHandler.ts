import type { Request, Response } from "express";
import { prismaClient } from "../../utils/prisma.js";

export const removeSongHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { songId } = req.body;

    if (!songId) {
      return res.status(400).json({
        success: false,
        error: "Song Id missing",
      });
    }

    const song = await prismaClient.stream.findUnique({
      where: {
        id: songId,
      },
    });

    if (!song) {
      return res.status(404).json({
        success: false,
        error: "Song not found",
      });
    }

    await prismaClient.stream.delete({
      where: {
        id: songId,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Song removed successfully",
    });

  } catch (error) {
    console.error("Remove Song Error:", error);

    return res.status(500).json({
      success: false,
      error: "Something went wrong",
    });
  }
};