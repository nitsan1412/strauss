import React, { useEffect, useState } from "react";
import { useCandidates } from "../context/candidates-context";
import { Row, Col, Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Candidate() {
  const { chosenCandidate } = useCandidates();
  const navigate = useNavigate();

  const [currentCandidate, setCurrentCandidate] = useState({});
  useEffect(() => {
    if (chosenCandidate) {
      setCurrentCandidate(chosenCandidate);
    }
  }, [chosenCandidate]);
  return (
    <Container className="dashboard-container">
      <Row>
        <h2>
          {currentCandidate.first_name} {currentCandidate.last_name}
        </h2>
      </Row>{" "}
      <Row>Candidate</Row>
    </Container>
  );
}

export default Candidate;
