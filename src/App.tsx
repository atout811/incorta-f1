import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Seasons from "./pages/Seasons";
import SeasonDetails from "./pages/SeasonDetails";
import RaceDetails from "./pages/RaceDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="seasons" element={<Seasons />} />
        <Route path="seasons/:season" element={<SeasonDetails />} />
        <Route path="race/:season/:round" element={<RaceDetails />} />
      </Route>
    </Routes>
  );
}

export default App;
