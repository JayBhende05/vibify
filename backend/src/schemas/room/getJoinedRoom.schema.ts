import {z} from 'zod'

export const getJoinRoomSchema = z.object({
  userId : z.string()
})
