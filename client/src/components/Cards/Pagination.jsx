import React from "react";
import caretDoubleLeft from "../../assets/caretDouble-left.svg";
import caretDoubleRight from "../../assets/caretDouble-right.svg";
import caretLeft from "../../assets/caret-left.svg";
import caretRight from "../../assets/caret-right.svg";

import "./paginationStyles.css";

export default function Pagination({
  currentPage,
  totalPages,
  goToFirstPage,
  prevPage,
  nextPage,
  goToLastPage,
}) {
  return (
    <div className="pagination-container">
      {/* Botones de paginación */}
      {currentPage > 1 && (
        <span className="left-buttons">
          <button
            onClick={goToFirstPage}
            disabled={currentPage === 1}
            className="double-left"
          >
            <img src={caretDoubleLeft} alt="" />
          </button>

          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="left"
          >
            <img src={caretLeft} alt="" />
          </button>
        </span>
      )}

      <span className="current-page">
        {currentPage} / {totalPages}
      </span>

      {currentPage < totalPages && (
        <span className="right-buttons">
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="right"
          >
            <img src={caretRight} alt="" />
          </button>

          <button
            onClick={goToLastPage}
            disabled={currentPage === totalPages}
            className="double-right"
          >
            <img src={caretDoubleRight} alt="" />
          </button>
        </span>
      )}
    </div>
  );
}
