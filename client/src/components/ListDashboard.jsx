import React from "react";
import { useNavigate } from "react-router-dom";
import { Row, Card, Button, Col } from "react-bootstrap";
import "../styles/dashboard.css";

export default function ListDashboard({ chooseCandidate, candidates }) {
  const navigate = useNavigate();

  return (
    <Col className="rows-candidate-lists">
      {candidates.length > 0 &&
        candidates.map((cand, index) => {
          return (
            <Row key={index} className="candidate-list-item" gap={2}>
              <Col className="image-col-in-list">
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
                className="candidate-small-list-button"
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
