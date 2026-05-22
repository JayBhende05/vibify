import { Router } from "express";
import { createRoomHandler } from "../handlers/room/createRoomHandler.js";
import { prismaClient } from "../utils/prisma.js";
import { error } from "node:console";

const router = Router();

router.post('/create', createRoomHandler )








router.get('/data', async (req,res) => {
  const data = await prismaClient.room.findMany({});
  if(!data){
    return res.json({ error : "Eroor ins OPrisam"})
  }

  return res.json({ data : data })
} )


export default router