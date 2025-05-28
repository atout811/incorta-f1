import { useState, useEffect } from "react";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { ErrorMessage } from "../components/ErrorMessage";
import { ViewToggle } from "../components/ViewToggle";
import { Pagination } from "../components/Pagination";
import { SeasonCard } from "../components/SeasonCard";
import { SeasonListItem } from "../components/SeasonListItem";
import { getSeasonsWithPagination, type Season, type PaginationInfo } from "../services/api";
import { useAppStore } from "../store/pinnedRacesStore";
import { Calendar, Trophy, Zap } from "lucide-react";

export default function Seasons() {
  // Season listing state
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [pagination, setPagination] = useState<PaginationInfo>({
    limit: 30,
    offset: 0,
    total: 0,
  });

  // View state
  const [currentView, setCurrentView] = useState<"card" | "list">("card");

  // Pinned races state
  const pinnedRaces = useAppStore((state) => state.pinnedRaces);

  // Load seasons based on current offset
  const loadSeasons = async (offset: number = 0) => {
    try {
      setLoading(true);
      setError(null);
      const result = await getSeasonsWithPagination(offset);
      setSeasons(result.data);
      setPagination(result.pagination);
      setCurrentOffset(offset);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load seasons");
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    loadSeasons();
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Handle offset change
  const handleOffsetChange = (newOffset: number) => {
    loadSeasons(newOffset);
  };

  // Use global store for user preferences
  const preferredView = useAppStore((state) => state.preferredView);
  const setPreferredView = useAppStore((state) => state.setPreferredView);

  const handleViewChange = (view: "list" | "grid") => {
    setPreferredView(view);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-red-500 rounded-full blur-md animate-pulse"></div>
            <Trophy className="relative w-20 h-20 text-white animate-bounce mx-auto" />
          </div>
          <div className="text-white text-xl font-bold mb-4">
            Loading F1 Seasons...
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
        <ErrorMessage message={error} onRetry={() => loadSeasons(currentOffset)} />
      </div>
    );
  }

  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-black">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div
          className={`mb-12 text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-yellow-500 rounded-full blur-md animate-pulse"></div>
              <Trophy className="relative w-20 h-20 text-white animate-bounce" />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-yellow-400 to-red-400 mb-6">
            F1 SEASONS
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
            Explore <span className="text-red-400 font-semibold">decades</span>{" "}
            of Formula 1 championship history. From the{" "}
            <span className="text-yellow-400 font-semibold">golden age</span> to
            modern racing excellence.
          </p>
        </div>

        {/* Controls */}
        <div
          className={`flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-12 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
            <div className="flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3">
              <Trophy className="w-6 h-6 text-yellow-400 mr-3" />
              <span className="text-lg font-bold text-white">
                {pagination.total} SEASONS
              </span>
              <span className="text-gray-300 ml-2">available</span>
            </div>
          </div>

          <ViewToggle view={preferredView} onViewChange={handleViewChange} />
        </div>

        {/* Seasons content */}
        {seasons.length > 0 && (
          <div
            className={`mb-12 transition-all duration-1000 delay-500 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {preferredView === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {seasons.map((season, index) => (
                  <div
                    key={season.season}
                    className="transform transition-all duration-500 "
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <SeasonCard season={season} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {seasons.map((season, index) => (
                  <div
                    key={season.season}
                    className="transform transition-all duration-500"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <SeasonListItem season={season} />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Enhanced Pagination */}
        <div
          className={`transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
            <Pagination
              currentOffset={currentOffset}
              limit={pagination.limit}
              total={pagination.total}
              onOffsetChange={handleOffsetChange}
            />
          </div>
        </div>

        {seasons.length === 0 && (
          <div className="text-center py-20">
            <Zap className="w-24 h-24 text-gray-400 mx-auto mb-6 animate-pulse" />
            <h3 className="text-2xl font-bold text-white mb-4">
              No Seasons Found
            </h3>
            <p className="text-gray-400 text-lg">
              Unable to load F1 season data.
            </p>
          </div>
        )}
      </div>

      {/* Floating Racing Elements */}
      <div className="fixed top-1/3 right-8 opacity-20 animate-float">
        <Trophy className="w-10 h-10 text-yellow-400" />
      </div>
      <div className="fixed bottom-1/3 left-8 opacity-20 animate-float animation-delay-2000">
        <Calendar className="w-8 h-8 text-red-400" />
      </div>
    </div>
  );
}
