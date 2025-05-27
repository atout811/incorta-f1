import { describe, it, expect, beforeEach, vi } from "vitest";
import { f1Api } from "../../app/services/api";

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("F1 API Service", () => {
  beforeEach(() => {
    mockFetch.mockClear();
    console.error = vi.fn(); // Mock console.error to prevent noise in tests
  });

  const mockApiResponse = {
    MRData: {
      xmlns: "http://ergast.com/mrd/1.5",
      series: "f1",
      url: "http://ergast.com/api/f1/seasons.json",
      limit: "100",
      offset: "0",
      total: "74",
      SeasonTable: {
        Seasons: [
          {
            season: "2023",
            url: "http://en.wikipedia.org/wiki/2023_Formula_One_World_Championship",
          },
          {
            season: "2024",
            url: "http://en.wikipedia.org/wiki/2024_Formula_One_World_Championship",
          },
        ],
      },
    },
  };

  const mockRaceResponse = {
    MRData: {
      xmlns: "http://ergast.com/mrd/1.5",
      series: "f1",
      url: "http://ergast.com/api/f1/2023.json",
      limit: "100",
      offset: "0",
      total: "23",
      RaceTable: {
        season: "2023",
        Races: [
          {
            season: "2023",
            round: "1",
            url: "http://en.wikipedia.org/wiki/2023_Bahrain_Grand_Prix",
            raceName: "Bahrain Grand Prix",
            Circuit: {
              circuitId: "bahrain",
              url: "http://en.wikipedia.org/wiki/Bahrain_International_Circuit",
              circuitName: "Bahrain International Circuit",
              Location: {
                lat: "26.0325",
                long: "50.5106",
                locality: "Sakhir",
                country: "Bahrain",
              },
            },
            date: "2023-03-05",
            time: "15:00:00Z",
          },
        ],
      },
    },
  };

  describe("getSeasons", () => {
    it("should fetch and return seasons data", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockApiResponse,
      });

      const seasons = await f1Api.getSeasons();

      expect(mockFetch).toHaveBeenCalledWith(
        "https://ergast.com/api/f1/seasons.json?limit=100"
      );
      expect(seasons).toEqual([
        {
          season: "2023",
          url: "http://en.wikipedia.org/wiki/2023_Formula_One_World_Championship",
        },
        {
          season: "2024",
          url: "http://en.wikipedia.org/wiki/2024_Formula_One_World_Championship",
        },
      ]);
    });

    it("should handle HTTP errors", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

      await expect(f1Api.getSeasons()).rejects.toThrow(
        "HTTP error! status: 404"
      );
    });

    it("should handle network errors", async () => {
      mockFetch.mockRejectedValueOnce(new Error("Network error"));

      await expect(f1Api.getSeasons()).rejects.toThrow("Network error");
    });

    it("should return empty array for malformed response", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ invalid: "response" }),
      });

      const seasons = await f1Api.getSeasons();
      expect(seasons).toEqual([]);
    });
  });

  describe("getRaces", () => {
    it("should fetch and return races for a season", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockRaceResponse,
      });

      const races = await f1Api.getRaces("2023");

      expect(mockFetch).toHaveBeenCalledWith(
        "https://ergast.com/api/f1/2023.json?limit=100"
      );
      expect(races).toHaveLength(1);
      expect(races[0]).toEqual(
        expect.objectContaining({
          season: "2023",
          round: "1",
          raceName: "Bahrain Grand Prix",
        })
      );
    });

    it("should handle empty race results", async () => {
      const emptyResponse = {
        MRData: {
          ...mockRaceResponse.MRData,
          RaceTable: {
            season: "2025",
            Races: [],
          },
        },
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => emptyResponse,
      });

      const races = await f1Api.getRaces("2025");
      expect(races).toEqual([]);
    });
  });

  describe("getRaceResults", () => {
    it("should fetch race results for specific season and round", async () => {
      const resultsResponse = {
        MRData: {
          ...mockRaceResponse.MRData,
          RaceTable: {
            season: "2023",
            round: "1",
            Races: [
              {
                ...mockRaceResponse.MRData.RaceTable.Races[0],
                Results: [
                  {
                    number: "1",
                    position: "1",
                    positionText: "1",
                    points: "25",
                    Driver: {
                      driverId: "verstappen",
                      givenName: "Max",
                      familyName: "Verstappen",
                      nationality: "Dutch",
                    },
                    Constructor: {
                      constructorId: "red_bull",
                      name: "Red Bull Racing",
                      nationality: "Austrian",
                    },
                  },
                ],
              },
            ],
          },
        },
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => resultsResponse,
      });

      const results = await f1Api.getRaceResults("2023", "1");

      expect(mockFetch).toHaveBeenCalledWith(
        "https://ergast.com/api/f1/2023/1/results.json?limit=100"
      );
      expect(results).toHaveLength(1);
      expect(results[0].Results).toBeDefined();
      expect(results[0].Results![0].Driver.familyName).toBe("Verstappen");
    });
  });

  describe("getDrivers", () => {
    it("should fetch all drivers when no season provided", async () => {
      const driversResponse = {
        MRData: {
          DriverTable: {
            Drivers: [
              {
                driverId: "hamilton",
                givenName: "Lewis",
                familyName: "Hamilton",
                nationality: "British",
              },
            ],
          },
        },
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => driversResponse,
      });

      const drivers = await f1Api.getDrivers();

      expect(mockFetch).toHaveBeenCalledWith(
        "https://ergast.com/api/f1/drivers.json?limit=100"
      );
      expect(drivers).toHaveLength(1);
      expect(drivers[0].familyName).toBe("Hamilton");
    });

    it("should fetch drivers for specific season", async () => {
      const driversResponse = {
        MRData: {
          DriverTable: {
            season: "2023",
            Drivers: [
              {
                driverId: "verstappen",
                givenName: "Max",
                familyName: "Verstappen",
                nationality: "Dutch",
              },
            ],
          },
        },
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => driversResponse,
      });

      const drivers = await f1Api.getDrivers("2023");

      expect(mockFetch).toHaveBeenCalledWith(
        "https://ergast.com/api/f1/2023/drivers.json?limit=100"
      );
      expect(drivers).toHaveLength(1);
      expect(drivers[0].familyName).toBe("Verstappen");
    });
  });

  describe("Error Handling", () => {
    it("should log errors to console", async () => {
      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      mockFetch.mockRejectedValueOnce(new Error("Network failure"));

      await expect(f1Api.getSeasons()).rejects.toThrow();
      expect(consoleSpy).toHaveBeenCalledWith(
        "Error fetching data from /seasons:",
        expect.any(Error)
      );

      consoleSpy.mockRestore();
    });

    it("should handle fetch rejections gracefully", async () => {
      mockFetch.mockRejectedValueOnce(new TypeError("Failed to fetch"));

      await expect(f1Api.getRaces("2023")).rejects.toThrow("Failed to fetch");
    });
  });

  describe("Response Structure Handling", () => {
    it("should handle direct array responses in MRData", async () => {
      const directArrayResponse = {
        MRData: {
          Seasons: [{ season: "2023", url: "http://example.com" }],
        },
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => directArrayResponse,
      });

      const seasons = await f1Api.getSeasons();
      expect(seasons).toEqual([{ season: "2023", url: "http://example.com" }]);
    });

    it("should handle responses with no table structure", async () => {
      const noTableResponse = {
        MRData: {
          someOtherData: "value",
        },
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => noTableResponse,
      });

      const seasons = await f1Api.getSeasons();
      expect(seasons).toEqual([]);
    });
  });
});
