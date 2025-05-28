import { Trophy, Clock, Zap, Target } from "lucide-react";
import type { RaceResult } from "../services/api";
import { formatDriverName, getCountryFlag } from "../utils/formatters";

interface RaceResultTableProps {
  results: RaceResult[];
}

export function RaceResultTable({ results }: RaceResultTableProps) {
  const getPositionStyling = (position: string) => {
    const pos = parseInt(position);
    if (pos === 1)
      return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white shadow-lg shadow-yellow-500/25";
    if (pos === 2)
      return "bg-gradient-to-r from-gray-400 to-gray-600 text-white shadow-lg shadow-gray-500/25";
    if (pos === 3)
      return "bg-gradient-to-r from-orange-400 to-orange-600 text-white shadow-lg shadow-orange-500/25";
    if (pos <= 10)
      return "bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg shadow-blue-500/25";
    return "bg-white/20 text-gray-300 border border-white/30";
  };

  const getTrophyColor = (position: string) => {
    if (position === "1") return "text-yellow-400";
    if (position === "2") return "text-gray-300";
    if (position === "3") return "text-orange-400";
    return "";
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gradient-to-r from-red-600/30 to-yellow-600/30 backdrop-blur-sm border-b border-white/20">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-black text-yellow-400 uppercase tracking-wider">
                POS
              </th>
              <th className="px-6 py-4 text-left text-xs font-black text-yellow-400 uppercase tracking-wider">
                DRIVER
              </th>
              <th className="px-6 py-4 text-left text-xs font-black text-yellow-400 uppercase tracking-wider">
                CONSTRUCTOR
              </th>
              <th className="px-6 py-4 text-left text-xs font-black text-yellow-400 uppercase tracking-wider">
                GRID
              </th>
              <th className="px-6 py-4 text-left text-xs font-black text-yellow-400 uppercase tracking-wider">
                LAPS
              </th>
              <th className="px-6 py-4 text-left text-xs font-black text-yellow-400 uppercase tracking-wider">
                TIME
              </th>
              <th className="px-6 py-4 text-left text-xs font-black text-yellow-400 uppercase tracking-wider">
                POINTS
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {results.map((result, index) => (
              <tr
                key={`${result.Driver.driverId}-${result.position}`}
                className="group hover:bg-white/10 transition-all duration-300 transform hover:scale-[1.01]"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div
                      className={`inline-flex items-center justify-center w-10 h-10 rounded-full text-sm font-black transition-all duration-300 group-hover:scale-110 ${getPositionStyling(
                        result.position
                      )}`}
                    >
                      {result.position}
                    </div>
                    {parseInt(result.position) <= 3 && (
                      <Trophy
                        className={`w-5 h-5 ml-3 group-hover:rotate-12 transition-transform duration-300 ${getTrophyColor(
                          result.position
                        )}`}
                      />
                    )}
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div>
                      <div className="text-sm font-black text-white group-hover:text-yellow-400 transition-colors duration-300">
                        {formatDriverName(result.Driver)}
                      </div>
                      <div className="text-xs text-gray-400 font-semibold">
                        {result.Driver.nationality}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-bold text-gray-300 group-hover:text-white transition-colors duration-300">
                    {result.Constructor.name}
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1 text-sm font-bold text-white text-center min-w-[3rem]">
                    {result.grid}
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1 text-sm font-bold text-white text-center min-w-[3rem]">
                    {result.laps}
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="space-y-1">
                    <div className="text-sm font-bold text-white">
                      {result.Time?.time || result.status}
                    </div>
                    {result.FastestLap && (
                      <div className="flex items-center bg-purple-500/20 backdrop-blur-sm border border-purple-400/30 rounded-full px-2 py-1">
                        <Zap className="w-3 h-3 mr-1 text-purple-400" />
                        <span className="text-xs text-purple-300 font-bold">
                          {result.FastestLap.Time.time}
                        </span>
                      </div>
                    )}
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-sm font-black text-center min-w-[3rem] shadow-lg shadow-green-500/25">
                    {result.points}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Racing stripes at bottom */}
      <div className="h-1 bg-gradient-to-r from-red-500 via-yellow-500 to-red-500 animate-pulse"></div>
    </div>
  );
}
