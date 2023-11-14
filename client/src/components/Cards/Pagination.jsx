import React from "react";
import caretDoubleLeft from "../../assets/caretDouble-left.svg";
import caretDoubleRight from "../../assets/caretDouble-right.svg";
import caretLeft from "../../assets/caret-left.svg";
import caretRight from "../../assets/caret-right.svg";

export default function Pagination({
  currentPage,
  totalPages,
  goToFirstPage,
  prevPage,
  nextPage,
  goToLastPage,
}) {
  return (
    <div className="pagination">
      {/* Botones de paginación */}
      {currentPage > 1 && (
        <>
          <button onClick={goToFirstPage} disabled={currentPage === 1}>
            <img src={caretDoubleLeft} alt="" />
          </button>
          <button onClick={prevPage} disabled={currentPage === 1}>
            <img src={caretLeft} alt="" />
          </button>
        </>
      )}

      <span>
        {currentPage} / {totalPages}
      </span>

      {currentPage < totalPages && (
        <>
          <button onClick={nextPage} disabled={currentPage === totalPages}>
            <img src={caretRight} alt="" />
          </button>
          <button onClick={goToLastPage} disabled={currentPage === totalPages}>
            <img src={caretDoubleRight} alt="" />
          </button>
        </>
      )}
    </div>
  );
}
