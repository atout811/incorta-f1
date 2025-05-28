import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { PinButton } from "../components/PinButton";
import type { Race } from "../services/api";

// Simple mock that can be controlled per test
let mockPinnedRaces: any[] = [];
let mockPinRace = vi.fn();
let mockUnpinRace = vi.fn();

vi.mock("../store/pinnedRacesStore", () => ({
  useAppStore: vi.fn((selector: any) => {
    const state = {
      pinnedRaces: mockPinnedRaces,
      pinRace: mockPinRace,
      unpinRace: mockUnpinRace,
    };
    return selector(state);
  }),
}));

describe("PinButton", () => {
  const mockRace: Race = {
    season: "2023",
    round: "1",
    url: "http://example.com",
    raceName: "Monaco Grand Prix",
    Circuit: {
      circuitId: "monaco",
      url: "http://example.com",
      circuitName: "Circuit de Monaco",
      Location: {
        lat: "43.7347",
        long: "7.42056",
        locality: "Monaco",
        country: "Monaco",
      },
    },
    date: "2023-05-28",
    time: "13:00:00Z",
  };

  beforeEach(() => {
    mockPinnedRaces = [];
    mockPinRace = vi.fn();
    mockUnpinRace = vi.fn();
    vi.clearAllMocks();
  });

  describe("Pin Button Rendering", () => {
    it("should render pin button with Pin icon when race is not pinned", () => {
      render(<PinButton race={mockRace} />);

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();

      // Should show Pin icon when not pinned
      const icon = button.querySelector("svg");
      expect(icon).toBeInTheDocument();
    });

    it("should render pin button with Pin icon when race is pinned", () => {
      // Set the mock to have this race as pinned
      mockPinnedRaces = [
        {
          season: mockRace.season,
          round: mockRace.round,
          raceName: mockRace.raceName,
          circuitName: mockRace.Circuit.circuitName,
          date: mockRace.date,
          location: `${mockRace.Circuit.Location.locality}, ${mockRace.Circuit.Location.country}`,
          pinnedAt: Date.now(),
        },
      ];

      render(<PinButton race={mockRace} />);

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();

      // Should show filled Pin icon when pinned
      const icon = button.querySelector("svg");
      expect(icon).toBeInTheDocument();
    });
  });

  describe("Pin Button Interactions", () => {
    it("should call pinRace when clicked and race is not pinned", () => {
      render(<PinButton race={mockRace} />);

      const button = screen.getByRole("button");
      fireEvent.click(button);

      expect(mockPinRace).toHaveBeenCalledWith({
        season: "2023",
        round: "1",
        raceName: "Monaco Grand Prix",
        circuitName: "Circuit de Monaco",
        date: "2023-05-28",
        location: "Monaco, Monaco",
        pinnedAt: expect.any(Number),
      });
    });

    it("should call unpinRace when clicked and race is pinned", () => {
      // Set the mock to have this race as pinned
      mockPinnedRaces = [
        {
          season: mockRace.season,
          round: mockRace.round,
          raceName: mockRace.raceName,
          circuitName: mockRace.Circuit.circuitName,
          date: mockRace.date,
          location: `${mockRace.Circuit.Location.locality}, ${mockRace.Circuit.Location.country}`,
          pinnedAt: Date.now(),
        },
      ];

      render(<PinButton race={mockRace} />);

      const button = screen.getByRole("button");
      fireEvent.click(button);

      expect(mockUnpinRace).toHaveBeenCalledWith("2023", "1");
    });
  });
});
