import { useState } from "react";

export default function usePagination(items, pageSize = 4) {
  const [currentPage, setCurrentPage] = useState(1);

  // total pages
  const totalPages = Math.ceil(items.length / pageSize);

  // cities to show on this page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const itemsOnPage = items.slice(startIndex, endIndex);

  const handlePrev = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  return {
    currentPage,
    totalPages,
    itemsOnPage,
    handlePrev,
    handleNext,
    setCurrentPage,
  };
}
