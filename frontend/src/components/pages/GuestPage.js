import NavigationBar from '../NavigationBar'
import Room from '../Room'

import { useState, useEffect, useRef } from 'react'
import { SERVER_ROUTE } from '../../utility/constants'
import io from 'socket.io-client'
import Peer from 'simple-peer'
const qs = require('qs')

function GuestPage(props) {
  const socket = props.socket
  const [stream, setStream] = useState()
  const myVideoRef = useRef()
  const otherVideoRef = useRef()
  let room = ''

  let peer
  useEffect(() => {
    // Initializing room
    const queryStrings = qs.parse(window.location.href.split('?')[1], { ignoreQueryPrefix: true })
    room = queryStrings.id
    socket.emit('join_room', { room, user: queryStrings.username })

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        setStream(stream)
        myVideoRef.current.srcObject = stream

        peer = new Peer({
          initiator: true,
          trickle: false,
          stream: stream
        })

        // Emitting signal to host
        peer.on('signal', signal => {
          socket.emit('connect_guest', { room, signal })
        })

        // Connecting to host signal
        socket.on('connect_signal', signal => {
          peer.signal(signal)
        })

        // Setting stream
        peer.on('stream', stream => {
          otherVideoRef.current.srcObject = stream
        })
      })
  }, [])

  return (
    <>
      <NavigationBar />
      <Room myVideoRef={myVideoRef} otherVideoRef={otherVideoRef} socket={socket} />
    </>
  );
}

export default GuestPage