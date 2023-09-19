import React, { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";
import "../styles/dashboard.css";

export default function CustomPagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  const [chosenPage, setChosenPage] = useState(currentPage);

  useEffect(() => {
    setChosenPage(currentPage);
  }, [currentPage]);

  const createBtn = () => {
    let numBtns = [];
    for (let index = 1; index < totalPages + 1; index++) {
      if (index === chosenPage) {
        numBtns.push(
          <div key={index}>
            <button onClick={() => onPageChange(index)} className="currPage">
              {index}
            </button>
          </div>
        );
      } else {
        numBtns.push(
          <div key={index}>
            <button onClick={() => onPageChange(index)} className="notCurrPage">
              {index}
            </button>
          </div>
        );
      }
    }
    return numBtns;
  };
  return (
    <div aria-label="pagination" className="pagination-div">
      <ul className="pagination">
        {chosenPage !== 1 && (
          <div>
            <button
              onClick={() => onPageChange(chosenPage - 1)}
              className="notCurrPage"
            >
              <span aria-hidden="true">«</span>
            </button>
          </div>
        )}
        {createBtn()}
        {chosenPage !== totalPages && (
          <div>
            <button
              onClick={() => onPageChange(chosenPage + 1)}
              className="notCurrPage"
            >
              <span>»</span>
            </button>
          </div>
        )}
      </ul>
    </div>
  );
}
