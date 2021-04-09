import NavigationBar from '../NavigationBar'
import Room from '../Room'

import { useState, useEffect, useRef } from 'react'
import Peer from 'simple-peer'
import './HostPage.css'
const qs = require('qs')

function HostPage(props) {
  const socket = props.socket

  const [stream, setStream] = useState()
  const [username, setUsername] = useState()
  const myVideoRef = useRef()
  const otherVideoRef = useRef()
  let room = ''

  let peer
  useEffect(() => {
    // Initializing room
    const queryStrings = qs.parse(window.location.href.split('?')[1], { ignoreQueryPrefix: true })
    room = queryStrings.id
    setUsername(queryStrings.username)
    socket.emit('join_room', { room, user: queryStrings.username })

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        setStream(stream)
        myVideoRef.current.srcObject = stream

        peer = new Peer({
          initiator: false,
          trickle: false,
          stream: stream
        })

        // Connecting to guest signal
        socket.on('connect_signal', signal => {
          peer.signal(signal)

          peer.on('signal', signal => {
            socket.emit('connect_host', { room, signal })
          })
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

export default HostPage