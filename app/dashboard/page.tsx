"use server"

import { getJoinedRooms, getRoomDetails, getRoomsCreated } from '@/actions/room.actions'
import { getUploadedSongs } from '@/actions/streams.action';
import Home from '@/components/dashboard/Home'
import React from 'react'


async function page() {
  
  const creadedRooms = await getRoomsCreated();
  const joinedRooms = await getJoinedRooms();
  const uploadedSongs = await getUploadedSongs();
  return (
    <>
    <Home
    
          createdRooms={creadedRooms.rooms} 
          joinedRooms={joinedRooms.rooms}
          uploadedSongs={uploadedSongs.songs}
          />
      
    </>
  )
}

export default page
