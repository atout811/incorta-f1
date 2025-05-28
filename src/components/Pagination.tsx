import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentOffset: number;
  limit: number;
  total: number;
  onOffsetChange: (offset: number) => void;
}

export function Pagination({
  currentOffset,
  limit,
  total,
  onOffsetChange,
}: PaginationProps) {
  const currentPage = Math.floor(currentOffset / limit) + 1;
  const totalPages = Math.ceil(total / limit);
  const startItem = currentOffset + 1;
  const endItem = Math.min(currentOffset + limit, total);

  const goToPrevPage = () => {
    if (currentOffset > 0) {
      onOffsetChange(currentOffset - limit);
    }
  };

  const goToNextPage = () => {
    if (currentOffset + limit < total) {
      onOffsetChange(currentOffset + limit);
    }
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between px-6 py-4">
      <div className="text-sm font-bold text-gray-300">
        Showing {startItem} to {endItem} of {total} results
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={goToPrevPage}
          disabled={currentOffset === 0}
          className="flex items-center px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Previous
        </button>

        <span className="text-white font-bold">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={goToNextPage}
          disabled={currentOffset + limit >= total}
          className="flex items-center px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );
}
