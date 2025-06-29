import { Pagination } from "react-bootstrap";

function CustomPagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 0) return null;

  const pageItems = [];

  const maxPagesToShow = 5;
  let startPage = Math.max(currentPage - Math.floor(maxPagesToShow / 2), 1);
  let endPage = startPage + maxPagesToShow - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(endPage - maxPagesToShow + 1, 1);
  }

  for (let number = startPage; number <= endPage; number++) {
    pageItems.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => onPageChange(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <Pagination className="justify-content-center mt-3">
      <Pagination.Prev
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />
      {startPage > 1 && <Pagination.Ellipsis disabled />}
      {pageItems}
      {endPage < totalPages && <Pagination.Ellipsis disabled />}
      <Pagination.Next
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    </Pagination>
  );
}

export default CustomPagination;
