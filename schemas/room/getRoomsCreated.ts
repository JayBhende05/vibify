
import {success, z} from "zod"

export const roomSchema = z.object({
   roomId: z.string(),
  roomName: z.string(),
  hostId: z.string(),
  hostName: z.string(),
  activeUsers: z.number()
})

export const getRoomsCreatedSchema = z.discriminatedUnion("success" , [
  z.object({
    success : z.literal(true),
    rooms : z.array(roomSchema)
  }),
  z.object({
    success : z.literal(false),
    error : z.union([z.string(), z.any()])
  })
])



export type GetRoomsCreatedResponse = z.infer<typeof  getRoomsCreatedSchema>
