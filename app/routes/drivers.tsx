import { useState, useEffect, useMemo } from "react";
import { Search, Users, Calendar } from "lucide-react";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { ErrorMessage } from "../components/ErrorMessage";
import { SeasonSelector } from "../components/SeasonSelector";
import { f1Api, type Driver, type Season } from "../services/api";
import { formatDriverName, getCountryFlag } from "../utils/formatters";

export function meta() {
  return [
    { title: "F1 Drivers - Formula 1 Explorer" },
    {
      name: "description",
      content:
        "Browse Formula 1 drivers and explore their profiles and career information",
    },
  ];
}

interface DriverCardProps {
  driver: Driver;
}

function DriverCard({ driver }: DriverCardProps) {
  const [age, setAge] = useState<number | null>(null);

  useEffect(() => {
    const birthYear = new Date(driver.dateOfBirth).getFullYear();
    const currentAge = new Date().getFullYear() - birthYear;
    setAge(currentAge);
  }, [driver.dateOfBirth]);

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <span className="text-3xl mr-3">
            {getCountryFlag(driver.nationality)}
          </span>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              {formatDriverName(driver)}
            </h3>
            <p className="text-gray-600">{driver.nationality}</p>
          </div>
        </div>
        {driver.permanentNumber && (
          <span className="bg-red-600 text-white px-3 py-1 rounded-full text-lg font-bold">
            #{driver.permanentNumber}
          </span>
        )}
      </div>

      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-2" />
          <span>
            Born {driver.dateOfBirth} {age !== null && `(Age ${age})`}
          </span>
        </div>

        {driver.code && (
          <div className="flex items-center">
            <span className="w-4 h-4 mr-2 text-center font-bold text-red-600">
              #{driver.code}
            </span>
            <span>Driver Code</span>
          </div>
        )}
      </div>

      {driver.url && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <a
            href={driver.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-600 hover:text-red-700 text-sm font-medium"
          >
            View on Wikipedia →
          </a>
        </div>
      )}
    </div>
  );
}

export default function Drivers() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [selectedSeason, setSelectedSeason] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [driversLoading, setDriversLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [driversError, setDriversError] = useState<string | null>(null);

  // Load seasons on component mount
  useEffect(() => {
    loadSeasons();
  }, []);

  // Load drivers when season changes
  useEffect(() => {
    loadDrivers(selectedSeason);
  }, [selectedSeason]);

  const loadSeasons = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await f1Api.getSeasons();
      setSeasons(data);

      // Auto-select the most recent season
      if (data.length > 0) {
        const mostRecentSeason = data.reduce((latest, season) =>
          parseInt(season.season) > parseInt(latest.season) ? season : latest
        );
        setSelectedSeason(mostRecentSeason.season);
      }
    } catch (err) {
      setError("Failed to load seasons. Please try again.");
      console.error("Error loading seasons:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadDrivers = async (season?: string) => {
    try {
      setDriversLoading(true);
      setDriversError(null);
      const data = await f1Api.getDrivers(season);
      setDrivers(data);
    } catch (err) {
      setDriversError("Failed to load drivers. Please try again.");
      console.error("Error loading drivers:", err);
    } finally {
      setDriversLoading(false);
    }
  };

  // Filter drivers based on search term
  const filteredDrivers = useMemo(() => {
    if (!searchTerm) return drivers;

    const term = searchTerm.toLowerCase();
    return drivers.filter(
      (driver) =>
        driver.givenName.toLowerCase().includes(term) ||
        driver.familyName.toLowerCase().includes(term) ||
        driver.nationality.toLowerCase().includes(term) ||
        driver.code?.toLowerCase().includes(term)
    );
  }, [drivers, searchTerm]);

  if (loading) {
    return <LoadingSpinner size="lg" message="Loading drivers..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={loadSeasons} />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Formula 1 Drivers
        </h1>
        <p className="text-gray-600">
          Browse through Formula 1 drivers and explore their profiles
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <div className="flex items-center space-x-4">
          <SeasonSelector
            seasons={seasons}
            selectedSeason={selectedSeason}
            onSeasonChange={setSelectedSeason}
            isLoading={driversLoading}
          />

          <button
            onClick={() => {
              setSelectedSeason("");
              loadDrivers();
            }}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            All Drivers
          </button>
        </div>

        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search drivers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Drivers Content */}
      {driversLoading && <LoadingSpinner message="Loading drivers..." />}

      {driversError && (
        <ErrorMessage
          message={driversError}
          onRetry={() => loadDrivers(selectedSeason)}
        />
      )}

      {!driversLoading && !driversError && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Users className="w-6 h-6 text-gray-600 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedSeason
                  ? `${selectedSeason} Season Drivers`
                  : "All Drivers"}
              </h2>
              <span className="ml-2 text-gray-500">
                ({filteredDrivers.length} drivers)
              </span>
            </div>
          </div>

          {filteredDrivers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredDrivers.map((driver) => (
                <DriverCard key={driver.driverId} driver={driver} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">
                {searchTerm
                  ? `No drivers found matching "${searchTerm}"`
                  : "No drivers found"}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
