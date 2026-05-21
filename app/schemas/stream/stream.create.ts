import {z} from 'zod'

export const createStreamSchema = z.object({
  creatorId : z.string(),
  url: z.string(),
  roomId : z.string()
})