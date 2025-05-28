import { format, parseISO } from "date-fns";
import type { Driver, Race } from "../services/api";

export function formatDriverName(driver: Driver): string {
  return `${driver.givenName} ${driver.familyName}`;
}

export function formatRaceDate(race: Race): string {
  try {
    const date = parseISO(race.date);
    return format(date, "MMMM dd, yyyy");
  } catch {
    return race.date;
  }
}

export function formatRaceDateShort(race: Race): string {
  try {
    const date = parseISO(race.date);
    return format(date, "MMM dd");
  } catch {
    return race.date;
  }
}

export function getCountryFlag(nationality: string): string {
  const countryFlags: Record<string, string> = {
    British: "🇬🇧",
    German: "🇩🇪",
    Spanish: "🇪🇸",
    Finnish: "🇫🇮",
    Brazilian: "🇧🇷",
    French: "🇫🇷",
    Italian: "🇮🇹",
    Dutch: "🇳🇱",
    Australian: "🇦🇺",
    Mexican: "🇲🇽",
    Canadian: "🇨🇦",
    Japanese: "🇯🇵",
    American: "🇺🇸",
    Austrian: "🇦🇹",
    Belgian: "🇧🇪",
    Swiss: "🇨🇭",
    Russian: "🇷🇺",
    Danish: "🇩🇰",
    Swedish: "🇸🇪",
    Polish: "🇵🇱",
    Thai: "🇹🇭",
    Monégasque: "🇲🇨",
    Chinese: "🇨🇳",
  };

  return countryFlags[nationality] || "🏁";
}
