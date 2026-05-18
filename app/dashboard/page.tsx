"use server"

import { getJoinedRooms, getRoomDetails, getRoomsCreated } from '@/actions/room.actions'
import { getUploadedSongs } from '@/actions/streams.action';
import Home from '@/components/dashboard/Home'
import React from 'react'

import type {
  RoomsResponse,
  GetUploadedSongResponse,
} from "@/types";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

async function page() {
  const session = await getServerSession(authOptions)
  
  const createdRooms : RoomsResponse = await getRoomsCreated(session);
  const joinedRooms: RoomsResponse = await getJoinedRooms(session);
  const uploadedSongs : GetUploadedSongResponse  = await getUploadedSongs(session);
  return (
    <>
    <Home
    
          createdRooms={createdRooms.success ? createdRooms.rooms : []} 
          joinedRooms={joinedRooms.success ? joinedRooms.rooms : []}

          uploadedSongs={uploadedSongs.success ? uploadedSongs.songs : []}
          />
      
    </>
  )
}

export default page