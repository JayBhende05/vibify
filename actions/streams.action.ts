import { authOptions } from "@/lib/auth"
import { prismaClient } from "@/lib/db";
import { error } from "console";
import { getServerSession } from "next-auth"
import { success } from "zod";


export async function getUploadedSongs() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user.id) {
      return {
        success: false,
        error: "Login Again",
      };
    }

    const songs = await prismaClient.stream.findMany({
      where: {
        addedById: session.user.id,
      },

      select: {
        id: true,
        sThumbnail: true,
        title: true,
        url: true,
      },
    });

    if (songs.length === 0) {
      return {
        success: false,
        error: "Songs not uploaded yet",
      };
    }

    return {
      success: true,

      songs: songs.map((item) => ({
        id: item.id,
        sThumbnail: item.sThumbnail,
        title: item.title,
        url: item.url,
      })),
    };
  } catch (error) {
    console.error("Get Uploaded Songs Error:", error);

    return {
      success: false,
      error: "Something went wrong",
    };
  }
}