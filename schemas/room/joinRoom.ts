import { error } from "console";
import {success, z} from "zod";


export const joinRoomInputSchema = z.object({
 roomName : z.string().min(3, "Room name must have at least 3 characters").max(30, "Room name can't be that long")
})



export const joinRoomSchema = z.discriminatedUnion("success", [
  z.object({
    success: z.literal(true),
    roomId: z.string(),
    participantId: z.string(),
    role: z.union([z.literal("USER"), z.literal("HOST")]),
    alreadyJoined: z.boolean(),
  }),
  z.object({
    success: z.literal(false),
    error: z.union([z.string(), z.any()]),
  }),
]);


export type JoinRoomInput = z.infer<typeof joinRoomInputSchema>;
export type JoinRoomResponse = z.infer<typeof joinRoomSchema>;