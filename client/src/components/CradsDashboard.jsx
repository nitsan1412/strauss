import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCandidates } from "../context/candidates-context";
import { Row, Col, Button, Card, Container } from "react-bootstrap";

export default function CradsDashboard(currentCandidates) {
  const navigate = useNavigate();
  const { chooseCandidate } = useCandidates();
  const [candidatesToDislpay, setCandidatesToDislpay] = useState([]);

  useEffect(() => {
    if (currentCandidates.currentCandidates.length > 0) {
      setCandidatesToDislpay(currentCandidates.currentCandidates);
    }
  }, [currentCandidates]);
  return (
    <Row className="rows-candidate-cards" gap={2}>
      {candidatesToDislpay.length > 0 &&
        candidatesToDislpay.map((cand, index) => {
          return (
            <Col xs={12} sm={6} md={4} lg={2} key={index}>
              <Card className="candidate-small-card">
                <Card.Img
                  variant="top"
                  src={cand.avatar}
                  className="candidate-small-card-img"
                />
                <Card.Body>
                  <Card.Title>
                    {cand.first_name} {cand.last_name}
                  </Card.Title>
                  <Card.Text>{cand.job_title}</Card.Text>
                  <Button
                    className="candidate-small-card-button"
                    onClick={() => {
                      chooseCandidate(cand);
                      navigate(`/candidate`);
                    }}
                  >
                    full details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
    </Row>
  );
}
