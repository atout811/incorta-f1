import { Outlet } from "react-router";
import { createContext, useContext, useState, useEffect } from "react";
import { PersistentStateProvider } from "../components/PersistentStateProvider";

// Create a context for persistent state
interface AppContextType {
  isAppReady: boolean;
  setIsAppReady: (ready: boolean) => void;
}

const AppContext = createContext<AppContextType>({
  isAppReady: false,
  setIsAppReady: () => {},
});

export const useAppContext = () => useContext(AppContext);

export default function Layout() {
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    // Mark app as ready after initial hydration
    setIsAppReady(true);
  }, []);

  return (
    <AppContext.Provider value={{ isAppReady, setIsAppReady }}>
      <PersistentStateProvider>
        <div className="min-h-screen">
          {/* This div will persist across route changes */}
          <main className="relative">
            <Outlet />
          </main>
        </div>
      </PersistentStateProvider>
    </AppContext.Provider>
  );
}
