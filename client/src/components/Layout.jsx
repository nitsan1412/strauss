import React, { Children } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Container, Row } from "react-bootstrap";
import "../styles/layout.css";
export default function Layout({ children }) {
  return (
    <Container fluid className="app-container">
      <Header />
      <div className="app-content">{children}</div>
      <Footer />
    </Container>
  );
}
