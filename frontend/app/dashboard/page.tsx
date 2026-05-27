"use server"

import { getJoinedRooms, getRoomDetails, getRoomsCreated } from '@/actions/room.actions'
import { getUploadedSongs } from '@/actions/streams.action';
import Home from '@/components/dashboard/Home'
import React from 'react'


import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { GetRoomsCreatedResponse } from '@/schemas/room/getRoomsCreated';
import { JoinedRoomResponse } from '@/schemas/room/getJoinedRooms';
import { GetUploadedSongResponse } from '@/schemas/stream/getUploadedSongs';

async function page() {
  // const session = await getServerSession(authOptions)
  
  const createdRooms : GetRoomsCreatedResponse = await getRoomsCreated();
  const joinedRooms: JoinedRoomResponse = await getJoinedRooms();
  const uploadedSongs : GetUploadedSongResponse  = await getUploadedSongs();
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