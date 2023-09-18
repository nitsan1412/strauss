import React, { useState, createContext, useContext, useEffect } from "react";
// import Game from "../logic/Game";
import { useAuth } from "./auth-context";
const CandidatesContext = createContext();
export const useCandidates = () => useContext(CandidatesContext);

export function CandidatesProvider({ children }) {
  const [candidates, setCandidates] = useState([]);
  const [searchWord, setSearchWord] = useState("");
  const [paginationData, setPaginationData] = useState({ page: 1, limit: 20 });

  useEffect(() => {}, [searchWord, paginationData]);
  const updatePaginationData = (newPagination) => {
    setPaginationData(newPagination);
  };

  const updateSearchWord = (newSearchWord) => {
    setSearchWord(newSearchWord);
  };

  return (
    <CandidatesContext.Provider
      value={{
        candidates,
        searchWord,
        paginationData,
      }}
    >
      {children}
    </CandidatesContext.Provider>
  );
}
