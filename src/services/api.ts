import axios from "axios";

const BASE_URL = "https://ergast.com/api/f1";

export interface Season {
  season: string;
  url: string;
}

export interface Circuit {
  circuitId: string;
  url: string;
  circuitName: string;
  Location: {
    lat: string;
    long: string;
    locality: string;
    country: string;
  };
}

export interface Driver {
  driverId: string;
  url: string;
  givenName: string;
  familyName: string;
  dateOfBirth: string;
  nationality: string;
  permanentNumber?: string;
  code?: string;
}

export interface Constructor {
  constructorId: string;
  url: string;
  name: string;
  nationality: string;
}

export interface Race {
  season: string;
  round: string;
  url: string;
  raceName: string;
  Circuit: Circuit;
  date: string;
  time?: string;
  Results?: RaceResult[];
}

export interface RaceResult {
  number: string;
  position: string;
  positionText: string;
  points: string;
  Driver: Driver;
  Constructor: Constructor;
  grid: string;
  laps: string;
  status: string;
  Time?: {
    millis: string;
    time: string;
  };
  FastestLap?: {
    rank: string;
    lap: string;
    Time: {
      time: string;
    };
    AverageSpeed: {
      units: string;
      speed: string;
    };
  };
}

export interface ApiResponse<T> {
  MRData: {
    xmlns: string;
    series: string;
    url: string;
    limit: string;
    offset: string;
    total: string;
    [key: string]: T[] | string;
  };
}

export interface PaginationInfo {
  limit: number;
  offset: number;
  total: number;
}

function extractData<T>(response: any): T[] {
  if (response.MRData) {
    for (const key in response.MRData) {
      if (Array.isArray(response.MRData[key])) {
        return response.MRData[key] as T[];
      }
      if (
        typeof response.MRData[key] === "object" &&
        response.MRData[key] !== null
      ) {
        for (const nestedKey in response.MRData[key]) {
          if (Array.isArray(response.MRData[key][nestedKey])) {
            return response.MRData[key][nestedKey] as T[];
          }
        }
      }
    }
  }
  return [];
}

// Simple function to get pagination info from API response
export function getPaginationInfo(response: any): PaginationInfo {
  if (response.MRData) {
    return {
      limit: parseInt(response.MRData.limit) || 30,
      offset: parseInt(response.MRData.offset) || 0,
      total: parseInt(response.MRData.total) || 0,
    };
  }
  return { limit: 30, offset: 0, total: 0 };
}

export async function getSeasonsWithPagination(
  offset?: number
): Promise<{ data: Season[]; pagination: PaginationInfo }> {
  const url = offset
    ? `${BASE_URL}/seasons.json?offset=${offset}`
    : `${BASE_URL}/seasons.json`;
  const response = await axios.get(url);
  return {
    data: extractData<Season>(response.data),
    pagination: getPaginationInfo(response.data),
  };
}

export async function getRaces(
  season: string,
  offset?: number
): Promise<Race[]> {
  const url = offset
    ? `${BASE_URL}/${season}.json?offset=${offset}`
    : `${BASE_URL}/${season}.json`;
  const response = await axios.get(url);
  return extractData<Race>(response.data);
}

export async function getRaceResults(
  season: string,
  round: string
): Promise<Race[]> {
  const response = await axios.get(
    `${BASE_URL}/${season}/${round}/results.json`
  );
  return extractData<Race>(response.data);
}
