import { describe, it, expect, beforeEach, vi } from "vitest";
import { useAppStore } from "../pinnedRacesStore";
import type { Race } from "../../services/api";

// Mock race data for testing
const mockRace: Race = {
  season: "2024",
  round: "1",
  url: "http://example.com",
  raceName: "Bahrain Grand Prix",
  date: "2024-03-02",
  time: "15:00:00Z",
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
};

const mockRace2: Race = {
  season: "2024",
  round: "2",
  url: "http://example.com",
  raceName: "Saudi Arabian Grand Prix",
  date: "2024-03-09",
  time: "15:00:00Z",
  Circuit: {
    circuitId: "jeddah",
    url: "http://example.com",
    circuitName: "Jeddah Corniche Circuit",
    Location: {
      lat: "21.6319",
      long: "39.1044",
      locality: "Jeddah",
      country: "Saudi Arabia",
    },
  },
};

describe("pinnedRacesStore", () => {
  beforeEach(() => {
    // Reset store state before each test
    useAppStore.getState().resetState();
  });

  describe("pinRace", () => {
    it("should pin a race successfully", () => {
      const store = useAppStore.getState();

      // Initially no pinned races
      expect(store.pinnedRaces).toHaveLength(0);

      // Pin a race
      const raceWithTimestamp = { ...mockRace, pinnedAt: Date.now() };
      store.pinRace(raceWithTimestamp);

      // Check if race was pinned
      const updatedStore = useAppStore.getState();
      expect(updatedStore.pinnedRaces).toHaveLength(1);
      expect(updatedStore.pinnedRaces[0].season).toBe("2024");
      expect(updatedStore.pinnedRaces[0].round).toBe("1");
      expect(updatedStore.pinnedRaces[0].raceName).toBe("Bahrain Grand Prix");
    });

    it("should not pin the same race twice", () => {
      const store = useAppStore.getState();
      const raceWithTimestamp = { ...mockRace, pinnedAt: Date.now() };

      // Pin race twice
      store.pinRace(raceWithTimestamp);
      store.pinRace(raceWithTimestamp);

      // Should still have only one race
      const updatedStore = useAppStore.getState();
      expect(updatedStore.pinnedRaces).toHaveLength(1);
    });

    it("should pin multiple different races", () => {
      const store = useAppStore.getState();
      const race1WithTimestamp = { ...mockRace, pinnedAt: Date.now() };
      const race2WithTimestamp = { ...mockRace2, pinnedAt: Date.now() + 1000 };

      // Pin two different races
      store.pinRace(race1WithTimestamp);
      store.pinRace(race2WithTimestamp);

      // Should have both races
      const updatedStore = useAppStore.getState();
      expect(updatedStore.pinnedRaces).toHaveLength(2);
      expect(updatedStore.pinnedRaces.some((r) => r.round === "1")).toBe(true);
      expect(updatedStore.pinnedRaces.some((r) => r.round === "2")).toBe(true);
    });

    it("should add pinnedAt timestamp when pinning", () => {
      const store = useAppStore.getState();
      const beforeTime = Date.now();
      const raceWithTimestamp = { ...mockRace, pinnedAt: beforeTime };

      store.pinRace(raceWithTimestamp);

      const updatedStore = useAppStore.getState();
      expect(updatedStore.pinnedRaces[0].pinnedAt).toBe(beforeTime);
    });
  });

  describe("unpinRace", () => {
    it("should unpin a race successfully", () => {
      const store = useAppStore.getState();
      const raceWithTimestamp = { ...mockRace, pinnedAt: Date.now() };

      // First pin a race
      store.pinRace(raceWithTimestamp);
      expect(useAppStore.getState().pinnedRaces).toHaveLength(1);

      // Then unpin it
      store.unpinRace("2024", "1");

      // Should be empty now
      const updatedStore = useAppStore.getState();
      expect(updatedStore.pinnedRaces).toHaveLength(0);
    });

    it("should only unpin the specified race", () => {
      const store = useAppStore.getState();
      const race1WithTimestamp = { ...mockRace, pinnedAt: Date.now() };
      const race2WithTimestamp = { ...mockRace2, pinnedAt: Date.now() + 1000 };

      // Pin two races
      store.pinRace(race1WithTimestamp);
      store.pinRace(race2WithTimestamp);
      expect(useAppStore.getState().pinnedRaces).toHaveLength(2);

      // Unpin only the first race
      store.unpinRace("2024", "1");

      // Should have only the second race
      const updatedStore = useAppStore.getState();
      expect(updatedStore.pinnedRaces).toHaveLength(1);
      expect(updatedStore.pinnedRaces[0].round).toBe("2");
    });

    it("should handle unpinning non-existent race gracefully", () => {
      const store = useAppStore.getState();

      // Try to unpin a race that was never pinned
      store.unpinRace("2024", "999");

      // Should remain empty
      const updatedStore = useAppStore.getState();
      expect(updatedStore.pinnedRaces).toHaveLength(0);
    });
  });

  describe("clearAllPinned", () => {
    it("should clear all pinned races", () => {
      const store = useAppStore.getState();
      const race1WithTimestamp = { ...mockRace, pinnedAt: Date.now() };
      const race2WithTimestamp = { ...mockRace2, pinnedAt: Date.now() + 1000 };

      // Pin multiple races
      store.pinRace(race1WithTimestamp);
      store.pinRace(race2WithTimestamp);
      expect(useAppStore.getState().pinnedRaces).toHaveLength(2);

      // Clear all
      store.clearAllPinned();

      // Should be empty
      const updatedStore = useAppStore.getState();
      expect(updatedStore.pinnedRaces).toHaveLength(0);
    });
  });

  describe("UI preferences", () => {
    it("should set preferred view", () => {
      const store = useAppStore.getState();

      // Default should be grid
      expect(store.preferredView).toBe("grid");

      // Change to list
      store.setPreferredView("list");

      const updatedStore = useAppStore.getState();
      expect(updatedStore.preferredView).toBe("list");
    });

    it("should set items per page", () => {
      const store = useAppStore.getState();

      // Default should be 24
      expect(store.itemsPerPage).toBe(24);

      // Change to 12
      store.setItemsPerPage(12);

      const updatedStore = useAppStore.getState();
      expect(updatedStore.itemsPerPage).toBe(12);
    });
  });

  describe("resetState", () => {
    it("should reset all state to defaults", () => {
      const store = useAppStore.getState();
      const raceWithTimestamp = { ...mockRace, pinnedAt: Date.now() };

      // Modify state
      store.pinRace(raceWithTimestamp);
      store.setPreferredView("list");
      store.setItemsPerPage(12);

      // Verify state was modified
      let updatedStore = useAppStore.getState();
      expect(updatedStore.pinnedRaces).toHaveLength(1);
      expect(updatedStore.preferredView).toBe("list");
      expect(updatedStore.itemsPerPage).toBe(12);

      // Reset state
      store.resetState();

      // Verify state was reset to defaults
      updatedStore = useAppStore.getState();
      expect(updatedStore.pinnedRaces).toHaveLength(0);
      expect(updatedStore.preferredView).toBe("grid");
      expect(updatedStore.itemsPerPage).toBe(24);
    });
  });
});
