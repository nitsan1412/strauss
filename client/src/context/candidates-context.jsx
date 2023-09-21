import React, { useState, createContext, useContext, useEffect } from "react";
import fetchData from "../services/api";

import { useAuth } from "./auth-context";
const CandidatesContext = createContext();
export const useCandidates = () => useContext(CandidatesContext);

export function CandidatesProvider({ children }) {
  const { jwt } = useAuth();
  const [candidates, setCandidates] = useState([]);
  const [chosenCandidate, setChosenCandidate] = useState({});

  const [paginationData, setPaginationData] = useState({
    page: 1,
    limit: 100,
    numberOfPages: 1,
  });

  useEffect(() => {
    getCandidates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginationData.page, paginationData.limit]);

  const updatePaginationData = (field, value) => {
    setPaginationData({ ...paginationData, [field]: value });
  };

  const getCandidates = async () => {
    await fetchData(
      `/candidates/?page=${paginationData.page}${
        paginationData.limit && `/&limit=${paginationData.limit}`
      }`,
      "get",
      jwt
    )
      .then((res) => {
        setCandidates(res.candidates);
        setPaginationData({
          ...paginationData,
          numberOfPages: Math.ceil(res.totalCandidates / paginationData.limit),
        });
        if (
          Math.ceil(res.totalCandidates / paginationData.limit) <
          paginationData.page
        )
          setPaginationData({ ...paginationData, page: 1 });
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };

  const chooseCandidate = (candi) => {
    setChosenCandidate(candi);
  };

  return (
    <CandidatesContext.Provider
      value={{
        candidates,
        paginationData,
        getCandidates,
        chooseCandidate,
        chosenCandidate,
        updatePaginationData,
      }}
    >
      {children}
    </CandidatesContext.Provider>
  );
}
