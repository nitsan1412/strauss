import React, { useState, createContext, useContext, useEffect } from "react";
// import Game from "../logic/Game";
import fetchData from "../services/api";

import { useAuth } from "./auth-context";
const CandidatesContext = createContext();
export const useCandidates = () => useContext(CandidatesContext);

export function CandidatesProvider({ children }) {
  const { jwt } = useAuth(); // Access the user object from the context
  const [candidates, setCandidates] = useState([]);
  const [chosenCandidate, setChosenCandidate] = useState({});

  const [searchWord, setSearchWord] = useState("");
  const [paginationData, setPaginationData] = useState({
    page: 1,
    limit: 20,
    numberOfPages: 5,
  });

  useEffect(() => {}, [searchWord, paginationData]);

  const updatePaginationData = async (field, value) => {
    await setPaginationData({ ...paginationData, [field]: value });
    await getCandidates();
  };

  const updateSearchWord = (newSearchWord) => {
    setSearchWord(newSearchWord);
  };

  const getCandidates = () => {
    fetchData(
      `/candidates/${paginationData.page}/${paginationData.limit}`,
      "get",
      jwt
    )
      .then((res) => {
        setCandidates(res.candidates);
        setPaginationData({
          ...paginationData,
          numberOfPages: res.candidates.length.Math.ceil(paginationData.limit),
        });
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
        searchWord,
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
