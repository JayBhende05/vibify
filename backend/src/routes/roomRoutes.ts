import { Router } from "express";
import { createRoomHandler } from "../handlers/room/createRoomHandler.js";
import { prismaClient } from "../utils/prisma.js";
import { getJoinedRoomsHandler } from "../handlers/room/getJoinedRoomHandler.js";
import { getRoomDetailsHandler } from "../handlers/room/getRoomHandler.js";
import { getRoomsCreatedHandler } from "../handlers/room/getRoomsCreatedHandler.js";
import { joinRoomHandler } from "../handlers/room/joinRoomHandler.js";

const router = Router();

router.post('/create', createRoomHandler );
router.post('/joined-rooms', getJoinedRoomsHandler );
router.post('/', getRoomDetailsHandler );
router.post('/rooms-created', getRoomsCreatedHandler );
router.post('/join', joinRoomHandler );


router.get('/data', async (req,res) => {
  const data = await prismaClient.room.findMany({});
  if(!data){
    return res.json({ error : "Eroor ins OPrisam"})
  }

  return res.json({ data : data })
} )


export default router