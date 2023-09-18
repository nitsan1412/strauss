import React, { useEffect, useState } from "react";
import { useCandidates } from "../context/candidates-context";
import { Row, Col, Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Home() {
  const { getCandidates, candidates, searchWord, paginationData } =
    useCandidates();
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
    <Container>
      <Row></Row>
      <Row>
        {currentCandidates?.map((cand, index) => {
          return (
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={cand.avatar} />
              <Card.Body>
                <Card.Title>
                  {cand.first_name} {cand.last_name}
                </Card.Title>
                <Card.Text>{cand.job_title}</Card.Text>
                <Button
                  variant="primary"
                  onClick={() => navigate(`/candidate/${id}`)}
                >
                  full details
                </Button>
              </Card.Body>
            </Card>
          );
        })}{" "}
      </Row>
    </Container>
  );
}

export default Home;
