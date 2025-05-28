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

class F1ApiService {
  private async fetchData<T>(endpoint: string): Promise<T[]> {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}.json?limit=100`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      // Handle different Ergast API response structures
      if (data.MRData) {
        // Look for table objects first (SeasonTable, RaceTable, etc.)
        const tableKeys = Object.keys(data.MRData).filter(
          (key) =>
            key.endsWith("Table") &&
            data.MRData[key] &&
            typeof data.MRData[key] === "object"
        );

        if (tableKeys.length > 0) {
          const table = data.MRData[tableKeys[0]];
          // Look for data arrays inside the table
          const dataKeys = Object.keys(table).filter((key) =>
            Array.isArray(table[key])
          );
          if (dataKeys.length > 0) {
            return table[dataKeys[0]] as T[];
          }
        }

        // Fallback: look for direct arrays in MRData
        const directArrayKeys = Object.keys(data.MRData).filter((key) =>
          Array.isArray(data.MRData[key])
        );

        if (directArrayKeys.length > 0) {
          return data.MRData[directArrayKeys[0]] as T[];
        }
      }

      return [];
    } catch (error) {
      console.error(`Error fetching data from ${endpoint}:`, error);
      throw error;
    }
  }

  async getSeasons(): Promise<Season[]> {
    return this.fetchData<Season>("/seasons");
  }

  async getRaces(season: string): Promise<Race[]> {
    return this.fetchData<Race>(`/${season}`);
  }

  async getRaceResults(season: string, round: string): Promise<Race[]> {
    return this.fetchData<Race>(`/${season}/${round}/results`);
  }

  async getDriverStandings(season: string): Promise<any[]> {
    return this.fetchData<any>(`/${season}/driverStandings`);
  }

  async getConstructorStandings(season: string): Promise<any[]> {
    return this.fetchData<any>(`/${season}/constructorStandings`);
  }

  async getDrivers(season?: string): Promise<Driver[]> {
    const endpoint = season ? `/${season}/drivers` : "/drivers";
    return this.fetchData<Driver>(endpoint);
  }

  async getCircuits(season?: string): Promise<Circuit[]> {
    const endpoint = season ? `/${season}/circuits` : "/circuits";
    return this.fetchData<Circuit>(endpoint);
  }
}

export const f1Api = new F1ApiService();
