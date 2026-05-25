import { Router } from "express";
import { getUploadedSongHandler } from "../handlers/stream/getUploadedSongHandler.js";


const route = Router();

route.post('/all',getUploadedSongHandler)


export default route