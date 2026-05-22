import {z} from 'zod';


export const getRoomDetailsSchema = z.object({
  roomId : z.string(),
  userId : z.string()
})