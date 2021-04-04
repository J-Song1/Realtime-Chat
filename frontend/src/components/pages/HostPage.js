import { useState, useEffect, useRef } from 'react'
import Peer from 'simple-peer'
const qs = require('qs')

function HostPage(props) {
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
          initiator: false,
          trickle: false,
          stream: stream
        })

        // Connecting to guest signal
        socket.on('connect_signal', signal => {
          peer.signal(signal)

          peer.on('signal', signal => {
            socket.emit('connect_host', { roomID, signal })
          })
        })

        // Setting stream
        peer.on('stream', stream => {
          otherVideoRef.current.srcObject = stream
        })
      })
  }, [])

  useEffect(() => {


    //peer.on('stream', stream => {
    //  console.log('Host Stream')
    //})
  }, [stream])

  return (
    <>
      <video playsInline muted ref={myVideoRef} autoPlay style={{ width: "300px" }} />
      <video playsInline muted ref={otherVideoRef} autoPlay style={{ width: "300px" }} />
    </>
  );
}

export default HostPage