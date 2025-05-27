import { useEffect, useState, useCallback } from "react";
import { usePinnedRacesStore } from "../store/pinnedRacesStore";

export function usePinnedRaces() {
  const store = usePinnedRacesStore();
  const [isHydrated, setIsHydrated] = useState(false);

  // Check hydration status
  useEffect(() => {
    let mounted = true;

    const checkHydration = () => {
      if (mounted && usePinnedRacesStore.persist.hasHydrated()) {
        setIsHydrated(true);
      }
    };

    // Check immediately
    checkHydration();

    // Listen for hydration completion
    const unsubscribe = usePinnedRacesStore.persist.onFinishHydration(() => {
      if (mounted) {
        setIsHydrated(true);
      }
    });

    // Fallback timeout to ensure hydration is marked as complete
    const timeout = setTimeout(() => {
      if (mounted) {
        setIsHydrated(true);
      }
    }, 1000);

    return () => {
      mounted = false;
      unsubscribe?.();
      clearTimeout(timeout);
    };
  }, []);

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
