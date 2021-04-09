import { useRef, useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Message from './Message'
import { IconContext } from "react-icons";
import { BiChat } from 'react-icons/bi';

import './Room.css'

function Room(props) {
  const socket = props.socket

  const inputRef = useRef()
  const chatBottom = useRef();
  const [messages, setMessages] = useState([])

  const sendMessage = (message) => {
    socket.emit('message', { user: '', message });
  }

  const onSubmit = () => {
    const message = inputRef.current.value.trim();
    inputRef.current.value = '';

    if (message.length === 0) {
      return;
    }

    sendMessage(message);
  }

  useEffect(() => {
    socket.on('chat_message', ({ user, message, time }) => {
      const messageObject = <Message user={user} message={message} time={time} />;
      setMessages(prev => [...prev, messageObject]);
      chatBottom.current.scrollIntoView({ behavior: "smooth" });
    })
  }, []);

  return (
    <Container>
      <Row className="outsideRow">
        <Col className="vh-100 " id="left-column">
          <div id="my-video-container">
            <video playsInline muted ref={props.myVideoRef} autoPlay id="my-video" />
          </div>

          <div id="other-video-container">
            <video playsInline ref={props.otherVideoRef} autoPlay id="other-video" />
          </div>
        </Col>
        <Col className="vh-100" id="right-column">
          <div className="chat-messages-header">
            <div>
              <IconContext.Provider value={{ size: "24px" }} >
                <BiChat />
              </IconContext.Provider>
              <p>Chat</p>
            </div>
          </div>

          <div className="chat-messages">
            {messages}
            <div ref={chatBottom} />
          </div>
          <div className="chat-form-container">
            <input id="msg" type="text" placeholder="Enter Message" ref={inputRef} required autoComplete="off" />
            <button className="btn" onClick={onSubmit}>Send</button>
          </div>

        </Col>
      </Row>
    </Container>
  )
}

export default Room;