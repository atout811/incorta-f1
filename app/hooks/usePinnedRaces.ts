import { useAppStore } from "../store/pinnedRacesStore";

export function usePinnedRaces() {
  const store = useAppStore();

  return {
    isPinned: store.isPinned,
    pinRace: store.pinRace,
    unpinRace: store.unpinRace,
    getPinnedRaces: store.getPinnedRaces,
    getPinnedCount: store.getPinnedCount,
    getPinnedRacesForSeason: store.getPinnedRacesForSeason,
    clearAllPinned: store.clearAllPinned,
  };
}

// Hook to replace usePersistentState from Context
export function useAppState() {
  const store = useAppStore();

  return {
    // App state
    isAppInitialized: store.isAppInitialized,
    isAppReady: store.isAppReady,

    // Navigation state
    lastVisitedSeason: store.lastVisitedSeason,
    lastVisitedRace: store.lastVisitedRace,

    // UI preferences
    preferredView: store.preferredView,
    itemsPerPage: store.itemsPerPage,

    // Actions
    setLastVisitedSeason: store.setLastVisitedSeason,
    setLastVisitedRace: store.setLastVisitedRace,
    setIsAppInitialized: store.setIsAppInitialized,
    setIsAppReady: store.setIsAppReady,
    setPreferredView: store.setPreferredView,
    setItemsPerPage: store.setItemsPerPage,
    resetState: store.resetState,
  };
}
