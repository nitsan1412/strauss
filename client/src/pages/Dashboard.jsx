import React, { useEffect, useState } from "react";
import { useCandidates } from "../context/candidates-context";
import { useAuth } from "../context/auth-context";
import { Row, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";
import CradsDashboard from "../components/CradsDashboard";
import ListDashboard from "../components/ListDashboard";
import CustomPagination from "../components/CustomPagination";
import PageSize from "../components/PageSize";
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

  useEffect(() => {
    if (jwt) {
      getCandidates();
    } else {
      navigate("../");
    }
  }, []);

  const changeDisplay = () => {
    setIsList(!isList);
  };

  return (
    <Container className="dashboard-container">
      <Row>
        <h2>candidates</h2>
      </Row>
      <Row className="pagination-row">
        <PageSize
          currPageSize={paginationData.limit}
          updatePageSize={(newLimit) => updatePaginationData("limit", newLimit)}
        />
      </Row>

      <Row className="pagination-row">
        <CustomPagination
          currentPage={paginationData.page}
          totalPages={paginationData.numberOfPages}
          onPageChange={(newpage) => updatePaginationData("page", newpage)}
        />
        <Button className="list-button" onClick={() => changeDisplay()}>
          {isList ? "show in cards" : "show as a list"}
        </Button>
      </Row>
      {candidates.length > 0 ? (
        isList ? (
          <ListDashboard
            candidates={candidates}
            chooseCandidate={chooseCandidate}
          />
        ) : (
          <CradsDashboard
            candidates={candidates}
            chooseCandidate={chooseCandidate}
          />
        )
      ) : (
        <></>
      )}
    </Container>
  );
}

export default Home;
