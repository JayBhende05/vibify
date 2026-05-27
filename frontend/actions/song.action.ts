"use server"
import axios from "axios"
import { authOptions } from "@/lib/auth"
import { prismaClient } from "@/lib/db"
import { GetSongResponse } from "@/schemas/songs/getSong"
import { RemoveSongResponse } from "@/schemas/songs/removeSong"
import { UpvoteSongResponse } from "@/schemas/songs/upvoteSong"

import { getServerSession } from "next-auth"
import { revalidatePath } from "next/cache"


export async function getSong(roomId:string):  Promise<GetSongResponse> {
  try {
       if (!roomId) {
      return {
        success: false,
        error: "Try again",
      };
    }

    const result = await axios.post(`${process.env.BACKEND_URL}/song/getall`, { roomId: roomId })


    return result.data

  } catch (error) {
     console.error("Song Fetching Error:", error);

    return {
      success: false,
      error: "Something went wrong"
    };
  
  }


}


export async function upvoteSong(songId : string) : Promise<UpvoteSongResponse>{
  try {

       if(!songId){
        return {
          success : false,
          error : "Song Id Missing"
        }
      }
          const session = await getServerSession(authOptions)

    const userID = session?.user.id

      const result = await axios.post(`${process.env.BACKEND_URL}/song/upvote`, { songId: songId, userId : userID })


    return result.data
  } catch (error) {
     console.error("Song Upvote Error:", error);

    return {
      success: false,
      error: "Something went wrong"
    };
  }
}

export async function removeSong(
  songId: string,
  roomId: string
): Promise<RemoveSongResponse> {
  try {
    if (!songId) {
      return {
        success: false,
        error: "Song Id Missing",
      };
    }

    const result = await axios.post(
      `${process.env.BACKEND_URL}/song/remove`,
      { songId }
    );

    revalidatePath(`/room/${roomId}`);

    return result.data;
  } catch (error) {
    console.log("Error while deleting Song", error);

    return {
      success: false,
      error: "Something went wrong",
    };
  }
}