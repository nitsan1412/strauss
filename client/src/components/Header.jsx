import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

import tamiLogo from "../assets/tami_logo.png";
export default function Header() {
  return (
    <Navbar className="bg-body-tertiary">
      <Container className="app-header">
        <Col xs={6} md={4}>
          <Image src={tamiLogo} href="#home" />
        </Col>
        <Navbar.Collapse className="justify-content-end">
          {/* <Navbar.Text>
            Signed in as: <a href="#login">Mark Otto</a>
          </Navbar.Text> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
