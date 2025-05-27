interface ItemsPerPageSelectorProps {
  itemsPerPage: number;
  onItemsPerPageChange: (itemsPerPage: number) => void;
  options?: number[];
}

export function ItemsPerPageSelector({
  itemsPerPage,
  onItemsPerPageChange,
  options = [12, 24, 48, 96],
}: ItemsPerPageSelectorProps) {
  return (
    <div className="flex items-center space-x-3">
      <span className="text-sm font-bold text-white">SHOW:</span>
      <select
        value={itemsPerPage}
        onChange={(e) => onItemsPerPageChange(parseInt(e.target.value))}
        className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm font-bold text-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent hover:bg-white/20 transition-all duration-300 cursor-pointer"
      >
        {options.map((option) => (
          <option
            key={option}
            value={option}
            className="bg-gray-900 text-white"
          >
            {option}
          </option>
        ))}
      </select>
      <span className="text-sm font-bold text-gray-300">PER PAGE</span>
    </div>
  );
}
