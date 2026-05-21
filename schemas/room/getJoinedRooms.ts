import {z} from "zod";
import { getRoomsCreatedSchema } from "./getRoomsCreated";

export const joinedRoomResponseSchema = getRoomsCreatedSchema


export type JoinedRoomResponse = z.infer<typeof joinedRoomResponseSchema>