import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { PinButton } from "../../app/components/PinButton";
import { usePinnedRacesStore } from "../../app/store/pinnedRacesStore";
import type { Race } from "../../app/services/api";

// Mock the usePinnedRaces hook
vi.mock("../../app/hooks/usePinnedRaces", () => ({
  usePinnedRaces: () => {
    const store = usePinnedRacesStore.getState();
    return {
      isPinned: store.isPinned,
      pinRace: store.pinRace,
      unpinRace: store.unpinRace,
      isHydrated: true, // Always hydrated in tests
    };
  },
}));

describe("PinButton Component", () => {
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

  beforeEach(() => {
    // Reset store state before each test
    usePinnedRacesStore.setState({ pinnedRaces: [] });
    vi.clearAllMocks();
  });

  describe("Rendering", () => {
    it("should render pin button with PinOff icon when race is not pinned", () => {
      render(<PinButton race={mockRace} />);

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();

      // Check if the button has the unpinned styling
      expect(button).toHaveClass("bg-white/5");
      expect(button).not.toHaveClass("bg-gradient-to-r");
    });

    it("should render pin button with Pin icon when race is pinned", () => {
      // Pin the race first
      const { pinRace } = usePinnedRacesStore.getState();
      pinRace({
        season: mockRace.season,
        round: mockRace.round,
        raceName: mockRace.raceName,
        circuitName: mockRace.Circuit.circuitName,
        date: "March 05, 2023",
        location: "Sakhir, Bahrain",
        pinnedAt: Date.now(),
      });

      render(<PinButton race={mockRace} />);

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();

      // Check if the button has the pinned styling
      expect(button).toHaveClass("bg-gradient-to-r");
      expect(button).toHaveClass("from-yellow-500");
    });

    it("should apply custom className when provided", () => {
      const customClass = "custom-test-class";
      render(<PinButton race={mockRace} className={customClass} />);

      const button = screen.getByRole("button");
      expect(button).toHaveClass(customClass);
    });

    it("should show tooltip by default", () => {
      render(<PinButton race={mockRace} />);

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("title", "Pin this race");
    });

    it("should not show tooltip when showTooltip is false", () => {
      render(<PinButton race={mockRace} showTooltip={false} />);

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("title", "");
    });
  });

  describe("User Interactions", () => {
    it("should pin race when clicked and race is not pinned", () => {
      render(<PinButton race={mockRace} />);

      const button = screen.getByRole("button");
      fireEvent.click(button);

      // Check if race is now pinned
      const { isPinned } = usePinnedRacesStore.getState();
      expect(isPinned(mockRace.season, mockRace.round)).toBe(true);
    });

    it("should unpin race when clicked and race is pinned", () => {
      // Pin the race first
      const { pinRace } = usePinnedRacesStore.getState();
      pinRace({
        season: mockRace.season,
        round: mockRace.round,
        raceName: mockRace.raceName,
        circuitName: mockRace.Circuit.circuitName,
        date: "March 05, 2023",
        location: "Sakhir, Bahrain",
        pinnedAt: Date.now(),
      });

      render(<PinButton race={mockRace} />);

      const button = screen.getByRole("button");
      fireEvent.click(button);

      // Check if race is now unpinned
      const { isPinned } = usePinnedRacesStore.getState();
      expect(isPinned(mockRace.season, mockRace.round)).toBe(false);
    });

    it("should prevent event propagation when clicked", () => {
      const parentClickHandler = vi.fn();

      render(
        <div onClick={parentClickHandler}>
          <PinButton race={mockRace} />
        </div>
      );

      const button = screen.getByRole("button");
      fireEvent.click(button);

      // Parent click handler should not be called due to stopPropagation
      expect(parentClickHandler).not.toHaveBeenCalled();
    });

    it("should prevent default behavior when clicked", () => {
      render(<PinButton race={mockRace} />);

      const button = screen.getByRole("button");
      const clickEvent = new MouseEvent("click", { bubbles: true });
      const preventDefaultSpy = vi.spyOn(clickEvent, "preventDefault");

      fireEvent(button, clickEvent);

      expect(preventDefaultSpy).toHaveBeenCalled();
    });
  });

  describe("Store Integration", () => {
    it("should create correct PinnedRace object when pinning", () => {
      render(<PinButton race={mockRace} />);

      const button = screen.getByRole("button");

      // Mock Date.now to ensure consistent timestamp
      const mockTimestamp = 12345;
      vi.spyOn(Date, "now").mockReturnValue(mockTimestamp);

      fireEvent.click(button);

      const { pinnedRaces } = usePinnedRacesStore.getState();
      expect(pinnedRaces[0]).toEqual({
        season: "2023",
        round: "1",
        raceName: "Bahrain Grand Prix",
        circuitName: "Bahrain International Circuit",
        date: "March 05, 2023",
        location: "Sakhir, Bahrain",
        pinnedAt: mockTimestamp,
      });

      vi.restoreAllMocks();
    });

    it("should correctly format location from Circuit data", () => {
      const raceWithDifferentLocation = {
        ...mockRace,
        Circuit: {
          ...mockRace.Circuit,
          Location: {
            ...mockRace.Circuit.Location,
            locality: "Monaco",
            country: "Monaco",
          },
        },
      };

      render(<PinButton race={raceWithDifferentLocation} />);

      const button = screen.getByRole("button");
      fireEvent.click(button);

      const { pinnedRaces } = usePinnedRacesStore.getState();
      expect(pinnedRaces[0].location).toBe("Monaco, Monaco");
    });
  });

  describe("State Changes", () => {
    it("should update button appearance when race is pinned externally", () => {
      const { rerender } = render(<PinButton race={mockRace} />);

      let button = screen.getByRole("button");
      expect(button).toHaveClass("bg-white/5");

      // Pin the race externally
      const { pinRace } = usePinnedRacesStore.getState();
      pinRace({
        season: mockRace.season,
        round: mockRace.round,
        raceName: mockRace.raceName,
        circuitName: mockRace.Circuit.circuitName,
        date: "March 05, 2023",
        location: "Sakhir, Bahrain",
        pinnedAt: Date.now(),
      });

      // Force re-render to see the state change
      rerender(<PinButton race={mockRace} />);

      button = screen.getByRole("button");
      expect(button).toHaveClass("bg-gradient-to-r");
      expect(button).toHaveAttribute("title", "Unpin this race");
    });

    it("should handle multiple pin/unpin toggles correctly", () => {
      const { rerender } = render(<PinButton race={mockRace} />);

      const getButton = () => screen.getByRole("button");
      const { isPinned } = usePinnedRacesStore.getState();

      // Initially not pinned
      expect(isPinned(mockRace.season, mockRace.round)).toBe(false);

      // Pin it
      fireEvent.click(getButton());
      rerender(<PinButton race={mockRace} />);
      expect(isPinned(mockRace.season, mockRace.round)).toBe(true);

      // Unpin it
      fireEvent.click(getButton());
      rerender(<PinButton race={mockRace} />);
      expect(isPinned(mockRace.season, mockRace.round)).toBe(false);

      // Pin it again
      fireEvent.click(getButton());
      rerender(<PinButton race={mockRace} />);
      expect(isPinned(mockRace.season, mockRace.round)).toBe(true);
    });
  });
});
