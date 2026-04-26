import {z} from "zod";


export const joinRoomSchema = z.object({
 roomName : z.string().min(3, "Room name must have at least 3 characters").max(30, "Room name can't be that long")
})

export type JoinRoomInput = z.infer<typeof joinRoomSchema>;