import type { Route } from "./+types/home";
import { Link } from "react-router";
import { useState, useEffect } from "react";
import {
  Flag,
  Trophy,
  Calendar,
  ArrowRight,
  Zap,
  Timer,
  Target,
  Pin,
  MapPin,
} from "lucide-react";
import { usePinnedRaces } from "../hooks/usePinnedRaces";
import type { PinnedRace } from "../store/pinnedRacesStore";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "F1 Season Explorer - Formula 1 Racing Data" },
    {
      name: "description",
      content:
        "Explore Formula 1 seasons with dynamic racing data and comprehensive season information",
    },
  ];
}

export default function Home() {
  const [currentYear] = useState(new Date().getFullYear());
  const [isVisible, setIsVisible] = useState(false);
  const { getPinnedRaces, isHydrated } = usePinnedRaces();
  const pinnedRaces = isHydrated ? getPinnedRaces() : [];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const raceFeatures = [
    {
      icon: Zap,
      title: "Lightning Fast Data",
      description: "Instant access to decades of F1 racing history",
      gradient: "from-yellow-400 to-orange-500",
    },
    {
      icon: Timer,
      title: "Real-Time Updates",
      description: "Latest season information and race schedules",
      gradient: "from-blue-400 to-purple-500",
    },
    {
      icon: Target,
      title: "Precision Analytics",
      description: "Detailed race results and championship data",
      gradient: "from-green-400 to-teal-500",
    },
  ];

  const seasonStats = [
    { label: "Years of F1", value: "74+", subtext: "1950-Present" },
    { label: "Total Seasons", value: "70+", subtext: "Complete Data" },
    { label: "Championship Races", value: "1000+", subtext: "Race Results" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-black overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div
          className={`text-center mb-20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-red-500 rounded-full blur-md animate-pulse"></div>
              <Flag className="relative w-20 h-20 text-white animate-bounce" />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-yellow-400 to-red-400 mb-6 animate-pulse">
            F1 SEASON
          </h1>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 tracking-wide">
            EXPLORER
          </h2>

          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
            Experience the{" "}
            <span className="text-red-400 font-semibold">thrill</span> of
            Formula 1 racing through comprehensive season data. Dive into{" "}
            <span className="text-yellow-400 font-semibold">decades</span> of
            championship history and race analytics.
          </p>

          {/* CTA Button with Animation */}
          <Link
            to="/seasons"
            className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold text-lg rounded-full shadow-2xl hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-105 hover:from-red-500 hover:to-red-600"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-500 rounded-full blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
            <span className="relative flex items-center">
              Explore Seasons
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
            </span>
          </Link>
        </div>

        {/* Pinned Races Section */}
        {isHydrated && pinnedRaces.length > 0 && (
          <div
            className={`mb-20 transition-all duration-1000 delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="text-center mb-8">
              <div className="flex justify-center items-center mb-4">
                <div className="p-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl mr-4">
                  <Pin className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-white">
                  Your <span className="text-yellow-400">Pinned</span> Races
                </h3>
              </div>
              <p className="text-lg text-gray-300">
                Quick access to your favorite races
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pinnedRaces
                .slice(0, 6)
                .map((race: PinnedRace, index: number) => (
                  <Link
                    key={`${race.season}-${race.round}`}
                    to={`/race/${race.season}/${race.round}`}
                    className="group relative bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-sm border border-yellow-400/30 rounded-2xl p-6 hover:bg-yellow-500/30 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Pinned indicator */}
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-black px-3 py-1 rounded-full shadow-lg animate-pulse">
                      PINNED
                    </div>

                    <div className="relative">
                      <div className="flex items-center justify-between mb-4">
                        <span className="bg-gradient-to-r from-red-500 to-yellow-500 text-white px-3 py-1 rounded-full text-sm font-black">
                          R{race.round}
                        </span>
                        <span className="text-yellow-400 font-bold text-sm">
                          {race.season}
                        </span>
                      </div>

                      <h4 className="text-lg font-black text-white group-hover:text-yellow-400 transition-colors duration-300 mb-3 line-clamp-2">
                        {race.raceName}
                      </h4>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1">
                          <MapPin className="w-4 h-4 mr-2 text-yellow-400" />
                          <span className="text-white font-bold truncate">
                            {race.circuitName}
                          </span>
                        </div>
                        <div className="flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1">
                          <Calendar className="w-4 h-4 mr-2 text-blue-400" />
                          <span className="text-white font-bold">
                            {race.date}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 text-yellow-400 text-sm font-black group-hover:text-yellow-300 transition-colors flex items-center">
                        <span>View Race Details</span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>

                    {/* Racing stripe */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  </Link>
                ))}
            </div>

            {pinnedRaces.length > 6 && (
              <div className="text-center mt-8">
                <Link
                  to="/seasons"
                  className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-yellow-400 rounded-full hover:bg-white/20 hover:text-yellow-300 transition-all duration-300 transform hover:scale-105 font-bold"
                >
                  View All {pinnedRaces.length} Pinned Races
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Stats Section */}
        <div
          className={`grid md:grid-cols-3 gap-8 mb-20 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {seasonStats.map((stat, index) => (
            <div key={index} className="group">
              <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-yellow-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative text-center">
                  <div className="text-4xl md:text-5xl font-black text-white mb-2 group-hover:text-yellow-400 transition-colors">
                    {stat.value}
                  </div>
                  <div className="text-lg font-semibold text-gray-300 mb-1">
                    {stat.label}
                  </div>
                  <div className="text-sm text-gray-400">{stat.subtext}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div
          className={`mb-20 transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Racing Data at <span className="text-red-400">Light Speed</span>
            </h3>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Powered by cutting-edge technology to deliver the most
              comprehensive F1 season experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {raceFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="group">
                  <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/30 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}
                    ></div>

                    <div className="relative">
                      <div
                        className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </div>

                      <h4 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-red-400 group-hover:to-yellow-400 transition-all duration-300">
                        {feature.title}
                      </h4>

                      <p className="text-gray-300 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action Section */}
        <div
          className={`text-center transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="relative bg-gradient-to-r from-red-600/20 to-yellow-600/20 backdrop-blur-sm rounded-3xl p-12 border border-white/20">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-yellow-500/10 rounded-3xl animate-pulse"></div>

            <div className="relative">
              <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-6 animate-bounce" />

              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Start Your F1 Journey?
              </h3>

              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of racing enthusiasts exploring the most
                comprehensive Formula 1 season database available
              </p>

              <Link
                to="/seasons"
                className="group inline-flex items-center px-10 py-5 bg-gradient-to-r from-yellow-500 to-red-500 text-black font-bold text-xl rounded-full shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 transform hover:scale-110"
              >
                <Calendar className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" />
                Browse All Seasons
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="fixed top-1/4 right-10 opacity-20 animate-float">
        <Flag className="w-12 h-12 text-red-400" />
      </div>
      <div className="fixed bottom-1/4 left-10 opacity-20 animate-float animation-delay-2000">
        <Trophy className="w-10 h-10 text-yellow-400" />
      </div>
    </div>
  );
}
