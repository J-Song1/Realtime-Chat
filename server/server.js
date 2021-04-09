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
let roomMapping = new Map()
io.on('connection', socket => {
  console.log(`New Connection. Socket ID: ${socket.id}`)

  socket.on('join_room', ({ room, user }) => {
    socket.join(room)
    roomMapping.set(socket.id, room)

    console.log(`${user} (${socket.id}) joined room ${room}.`)

    socket.emit('chat_message', {
      user: 'Admin',
      time: '7:03pm',
      message: `Welcome to Realtime Chat ${user}. Your meeting code is '${room}'. Share it with others you want in the meeting.`
    });
  })

  socket.on('connect_guest', ({ signal, room }) => {
    socket.to(room).emit('connect_signal', signal)
  })

  socket.on('connect_host', ({ signal, room }) => {
    socket.to(room).emit('connect_signal', signal)
  })

  socket.on('message', ({ user, message }) => {
    console.log(`${user} send a message.`)

    const room = roomMapping.get(socket.id)
    io.in(room).emit('chat_message', {
      user,
      message,
      time: 'a'
    })
  })
})

// Basic create and validate room endpoints
app.get('/create_room', (req, res) => {
  // User unique id library for cleaner code
  const ID = createRoomID()
  rooms.push(ID)
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