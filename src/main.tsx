import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, useNavigate } from "react-router-dom";
import App from "./App";
import "./index.css";

function AppWithRedirect() {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if we have a redirect path from the 404.html
    const redirectPath = sessionStorage.getItem('redirectPath');
    if (redirectPath) {
      sessionStorage.removeItem('redirectPath');
      // Remove the base path from the stored path
      const pathWithoutBase = redirectPath.replace('/incorta-f1', '');
      if (pathWithoutBase && pathWithoutBase !== '/') {
        navigate(pathWithoutBase, { replace: true });
      }
    }
  }, [navigate]);
  
  return <App />;
}

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root element not found");
}

const root = createRoot(container);
root.render(
  <StrictMode>
    <BrowserRouter basename="/incorta-f1">
      <AppWithRedirect />
    </BrowserRouter>
  </StrictMode>
);
