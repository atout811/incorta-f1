import { describe, it, expect, beforeEach, vi } from "vitest";
import { useAppStore, type PinnedRace } from "../store/pinnedRacesStore";

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
    useAppStore.setState({
      pinnedRaces: [],
      preferredView: "grid",
      itemsPerPage: 24,
    });
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
      const { pinnedRaces } = useAppStore.getState();
      expect(pinnedRaces).toEqual([]);
    });

    it("should have default UI preferences", () => {
      const { preferredView, itemsPerPage } = useAppStore.getState();
      expect(preferredView).toBe("grid");
      expect(itemsPerPage).toBe(24);
    });
  });

  describe("pinRace", () => {
    it("should add a race to pinned races", () => {
      const { pinRace } = useAppStore.getState();

      pinRace(mockRace1);

      const { pinnedRaces } = useAppStore.getState();
      expect(pinnedRaces).toHaveLength(1);
      expect(pinnedRaces[0]).toEqual(
        expect.objectContaining({
          season: "2023",
          round: "1",
          raceName: "Bahrain Grand Prix",
        })
      );
    });

    it("should set pinnedAt timestamp when pinning", () => {
      const { pinRace } = useAppStore.getState();
      const mockTimestamp = 12345;

      vi.spyOn(Date, "now").mockReturnValue(mockTimestamp);

      pinRace(mockRace1);

      const { pinnedRaces } = useAppStore.getState();
      expect(pinnedRaces[0].pinnedAt).toBe(mockTimestamp);

      vi.restoreAllMocks();
    });

    it("should not add duplicate races", () => {
      const { pinRace } = useAppStore.getState();

      pinRace(mockRace1);
      pinRace(mockRace1); // Try to pin the same race again

      const { pinnedRaces } = useAppStore.getState();
      expect(pinnedRaces).toHaveLength(1);
    });

    it("should allow pinning races from different seasons with same round", () => {
      const { pinRace } = useAppStore.getState();

      pinRace(mockRace1); // 2023 round 1
      pinRace(mockRace3); // 2024 round 1

      const { pinnedRaces } = useAppStore.getState();
      expect(pinnedRaces).toHaveLength(2);
    });
  });

  describe("unpinRace", () => {
    it("should remove a pinned race", () => {
      const { pinRace, unpinRace } = useAppStore.getState();

      pinRace(mockRace1);
      pinRace(mockRace2);

      expect(useAppStore.getState().pinnedRaces).toHaveLength(2);

      unpinRace("2023", "1");

      const { pinnedRaces } = useAppStore.getState();
      expect(pinnedRaces).toHaveLength(1);
      expect(pinnedRaces[0].round).toBe("2");
    });

    it("should not affect other races when unpinning", () => {
      const { pinRace, unpinRace } = useAppStore.getState();

      pinRace(mockRace1);
      pinRace(mockRace2);
      pinRace(mockRace3);

      unpinRace("2023", "1");

      const { pinnedRaces } = useAppStore.getState();
      expect(pinnedRaces).toHaveLength(2);
      expect(
        pinnedRaces.some((race) => race.season === "2023" && race.round === "2")
      ).toBe(true);
      expect(
        pinnedRaces.some((race) => race.season === "2024" && race.round === "1")
      ).toBe(true);
    });
  });

  describe("clearAllPinned", () => {
    it("should remove all pinned races", () => {
      const { pinRace, clearAllPinned } = useAppStore.getState();

      pinRace(mockRace1);
      pinRace(mockRace2);
      pinRace(mockRace3);

      expect(useAppStore.getState().pinnedRaces).toHaveLength(3);

      clearAllPinned();

      const { pinnedRaces } = useAppStore.getState();
      expect(pinnedRaces).toEqual([]);
    });
  });

  describe("UI Preferences", () => {
    it("should update preferred view", () => {
      const { setPreferredView } = useAppStore.getState();

      setPreferredView("list");

      const { preferredView } = useAppStore.getState();
      expect(preferredView).toBe("list");
    });

    it("should update items per page", () => {
      const { setItemsPerPage } = useAppStore.getState();

      setItemsPerPage(48);

      const { itemsPerPage } = useAppStore.getState();
      expect(itemsPerPage).toBe(48);
    });
  });

  describe("resetState", () => {
    it("should reset all state to initial values", () => {
      const { pinRace, setPreferredView, setItemsPerPage, resetState } =
        useAppStore.getState();

      // Modify state
      pinRace(mockRace1);
      setPreferredView("list");
      setItemsPerPage(48);

      // Verify state is modified
      expect(useAppStore.getState().pinnedRaces).toHaveLength(1);
      expect(useAppStore.getState().preferredView).toBe("list");
      expect(useAppStore.getState().itemsPerPage).toBe(48);

      // Reset state
      resetState();

      // Verify state is reset
      const { pinnedRaces, preferredView, itemsPerPage } =
        useAppStore.getState();
      expect(pinnedRaces).toEqual([]);
      expect(preferredView).toBe("grid");
      expect(itemsPerPage).toBe(24);
    });
  });
});
