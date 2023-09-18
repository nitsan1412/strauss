import React, { useEffect, useState } from "react";
import { useCandidates } from "../context/candidates-context";
import { Row, Col, Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Candidate() {
    const { candidateId } = useParams();

  //   const { getCandidates, candidates, searchWord, paginationData } =
  //     useCandidates();
  //   const navigate = useNavigate();

  //   const [page, setPage] = useState(0);
  //   const [limit, setLimit] = useState(20);
  //   const [currentCandidates, setCurrentCandidates] = useState([]);

  //   useEffect(() => {
  //     getCandidates();
  //   }, []);

  //   useEffect(() => {
  //     setCurrentCandidates(candidates);
  //   }, [candidates]);

  return (
    <Container>
      <Row></Row>
      <Row>Candidate</Row>
    </Container>
  );
}

export default Candidate;
