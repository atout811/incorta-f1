import {
  type RouteConfig,
  index,
  route,
  layout,
} from "@react-router/dev/routes";

export default [
  layout("routes/layout.tsx", [
    index("routes/home.tsx"),
    route("seasons", "routes/seasons.tsx"),
    route("seasons/:season", "routes/seasons.$season.tsx"),
    route("race/:season/:round", "routes/race.$season.$round.tsx"),
  ]),
] satisfies RouteConfig;
