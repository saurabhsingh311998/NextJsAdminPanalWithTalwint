import React, { useEffect, useState } from "react";

interface PaginationControlsProps<T> {
  data: T[];
  itemsPerPageOptions?: number[];
  initialItemsPerPage?: number;
  onPageChange: (currentPageData: T[]) => void;
}

const PaginationControls = <T extends unknown>({
  data,
  itemsPerPageOptions = [5, 10, 20],
  initialItemsPerPage = 5,
  onPageChange,
}: PaginationControlsProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    onPageChange(data.slice(startIndex, endIndex));
  };

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newItemsPerPage = parseInt(event.target.value, 10);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
    onPageChange(data.slice(0, newItemsPerPage));
  };

  useEffect(() => {
    // Trigger the initial data load when the component mounts
    onPageChange(data.slice(0, 5));
  }, [data]); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <div className="flex items-center justify-between space-x-4 py-4">
      <button
        onClick={() => handleChangePage(currentPage - 1)}
        disabled={currentPage === 1}
        className={`rounded border px-4 py-2 text-sm font-medium ${
          currentPage === 1
            ? "cursor-not-allowed bg-gray-300"
            : "bg-blue-500 text-white"
        }`}
      >
        Previous
      </button>

      <div className="flex items-center space-x-2">
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <select
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          className="rounded border px-2 py-1"
        >
          {itemsPerPageOptions.map((option) => (
            <option key={option} value={option}>
              {option} items/page
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={() => handleChangePage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`rounded border px-4 py-2 text-sm font-medium ${
          currentPage === totalPages
            ? "cursor-not-allowed bg-gray-300"
            : "bg-blue-500 text-white"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationControls;