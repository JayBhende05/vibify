import { z} from 'zod'

export const getRoomDetailsSchema = z.discriminatedUnion("success", [
  z.object({
    success : z.literal(true),
    roomId : z.string(),
    roomName : z.string(),
    hostId : z.string(),
    hostName  : z.string()
  }), 

  z.object({
    success : z.literal(false),
    error : z.union([z.string(), z.any()])
  })
])


export type GetRoomDetailsResponse = z.infer<typeof getRoomDetailsSchema>