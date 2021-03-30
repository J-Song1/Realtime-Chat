const socket = io()

const chatMessages = document.querySelector('.chat-messages')
const roomName = document.getElementById('room-name')
const userList = document.getElementById('users')

socket.on('message', message => {
  console.log(message)
  outputMessage(message)

  // Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight
})

const chatForm = document.getElementById('chat-form')
chatForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const msg = e.target.elements.msg.value;

  // Emitting to server
  socket.emit('chatMessage', msg)

  e.target.elements.msg.value = ''
})

function outputMessage(message) {
  const div = document.createElement('div')
  div.classList.add('message')
  div.innerHTML = `
    <p class="meta">${message.username}<span> ${message.time}</span></p>
    <p class="text">
      ${message.text}
    </p>
  `;

  document.querySelector('.chat-messages').appendChild(div)
}

// Get room and users
socket.on('roomUsers', ({ room, users }) => {
  console.log(room)
  console.log(users)
  outputRoomName(room)
  outputUsers(users)
})

function outputRoomName(room) {
  roomName.innerText = room
}

function outputUsers(users) {
  userList.innerHTML = `
    ${users.map(user => `<li>${user.username}</li>`).join('')}
  `;
}

// Getting username and room from URL
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true
})

// Join room
socket.emit('joinRoom', {
  username,
  room
})