import { authOptions } from "@/lib/auth";
import { prismaClient } from "@/lib/db";
import { GetUploadedSongResponse, UploadedSongQuery } from "@/schemas/stream/getUploadedSongs";
// import { GetUploadedSongResponse } from "@/types";
import axios  from "axios";
import { getServerSession } from "next-auth";

export async function getUploadedSongs() : Promise<GetUploadedSongResponse> {
  try {
    const session = await getServerSession(authOptions)

    const userID = session?.user.id

    if (!userID) {
      return {
        success: false,
        error: "Login again",
      };
    }
    const result = await axios.post(`${process.env.BACKEND_URL}/stream/all`, { userId: userID })

    return result.data
  } catch (error) {
    console.error("Get Uploaded Songs Error:", error);

    return {
      success: false,
      error: "Something went wrong",
    };
  }
}



