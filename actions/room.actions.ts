"use server"

import { prismaClient } from "@/lib/db";
import { CreateRoomInput, createRoomSchema } from "@/types/room/createRoom";
import { JoinRoomInput, joinRoomSchema } from "@/types/room/joinRoom";
import { success } from "zod";
// import { success } from "zod";


async function createRoom(
  data: CreateRoomInput,
  userId: string
) {
  try {
    const parsed = createRoomSchema.safeParse(data);

    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error
      }
    }

    if (!userId) {
      return {
        success: false,
        error: "Unauthorized",
      };
    }
    const room = await prismaClient.room.create({
      data: {
        name: parsed.data.roomName,
        hostId: userId
      }
    })

    const participant = await prismaClient.participant.create({
      data: {
        userId: room.hostId,
        roomId: room.id,
        role: "HOST"
      }
    })


    return {
      success: true,
      roomId: room.id,
      participantId: participant.id
    };
  } catch (error) {
    console.error("Create Room Error:", error);

    return {
      success: false,
      error: "Something went wrong",
    };
  }
}



async function joinRoom(data: JoinRoomInput, userId: string) {
  try {
    const parsed = joinRoomSchema.safeParse(data);

    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error
      };
    }

    if (!userId) {
      return {
        success: false,
        error: "Unauthorized"
      };
    }

    const room = await prismaClient.room.findFirst({
      where: {
        name: parsed.data.roomName
      }
    });

    if (!room) {
      return {
        success: false,
        error: "Room does not exist"
      };
    }

    const isHost = room.hostId === userId;

    const existing = await prismaClient.participant.findUnique({
      where: {
        userId_roomId: {
          userId,
          roomId: room.id
        }
      }
    });

    if (existing) {
      return {
        success: true,
        roomId: room.id,          
        participantId: existing.id,
        role: isHost ? "HOST" : "USER",
        alreadyJoined: true
      };
    }

    const participant = await prismaClient.participant.create({
      data: {
        userId,
        roomId: room.id
      }
    });

    return {
      success: true,
      roomId: room.id,          
      participantId: participant.id,
      role: "USER",
      alreadyJoined: false
    };

  } catch (error) {
    console.error("Join Room Error:", error);

    return {
      success: false,
      error: "Something went wrong"
    };
  }
}

export { createRoom, joinRoom }