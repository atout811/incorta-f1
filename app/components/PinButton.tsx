import { useState, useMemo } from "react";
import { Pin, PinOff } from "lucide-react";
import { useAppStore } from "../store/pinnedRacesStore";
import type { Race } from "../services/api";

interface PinButtonProps {
  race: Race;
  className?: string;
}

export function PinButton({ race, className = "" }: PinButtonProps) {
  const pinnedRaces = useAppStore((state) => state.pinnedRaces);
  const pinRace = useAppStore((state) => state.pinRace);
  const unpinRace = useAppStore((state) => state.unpinRace);
  const [isAnimating, setIsAnimating] = useState(false);

  const pinned = useMemo(() => {
    return pinnedRaces.some(
      (pinnedRace) =>
        pinnedRace.season === race.season && pinnedRace.round === race.round
    );
  }, [pinnedRaces, race.season, race.round]);

  const handlePin = async () => {
    setIsAnimating(true);

    try {
      if (pinned) {
        unpinRace(race.season, race.round);
      } else {
        const pinnedRace = {
          season: race.season,
          round: race.round,
          raceName: race.raceName,
          circuitName: race.Circuit.circuitName,
          date: race.date,
          location: `${race.Circuit.Location.locality}, ${race.Circuit.Location.country}`,
          pinnedAt: Date.now(),
        };
        pinRace(pinnedRace);
      }
    } catch (error) {
      console.error("Error toggling pin:", error);
    } finally {
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  return (
    <button
      onClick={handlePin}
      className={`group relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 transform hover:scale-110 active:scale-95 ${
        pinned
          ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-black shadow-lg hover:shadow-xl"
          : "bg-white/20 hover:bg-white/30 text-white border border-white/30"
      } ${isAnimating ? "animate-pulse" : ""} ${className}`}
      title={pinned ? "Unpin race" : "Pin race"}
      disabled={isAnimating}
    >
      <div className="relative">
        {pinned ? (
          <PinOff className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
        ) : (
          <Pin className="w-5 h-5 transition-transform duration-300 group-hover:-rotate-12" />
        )}

        {/* Subtle glow effect for pinned state */}
        {pinned && (
          <div className="absolute inset-0 bg-yellow-400 rounded-full opacity-30 animate-ping"></div>
        )}
      </div>

      {/* Ripple effect on click */}
      {isAnimating && (
        <div className="absolute inset-0 bg-white/30 rounded-full animate-ping"></div>
      )}
    </button>
  );
}
