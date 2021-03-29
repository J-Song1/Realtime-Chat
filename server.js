const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const { formatMessage } = require('./utils/messages')
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./utils/users')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const botName = 'Admin'

// Setting static folder
app.use(express.static(path.join(__dirname, 'public')))

// Client connects
io.on('connection', socket => {
  socket.on('joinRoom', ({ username, room }) => {
    const user = userJoin(socket.id, username, room)

    socket.join(user.room)

    // Welcomes current user
    socket.emit('message', formatMessage(botName, 'Welcome to Realtime Chat'))

    // Broadcast when a user connects - broadcast goes to everyone but user; io.emit is for all
    socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${user.username} has joined the chat`))

    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
    })
  })

  socket.on('chatMessage', (msg) => {
    const user = getCurrentUser(socket.id)

    io.to(user.room).emit('message', formatMessage(user.username, msg))
  })

  socket.on('disconnect', () => {
    const user = userLeave(socket.id)

    if (user) {
      io.to(user.room).emit('message', formatMessage(botName, `${user.username} has left the chat`))

      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      })
    }
  })
})



const PORT = 3000 || process.env.PORT

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})