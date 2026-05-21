import {z} from 'zod';


export const upvoteSongResponseSchema = z.discriminatedUnion("success" ,[
  z.object({
    success : z.literal(true),
    message : z.string()
  }),z.object({
    success: z.literal(false),
    error : z.union([z.string(), z.any()])
  })
])



export type UpvoteSongResponse = z.infer<typeof upvoteSongResponseSchema>