import { Router } from "express";
import { getSongHandler } from "../handlers/song/getSongHandler.js";
import { removeSongHandler } from "../handlers/song/removeSongHandler.js";
import { upvoteSongHandler } from "../handlers/song/upvoteSongHandler.js";
import { addSongHandler } from "../handlers/song/addSongHandler.js";


const route = Router();

route.post('/getall' , getSongHandler)
route.post('/remove' , removeSongHandler)
route.post('/upvote' , upvoteSongHandler)
route.post('/addSong' , addSongHandler)


export default route