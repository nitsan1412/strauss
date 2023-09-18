import React, { useEffect, useState } from "react";
import { useCandidates } from "../context/candidates-context";
import { Row, Col, Button, Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";

function Home() {
  const {
    getCandidates,
    candidates,
    searchWord,
    paginationData,
    chooseCandidate,
  } = useCandidates();
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(20);
  const [currentCandidates, setCurrentCandidates] = useState([]);

  useEffect(() => {
    getCandidates();
  }, []);

  useEffect(() => {
    setCurrentCandidates(candidates);
  }, [candidates]);

  return (
    <Container className="dashboard-container">
      <Row>
        <h2>candidates</h2>
      </Row>
      <Row className="rows-candidate-cards" gap={2}>
        {currentCandidates?.map((cand, index) => {
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
    </Container>
  );
}

export default Home;
