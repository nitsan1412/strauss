import React, { useEffect, useState } from "react";
import { useCandidates } from "../context/candidates-context";
import { Row, Col, Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/candidate.css";
import { RiArrowGoBackLine } from "react-icons/ri";
import { FaFemale } from "react-icons/fa";
import { FaMale } from "react-icons/fa";

function Candidate() {
  const navigate = useNavigate();
  const { chosenCandidate } = useCandidates();

  const [currentCandidate, setCurrentCandidate] = useState({});

  useEffect(() => {
    if (chosenCandidate && chosenCandidate.id) {
      setCurrentCandidate(chosenCandidate);
    } else {
      navigate("../");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chosenCandidate]);

  return (
    <Container className="candidate-container">
      <Row className="candidate-header-row">
        <Col>
          <h2 className="candidate-header-text">
            {currentCandidate.first_name} {currentCandidate.last_name}
          </h2>{" "}
          <Row className="candidate-small_text">
            <span onClick={() => navigate("/signup")}>candidate number: </span>
            <span className="underline_text">{currentCandidate.id}</span>
          </Row>
          <Row className="candidate-small_text">
            <span onClick={() => navigate("/signup")}>email: </span>
            <span className="underline_text">{currentCandidate.email}</span>
          </Row>
          <Row className="candidate-small_text">
            <span onClick={() => navigate("/signup")}>gender: </span>
            <span className="underline_text">
              {currentCandidate.gender === "Male" ? <FaMale /> : <FaFemale />}{" "}
              {currentCandidate.gender}
            </span>
          </Row>
          <Row className="candidate-small_text">
            <span onClick={() => navigate("/signup")}>occupation: </span>
            <span className="underline_text">{currentCandidate.job_title}</span>
          </Row>
        </Col>
        <Col>
          <Card.Img
            variant="top"
            src={currentCandidate.avatar}
            className="candidate-big-card-img"
          />
        </Col>
      </Row>

      <Row className="candidate-small_text">
        <span onClick={() => navigate("/signup")}>
          what the candidate actualy does:{" "}
        </span>
        <span className="underline_text">
          {" "}
          {currentCandidate.job_description}{" "}
        </span>
      </Row>
      <Row className="button-div">
        <div
          className="back-button"
          onClick={() => {
            navigate("../dashboard");
          }}
        >
          <RiArrowGoBackLine />
          back
        </div>
      </Row>
    </Container>
  );
}

export default Candidate;
