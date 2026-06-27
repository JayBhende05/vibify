import { success } from "zod";
import { prismaClient } from "../../utils/prisma.js";
const YTREGEX = /(?:v=|youtu\.be\/|shorts\/)([^&#?/]+)/;
import type { Request, Response } from "express";

export const addSongHandler = async (req: Request, res: Response) => {
  try {

    const {
      url,
      creatorId,
      roomId,
    } = req.body;

    if (!url && !creatorId && !roomId) {
      return res.status(400).json({
        success: false,
        error: "Required Fields Missing",
      });
    }
    const match = url.match(YTREGEX);

    if (!match) {
      return res.status(400).json({
        message: "Invalid YouTube URL",
      });
    }

    const extractedId = match[1];

    const apiKey = process.env.YOUTUBE_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        message: "Missing YouTube API key",
      });
    }

    const ytRes = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${extractedId}&key=${apiKey}`
    );

    const ytData = await ytRes.json();

    const video = ytData?.items?.[0];

    if (!video) {
      return res.status(404).json({
        message: "Video not found on YouTube",
      });
    }

    const snippet = video.snippet;

    const thumbnails = snippet?.thumbnails;

    const smallThumbnail =
      thumbnails?.medium?.url ??
      thumbnails?.default?.url ??
      "";

    const bigThumbnail =
      thumbnails?.maxres?.url ??
      thumbnails?.high?.url ??
      thumbnails?.medium?.url ??
      "";

    const existingStream = await prismaClient.stream.findFirst({
      where: {
        extractedId,
        roomId,
      },
    });

    if (existingStream) {
      return res.status(200).json({
         success: true,
        message: "Song already exists",
      });
    }

    await prismaClient.stream.create({
      data: {
        addedById: creatorId,
        roomId,
        url,
        extractedId,
        type: "Youtube",
        title: snippet?.title ?? "Unknown Title",
        sThumbnail: smallThumbnail,
        bThumbnail: bigThumbnail,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Song Added successfully",
      songName : snippet?.title ?? "Unknown Title"
    });
  } catch (error: any) {
    console.error("Song Adding error:", error);

    return res.status(500).json({
      success : false,
      message: "Error in Stream Creation",
      error: error?.message ?? "Unknown error",
    });
  }
};