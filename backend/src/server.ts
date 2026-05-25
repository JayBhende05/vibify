import express from 'express'
import http from 'http'
import WebSocket, { WebSocketServer } from 'ws'
import roomRoutes from './routes/roomRoutes.js'
import songRoutes from './routes/songRoutes.js'
import streamRoutes from './routes/streamRoutes.js'
import dotenv from "dotenv"

const app = express() 
dotenv.config({ path : "'./../.env"})
app.use(express.json());

app.use('/room', roomRoutes );
app.use('/song', songRoutes );
app.use('/stream', streamRoutes );

const server  =  http.createServer(app);

const wss = new WebSocketServer({server});

wss.on("connection", (ws)=>{
  ws.on("error", console.error);

  ws.on('message', (msg) =>{
    console.log("Message Received" , msg.toString());
  })

  ws.on('close',()=>{
    console.log("Client Disconneted");
  })

  ws.send("Hello Message from WebSocket Server")
})


server.listen(8080, ()=>{
  console.log("Server is listening on Port 8080")
})