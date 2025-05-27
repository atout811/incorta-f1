import { Calendar, Trophy, ChevronRight } from "lucide-react";
import { Link } from "react-router";
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
      className="group w-full flex items-center justify-between p-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl hover:bg-white/20 transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-1 relative"
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

      <div className="relative flex items-center space-x-6 flex-1">
        <div
          className={`flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br group-hover:scale-110 transition-transform duration-300 ${
            isRecentSeason
              ? "from-red-500 to-yellow-500"
              : isVintageSeason
              ? "from-amber-500 to-orange-500"
              : "from-blue-500 to-purple-500"
          }`}
        >
          <Calendar className="w-8 h-8 text-white" />
        </div>

        <div className="flex-1 min-w-0 text-left">
          <h3 className="text-xl font-black text-white group-hover:text-yellow-400 transition-colors duration-300">
            {season.season} Season
          </h3>
          <div className="flex items-center space-x-6 text-sm text-gray-300 mt-2">
            <div className="flex items-center">
              <Trophy className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
              <span className="font-semibold">
                {isRecentSeason
                  ? "Modern Era"
                  : isVintageSeason
                  ? "Vintage Era"
                  : "Classic Era"}
              </span>
            </div>
            <span className="font-medium">Formula 1 World Championship</span>
          </div>
        </div>
      </div>

      <div className="relative flex items-center space-x-4">
        <div className="text-right">
          <div className="text-lg font-black text-white group-hover:text-yellow-400 transition-colors duration-300">
            {season.season}
          </div>
          <div className="text-sm text-gray-400 font-medium">
            Click to explore
          </div>
        </div>

        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-500 to-yellow-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <ChevronRight className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </div>

      {/* Racing stripe on bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-yellow-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
    </Link>
  );
}
