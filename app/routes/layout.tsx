import { Outlet } from "react-router";
import { useEffect } from "react";
import { useAppState } from "../hooks/usePinnedRaces";

export default function Layout() {
  const { setIsAppReady } = useAppState();

  useEffect(() => {
    // Mark app as ready after initial hydration
    setIsAppReady(true);
  }, [setIsAppReady]);

  return (
    <div className="min-h-screen">
      {/* This div will persist across route changes */}
      <main className="relative">
        <Outlet />
      </main>
    </div>
  );
}
