import { Link } from "react-router-dom";
import { useMemo } from "react";
import { MapPin, Calendar, ChevronRight, Flag } from "lucide-react";
import type { Race } from "../services/api";
import { formatRaceDateShort } from "../utils/formatters";
import { PinButton } from "./PinButton";
import { useAppStore } from "../store/pinnedRacesStore";

interface RaceListItemProps {
  race: Race;
}

export function RaceListItem({ race }: RaceListItemProps) {
  const pinnedRaces = useAppStore((state) => state.pinnedRaces);

  const pinned = useMemo(() => {
    return pinnedRaces.some(
      (pinnedRace) =>
        pinnedRace.season === race.season && pinnedRace.round === race.round
    );
  }, [pinnedRaces, race.season, race.round]);

  return (
    <div className="group relative">
      <Link
        to={`/race/${race.season}/${race.round}`}
        className={`block p-3 sm:p-4 md:p-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl hover:bg-white/20 transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-1 ${
          pinned ? "bg-white/15 border-yellow-400 ring-1 ring-yellow-400" : ""
        }`}
      >
        {/* Background gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-yellow-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Mobile Layout: Stack vertically */}
        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 md:gap-6">
          {/* Main content area */}
          <div className="flex items-start sm:items-center gap-3 sm:gap-4 md:gap-6 flex-1 min-w-0">
            {/* Round badge */}
            <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center bg-gradient-to-br from-red-500 to-yellow-500 group-hover:scale-110 transition-transform duration-300">
              <span className="text-white font-black text-sm sm:text-base md:text-lg">
                {race.round}
              </span>
            </div>

            {/* Race details */}
            <div className="flex-1 min-w-0">
              {/* Race name and pinned indicator */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                <h3 className="text-base sm:text-lg font-black text-white group-hover:text-yellow-400 transition-colors duration-300 truncate">
                  {race.raceName}
                </h3>
                {/* Pinned indicator */}
                {pinned && (
                  <div className="inline-flex items-center bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-black px-2 py-1 rounded-full shadow-lg self-start sm:self-auto">
                    ⭐ PINNED
                  </div>
                )}
              </div>

              {/* Circuit and date info - responsive layout */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-6">
                <div className="flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-2 sm:px-3 py-1 max-w-full">
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-yellow-400 flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-bold text-white truncate">
                    {race.Circuit.circuitName}
                  </span>
                </div>
                <div className="flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-2 sm:px-3 py-1">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-blue-400 flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-bold text-white whitespace-nowrap">
                    {formatRaceDateShort(race)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right side content - responsive layout */}
          <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3 md:gap-4">
            {/* Location info */}
            <div className="flex flex-col sm:text-right">
              <div className="flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-2 sm:px-3 py-1 mb-1 sm:mb-2">
                <Flag className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-red-400 flex-shrink-0" />
                <span className="text-xs sm:text-sm font-bold text-white truncate">
                  {race.Circuit.Location.locality}
                </span>
              </div>
              <div className="text-xs sm:text-sm text-gray-400 font-semibold text-left sm:text-center">
                {race.Circuit.Location.country}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Pin Button */}
              <div
                className="relative z-10"
                onClick={(e) => e.preventDefault()}
              >
                <PinButton race={race} className="!p-1.5 sm:!p-2" />
              </div>

              {/* Chevron */}
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-red-500 to-yellow-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </div>

        {/* Racing stripe on bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-yellow-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
      </Link>
    </div>
  );
}
