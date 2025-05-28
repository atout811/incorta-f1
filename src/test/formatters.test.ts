import { describe, it, expect } from "vitest";
import {
  formatDriverName,
  formatRaceDate,
  formatRaceDateShort,
  getDriverInitials,
  getPositionSuffix,
  formatPosition,
  formatLapTime,
  getCountryFlag,
} from "../utils/formatters";
import type { Driver, Race } from "../services/api";

describe("Formatters Utility Functions", () => {
  // Mock driver data
  const mockDriver: Driver = {
    driverId: "hamilton",
    url: "http://en.wikipedia.org/wiki/Lewis_Hamilton",
    givenName: "Lewis",
    familyName: "Hamilton",
    dateOfBirth: "1985-01-07",
    nationality: "British",
    permanentNumber: "44",
    code: "HAM",
  };

  // Mock race data
  const mockRace: Race = {
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
  };

  describe("formatDriverName", () => {
    it("should format driver name correctly", () => {
      expect(formatDriverName(mockDriver)).toBe("Lewis Hamilton");
    });

    it("should handle drivers with different names", () => {
      const driver = {
        ...mockDriver,
        givenName: "Max",
        familyName: "Verstappen",
      };
      expect(formatDriverName(driver)).toBe("Max Verstappen");
    });
  });

  describe("formatRaceDate", () => {
    it("should format race date in long format", () => {
      expect(formatRaceDate(mockRace)).toBe("March 05, 2023");
    });

    it("should handle invalid date gracefully", () => {
      const invalidRace = { ...mockRace, date: "invalid-date" };
      expect(formatRaceDate(invalidRace)).toBe("invalid-date");
    });

    it("should handle different date formats", () => {
      const race2024 = { ...mockRace, date: "2024-12-25" };
      expect(formatRaceDate(race2024)).toBe("December 25, 2024");
    });
  });

  describe("formatRaceDateShort", () => {
    it("should format race date in short format", () => {
      expect(formatRaceDateShort(mockRace)).toBe("Mar 05");
    });

    it("should handle invalid date gracefully", () => {
      const invalidRace = { ...mockRace, date: "invalid-date" };
      expect(formatRaceDateShort(invalidRace)).toBe("invalid-date");
    });
  });

  describe("getDriverInitials", () => {
    it("should return correct initials", () => {
      expect(getDriverInitials(mockDriver)).toBe("LH");
    });

    it("should handle single character names", () => {
      const driver = {
        ...mockDriver,
        givenName: "A",
        familyName: "B",
      };
      expect(getDriverInitials(driver)).toBe("AB");
    });
  });

  describe("getPositionSuffix", () => {
    it("should return correct suffix for 1st", () => {
      expect(getPositionSuffix(1)).toBe("st");
    });

    it("should return correct suffix for 2nd", () => {
      expect(getPositionSuffix(2)).toBe("nd");
    });

    it("should return correct suffix for 3rd", () => {
      expect(getPositionSuffix(3)).toBe("rd");
    });

    it("should return 'th' for 4th through 10th", () => {
      expect(getPositionSuffix(4)).toBe("th");
      expect(getPositionSuffix(10)).toBe("th");
    });

    it("should handle special cases for 11th, 12th, 13th", () => {
      expect(getPositionSuffix(11)).toBe("th");
      expect(getPositionSuffix(12)).toBe("th");
      expect(getPositionSuffix(13)).toBe("th");
    });

    it("should handle 21st, 22nd, 23rd correctly", () => {
      expect(getPositionSuffix(21)).toBe("st");
      expect(getPositionSuffix(22)).toBe("nd");
      expect(getPositionSuffix(23)).toBe("rd");
    });
  });

  describe("formatPosition", () => {
    it("should format numeric position correctly", () => {
      expect(formatPosition(1)).toBe("1st");
      expect(formatPosition(2)).toBe("2nd");
      expect(formatPosition(3)).toBe("3rd");
      expect(formatPosition(4)).toBe("4th");
    });

    it("should format string position correctly", () => {
      expect(formatPosition("1")).toBe("1st");
      expect(formatPosition("11")).toBe("11th");
    });

    it("should handle invalid input gracefully", () => {
      expect(formatPosition("DNF")).toBe("DNF");
      expect(formatPosition("DSQ")).toBe("DSQ");
    });
  });

  describe("formatLapTime", () => {
    it("should return the time string as-is when valid", () => {
      expect(formatLapTime("1:23.456")).toBe("1:23.456");
    });

    it("should return 'N/A' for undefined input", () => {
      expect(formatLapTime(undefined)).toBe("N/A");
    });

    it("should return 'N/A' for empty string", () => {
      expect(formatLapTime("")).toBe("N/A");
    });
  });

  describe("getCountryFlag", () => {
    it("should return correct flags for known nationalities", () => {
      expect(getCountryFlag("British")).toBe("🇬🇧");
      expect(getCountryFlag("German")).toBe("🇩🇪");
      expect(getCountryFlag("Spanish")).toBe("🇪🇸");
      expect(getCountryFlag("Dutch")).toBe("🇳🇱");
      expect(getCountryFlag("Brazilian")).toBe("🇧🇷");
    });

    it("should return default flag for unknown nationality", () => {
      expect(getCountryFlag("Unknown")).toBe("🏁");
      expect(getCountryFlag("")).toBe("🏁");
    });

    it("should handle special cases", () => {
      expect(getCountryFlag("Monégasque")).toBe("🇲🇨");
      expect(getCountryFlag("American")).toBe("🇺🇸");
    });
  });
});
