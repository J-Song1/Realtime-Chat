import React from "react";
import styled from "styled-components";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

const MainContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: var(--main-color-3);

  display: flex;
  align-items: center;
  justify-content: center;
`;

function LoginPage() {
  return (
    <div>
      <MainContainer>
        <Card className="px-2">
          <Card.Body>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" placeholder="Enter Email" />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Stay signed in" />
              </Form.Group>
              <Button variant="primary" type="submit" block>
                Login
              </Button>
            </Form>

            <br />
            <p className="text-center m-0">
              No Account? <Link to="/register">Register</Link>
            </p>
          </Card.Body>
        </Card>
      </MainContainer>
    </div>
  );
}

export default LoginPage;
