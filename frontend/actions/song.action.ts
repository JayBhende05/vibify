"use server"
import { authOptions } from "@/lib/auth"
import { prismaClient } from "@/lib/db"
import { GetSongResponse } from "@/schemas/songs/getSong"
import { RemoveSongResponse } from "@/schemas/songs/removeSong"
import { UpvoteSongResponse } from "@/schemas/songs/upvoteSong"

import { getServerSession } from "next-auth"


export async function getSong(roomId:string):  Promise<GetSongResponse> {
  try {
      if(!roomId){
        return {
          success : false,
          error : "Room Id Missing"
        }
      }

      const songs = await prismaClient.stream.findMany({
        where : {
          roomId : roomId,
          active : true
        },
        include : {
          addedBy : true,
          _count : {
            select : {
              upvotes : true
            }
          }
        },
        orderBy : {
          upvotes : {
            _count : "desc"
          }
        }
      })

      if(!songs){
        return {
          success : false,
          error : "No Songs Added"
        }
      }

      // console.log("Song Data is ", songs);

      return {
        success : true,
        songs : songs
      }

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

      const user = await getServerSession(authOptions);

      await prismaClient.upvote.create({
        data : {
          streamId : songId,
          userId : user?.user.id || ""
        }
      })

      return {
        success : true,
        message : "Song upvoted"
      }
  } catch (error) {
     console.error("Song Upvote Error:", error);

    return {
      success: false,
      error: "Something went wrong"
    };
  }
}

export async function removeSong(songId : string) : Promise<RemoveSongResponse>{
  try {
    if(!songId){
      return {
        success : false,
        error : "Song Id is missing"
      }
    }

    const song = await prismaClient.stream.delete({
      where : {
        id : songId
      }
    })

    return {
      success : true,
      message : "Song Removed Successfully",
      data : song
    }

  } catch (error) {
    console.log("Error while deleting Song" , error);
      return {
      success: false,
      error: "Something went wrong"
    };
  }
}