import { success, z} from 'zod'

export const UserSchema = z.object({
  id : z.string(),
  name : z.string(),
  email : z.string(),
  provider : z.enum(["Google", "Credentials"])
})

export const SongSchema = z.object({
  id : z.string(),
  title : z.string().nullish(),
  type : z.enum(["Youtube","Spotify"]),
  roomId: z.string(),
  url : z.string(),
  extractedId: z.string(),
  sThumbnail: z.string().nullable(),
  bThumbnail: z.string().nullable(),
  active: z.boolean(),
  addedById: z.string(),
  createdAt: z.date(),
  updatedAt:z.date(),
  addedBy: z.object({
      id: z.string(),
      name: z.string(),
      email: z.string(),
      provider: z.enum(["Google", "Credentials"])
  }),

  _count: z.object({
    upvotes : z.number()
  }) 
})

export const getSongSchema = z.discriminatedUnion("success", [
  z.object({
    success : z.literal(true),
    songs : z.array(SongSchema)
  }),
  z.object({
    success : z.literal(false),
    error : z.union([z.string(), z.any()])
  })
])


export type Songs = z.infer<typeof SongSchema>
export type GetSongResponse = z.infer<typeof getSongSchema>
