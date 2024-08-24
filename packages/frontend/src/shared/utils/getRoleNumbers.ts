/* eslint-disable no-plusplus */
const getPageNumbers = (totalPages: number, currentPage: number): (number | string)[] => {
  const pageNumbers = [];
  const maxVisiblePages = 5;
  const halfVisible = Math.floor(maxVisiblePages / 2);

  if (totalPages <= maxVisiblePages) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else if (currentPage <= halfVisible + 1) {
    for (let i = 1; i <= halfVisible + 2; i++) {
      pageNumbers.push(i);
    }
    if (totalPages > halfVisible + 2) {
      pageNumbers.push("...");
    }
    pageNumbers.push(totalPages);
  } else if (currentPage >= totalPages - halfVisible) {
    pageNumbers.push(1);
    if (totalPages > halfVisible + 2) {
      pageNumbers.push("...");
    }
    for (let i = totalPages - (halfVisible + 1); i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    pageNumbers.push(1);
    // pageNumbers.push("...");
    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
      pageNumbers.push(i);
    }
    pageNumbers.push("...");
    pageNumbers.push(totalPages);
  }

  return pageNumbers;
};

export default getPageNumbers;
