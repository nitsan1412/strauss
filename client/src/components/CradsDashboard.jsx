import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Button, Card } from "react-bootstrap";

export default function CradsDashboard({ chooseCandidate, candidates }) {
  const navigate = useNavigate();

  return (
    <Row className="rows-candidate-cards" gap={2}>
      {candidates.length > 0 &&
        candidates.map((cand, index) => {
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
