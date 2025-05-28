import { Link } from "react-router-dom";
import { useMemo } from "react";
import { MapPin, Calendar, Clock } from "lucide-react";
import type { Race } from "../services/api";
import { formatRaceDate } from "../utils/formatters";
import { PinButton } from "./PinButton";
import { useAppStore } from "../store/pinnedRacesStore";

interface RaceCardProps {
  race: Race;
}

export function RaceCard({ race }: RaceCardProps) {
  const pinnedRaces = useAppStore((state) => state.pinnedRaces);

  const pinned = useMemo(() => {
    return pinnedRaces.some(
      (pinnedRace) =>
        pinnedRace.season === race.season && pinnedRace.round === race.round
    );
  }, [pinnedRaces, race.season, race.round]);

  return (
    <Link
      to={`/race/${race.season}/${race.round}`}
      className={`group block bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6  relative overflow-hidden ${
        pinned ? "ring-2 ring-yellow-400 bg-white/15" : ""
      }`}
    >
      {/* Background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-yellow-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Round badge */}
      <div className="relative mb-4">
        <div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-br from-red-500 to-yellow-500 rounded-full flex items-center justify-center transform ">
          <span className="text-white font-black text-sm">{race.round}</span>
        </div>
      </div>

      {/* Race name */}
      <div className="relative mb-4">
        <h3 className="text-xl font-black text-white group-hover:text-yellow-400 transition-colors duration-300 mb-2 leading-tight">
          {race.raceName}
        </h3>
        {/* Pinned indicator */}
        {pinned && (
          <div className="inline-flex items-center bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-black px-2 py-1 rounded-full mb-2">
            ⭐ PINNED
          </div>
        )}
      </div>

      {/* Circuit info */}
      <div className="relative space-y-3 mb-4">
        <div className="flex items-center text-gray-300">
          <MapPin className="w-4 h-4 mr-2 text-yellow-400" />
          <span className="text-sm font-semibold truncate">
            {race.Circuit.circuitName}
          </span>
        </div>

        <div className="flex items-center text-gray-300">
          <Calendar className="w-4 h-4 mr-2 text-blue-400" />
          <span className="text-sm font-semibold">{formatRaceDate(race)}</span>
        </div>

        {race.time && (
          <div className="flex items-center text-gray-300">
            <Clock className="w-4 h-4 mr-2 text-green-400" />
            <span className="text-sm font-semibold">{race.time}</span>
          </div>
        )}
      </div>

      {/* Location */}
      <div className="relative text-sm text-gray-400 mb-4">
        {race.Circuit.Location.locality}, {race.Circuit.Location.country}
      </div>

      {/* Action area */}
      <div className="relative flex items-center justify-between">
        <div className="text-xs text-gray-500 font-medium">
          Click to view details
        </div>
        {/* Pin Button */}
        <div onClick={(e) => e.preventDefault()}>
          <PinButton race={race} className="!p-1.5" />
        </div>
      </div>

      
    </Link>
  );
}
