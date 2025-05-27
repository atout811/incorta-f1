import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  totalItems: number;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  totalItems,
}: PaginationProps) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between px-6 py-4">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="relative inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
        >
          Previous
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="relative inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
        >
          Next
        </button>
      </div>

      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-bold text-gray-300">
            Showing{" "}
            <span className="text-yellow-400 font-black">{startItem}</span> to{" "}
            <span className="text-yellow-400 font-black">{endItem}</span> of{" "}
            <span className="text-yellow-400 font-black">{totalItems}</span>{" "}
            results
          </p>
        </div>

        <div>
          <nav
            className="isolate inline-flex space-x-2"
            aria-label="Pagination"
          >
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 text-gray-300 rounded-full hover:bg-white/20 focus:z-20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-110 group"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeft className="h-5 w-5 mx-auto group-hover:-translate-x-1 transition-transform" />
            </button>

            {getVisiblePages().map((page, index) => (
              <button
                key={index}
                onClick={() => typeof page === "number" && onPageChange(page)}
                disabled={typeof page !== "number"}
                className={`relative inline-flex items-center justify-center w-12 h-12 text-sm font-black rounded-full transition-all duration-300 transform ${
                  page === currentPage
                    ? "bg-gradient-to-r from-red-500 to-yellow-500 text-white shadow-lg scale-110 z-10"
                    : typeof page === "number"
                    ? "bg-white/10 backdrop-blur-sm border border-white/20 text-gray-300 hover:bg-white/20 hover:text-white hover:scale-110"
                    : "text-gray-500 cursor-default"
                }`}
              >
                {page === currentPage && (
                  <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-yellow-400 rounded-full blur opacity-50"></div>
                )}
                <span className="relative">{page}</span>
              </button>
            ))}

            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 text-gray-300 rounded-full hover:bg-white/20 focus:z-20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-110 group"
            >
              <span className="sr-only">Next</span>
              <ChevronRight className="h-5 w-5 mx-auto group-hover:translate-x-1 transition-transform" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
