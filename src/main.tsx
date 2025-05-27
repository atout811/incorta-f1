import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../app/routes/layout";
import Home from "../app/routes/home";
import Seasons from "../app/routes/seasons";
import SeasonDetails from "../app/routes/seasons.$season";
import RaceDetails from "../app/routes/race.$season.$round";
import "../app/app.css";

// Define routes manually to avoid React Router v7 hydration issues
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "seasons",
          element: <Seasons />,
        },
        {
          path: "seasons/:season",
          element: <SeasonDetails />,
        },
        {
          path: "race/:season/:round",
          element: <RaceDetails />,
        },
      ],
    },
  ],
  {
    basename: "/incorta-f1",
  }
);

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root element not found");
}

const root = createRoot(container);
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
