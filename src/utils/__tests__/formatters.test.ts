import { describe, it, expect } from "vitest";
import {
  formatDriverName,
  formatRaceDate,
  formatRaceDateShort,
  getCountryFlag,
} from "../formatters";
import type { Driver, Race } from "../../services/api";

describe("formatters", () => {
  describe("formatDriverName", () => {
    it("should format driver name correctly", () => {
      const driver: Driver = {
        driverId: "hamilton",
        permanentNumber: "44",
        code: "HAM",
        url: "http://example.com",
        givenName: "Lewis",
        familyName: "Hamilton",
        dateOfBirth: "1985-01-07",
        nationality: "British",
      };

      const result = formatDriverName(driver);
      expect(result).toBe("Lewis Hamilton");
    });

    it("should handle drivers with special characters in names", () => {
      const driver: Driver = {
        driverId: "perez",
        permanentNumber: "11",
        code: "PER",
        url: "http://example.com",
        givenName: "Sergio",
        familyName: "Pérez",
        dateOfBirth: "1990-01-26",
        nationality: "Mexican",
      };

      const result = formatDriverName(driver);
      expect(result).toBe("Sergio Pérez");
    });
  });

  describe("formatRaceDate", () => {
    const mockRace = {
      season: "2024",
      round: "1",
      url: "http://example.com",
      raceName: "Bahrain Grand Prix",
      Circuit: {
        circuitId: "bahrain",
        url: "http://example.com",
        circuitName: "Bahrain International Circuit",
        Location: {
          lat: "26.0325",
          long: "50.5106",
          locality: "Sakhir",
          country: "Bahrain",
        },
      },
    } as Race;

    it("should format valid date correctly", () => {
      const race = { ...mockRace, date: "2024-03-02" };
      const result = formatRaceDate(race);
      expect(result).toBe("March 02, 2024");
    });

    it("should return original date string for invalid date", () => {
      const race = { ...mockRace, date: "invalid-date" };
      const result = formatRaceDate(race);
      expect(result).toBe("invalid-date");
    });

    it("should handle empty date string", () => {
      const race = { ...mockRace, date: "" };
      const result = formatRaceDate(race);
      expect(result).toBe("");
    });
  });

  describe("formatRaceDateShort", () => {
    const mockRace = {
      season: "2024",
      round: "1",
      url: "http://example.com",
      raceName: "Bahrain Grand Prix",
      Circuit: {
        circuitId: "bahrain",
        url: "http://example.com",
        circuitName: "Bahrain International Circuit",
        Location: {
          lat: "26.0325",
          long: "50.5106",
          locality: "Sakhir",
          country: "Bahrain",
        },
      },
    } as Race;

    it("should format valid date in short format correctly", () => {
      const race = { ...mockRace, date: "2024-03-02" };
      const result = formatRaceDateShort(race);
      expect(result).toBe("Mar 02");
    });

    it("should return original date string for invalid date", () => {
      const race = { ...mockRace, date: "invalid-date" };
      const result = formatRaceDateShort(race);
      expect(result).toBe("invalid-date");
    });
  });

  describe("getCountryFlag", () => {
    it("should return correct flag for known nationalities", () => {
      expect(getCountryFlag("British")).toBe("🇬🇧");
      expect(getCountryFlag("German")).toBe("🇩🇪");
      expect(getCountryFlag("Spanish")).toBe("🇪🇸");
      expect(getCountryFlag("Brazilian")).toBe("🇧🇷");
      expect(getCountryFlag("Dutch")).toBe("🇳🇱");
      expect(getCountryFlag("Mexican")).toBe("🇲🇽");
      expect(getCountryFlag("Monégasque")).toBe("🇲🇨");
    });

    it("should return default flag for unknown nationality", () => {
      expect(getCountryFlag("Unknown")).toBe("🏁");
      expect(getCountryFlag("SomeRandomCountry")).toBe("🏁");
    });

    it("should handle empty or undefined nationality", () => {
      expect(getCountryFlag("")).toBe("🏁");
    });

    it("should be case sensitive", () => {
      expect(getCountryFlag("british")).toBe("🏁"); // lowercase should return default
      expect(getCountryFlag("BRITISH")).toBe("🏁"); // uppercase should return default
    });
  });
});
