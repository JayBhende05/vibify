import express from 'express'
import http from 'http'
import WebSocket, { WebSocketServer } from 'ws'
import roomRoutes from './routes/roomRoutes.js'
import songRoutes from './routes/songRoutes.js'
import streamRoutes from './routes/streamRoutes.js'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())

app.use('/room', roomRoutes)
app.use('/song', songRoutes)
app.use('/stream', streamRoutes)

const server = http.createServer(app)

const wss = new WebSocketServer({ server })

wss.on('connection', (ws) => {
  console.log('Client connected')

  ws.on('error', (err) => {
    console.error('WebSocket error:', err)
  })

  ws.on('message', (msg) => {
    console.log('Message Received:', msg.toString())

    ws.send(`Server received: ${msg}`)
  })

  ws.on('close', () => {
    console.log('Client disconnected')
  })

  ws.send('Hello Message from WebSocket Server')
})

const PORT = process.env.PORT || 8080

server.listen(PORT, () => {
  console.log(`Server is listening on Port ${PORT}`)
})