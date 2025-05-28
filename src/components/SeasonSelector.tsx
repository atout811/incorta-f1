import { Calendar } from "lucide-react";
import type { Season } from "../services/api";

interface SeasonSelectorProps {
  seasons: Season[];
  selectedSeason: string;
  onSeasonChange: (season: string) => void;
  isLoading?: boolean;
}

export function SeasonSelector({
  seasons,
  selectedSeason,
  onSeasonChange,
  isLoading,
}: SeasonSelectorProps) {
  return (
    <div className="flex items-center space-x-2">
      <Calendar className="w-5 h-5 text-gray-500" />
      <select
        value={selectedSeason}
        onChange={(e) => onSeasonChange(e.target.value)}
        disabled={isLoading}
        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <option value="">Select a season</option>
        {seasons
          .sort((a, b) => parseInt(b.season) - parseInt(a.season))
          .map((season) => (
            <option key={season.season} value={season.season}>
              {season.season}
            </option>
          ))}
      </select>
    </div>
  );
}
