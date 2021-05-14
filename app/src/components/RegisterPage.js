import React, { useRef } from "react";
import styled from "styled-components";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import app, { auth } from "../services/firebase";
import { useAuth } from '../providers/AuthProvider';
import { Redirect } from 'react-router-dom'

const MainContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: var(--main-color-3);

  display: flex;
  align-items: center;
  justify-content: center;
`;

const CardContainer = styled.div`
  width: 40em;
`;

function RegisterPage() {
  // Form and callback to handle registraction
  const formRef = useRef();
  const registerAction = (event) => {
    event.preventDefault();

    // Retrieving form elements
    const elements = formRef.current.elements;
    const email = elements.formEmail.value;
    const firstName = elements.formFirstName.value;
    const lastName = elements.formLastName.value;
    const password1 = elements.formPassword1.value;
    const password2 = elements.formPassword2.value;

    // Validate password and stuff
    if (!true) return;

    console.log(app, auth);

    auth
      .createUserWithEmailAndPassword(email, password1)
      .then((userCredential) => {
        console.log(userCredential.user);
      })
      .catch((error) => {
        console.error(error.message, error.code);
      });

    console.log(auth);

    console.log(email, firstName, lastName, password1, password2);
  };

  const { user } = useAuth()

  return (
    <div>
      {user && <Redirect to="/dashboard" /> }
      <MainContainer>
        <Card className="p-2">
          <CardContainer>
            <Card.Body>
              <Card.Title> Create Account</Card.Title>{" "}
              <Form ref={formRef}>
                <Row>
                  <Col>
                    <Form.Group controlId="formFirstName">
                      <Form.Label> First Name </Form.Label>{" "}
                      <Form.Control
                        type="Text"
                        placeholder="Enter First Name"
                      />
                    </Form.Group>{" "}
                  </Col>{" "}
                  <Col>
                    <Form.Group controlId="formLastName">
                      <Form.Label> Last Name </Form.Label>{" "}
                      <Form.Control type="Text" placeholder="Enter Last Name" />
                    </Form.Group>{" "}
                  </Col>{" "}
                </Row>{" "}
                <Form.Group controlId="formEmail">
                  <Form.Label> Email Address </Form.Label>{" "}
                  <Form.Control type="email" placeholder="Enter Email" />
                </Form.Group>
                <Form.Group controlId="formPassword1">
                  <Form.Label> Password </Form.Label>{" "}
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group controlId="formPassword2">
                  <Form.Label> Confirm Password </Form.Label>{" "}
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                  />
                </Form.Group>{" "}
                <Button
                  variant="primary"
                  type="submit"
                  block
                  onClick={registerAction}
                >
                  Register Account{" "}
                </Button>{" "}
              </Form>
              <br />
              <p className="text-center m-0">
                Have an Account ? <Link to="/login"> Login </Link>{" "}
              </p>{" "}
            </Card.Body>{" "}
          </CardContainer>{" "}
        </Card>{" "}
      </MainContainer>{" "}
    </div>
  );
}

export default RegisterPage;
