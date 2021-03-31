import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css';
import './MainPage.css';
import { FaRocketchat, FaCamera } from 'react-icons/fa'
import chatImage from './../../chatImage.png'
import { useState } from 'react'

function MainPage() {
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
            <Container style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100vh'
            }}>
              <Card style={{ width: '30em' }}>
                <Card.Body>
                  <Card.Title id="title-text">Realtime Chat</Card.Title>
                  <Card.Text>
                    Premium video chat meetings. Free and secure.
                  </Card.Text>
                  <div id="buttons-container">
                    <Button variant="info"><FaCamera />{" "} New Meeting</Button> {" "}
                    <Form.Group controlId="formBasicPassword">
                      <Form.Control type="password" placeholder="Meeting Code" />
                    </Form.Group>
                  </div>
                </Card.Body>
              </Card>
            </Container>
          </Col>
          <Col className="vh-100 d-flex flex-column">
            <Container style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100vh'
            }}>
              <Image src={chatImage} rounded />
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default MainPage;