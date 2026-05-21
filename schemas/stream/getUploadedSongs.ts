import { z } from "zod"

export const UploadedSongSchema = z.object({
  id: z.string(),
  sThumbnail: z.string().nullable(),
  title: z.string().nullable(),
  url: z.string()
})

export const GetUploadedSongResponseSchema =
  z.discriminatedUnion("success", [
    z.object({
      success: z.literal(true),
      songs: z.array(UploadedSongSchema)
    }),

    z.object({
      success: z.literal(false),
      error: z.union([z.string(), z.any()])
    })
  ])

export type UploadedSongQuery =
  z.infer<typeof UploadedSongSchema>

export type GetUploadedSongResponse =
  z.infer<typeof GetUploadedSongResponseSchema>