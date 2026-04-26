import {uuid, z} from 'zod'

export const streamBaseSchema = z.object({
  id : z.string().or(uuid()),
  type : z.enum(['Youtube', "Spotify"]),
  active : z.boolean(),
  userId: z.string(),
  
})