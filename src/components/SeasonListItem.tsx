import { Calendar, Trophy, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Season } from "../services/api";

interface SeasonListItemProps {
  season: Season;
}

export function SeasonListItem({ season }: SeasonListItemProps) {
  const isRecentSeason = parseInt(season.season) >= 2020;
  const isVintageSeason = parseInt(season.season) < 1980;

  return (
    <Link
      to={`/seasons/${season.season}`}
      className="group w-full block p-3 sm:p-4 md:p-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl hover:bg-white/20 transition-all duration-500 transform  relative"
    >
      {/* Background gradient on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500 ${
          isRecentSeason
            ? "from-red-500 to-yellow-500"
            : isVintageSeason
            ? "from-amber-500 to-orange-500"
            : "from-blue-500 to-purple-500"
        }`}
      ></div>

      {/* Mobile Layout: Stack vertically */}
      <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 md:gap-6">
        {/* Main content area */}
        <div className="flex items-start sm:items-center gap-3 sm:gap-4 md:gap-6 flex-1 min-w-0">
          {/* Season icon badge */}
          <div
            className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center bg-gradient-to-br group-hover:scale-110 transition-transform duration-300 ${
              isRecentSeason
                ? "from-red-500 to-yellow-500"
                : isVintageSeason
                ? "from-amber-500 to-orange-500"
                : "from-blue-500 to-purple-500"
            }`}
          >
            <Calendar className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
          </div>

          {/* Season details */}
          <div className="flex-1 min-w-0 text-left">
            <h3 className="text-base sm:text-lg md:text-xl font-black text-white group-hover:text-yellow-400 transition-colors duration-300 truncate">
              {season.season} Season
            </h3>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 md:gap-6 text-xs sm:text-sm text-gray-300 mt-1 sm:mt-2">
              <div className="flex items-center">
                <Trophy className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 group-hover:rotate-12 transition-transform duration-300 flex-shrink-0" />
                <span className="font-semibold whitespace-nowrap">
                  {isRecentSeason
                    ? "Modern Era"
                    : isVintageSeason
                    ? "Vintage Era"
                    : "Classic Era"}
                </span>
              </div>
              <span className="font-medium text-xs sm:text-sm truncate">
                Formula 1 World Championship
              </span>
            </div>
          </div>
        </div>

        {/* Right side content - responsive layout */}
        <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3 md:gap-4">
          {/* Year and call to action */}
          <div className="flex flex-col sm:text-right">
            <div className="text-base sm:text-lg font-black text-white group-hover:text-yellow-400 transition-colors duration-300">
              {season.season}
            </div>
            <div className="text-xs sm:text-sm text-gray-400 font-medium text-left sm:text-right">
              Click to explore
            </div>
          </div>

          {/* Chevron button */}
          <div className="flex items-center">
            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-red-500 to-yellow-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </div>

      
    </Link>
  );
}
