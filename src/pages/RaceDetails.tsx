import { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Clock,
  Trophy,
  Users,
  Zap,
  Target,
  Flag,
} from "lucide-react";
import { ErrorMessage } from "../components/ErrorMessage";
import { RaceResultTable } from "../components/RaceResultTable";
import { f1Api, type Race } from "../services/api";
import {
  formatRaceDate,
  formatDriverName,
  getCountryFlag,
} from "../utils/formatters";

export default function RaceDetails() {
  const { season, round } = useParams<{ season: string; round: string }>();
  const [race, setRace] = useState<Race | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const loadRaceResults = useCallback(async () => {
    if (!season || !round) return;

    try {
      setLoading(true);
      setError(null);
      const data = await f1Api.getRaceResults(season, round);
      if (data.length > 0) {
        setRace(data[0]);
      } else {
        setError("No race data found for this race.");
      }
    } catch (err) {
      setError("Failed to load race results. Please try again.");
      console.error("Error loading race results:", err);
    } finally {
      setLoading(false);
    }
  }, [season, round]);

  useEffect(() => {
    if (season && round) {
      loadRaceResults();
    }
  }, [season, round, loadRaceResults]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-red-500 rounded-full blur-md animate-pulse"></div>
            <Flag className="relative w-20 h-20 text-white animate-bounce mx-auto" />
          </div>
          <div className="text-white text-xl font-bold mb-4">
            Loading Race Results...
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
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-black">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            to="/seasons"
            className="group inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 px-6 py-3 rounded-full mb-8 transition-all duration-300 transform hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Seasons
          </Link>
          <div className="flex justify-center items-center min-h-64">
            <ErrorMessage message={error} onRetry={loadRaceResults} />
          </div>
        </div>
      </div>
    );
  }

  if (!race) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-black">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            to="/seasons"
            className="group inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 px-6 py-3 rounded-full mb-8 transition-all duration-300 transform hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Seasons
          </Link>
          <div className="text-center py-20">
            <Target className="w-24 h-24 text-gray-400 mx-auto mb-6 animate-pulse" />
            <h3 className="text-2xl font-bold text-white mb-4">
              Race Not Found
            </h3>
            <p className="text-gray-400 text-lg">
              Unable to load race data for this event.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const winner = race.Results?.[0];
  const fastestLapDriver = race.Results?.find(
    (result) => result.FastestLap?.rank === "1"
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-black">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Navigation */}
        <Link
          to={`/seasons/${season}`}
          className="group inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 px-6 py-3 rounded-full mb-8 transition-all duration-300 transform hover:scale-105"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to {season} Season
        </Link>

        {/* Race Header */}
        <div
          className={`mb-12 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="relative bg-gradient-to-r from-red-600/20 to-yellow-600/20 backdrop-blur-sm rounded-3xl p-8 border border-white/20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-yellow-500/10 rounded-3xl animate-pulse"></div>

            <div className="relative">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="mb-6 lg:mb-0">
                  <div className="flex items-center mb-4">
                    <div className="bg-gradient-to-r from-red-500 to-yellow-500 text-white px-6 py-2 rounded-full text-sm font-black mr-4 animate-pulse">
                      ROUND {race.round}
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-yellow-400 to-red-400">
                      {race.raceName}
                    </h1>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2">
                      <MapPin className="w-5 h-5 text-yellow-400 mr-2" />
                      <span className="text-white font-bold text-sm">
                        {race.Circuit.circuitName}
                      </span>
                    </div>

                    <div className="flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2">
                      <Flag className="w-5 h-5 text-red-400 mr-2" />
                      <span className="text-white font-bold text-sm">
                        {race.Circuit.Location.locality},{" "}
                        {race.Circuit.Location.country}
                      </span>
                    </div>

                    <div className="flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2">
                      <Calendar className="w-5 h-5 text-blue-400 mr-2" />
                      <span className="text-white font-bold text-sm">
                        {formatRaceDate(race)}
                      </span>
                    </div>

                    {race.time && (
                      <div className="flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2">
                        <Clock className="w-5 h-5 text-green-400 mr-2" />
                        <span className="text-white font-bold text-sm">
                          {race.time} UTC
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Racing stripe animation */}
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-red-500 to-yellow-500 animate-racing-stripe"></div>
          </div>
        </div>

        {/* Race Statistics */}
        {(winner || fastestLapDriver) && (
          <div
            className={`grid md:grid-cols-2 gap-8 mb-12 transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {winner && (
              <div className="group relative bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 backdrop-blur-sm border border-white/20 rounded-3xl p-8 overflow-hidden transition-all duration-500 hover:scale-105 hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-yellow-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl mr-4 group-hover:scale-110 transition-transform duration-300">
                      <Trophy className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-black text-white">
                      RACE WINNER
                    </h3>
                  </div>

                  <div className="flex items-center">
                    <span className="text-4xl mr-4 animate-bounce">
                      {getCountryFlag(winner.Driver.nationality)}
                    </span>
                    <div>
                      <div className="text-2xl font-black text-white group-hover:text-yellow-400 transition-colors">
                        {formatDriverName(winner.Driver)}
                      </div>
                      <div className="text-yellow-300 font-bold">
                        {winner.Constructor.name}
                      </div>
                      <div className="text-yellow-200 text-sm">
                        {winner.Time?.time || "N/A"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Winner glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
              </div>
            )}

            {fastestLapDriver && (
              <div className="group relative bg-gradient-to-br from-purple-500/20 to-purple-700/20 backdrop-blur-sm border border-white/20 rounded-3xl p-8 overflow-hidden transition-all duration-500 hover:scale-105 hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl mr-4 group-hover:scale-110 transition-transform duration-300">
                      <Zap className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-black text-white">
                      FASTEST LAP
                    </h3>
                  </div>

                  <div className="flex items-center">
                    <span className="text-4xl mr-4 animate-pulse">
                      {getCountryFlag(fastestLapDriver.Driver.nationality)}
                    </span>
                    <div>
                      <div className="text-2xl font-black text-white group-hover:text-purple-400 transition-colors">
                        {formatDriverName(fastestLapDriver.Driver)}
                      </div>
                      <div className="text-purple-300 font-bold">
                        {fastestLapDriver.FastestLap?.Time.time}
                      </div>
                      <div className="text-purple-200 text-sm">
                        Lap {fastestLapDriver.FastestLap?.lap}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Race Results */}
        <div
          className={`transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex items-center mb-8">
            <div className="p-3 bg-gradient-to-br from-red-500 to-yellow-500 rounded-2xl mr-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-black text-white">RACE RESULTS</h2>
            <span className="ml-4 bg-white/10 backdrop-blur-sm border border-white/20 text-yellow-400 px-4 py-2 rounded-full font-bold">
              {race.Results?.length || 0} DRIVERS
            </span>
          </div>

          {race.Results && race.Results.length > 0 ? (
            <RaceResultTable results={race.Results} />
          ) : (
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-12 text-center">
              <Target className="w-16 h-16 text-gray-400 mx-auto mb-4 animate-pulse" />
              <p className="text-gray-400 text-lg font-bold">
                No race results available
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Floating Racing Elements */}
      <div className="fixed top-1/4 right-8 opacity-20 animate-float">
        <Trophy className="w-12 h-12 text-yellow-400" />
      </div>
      <div className="fixed bottom-1/4 left-8 opacity-20 animate-float animation-delay-2000">
        <Flag className="w-10 h-10 text-red-400" />
      </div>
    </div>
  );
}
