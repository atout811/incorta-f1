import { create } from "zustand";
import {
  persist,
  createJSONStorage,
  subscribeWithSelector,
} from "zustand/middleware";

export interface PinnedRace {
  season: string;
  round: string;
  raceName: string;
  circuitName: string;
  date: string;
  location: string;
  pinnedAt: number; // timestamp for sorting
}

interface PinnedRacesState {
  pinnedRaces: PinnedRace[];
  isPinned: (season: string, round: string) => boolean;
  pinRace: (race: PinnedRace) => void;
  unpinRace: (season: string, round: string) => void;
  getPinnedRaces: () => PinnedRace[];
  clearAllPinned: () => void;
  getPinnedCount: () => number;
  getPinnedRacesForSeason: (season: string) => PinnedRace[];
}

export const usePinnedRacesStore = create<PinnedRacesState>()(
  subscribeWithSelector(
    persist(
      (set, get) => ({
        pinnedRaces: [],

        isPinned: (season: string, round: string) => {
          const state = get();
          return state.pinnedRaces.some(
            (race) => race.season === season && race.round === round
          );
        },

        pinRace: (race: PinnedRace) => {
          set((state) => {
            // Check if already pinned
            const isAlreadyPinned = state.pinnedRaces.some(
              (pinned) =>
                pinned.season === race.season && pinned.round === race.round
            );

            if (isAlreadyPinned) return state;

            const newRace = {
              ...race,
              pinnedAt: Date.now(),
            };

            return {
              pinnedRaces: [...state.pinnedRaces, newRace],
            };
          });
        },

        unpinRace: (season: string, round: string) => {
          set((state) => ({
            pinnedRaces: state.pinnedRaces.filter(
              (race) => !(race.season === season && race.round === round)
            ),
          }));
        },

        getPinnedRaces: () => {
          const state = get();
          // Sort by pinned date (most recent first)
          return [...state.pinnedRaces].sort((a, b) => b.pinnedAt - a.pinnedAt);
        },

        getPinnedCount: () => {
          const state = get();
          return state.pinnedRaces.length;
        },

        getPinnedRacesForSeason: (season: string) => {
          const state = get();
          return state.pinnedRaces
            .filter((race) => race.season === season)
            .sort((a, b) => parseInt(a.round) - parseInt(b.round));
        },

        clearAllPinned: () => {
          set({ pinnedRaces: [] });
        },
      }),
      {
        name: "f1-pinned-races",
        storage: createJSONStorage(() => {
          // More robust storage handling
          if (typeof window !== "undefined" && window.localStorage) {
            return {
              getItem: (name: string) => {
                try {
                  return localStorage.getItem(name);
                } catch (error) {
                  console.warn("Failed to read from localStorage:", error);
                  return null;
                }
              },
              setItem: (name: string, value: string) => {
                try {
                  localStorage.setItem(name, value);
                } catch (error) {
                  console.warn("Failed to write to localStorage:", error);
                }
              },
              removeItem: (name: string) => {
                try {
                  localStorage.removeItem(name);
                } catch (error) {
                  console.warn("Failed to remove from localStorage:", error);
                }
              },
            };
          }
          // Return a dummy storage for server-side
          return {
            getItem: () => null,
            setItem: () => {},
            removeItem: () => {},
          };
        }),
        version: 1,
        // Add migration logic if needed in the future
        migrate: (persistedState: any, version: number) => {
          if (version === 0) {
            // Migration logic for future versions
          }
          return persistedState;
        },
      }
    )
  )
);
