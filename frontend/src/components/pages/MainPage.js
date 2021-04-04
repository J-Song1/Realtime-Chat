import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { FaRocketchat, FaCamera } from 'react-icons/fa'
import chatImage from './../../chatImage.png'

import { serverRoute } from '../../utility/constants'

import 'bootstrap/dist/css/bootstrap.min.css';
import './MainPage.css';

import { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

function MainPage(props) {
  const [inputSelected, setInputSelected] = useState(false)
  const [meetingCode, setMeetingCode] = useState("")
  const [expandInput, setExpandInput] = useState(false)

  const inputRef = useRef()
  const setFocus = () => setInputSelected(true)
  const setBlur = () => setInputSelected(false)
  const onChange = () => {
    setMeetingCode(inputRef.current.value)
  }

  useEffect(() => {
    setExpandInput(inputSelected || meetingCode.length > 0)
    console.log(expandInput)
  }, [inputSelected, meetingCode])

  const history = useHistory()
  const createRoomButton = () => {
    axios.get(`${serverRoute}/create_room`)
      .then((res) => {
        const ID = res.data.ID
        history.push(`/room_host?id=${ID}`)
      })
  }

  const joinRoomButton = () => {
    axios.get(`${serverRoute}/validate_room?ID=${meetingCode}`)
      .then(res => {
        const valid = res.data.exists

        if (valid) {
          history.push(`/room_guest?id=${meetingCode}`)
        }
        else {
          inputRef.current.value = ''
        }
      })
  }

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">
          <FaRocketchat />
          {" "}
        Realtime Chat Application
        </Navbar.Brand>
      </Navbar>
      <Container>
        <Row>
          <Col className="vh-100 d-flex flex-column">
            <Container className="full-vertical-container">
              <Card id="infoCard">
                <Card.Body>
                  <Card.Title id="title-text">Realtime Chat</Card.Title>
                  <Card.Text>
                    Premium video chat meetings. Free and secure.
                  </Card.Text>
                  <div id="buttons-container">
                    <Button variant="info" onClick={createRoomButton}><FaCamera />{" "} New Meeting</Button> {" "}
                    <Form.Group controlId="formBasicPassword">
                      <input style={expandInput ? { width: "12em" } : { width: "16em" }} type="text" className="form-control" placeholder="Meeting Code" ref={inputRef} onChange={onChange} onFocus={setFocus} onBlur={setBlur} />
                    </Form.Group>
                    {" "}
                    {meetingCode.length > 0 ? <Button onClick={joinRoomButton} variant="info">Join</Button> : <></>}
                  </div>
                </Card.Body>
              </Card>
            </Container>
          </Col>
          <Col className="vh-100 d-flex flex-column">
            <Container className="full-vertical-container">
              <Image src={chatImage} rounded />
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default MainPage;