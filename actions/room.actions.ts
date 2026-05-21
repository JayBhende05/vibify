"use server"

import { authOptions } from "@/lib/auth";
import { prismaClient } from "@/lib/db";
import { CreateRoomInput, CreateRoomResponse, createRoomSchema } from "@/schemas/room/createRoom";
import { JoinedRoomResponse } from "@/schemas/room/getJoinedRooms";
import { GetRoomDetailsResponse } from "@/schemas/room/getRoomDetails";
import { GetRoomsCreatedResponse } from "@/schemas/room/getRoomsCreated";
import { JoinRoomInput, joinRoomInputSchema, JoinRoomResponse, joinRoomSchema } from "@/schemas/room/joinRoom";

import { getServerSession } from "next-auth";

type RoomFromDB  = {
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
  userId: string
) : Promise<CreateRoomResponse> {
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

async function getRoomDetails(roomId: string): Promise<GetRoomDetailsResponse> {
  try {
    const user = await getServerSession(authOptions)

    if (!user) {
      return {
        success: false,
        error: "Login Again"
      }
    }

    if (!roomId) {
      return {
        success: false,
        error: "Room Id Missing"
      }
    }

    const room = await prismaClient.room.findFirst({
      where: {
        id: roomId
      }
    })

    if (!room) {
      return {
        success: false,
        error: "Incorrect Room Id"
      }
    }

    
    const host = await prismaClient.user.findFirst({
      where: {
        id: room.hostId
      }
    })

    return {
      success: true,
      roomId: room.id,
      roomName: room.name,
      hostId: room.hostId,
      hostName: host?.name || "Host" ,

    }



  } catch (error) {
    console.error("Join Room Error:", error);

    return {
      success: false,
      error: "Something went wrong"
    };
  }
}

async function getRoomsCreated(session : any) : Promise<GetRoomsCreatedResponse> 
  {
  try {
  

    if (!session?.user.id) {
      return {
        success: false,
        error: "Login Again",
      };
    }

    const rooms = await prismaClient.room.findMany({
      where: {
        hostId: session.user.id,
      },

      select: {
        id: true,
        name: true,
        hostId: true,

        host: {
          select: {
            name: true,
          },
        },

        _count: {
          select: {
            participants: true,
          },
        },
      },
    });

    return {
      success: true,

      rooms: rooms.map((room : RoomFromDB) => ({
        roomId: room.id,
        roomName: room.name,
        hostId: room.hostId,
        hostName: room.host.name,
        activeUsers: room._count.participants,
      })),
    };
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

async function getJoinedRooms(session : any) : Promise<JoinedRoomResponse> {
  try {
    

    if (!session?.user.id) {
      return {
        success: false,
        error: "Login Again",
      };
    }

    const joinedRooms = await prismaClient.participant.findMany({
      where: {
        userId: session.user.id,
        role: "USER",
      },

      select: {
        room: {
          select: {
            id: true,
            name: true,
            hostId: true,

            host: {
              select: {
                name: true,
              },
            },

            _count: {
              select: {
                participants: true,
              },
            },
          },
        },
      },
    });

    return {
      success: true,

      rooms: joinedRooms.map((item : JoinedRoomsQuery) => ({
        roomId: item.room.id,
        roomName: item.room.name,
        hostId: item.room.hostId,
        hostName: item.room.host.name,
        activeUsers: item.room._count.participants,
      })),
    };
  } catch (error) {
    console.error("Get Joined Rooms Error:", error);

    return {
      success: false,
      error: "Something went wrong",
    };
  }
}


async function joinRoom(data: JoinRoomInput, userId: string) : Promise<JoinRoomResponse> {
  try {
    console.log("Join Room Data", data)
    const parsed = joinRoomInputSchema.safeParse(data);

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
        roomId: room?.id || " ",
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




export { createRoom, joinRoom, getRoomDetails, getRoomsCreated, getJoinedRooms }