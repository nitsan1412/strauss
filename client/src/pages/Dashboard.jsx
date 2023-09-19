import React, { useEffect, useState } from "react";
import { useCandidates } from "../context/candidates-context";
import { useAuth } from "../context/auth-context";
import { Row, Col, Button, Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";
import CradsDashboard from "../components/CradsDashboard";
import ListDashboard from "../components/ListDashboard";
import CustomPagination from "../components/CustomPagination";
function Home() {
  const {
    getCandidates,
    candidates,
    updatePaginationData,
    paginationData,
    chooseCandidate,
  } = useCandidates();
  const { jwt } = useAuth();
  const navigate = useNavigate();
  const [isList, setIsList] = useState(false);

  const [page, setPage] = useState(paginationData.page || 0);
  const [limit, setLimit] = useState(paginationData.limit || 20);
  const [currentCandidates, setCurrentCandidates] = useState([]);

  useEffect(() => {
    if (jwt) {
      getCandidates();
    } else {
      navigate("../");
    }
  }, []);

  useEffect(() => {
    if (candidates.length > 0) {
      setCurrentCandidates(candidates);
    }
  }, [candidates]);

  useEffect(() => {
    setPage(paginationData.page);
    setLimit(paginationData.limit);
  }, [paginationData.page, paginationData.limit]);

  const changeDisplay = () => {
    setIsList(!isList);
  };

  return (
    <Container className="dashboard-container">
      <Row>
        <h2>candidates</h2>
      </Row>
      <Row className="pagination-row">
        <CustomPagination
          currentPage={page}
          totalPages={paginationData.numberOfPages}
          onPageChange={(page) => updatePaginationData("page", page)}
        />{" "}
        <Button className="list-button" onClick={() => changeDisplay()}>
          {isList ? "show in cards" : "show as a list"}
        </Button>
      </Row>
      {currentCandidates.length > 0 ? (
        isList ? (
          <ListDashboard currentCandidates={currentCandidates} />
        ) : (
          <CradsDashboard currentCandidates={currentCandidates} />
        )
      ) : (
        <></>
      )}
      {/* <Row className="rows-candidate-cards" gap={2}>
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
      </Row> */}
    </Container>
  );
}

export default Home;
