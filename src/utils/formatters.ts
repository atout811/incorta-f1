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

export function getDriverInitials(driver: Driver): string {
  return `${driver.givenName[0]}${driver.familyName[0]}`;
}

export function getPositionSuffix(position: number): string {
  const lastDigit = position % 10;
  const lastTwoDigits = position % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
    return "th";
  }

  switch (lastDigit) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

export function formatPosition(position: string | number): string {
  const pos = typeof position === "string" ? parseInt(position) : position;
  if (isNaN(pos)) return position.toString();
  return `${pos}${getPositionSuffix(pos)}`;
}

export function formatLapTime(timeString?: string): string {
  if (!timeString) return "N/A";
  return timeString;
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
