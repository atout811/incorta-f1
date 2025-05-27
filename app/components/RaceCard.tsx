import { Link } from "react-router";
import { MapPin, Calendar, Clock, Flag } from "lucide-react";
import type { Race } from "../services/api";
import { formatRaceDate } from "../utils/formatters";
import { PinButton } from "./PinButton";
import { usePinnedRaces } from "../hooks/usePinnedRaces";

interface RaceCardProps {
  race: Race;
}

export function RaceCard({ race }: RaceCardProps) {
  const { isPinned, isHydrated } = usePinnedRaces();
  const pinned = isHydrated ? isPinned(race.season, race.round) : false;

  return (
    <div className="group relative">
      <Link
        to={`/race/${race.season}/${race.round}`}
        className={`block relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 hover:bg-white/20 ${
          pinned && isHydrated ? "ring-2 ring-yellow-400 bg-white/15" : ""
        }`}
      >
        {/* Background gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-yellow-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <div className="relative p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1 mr-4">
              <h3 className="text-lg font-black text-white group-hover:text-yellow-400 transition-colors duration-300 line-clamp-2">
                {race.raceName}
              </h3>
            </div>
            <div className="flex items-center space-x-3">
              <span className="bg-gradient-to-r from-red-500 to-yellow-500 text-white px-3 py-1 rounded-full text-sm font-black shadow-lg">
                R{race.round}
              </span>
              {/* Pin Button integrated into header */}
              <div
                className="relative z-10"
                onClick={(e) => e.preventDefault()}
              >
                <PinButton race={race} className="!p-2" />
              </div>
            </div>
          </div>

          {/* Pinned indicator */}
          {pinned && isHydrated && (
            <div className="mb-3">
              <div className="inline-flex items-center bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-black px-3 py-1 rounded-full shadow-lg">
                ⭐ PINNED
              </div>
            </div>
          )}

          <div className="space-y-3 text-sm">
            <div className="flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-2">
              <MapPin className="w-4 h-4 mr-2 text-yellow-400" />
              <span className="text-white font-bold">
                {race.Circuit.circuitName}
              </span>
            </div>

            <div className="flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-2">
              <Flag className="w-4 h-4 mr-2 text-red-400" />
              <span className="text-white font-bold">
                {race.Circuit.Location.locality},{" "}
                {race.Circuit.Location.country}
              </span>
            </div>

            <div className="flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-2">
              <Calendar className="w-4 h-4 mr-2 text-blue-400" />
              <span className="text-white font-bold">
                {formatRaceDate(race)}
              </span>
            </div>

            {race.time && (
              <div className="flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-2">
                <Clock className="w-4 h-4 mr-2 text-green-400" />
                <span className="text-white font-bold">{race.time} UTC</span>
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-between items-center">
            <div className="text-yellow-400 text-sm font-black group-hover:text-yellow-300 transition-colors flex items-center">
              <span>View Race Details</span>
              <span className="ml-2 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </div>
          </div>

          {/* Racing stripe animation */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-yellow-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
        </div>
      </Link>
    </div>
  );
}
