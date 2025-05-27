import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import type { ReactNode } from "react";
import { usePinnedRaces } from "../hooks/usePinnedRaces";

interface PersistentState {
  // Navigation state
  lastVisitedSeason: string | null;
  lastVisitedRace: { season: string; round: string } | null;

  // App state
  isAppInitialized: boolean;

  // UI state
  preferredView: "grid" | "list";
  itemsPerPage: number;
}

interface PersistentStateContextType extends PersistentState {
  setLastVisitedSeason: (season: string | null) => void;
  setLastVisitedRace: (race: { season: string; round: string } | null) => void;
  setIsAppInitialized: (initialized: boolean) => void;
  setPreferredView: (view: "grid" | "list") => void;
  setItemsPerPage: (count: number) => void;
  resetState: () => void;
}

const PersistentStateContext = createContext<PersistentStateContextType | null>(
  null
);

export function usePersistentState() {
  const context = useContext(PersistentStateContext);
  if (!context) {
    throw new Error(
      "usePersistentState must be used within PersistentStateProvider"
    );
  }
  return context;
}

interface PersistentStateProviderProps {
  children: ReactNode;
}

export function PersistentStateProvider({
  children,
}: PersistentStateProviderProps) {
  const { isHydrated } = usePinnedRaces();

  const [state, setState] = useState<PersistentState>({
    lastVisitedSeason: null,
    lastVisitedRace: null,
    isAppInitialized: false,
    preferredView: "grid",
    itemsPerPage: 24,
  });

  // Initialize app when pinned races are hydrated
  useEffect(() => {
    if (isHydrated && !state.isAppInitialized) {
      setState((prev) => ({ ...prev, isAppInitialized: true }));
    }
  }, [isHydrated]);

  const setLastVisitedSeason = useCallback((season: string | null) => {
    setState((prev) => ({ ...prev, lastVisitedSeason: season }));
  }, []);

  const setLastVisitedRace = useCallback(
    (race: { season: string; round: string } | null) => {
      setState((prev) => ({ ...prev, lastVisitedRace: race }));
    },
    []
  );

  const setIsAppInitialized = useCallback((initialized: boolean) => {
    setState((prev) => ({ ...prev, isAppInitialized: initialized }));
  }, []);

  const setPreferredView = useCallback((view: "grid" | "list") => {
    setState((prev) => ({ ...prev, preferredView: view }));
  }, []);

  const setItemsPerPage = useCallback((count: number) => {
    setState((prev) => ({ ...prev, itemsPerPage: count }));
  }, []);

  const resetState = useCallback(() => {
    setState({
      lastVisitedSeason: null,
      lastVisitedRace: null,
      isAppInitialized: false,
      preferredView: "grid",
      itemsPerPage: 24,
    });
  }, []);

  const contextValue: PersistentStateContextType = {
    ...state,
    setLastVisitedSeason,
    setLastVisitedRace,
    setIsAppInitialized,
    setPreferredView,
    setItemsPerPage,
    resetState,
  };

  return (
    <PersistentStateContext.Provider value={contextValue}>
      {children}
    </PersistentStateContext.Provider>
  );
}
