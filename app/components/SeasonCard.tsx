import { Calendar, Trophy, MapPin } from "lucide-react";
import { Link } from "react-router";
import type { Season } from "../services/api";

interface SeasonCardProps {
  season: Season;
}

export function SeasonCard({ season }: SeasonCardProps) {
  const isRecentSeason = parseInt(season.season) >= 2020;
  const isVintageSeason = parseInt(season.season) < 1980;

  return (
    <Link
      to={`/seasons/${season.season}`}
      className="group w-full text-left relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 hover:bg-white/20 block"
    >
      {/* Gradient overlay on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${
          isRecentSeason
            ? "from-red-500 to-yellow-500"
            : isVintageSeason
            ? "from-amber-500 to-orange-500"
            : "from-blue-500 to-purple-500"
        }`}
      ></div>

      <div className="relative p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div
              className={`p-3 rounded-2xl mr-4 bg-gradient-to-br ${
                isRecentSeason
                  ? "from-red-500 to-yellow-500"
                  : isVintageSeason
                  ? "from-amber-500 to-orange-500"
                  : "from-blue-500 to-purple-500"
              } group-hover:scale-110 transition-transform duration-300`}
            >
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-white group-hover:text-yellow-400 transition-colors duration-300">
                {season.season}
              </h3>
              <p className="text-sm font-semibold text-gray-300">
                {isRecentSeason
                  ? "Modern Era"
                  : isVintageSeason
                  ? "Vintage Era"
                  : "Classic Era"}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Trophy
              className={`w-6 h-6 group-hover:rotate-12 transition-transform duration-300 ${
                isRecentSeason
                  ? "text-red-400"
                  : isVintageSeason
                  ? "text-amber-400"
                  : "text-blue-400"
              }`}
            />
          </div>
        </div>

        <div className="space-y-3 text-sm text-gray-300">
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2 text-gray-400" />
            <span className="font-medium">Formula 1 World Championship</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-bold text-white">Season {season.season}</span>
            <span className="text-xs bg-gradient-to-r from-red-500 to-yellow-500 text-white px-3 py-1 rounded-full font-bold">
              EXPLORE
            </span>
          </div>
        </div>

        {season.url && (
          <div className="mt-4 pt-4 border-t border-white/20">
            <div className="text-yellow-400 text-sm font-bold group-hover:text-yellow-300 transition-colors flex items-center">
              <span>View Championship Data</span>
              <span className="ml-2 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </div>
          </div>
        )}

        {/* Racing stripe animation */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-yellow-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
      </div>
    </Link>
  );
}
