import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCandidates } from "../context/candidates-context";
import { Row, Card, Button, Col, Container } from "react-bootstrap";
import "../styles/dashboard.css";

export default function ListDashboard(currentCandidates) {
  const navigate = useNavigate();
  const { chooseCandidate } = useCandidates();
  const [candidatesToDislpay, setCandidatesToDislpay] = useState([]);

  useEffect(() => {
    if (currentCandidates.currentCandidates.length > 0) {
      setCandidatesToDislpay(currentCandidates.currentCandidates);
    }
  }, [currentCandidates]);
  return (
    <Col className="rows-candidate-lists" gap={2}>
      {candidatesToDislpay.length > 0 &&
        candidatesToDislpay.map((cand, index) => {
          return (
            <Row key={index} className="candidate-list-item" gap={2}>
              <Col>
                <Card.Img
                  variant="top"
                  src={cand.avatar}
                  className="candidate-list-img"
                />
              </Col>
              <Col className="candidate-small_text">
                {cand.first_name} {cand.last_name}
              </Col>
              <Col className="candidate-small_text">{cand.job_title}</Col>
              <Button
                className="candidate-small-card-button"
                onClick={() => {
                  chooseCandidate(cand);
                  navigate(`/candidate`);
                }}
              >
                full details
              </Button>{" "}
            </Row>
          );
        })}
    </Col>
  );
}
