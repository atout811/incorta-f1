import { Link } from "react-router-dom";
import { useMemo } from "react";
import { Calendar, Trophy, Pin, Flag, Zap } from "lucide-react";
import { useAppStore } from "../store/pinnedRacesStore";
import { RaceListItem } from "../components/RaceListItem";

export default function Home() {
  const pinnedRacesData = useAppStore((state) => state.pinnedRaces);

  const pinnedRaces = useMemo(() => {
    return [...pinnedRacesData].sort((a, b) => b.pinnedAt - a.pinnedAt);
  }, [pinnedRacesData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-black relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full blur-xl animate-pulse"></div>
              <div className="relative w-24 h-24 bg-gradient-to-br from-red-500 to-yellow-500 rounded-full flex items-center justify-center">
                <Trophy className="w-12 h-12 text-white animate-bounce" />
              </div>
            </div>
          </div>

          <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-yellow-400 to-red-400 mb-8 leading-tight">
            F1 EXPLORER
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12">
            Dive into the world of{" "}
            <span className="text-red-400 font-bold">Formula 1</span> racing.
            Explore seasons, track races, and pin your favorites for quick
            access.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              to="/seasons"
              className="group bg-gradient-to-r from-red-500 to-yellow-500 text-white px-8 py-4 rounded-full font-black text-lg hover:from-red-600 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-2xl"
            >
              <div className="flex items-center">
                <Calendar className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" />
                Explore Seasons
                <span className="ml-3 group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </div>
            </Link>

            <div className="flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-4">
              <Trophy className="w-6 h-6 text-yellow-400 mr-3" />
              <span className="text-white font-bold">
                75+ Years of F1 History
              </span>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-500 transform hover:scale-105">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-yellow-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-black text-white mb-4 group-hover:text-yellow-400 transition-colors">
              Browse Seasons
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Explore every Formula 1 season from 1950 to present day with
              detailed race schedules and circuit information.
            </p>
          </div>

          <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-500 transform hover:scale-105">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Flag className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-black text-white mb-4 group-hover:text-blue-400 transition-colors">
              Race Details
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Get comprehensive information about each race including circuit
              details, dates, locations, and championship standings.
            </p>
          </div>

          <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-500 transform hover:scale-105">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Pin className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-black text-white mb-4 group-hover:text-yellow-400 transition-colors">
              Pin Favorites
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Save your favorite races for quick access. Build your personal
              collection of memorable F1 moments and classic circuits.
            </p>
          </div>
        </div>

        {/* Pinned Races Section */}
        {pinnedRaces.length > 0 && (
          <div className="mb-20">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mr-4">
                  <Pin className="w-6 h-6 text-black" />
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                  Your Pinned Races
                </h2>
              </div>
              <p className="text-xl text-gray-300">
                Quick access to your favorite F1 races
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {pinnedRaces.slice(0, 4).map((race) => (
                <RaceListItem
                  key={`${race.season}-${race.round}`}
                  race={race}
                />
              ))}
            </div>

            {pinnedRaces.length > 4 && (
              <div className="text-center mt-8">
                <Link
                  to="/seasons"
                  className="inline-flex items-center text-yellow-400 hover:text-yellow-300 font-bold transition-colors"
                >
                  View all {pinnedRaces.length} pinned races
                  <span className="ml-2">→</span>
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-red-500/20 to-yellow-500/20 backdrop-blur-sm rounded-3xl p-12 border border-white/10">
            <div className="flex justify-center mb-8">
              <Zap className="w-16 h-16 text-yellow-400 animate-pulse" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Start Your F1 Journey
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Ready to explore decades of racing history? Begin with any season
              and discover the legends of Formula 1.
            </p>
            <Link
              to="/seasons"
              className="inline-flex items-center bg-gradient-to-r from-red-500 to-yellow-500 text-white px-8 py-4 rounded-full font-black text-lg hover:from-red-600 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              <Calendar className="w-6 h-6 mr-3" />
              Browse All Seasons
            </Link>
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="fixed top-1/4 right-8 opacity-20 animate-float">
        <Trophy className="w-8 h-8 text-yellow-400" />
      </div>
      <div className="fixed bottom-1/4 left-8 opacity-20 animate-float animation-delay-2000">
        <Flag className="w-6 h-6 text-red-400" />
      </div>
    </div>
  );
}
