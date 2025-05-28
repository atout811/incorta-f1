import { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { ErrorMessage } from "../components/ErrorMessage";
import { ViewToggle } from "../components/ViewToggle";
import { RaceCard } from "../components/RaceCard";
import { RaceListItem } from "../components/RaceListItem";
import { f1Api, type Race } from "../services/api";
import { useAppStore } from "../store/pinnedRacesStore";
import { ArrowLeft, Calendar, Trophy, Target, Timer, Pin } from "lucide-react";

export default function SeasonDetails() {
  const { season } = useParams<{ season: string }>();
  const [races, setRaces] = useState<Race[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Use global store for user preferences
  const preferredView = useAppStore((state) => state.preferredView);
  const setPreferredView = useAppStore((state) => state.setPreferredView);

  // Animation trigger
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Load races when season changes
  useEffect(() => {
    if (season) {
      loadRaces(season);
    }
  }, [season]);

  const loadRaces = async (seasonYear: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await f1Api.getRaces(seasonYear);
      setRaces(data);
    } catch (err) {
      setError("Failed to load races for this season. Please try again.");
      console.error("Error loading races:", err);
    } finally {
      setLoading(false);
    }
  };

  // Get sorted races with pinned ones first
  const sortedRaces = useMemo(() => {
    return [...races].sort((a, b) => {
      return parseInt(a.round) - parseInt(b.round);
    });
  }, [races]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-red-500 rounded-full blur-md animate-pulse"></div>
            <Trophy className="relative w-20 h-20 text-white animate-bounce mx-auto" />
          </div>
          <div className="text-white text-xl font-bold mb-4">
            Loading {season} Season...
          </div>
          <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden mx-auto">
            <div className="h-full bg-gradient-to-r from-red-500 to-yellow-500 animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-black flex items-center justify-center">
        <ErrorMessage
          message={error}
          onRetry={() => season && loadRaces(season)}
        />
      </div>
    );
  }

  const currentDate = new Date();
  const upcomingRaces = races.filter((race) => {
    const raceDate = new Date(`${race.date}T${race.time || "00:00:00"}`);
    return raceDate > currentDate;
  });

  const completedRaces = races.filter((race) => {
    const raceDate = new Date(`${race.date}T${race.time || "00:00:00"}`);
    return raceDate <= currentDate;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-black">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back navigation */}
        <Link
          to="/seasons"
          className="group inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 px-6 py-3 rounded-full mb-8 transition-all duration-300 transform hover:scale-105"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to All Seasons
        </Link>

        {/* Season header */}
        <div
          className={`mb-12 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="relative bg-gradient-to-r from-red-600/20 to-yellow-600/20 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-yellow-500/10 rounded-3xl animate-pulse"></div>

            <div className="relative flex items-center">
              <div className="p-4 bg-gradient-to-br from-yellow-400 to-red-500 rounded-2xl mr-6">
                <Trophy className="w-12 h-12 text-white" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-yellow-400 to-red-400 mb-2">
                  {season} SEASON
                </h1>
                <p className="text-xl text-gray-300">
                  Championship races and complete season data
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Race view controls */}
        {races.length > 0 && (
          <div
            className={`flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8 transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3">
                <Calendar className="w-6 h-6 text-yellow-400 mr-3" />
                <span className="text-lg font-bold text-white">
                  {races.length} RACES
                </span>
                <span className="text-gray-300 ml-2">in {season}</span>
              </div>
            </div>
            <ViewToggle view={preferredView} onViewChange={setPreferredView} />
          </div>
        )}

        {/* Races content */}
        {!loading && !error && races.length > 0 && (
          <div
            className={`transition-all duration-1000 delay-500 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {preferredView === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedRaces.map((race, index) => (
                  <div
                    key={`${race.season}-${race.round}`}
                    className="transform transition-all duration-500 hover:scale-105"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <RaceCard race={race} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {sortedRaces.map((race, index) => (
                  <div
                    key={`${race.season}-${race.round}`}
                    className="transform transition-all duration-500"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <RaceListItem race={race} />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {!loading && !error && races.length === 0 && (
          <div className="text-center py-20">
            <Target className="w-24 h-24 text-gray-400 mx-auto mb-6 animate-pulse" />
            <h3 className="text-2xl font-bold text-white mb-4">
              No Races Found
            </h3>
            <p className="text-gray-400 text-lg">
              No races available for the {season} season.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
