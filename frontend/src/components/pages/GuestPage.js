import { useState, useEffect, useRef } from 'react'
import Peer from 'simple-peer'
const qs = require('qs')

function GuestPage(props) {
  const socket = props.socket

  const [stream, setStream] = useState()
  const myVideoRef = useRef()
  const otherVideoRef = useRef()
  let roomID = ''

  let peer
  useEffect(() => {
    // Initializing room
    roomID = qs.parse(window.location.href.split('?')[1], { ignoreQueryPrefix: true }).id
    socket.emit('join_room', roomID)

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
          socket.emit('connect_guest', { roomID, signal })
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

  /*
  let called = false
  useEffect(() => {
    if (called) return
    called = true
    peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream
    })

    console.log('In Effect')

    peer.on('signal', signal => {
      console.log('fuck')
      socket.emit('connect_guest', { roomID, signal })
    })


    socket.on('connect_signal', signal => {
      console.log(signal)
      console.log('back')
      peer.signal(signal)
      console.log('sonncted')
    })

    //peer.on('stream', stream => {
    //  console.log('Guest Stream')
    //})
  }, [stream])
  */

  return (
    <>
      <video playsInline muted ref={myVideoRef} autoPlay style={{ width: "300px" }} />
      <video playsInline muted ref={otherVideoRef} autoPlay style={{ width: "300px" }} />
    </>
  );
}

export default GuestPage