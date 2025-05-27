import { Link } from "react-router";
import { MapPin, Calendar, ChevronRight, Flag } from "lucide-react";
import type { Race } from "../services/api";
import { formatRaceDateShort } from "../utils/formatters";
import { PinButton } from "./PinButton";
import { usePinnedRaces } from "../hooks/usePinnedRaces";

interface RaceListItemProps {
  race: Race;
}

export function RaceListItem({ race }: RaceListItemProps) {
  const { isPinned, isHydrated } = usePinnedRaces();
  const pinned = isHydrated ? isPinned(race.season, race.round) : false;

  return (
    <div className="group relative">
      <Link
        to={`/race/${race.season}/${race.round}`}
        className={`flex items-center justify-between p-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl hover:bg-white/20 transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-1 ${
          pinned && isHydrated
            ? "bg-white/15 border-yellow-400 ring-1 ring-yellow-400"
            : ""
        }`}
      >
        {/* Background gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-yellow-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <div className="relative flex items-center space-x-6 flex-1">
          <div className="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br from-red-500 to-yellow-500 group-hover:scale-110 transition-transform duration-300">
            <span className="text-white font-black text-lg">{race.round}</span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-black text-white group-hover:text-yellow-400 transition-colors duration-300 truncate mr-4">
                {race.raceName}
              </h3>
              {/* Pinned indicator */}
              {pinned && isHydrated && (
                <div className="inline-flex items-center bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-black px-2 py-1 rounded-full shadow-lg">
                  ⭐ PINNED
                </div>
              )}
            </div>
            <div className="flex items-center space-x-6 mt-2">
              <div className="flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1">
                <MapPin className="w-4 h-4 mr-2 text-yellow-400" />
                <span className="text-sm font-bold text-white truncate">
                  {race.Circuit.circuitName}
                </span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1">
                <Calendar className="w-4 h-4 mr-2 text-blue-400" />
                <span className="text-sm font-bold text-white">
                  {formatRaceDateShort(race)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative flex items-center space-x-4">
          <div className="text-right">
            <div className="flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1 mb-2">
              <Flag className="w-4 h-4 mr-2 text-red-400" />
              <span className="text-sm font-bold text-white">
                {race.Circuit.Location.locality}
              </span>
            </div>
            <div className="text-sm text-gray-400 font-semibold text-center">
              {race.Circuit.Location.country}
            </div>
          </div>

          {/* Pin Button integrated into the right side */}
          <div className="relative z-10" onClick={(e) => e.preventDefault()}>
            <PinButton race={race} className="!p-2" />
          </div>

          <div className="flex items-center space-x-2">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-500 to-yellow-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <ChevronRight className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </div>
        </div>

        {/* Racing stripe on bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-yellow-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
      </Link>
    </div>
  );
}
