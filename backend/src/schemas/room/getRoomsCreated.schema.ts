import {z} from 'zod'

export const getRoomsCreatedSchema = z.object({
  userId : z.string()
})
