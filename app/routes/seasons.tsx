import { useState, useEffect } from "react";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { ErrorMessage } from "../components/ErrorMessage";
import { ViewToggle } from "../components/ViewToggle";
import { Pagination } from "../components/Pagination";
import { ItemsPerPageSelector } from "../components/ItemsPerPageSelector";
import { SeasonCard } from "../components/SeasonCard";
import { SeasonListItem } from "../components/SeasonListItem";
import { f1Api, type Season } from "../services/api";
import { usePersistentState } from "../components/PersistentStateProvider";
import { Calendar, Trophy, Zap } from "lucide-react";

export function meta() {
  return [
    { title: "F1 Seasons - Formula 1 Explorer" },
    {
      name: "description",
      content:
        "Browse Formula 1 seasons and explore race schedules with pagination",
    },
  ];
}

export default function Seasons() {
  // Season listing state
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [seasonsView, setSeasonsView] = useState<"list" | "grid">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(24);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const { preferredView, setPreferredView } = usePersistentState();

  // Animation trigger
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Load seasons on component mount
  useEffect(() => {
    loadSeasons();
  }, []);

  // Reset to first page when items per page changes
  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage]);

  // Use preferred view from persistent state
  useEffect(() => {
    setSeasonsView(preferredView);
  }, [preferredView]);

  const loadSeasons = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await f1Api.getSeasons();
      // Sort seasons in descending order (most recent first)
      const sortedSeasons = data.sort(
        (a, b) => parseInt(b.season) - parseInt(a.season)
      );
      setSeasons(sortedSeasons);
    } catch (err) {
      setError("Failed to load seasons. Please try again.");
      console.error("Error loading seasons:", err);
    } finally {
      setLoading(false);
    }
  };

  // Pagination calculations
  const totalPages = Math.ceil(seasons.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedSeasons = seasons.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
  };

  const handleViewChange = (view: "list" | "grid") => {
    setSeasonsView(view);
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
        <ErrorMessage message={error} onRetry={loadSeasons} />
      </div>
    );
  }

  // Show seasons listing with pagination
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
                {seasons.length} SEASONS
              </span>
              <span className="text-gray-300 ml-2">available</span>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3">
              <ItemsPerPageSelector
                itemsPerPage={itemsPerPage}
                onItemsPerPageChange={handleItemsPerPageChange}
                options={[12, 24, 48, 96]}
              />
            </div>
          </div>

          <ViewToggle view={seasonsView} onViewChange={handleViewChange} />
        </div>

        {/* Seasons content */}
        {paginatedSeasons.length > 0 && (
          <div
            className={`mb-12 transition-all duration-1000 delay-500 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {seasonsView === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {paginatedSeasons.map((season, index) => (
                  <div
                    key={season.season}
                    className="transform transition-all duration-500 hover:scale-105"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <SeasonCard season={season} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {paginatedSeasons.map((season, index) => (
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
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              itemsPerPage={itemsPerPage}
              totalItems={seasons.length}
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
