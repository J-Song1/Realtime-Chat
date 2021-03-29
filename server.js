const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

// Setting static folder
app.use(express.static(path.join(__dirname, 'public')))

// Client connects
io.on('connection', socket => {
  console.log('New Socketio Connection')

  // Welcomes current user
  socket.emit('message', 'Welcome to Realtime Chat')

  // Broadcast when a user connects - broadcast goes to everyone but user; io.emit is for all
  socket.broadcast.emit('message', 'A user has joined the chat')

  socket.on('disconnect', () => {
    io.emit('message', 'A user has left the chat')
  })
})



const PORT = 3000 || process.env.PORT

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})