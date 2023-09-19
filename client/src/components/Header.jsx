import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { useAuth } from "../context/auth-context";

import tamiLogo from "../assets/tami_logo.png";
export default function Header() {
  const { user } = useAuth();

  return (
    <Navbar className="bg-body-tertiary">
      <Container className="app-header">
        <Col xs={6} md={4}>
          <Image src={tamiLogo} href="#home" />
        </Col>
        {/* <Navbar.Collapse className="justify-content-end"> */}
        {user ? (
          <div className="user-info-header-small">
            <Navbar.Text>Welcome </Navbar.Text>
            <Navbar.Text className="user-info-header-big">
              {user.username}
            </Navbar.Text>
          </div>
        ) : (
          <div> </div>
        )}
        {/* <Navbar.Text>
            Signed in as: <a href="#login">Mark Otto</a>
          </Navbar.Text> */}
        {/* </Navbar.Collapse> */}
      </Container>
    </Navbar>
  );
}
