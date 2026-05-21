import {z} from "zod"
import { SongSchema } from "./getSong"

const removeSongSchema = SongSchema.omit({addedBy: true, _count : true})

export const removeSongResponseSchema = z.discriminatedUnion("success", [ z.object({
    success : z.literal(true),
    message : z.string(),
    data : removeSongSchema
  }),z.object({
    success: z.literal(false),
    error : z.union([z.string(), z.any()])
  })])


  export type RemoveSongResponse = z.infer<typeof removeSongResponseSchema>

