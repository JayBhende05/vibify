

import {success, z} from 'zod';


export const createRoomSchema = z.object({
  roomName : z.string().min(3, "Room name must have at least 3 characters").max(30, "Room name can't be that long")
})


export const createRoomResponseSchema = z.discriminatedUnion("success", [
  z.object({
    success : z.literal(true),
    roomId : z.string(),
    participantId : z.string()
  }),
  z.object({
    success : z.literal(false),
    error: z.union([z.string(), z.any()])
  })
])


export type CreateRoomInput = z.infer<typeof createRoomSchema>;
export type CreateRoomResponse = z.infer<typeof createRoomResponseSchema>