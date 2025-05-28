import { Outlet } from "react-router";

export default function Layout() {
  return (
    <div className="min-h-screen">
      {/* This div will persist across route changes */}
      <main className="relative">
        <Outlet />
      </main>
    </div>
  );
}
