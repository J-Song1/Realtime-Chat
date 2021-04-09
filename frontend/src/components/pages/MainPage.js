import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert';
import { FaCamera } from 'react-icons/fa'

import chatImage from './../../chatImage.png'
import { SERVER_ROUTE } from '../../utility/constants'
import NavigationBar from '../NavigationBar'

import 'bootstrap/dist/css/bootstrap.min.css';
import './MainPage.css';

import { useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

function MainPage(props) {
  const [meetingCode, setMeetingCode] = useState("")
  const [alertMessage, setAlertMessage] = useState("")

  const usernameRef = useRef()
  const meetingCodeRef = useRef()

  const VANISH_TIME = 5000

  const onChange = () => {
    setMeetingCode(meetingCodeRef.current.value)
  }

  const history = useHistory()
  const createRoomButton = () => {
    const username = usernameRef.current.value
    if (!username) {
      setAlertMessage('Please enter a username.')

      setTimeout(() => {
        setAlertMessage('')
      }, VANISH_TIME)

      return
    }

    axios.get(`${SERVER_ROUTE}/create_room`)
      .then((res) => {
        const ID = res.data.ID
        history.push(`/room_host?id=${ID}&username=${username}`)
      })
  }

  const joinRoomButton = () => {
    const username = usernameRef.current.value
    if (!username) {
      setAlertMessage('Please enter a username.')
      setTimeout(() => {
        setAlertMessage('')
      }, VANISH_TIME)
    }

    axios.get(`${SERVER_ROUTE}/validate_room?ID=${meetingCode}`)
      .then(res => {
        const valid = res.data.exists

        if (valid) {
          history.push(`/room_guest?id=${meetingCode}&username=${username}`)
        }
        else {
          meetingCodeRef.current.value = ''
          setAlertMessage('Invalid meeting code.')
        }
      })
  }

  return (
    <div className="all-container">
      <NavigationBar />
      <Container className="main-container">
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
                    <div>
                      <Form.Group>
                        <input id="usernameInput" type="text" className="form-control" placeholder="Username" ref={usernameRef} />
                      </Form.Group>
                    </div>

                    {" "}
                    <Button variant="info" onClick={createRoomButton}><FaCamera />{" "} New Meeting</Button> {" "}
                    <Form.Group>
                      <input style={meetingCode.length ? { width: "10em" } : { width: "14em" }} type="text" className="form-control" placeholder="Meeting Code" ref={meetingCodeRef} onChange={onChange} />
                    </Form.Group>
                    {" "}
                    {meetingCode.length ? <Button onClick={joinRoomButton} variant="info">Join</Button> : <></>}
                    {alertMessage ? <Alert variant="danger">{alertMessage}</Alert> : <></>}
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
    </div>
  );
}

export default MainPage;