
import {z} from 'zod';


export const createRoomSchema = z.object({
  roomName : z.string().min(3, "Room name must have at least 3 characters").max(30, "Room name can't be that long")
})


export type CreateRoomInput = z.infer<typeof createRoomSchema>;