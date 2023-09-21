import React from "react";

export default function PageSize({ currPageSize, updatePageSize }) {
  const sizesArr = [10, 20, 50, 100];
  return (
    <div className="pageSizeBtnsDiv">
      <span>number of results in page:</span>
      {sizesArr.map((el, index) => {
        if (el === currPageSize)
          return (
            <button
              key={index}
              className=" currPageSizeBtn "
              onClick={() => updatePageSize(el)}
            >
              {el}
            </button>
          );
        return (
          <button
            key={index}
            className="pageSizeBtns"
            onClick={() => updatePageSize(el)}
          >
            {el}
          </button>
        );
      })}
    </div>
  );
}
