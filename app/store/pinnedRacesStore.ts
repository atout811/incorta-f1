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

interface AppState {
  // Pinned races state
  pinnedRaces: PinnedRace[];

  // UI preferences
  preferredView: "grid" | "list";
  itemsPerPage: number;

  // Pinned races actions
  pinRace: (race: PinnedRace) => void;
  unpinRace: (season: string, round: string) => void;
  clearAllPinned: () => void;

  // UI preference actions
  setPreferredView: (view: "grid" | "list") => void;
  setItemsPerPage: (count: number) => void;

  // Reset actions
  resetState: () => void;
}

export const useAppStore = create<AppState>()(
  subscribeWithSelector(
    persist(
      (set, get) => ({
        // Initial state
        pinnedRaces: [],
        preferredView: "grid",
        itemsPerPage: 24,

        // Pinned races actions
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

        clearAllPinned: () => {
          set({ pinnedRaces: [] });
        },

        // UI preference actions
        setPreferredView: (view: "grid" | "list") => {
          set({ preferredView: view });
        },

        setItemsPerPage: (count: number) => {
          set({ itemsPerPage: count });
        },

        // Reset actions
        resetState: () => {
          set({
            pinnedRaces: [],
            preferredView: "grid",
            itemsPerPage: 24,
          });
        },
      }),
      {
        name: "f1-app-state",
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
        // Only persist certain parts of the state
        partialize: (state) => ({
          pinnedRaces: state.pinnedRaces,
          preferredView: state.preferredView,
          itemsPerPage: state.itemsPerPage,
        }),
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

// Keep the old export for backward compatibility during transition if needed
export const usePinnedRacesStore = useAppStore;
