


import type { Request, Response  } from "express";

import { success } from "zod";
import { error } from "node:console";
import { prismaClient } from "../../utils/prisma.js";
import { getRoomsCreatedSchema } from "../../schemas/room/getRoomsCreated.schema.js";


export const getRoomsCreatedHandler = async(req: Request, res : Response) =>{
try{
const parsedData = getRoomsCreatedSchema.safeParse(req.body);


if(!parsedData.success){
  return res.json({
    success : false,
    error : parsedData.error
  })
}

const rooms = await prismaClient.room.findMany({
      where: {
        hostId: parsedData.data.userId,
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

return res.json({
      success: true,

      rooms: rooms.map((room) => ({
        roomId: room.id,
        roomName: room.name,
        hostId: room.hostId,
        hostName: room.host.name,
        activeUsers: room._count.participants,
      })),
    });
 } catch (error) {
    console.error("Get Rooms Error:", error);

    return {
      success: false,
      error: "Something went wrong",
    };
  }
}