import { useEffect, useState, useCallback } from "react";
import { useAppStore } from "../store/pinnedRacesStore";

export function usePinnedRaces() {
  const store = useAppStore();
  const [isHydrated, setIsHydrated] = useState(false);

  // Check hydration status
  useEffect(() => {
    let mounted = true;

    const checkHydration = () => {
      if (mounted && useAppStore.persist.hasHydrated()) {
        setIsHydrated(true);
        // Mark app as initialized when store is hydrated
        store.setIsAppInitialized(true);
      }
    };

    // Check immediately
    checkHydration();

    // Listen for hydration completion
    const unsubscribe = useAppStore.persist.onFinishHydration(() => {
      if (mounted) {
        setIsHydrated(true);
        store.setIsAppInitialized(true);
      }
    });

    // Fallback timeout to ensure hydration is marked as complete
    const timeout = setTimeout(() => {
      if (mounted) {
        setIsHydrated(true);
        store.setIsAppInitialized(true);
      }
    }, 1000);

    return () => {
      mounted = false;
      unsubscribe?.();
      clearTimeout(timeout);
    };
  }, [store]);

  // Memoized functions to prevent unnecessary re-renders
  const isPinned = useCallback(
    (season: string, round: string) => {
      if (!isHydrated) return false;
      return store.isPinned(season, round);
    },
    [store.isPinned, isHydrated]
  );

  const pinRace = useCallback(
    (race: any) => {
      if (isHydrated) {
        store.pinRace(race);
      }
    },
    [store.pinRace, isHydrated]
  );

  const unpinRace = useCallback(
    (season: string, round: string) => {
      if (isHydrated) {
        store.unpinRace(season, round);
      }
    },
    [store.unpinRace, isHydrated]
  );

  const getPinnedRaces = useCallback(() => {
    if (!isHydrated) return [];
    return store.getPinnedRaces();
  }, [store.getPinnedRaces, isHydrated]);

  const getPinnedCount = useCallback(() => {
    if (!isHydrated) return 0;
    return store.getPinnedCount();
  }, [store.getPinnedCount, isHydrated]);

  const getPinnedRacesForSeason = useCallback(
    (season: string) => {
      if (!isHydrated) return [];
      return store.getPinnedRacesForSeason(season);
    },
    [store.getPinnedRacesForSeason, isHydrated]
  );

  return {
    isHydrated,
    isPinned,
    pinRace,
    unpinRace,
    getPinnedRaces,
    getPinnedCount,
    getPinnedRacesForSeason,
    clearAllPinned: store.clearAllPinned,
  };
}

// New hook to replace usePersistentState from Context
export function useAppState() {
  const store = useAppStore();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    let mounted = true;

    const checkHydration = () => {
      if (mounted && useAppStore.persist.hasHydrated()) {
        setIsHydrated(true);
        store.setIsAppInitialized(true);
      }
    };

    checkHydration();

    const unsubscribe = useAppStore.persist.onFinishHydration(() => {
      if (mounted) {
        setIsHydrated(true);
        store.setIsAppInitialized(true);
      }
    });

    const timeout = setTimeout(() => {
      if (mounted) {
        setIsHydrated(true);
        store.setIsAppInitialized(true);
      }
    }, 1000);

    return () => {
      mounted = false;
      unsubscribe?.();
      clearTimeout(timeout);
    };
  }, [store]);

  return {
    // App state
    isAppInitialized: isHydrated ? store.isAppInitialized : false,
    isAppReady: store.isAppReady,
    isHydrated,

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
