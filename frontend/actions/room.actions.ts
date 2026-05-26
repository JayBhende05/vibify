"use server"

import { authOptions } from "@/lib/auth";
import { prismaClient } from "@/lib/db";
import { CreateRoomInput, CreateRoomResponse, createRoomSchema } from "@/schemas/room/createRoom";
import { JoinedRoomResponse } from "@/schemas/room/getJoinedRooms";
import { GetRoomDetailsResponse } from "@/schemas/room/getRoomDetails";
import { GetRoomsCreatedResponse } from "@/schemas/room/getRoomsCreated";
import { JoinRoomInput, joinRoomInputSchema, JoinRoomResponse, joinRoomSchema } from "@/schemas/room/joinRoom";
import axios from "axios";

import { getServerSession } from "next-auth";

type RoomFromDB = {
  id: string;
  name: string;
  hostId: string;
  host: {
    name: string;
  };
  _count: {
    participants: number;
  };
};


async function createRoom(
  data: CreateRoomInput,

): Promise<CreateRoomResponse> {
  try {
    const session = await getServerSession(authOptions)

    const userID = session?.user.id

    if (!userID) {
      return {
        success: false,
        error: "Login again",
      };
    }
    const result = await axios.post(`${process.env.BACKEND_URL}/room/create`, { roomName: data.roomName, userID })

    return result.data
  } catch (error) {
    console.error("Create Room Error:", error);

    return {
      success: false,
      error: "Something went wrong",
    };
  }
}

async function getRoomDetails(roomId: string): Promise<GetRoomDetailsResponse> {
  try {
    const session = await getServerSession(authOptions)

    const userID = session?.user.id

    if (!userID) {
      return {
        success: false,
        error: "Login again",
      };
    }
    const result = await axios.post(`${process.env.BACKEND_URL}/room/`, { roomId: roomId, userId: userID })

  

    return result.data
  } catch (error) {
    console.error("Join Room Error:", error);

    return {
      success: false,
      error: "Something went wrong"
    };
  }
}


async function getRoomsCreated(): Promise<GetRoomsCreatedResponse> {
  try {

  const session = await getServerSession(authOptions)

    const userID = session?.user.id

    if (!userID) {
      return {
        success: false,
        error: "Login again",
      };
    }
    const result = await axios.post(`${process.env.BACKEND_URL}/room/rooms-created`, { userId: userID })

    return result.data
   

  } catch (error) {
    console.error("Get Rooms Error:", error);

    return {
      success: false,
      error: "Something went wrong",
    };
  }
}

interface JoinedRoomsQuery {
  room: {
    id: string;
    name: string;
    hostId: string;
    host: {
      name: string;
    };
    _count: {
      participants: number;
    };
  };
}

async function getJoinedRooms(): Promise<JoinedRoomResponse> {
  try {
 const session = await getServerSession(authOptions)

    const userID = session?.user.id

    if (!userID) {
      return {
        success: false,
        error: "Login again",
      };
    }
    const result = await axios.post(`${process.env.BACKEND_URL}/room/joined-rooms`, { userId: userID })

    return result.data

    
  } catch (error) {
    console.error("Get Joined Rooms Error:", error);

    return {
      success: false,
      error: "Something went wrong",
    };
  }
}


async function joinRoom(data: JoinRoomInput): Promise<JoinRoomResponse> {
  try {
     const session = await getServerSession(authOptions)

    const userID = session?.user.id

    if (!userID) {
      return {
        success: false,
        error: "Login again",
      };
    }
    const result = await axios.post(`${process.env.BACKEND_URL}/room/join`, { roomName : data.roomName, userId: userID })

    return result.data


  } catch (error) {
    console.error("Join Room Error:", error);

    return {
      success: false,
      error: "Something went wrong"
    };
  }
}




export { createRoom, joinRoom, getRoomDetails, getRoomsCreated, getJoinedRooms }