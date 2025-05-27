import { Pin, PinOff } from "lucide-react";
import { formatRaceDate } from "../utils/formatters";
import type { Race } from "../services/api";
import { usePinnedRaces } from "../hooks/usePinnedRaces";
import type { PinnedRace } from "../store/pinnedRacesStore";

interface PinButtonProps {
  race: Race;
  className?: string;
  showTooltip?: boolean;
}

export function PinButton({
  race,
  className = "",
  showTooltip = true,
}: PinButtonProps) {
  const { isPinned, pinRace, unpinRace, isHydrated } = usePinnedRaces();
  const pinned = isPinned(race.season, race.round);

  const handleTogglePin = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isHydrated) return;

    if (pinned) {
      unpinRace(race.season, race.round);
    } else {
      const pinnedRaceData: PinnedRace = {
        season: race.season,
        round: race.round,
        raceName: race.raceName,
        circuitName: race.Circuit.circuitName,
        date: formatRaceDate(race),
        location: `${race.Circuit.Location.locality}, ${race.Circuit.Location.country}`,
        pinnedAt: Date.now(),
      };
      pinRace(pinnedRaceData);
    }
  };

  // Don't show pin state until hydrated
  if (!isHydrated) {
    return (
      <button
        className={`group relative p-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 text-gray-400 opacity-50 cursor-not-allowed ${className}`}
        disabled
      >
        <PinOff className="w-4 h-4" />
      </button>
    );
  }

  return (
    <button
      onClick={handleTogglePin}
      className={`group relative p-2 rounded-lg transition-all duration-300 transform hover:scale-110 ${
        pinned
          ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-md hover:shadow-lg"
          : "bg-white/5 backdrop-blur-sm border border-white/20 text-gray-300 hover:bg-white/10 hover:text-white hover:border-white/30"
      } ${className}`}
      title={showTooltip ? (pinned ? "Unpin this race" : "Pin this race") : ""}
    >
      {pinned ? (
        <Pin className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
      ) : (
        <PinOff className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
      )}

      {/* Subtle glow effect for pinned state */}
      {pinned && (
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg blur opacity-20 group-hover:opacity-30 transition-opacity -z-10"></div>
      )}
    </button>
  );
}
