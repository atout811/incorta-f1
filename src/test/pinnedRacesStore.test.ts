import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  usePinnedRacesStore,
  type PinnedRace,
} from "../../app/store/pinnedRacesStore";

// Mock localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
  writable: true,
});

describe("PinnedRacesStore", () => {
  beforeEach(() => {
    // Reset the store state before each test
    usePinnedRacesStore.setState({ pinnedRaces: [] });
    vi.clearAllMocks();
  });

  const mockRace1: PinnedRace = {
    season: "2023",
    round: "1",
    raceName: "Bahrain Grand Prix",
    circuitName: "Bahrain International Circuit",
    date: "March 05, 2023",
    location: "Sakhir, Bahrain",
    pinnedAt: 1000,
  };

  const mockRace2: PinnedRace = {
    season: "2023",
    round: "2",
    raceName: "Saudi Arabian Grand Prix",
    circuitName: "Jeddah Corniche Circuit",
    date: "March 19, 2023",
    location: "Jeddah, Saudi Arabia",
    pinnedAt: 2000,
  };

  const mockRace3: PinnedRace = {
    season: "2024",
    round: "1",
    raceName: "Bahrain Grand Prix",
    circuitName: "Bahrain International Circuit",
    date: "March 02, 2024",
    location: "Sakhir, Bahrain",
    pinnedAt: 3000,
  };

  describe("Initial State", () => {
    it("should have empty pinnedRaces array initially", () => {
      const { pinnedRaces } = usePinnedRacesStore.getState();
      expect(pinnedRaces).toEqual([]);
    });

    it("should return 0 for pinned count initially", () => {
      const { getPinnedCount } = usePinnedRacesStore.getState();
      expect(getPinnedCount()).toBe(0);
    });
  });

  describe("pinRace", () => {
    it("should add a race to pinned races", () => {
      const { pinRace, pinnedRaces } = usePinnedRacesStore.getState();

      pinRace(mockRace1);

      const updatedState = usePinnedRacesStore.getState();
      expect(updatedState.pinnedRaces).toHaveLength(1);
      expect(updatedState.pinnedRaces[0]).toEqual(
        expect.objectContaining({
          season: "2023",
          round: "1",
          raceName: "Bahrain Grand Prix",
        })
      );
    });

    it("should set pinnedAt timestamp when pinning", () => {
      const { pinRace } = usePinnedRacesStore.getState();
      const mockTimestamp = 12345;

      vi.spyOn(Date, "now").mockReturnValue(mockTimestamp);

      pinRace(mockRace1);

      const { pinnedRaces } = usePinnedRacesStore.getState();
      expect(pinnedRaces[0].pinnedAt).toBe(mockTimestamp);

      vi.restoreAllMocks();
    });

    it("should not add duplicate races", () => {
      const { pinRace } = usePinnedRacesStore.getState();

      pinRace(mockRace1);
      pinRace(mockRace1); // Try to pin the same race again

      const { pinnedRaces } = usePinnedRacesStore.getState();
      expect(pinnedRaces).toHaveLength(1);
    });

    it("should allow pinning races from different seasons with same round", () => {
      const { pinRace } = usePinnedRacesStore.getState();

      pinRace(mockRace1); // 2023 round 1
      pinRace(mockRace3); // 2024 round 1

      const { pinnedRaces } = usePinnedRacesStore.getState();
      expect(pinnedRaces).toHaveLength(2);
    });
  });

  describe("isPinned", () => {
    it("should return false for unpinned race", () => {
      const { isPinned } = usePinnedRacesStore.getState();
      expect(isPinned("2023", "1")).toBe(false);
    });

    it("should return true for pinned race", () => {
      const { pinRace, isPinned } = usePinnedRacesStore.getState();

      pinRace(mockRace1);

      expect(isPinned("2023", "1")).toBe(true);
    });

    it("should handle different season/round combinations", () => {
      const { pinRace, isPinned } = usePinnedRacesStore.getState();

      pinRace(mockRace1);

      expect(isPinned("2023", "1")).toBe(true);
      expect(isPinned("2023", "2")).toBe(false);
      expect(isPinned("2024", "1")).toBe(false);
    });
  });

  describe("unpinRace", () => {
    it("should remove a pinned race", () => {
      const { pinRace, unpinRace, pinnedRaces } =
        usePinnedRacesStore.getState();

      pinRace(mockRace1);
      pinRace(mockRace2);

      expect(usePinnedRacesStore.getState().pinnedRaces).toHaveLength(2);

      unpinRace("2023", "1");

      const updatedState = usePinnedRacesStore.getState();
      expect(updatedState.pinnedRaces).toHaveLength(1);
      expect(updatedState.pinnedRaces[0].round).toBe("2");
    });

    it("should not affect other races when unpinning", () => {
      const { pinRace, unpinRace } = usePinnedRacesStore.getState();

      pinRace(mockRace1);
      pinRace(mockRace2);
      pinRace(mockRace3);

      unpinRace("2023", "1");

      const { pinnedRaces } = usePinnedRacesStore.getState();
      expect(pinnedRaces).toHaveLength(2);
      expect(
        pinnedRaces.some((race) => race.season === "2023" && race.round === "2")
      ).toBe(true);
      expect(
        pinnedRaces.some((race) => race.season === "2024" && race.round === "1")
      ).toBe(true);
    });
  });

  describe("getPinnedRaces", () => {
    it("should return races sorted by pinnedAt timestamp (most recent first)", () => {
      const { pinRace, getPinnedRaces } = usePinnedRacesStore.getState();

      // Mock Date.now to control timestamps
      let mockTime = 1000;
      vi.spyOn(Date, "now").mockImplementation(() => mockTime);

      pinRace(mockRace1);
      mockTime = 3000;
      pinRace(mockRace2);
      mockTime = 2000;
      pinRace(mockRace3);

      const sortedRaces = getPinnedRaces();
      expect(sortedRaces[0].pinnedAt).toBe(3000);
      expect(sortedRaces[1].pinnedAt).toBe(2000);
      expect(sortedRaces[2].pinnedAt).toBe(1000);

      vi.restoreAllMocks();
    });

    it("should return empty array when no races are pinned", () => {
      const { getPinnedRaces } = usePinnedRacesStore.getState();
      expect(getPinnedRaces()).toEqual([]);
    });
  });

  describe("getPinnedCount", () => {
    it("should return correct count of pinned races", () => {
      const { pinRace, getPinnedCount } = usePinnedRacesStore.getState();

      expect(getPinnedCount()).toBe(0);

      pinRace(mockRace1);
      expect(getPinnedCount()).toBe(1);

      pinRace(mockRace2);
      expect(getPinnedCount()).toBe(2);
    });
  });

  describe("getPinnedRacesForSeason", () => {
    it("should return races for specific season sorted by round", () => {
      const { pinRace, getPinnedRacesForSeason } =
        usePinnedRacesStore.getState();

      // Add races in different order
      pinRace({ ...mockRace2, round: "3" }); // Round 3
      pinRace({ ...mockRace1, round: "1" }); // Round 1
      pinRace({ ...mockRace3, season: "2023", round: "2" }); // Round 2

      const season2023Races = getPinnedRacesForSeason("2023");
      expect(season2023Races).toHaveLength(3);
      expect(season2023Races[0].round).toBe("1");
      expect(season2023Races[1].round).toBe("2");
      expect(season2023Races[2].round).toBe("3");
    });

    it("should return empty array for season with no pinned races", () => {
      const { pinRace, getPinnedRacesForSeason } =
        usePinnedRacesStore.getState();

      pinRace(mockRace1); // 2023 season

      const season2024Races = getPinnedRacesForSeason("2024");
      expect(season2024Races).toEqual([]);
    });
  });

  describe("clearAllPinned", () => {
    it("should remove all pinned races", () => {
      const { pinRace, clearAllPinned, getPinnedCount } =
        usePinnedRacesStore.getState();

      pinRace(mockRace1);
      pinRace(mockRace2);
      pinRace(mockRace3);

      expect(getPinnedCount()).toBe(3);

      clearAllPinned();

      const { pinnedRaces } = usePinnedRacesStore.getState();
      expect(pinnedRaces).toEqual([]);
      expect(getPinnedCount()).toBe(0);
    });
  });
});
