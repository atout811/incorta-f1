import { Grid3X3, List } from "lucide-react";

interface ViewToggleProps {
  view: "list" | "grid";
  onViewChange: (view: "list" | "grid") => void;
}

export function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex bg-white/10 backdrop-blur-sm border border-white/20 rounded-full overflow-hidden p-1">
      <button
        onClick={() => onViewChange("list")}
        className={`relative px-4 py-2 flex items-center space-x-2 text-sm font-bold transition-all duration-300 rounded-full ${
          view === "list"
            ? "bg-gradient-to-r from-red-500 to-yellow-500 text-white shadow-lg transform scale-105"
            : "text-gray-300 hover:text-white hover:bg-white/10"
        }`}
      >
        <List className="w-4 h-4" />
        <span>LIST</span>
        {view === "list" && (
          <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-yellow-400 rounded-full blur opacity-50"></div>
        )}
      </button>
      <button
        onClick={() => onViewChange("grid")}
        className={`relative px-4 py-2 flex items-center space-x-2 text-sm font-bold transition-all duration-300 rounded-full ${
          view === "grid"
            ? "bg-gradient-to-r from-red-500 to-yellow-500 text-white shadow-lg transform scale-105"
            : "text-gray-300 hover:text-white hover:bg-white/10"
        }`}
      >
        <Grid3X3 className="w-4 h-4" />
        <span>GRID</span>
        {view === "grid" && (
          <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-yellow-400 rounded-full blur opacity-50"></div>
        )}
      </button>
    </div>
  );
}
