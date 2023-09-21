import React, { useEffect } from "react";
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
    showInCards,
    candidates,
    updatePaginationData,
    paginationData,
    chooseCandidate,
    changeDashboardDisplay,
  } = useCandidates();
  const { jwt } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (jwt) {
      getCandidates();
    } else {
      navigate("../");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeDisplay = () => {
    changeDashboardDisplay();
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
          {showInCards ? "show in cards" : "show as a list"}
        </Button>
      </Row>
      {candidates.length > 0 ? (
        !showInCards ? (
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
