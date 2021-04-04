const path = require('path')
const http = require('http')
const cors = require('cors')
const express = require('express')
const socketio = require('socket.io')
const { createRoomID } = require('./utils/connection')

const app = express()
const server = http.createServer(app)
const io = socketio(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
})
app.use(cors({
  origin: 'http://localhost:3000'
}));

let rooms = []
io.on('connection', socket => {
  socket.on('join_room', room => {
    socket.join(room)
    console.log(`${socket.id} joined room ${room}.`)
  })

  socket.on('connect_guest', ({ signal, roomID }) => {
    socket.to(roomID).emit('connect_signal', signal)
  })

  socket.on('connect_host', ({ signal, roomID }) => {
    socket.to(roomID).emit('connect_signal', signal)
  })
})

// Basic create and validate room endpoints
app.get('/create_room', (req, res) => {
  const ID = createRoomID()
  rooms.push(ID)
  console.log(rooms)
  res.status(200).json({ ID })
})

app.get('/validate_room', (req, res) => {
  const ID = req.query.ID
  const exists = rooms.includes(ID)
  res.status(200).json({
    exists
  })
})

const port = 5000 || process.env.PORT
server.listen(port, () => {
  console.log(`Running in port ${port}`)
})