"use client";

import { useState, useEffect, useCallback } from "react";

const API_BASE_URL = "https://selaldn.thesyndicates.team";

export interface Team {
  id: number;
  name: string;
  short_name: string;
  badge_url: string;
}

export interface Fixture {
  event: number;
  kickoff_time: string;
  kickoff_time_formatted: string;
  date_label: string;
  home_team: Team;
  away_team: Team;
  difficulty: number;
  difficulty_label: string;
  color: string;
}

export interface FixtureGroup {
  date: string;
  fixtures: Fixture[];
}

export interface FDRRow {
  team: Team & { is_focus: boolean };
  fixtures: any[]; // The example showed empty array, but usually contains fixture info
}

export interface FDRColumn {
  id: number;
  label: string;
  deadline: string;
  is_selected: boolean;
}

export interface FixturesResponse {
  status: boolean;
  message: string;
  code: number;
  data: {
    team: any;
    current_gameweek: number;
    view: string;
    navigation: {
      selected_gameweek: number;
      title: string;
      deadline: string;
      range: string;
      previous: {
        id: number;
        name: string;
        deadline: string;
      } | null;
      next: {
        id: number;
        name: string;
        deadline: string;
      } | null;
      notice: string;
    };
    fixtures: FixtureGroup[];
    fdr: {
      selected_gameweek: number;
      columns: FDRColumn[];
      rows: FDRRow[];
    };
    fdr_key: {
      value: number;
      label: string;
      color: string;
    }[];
  };
}

export const useFixtures = (gameweek?: number, view: "fixtures" | "fdr" = "fixtures", limit: number = 4) => {
  const [data, setData] = useState<FixturesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchFixtures = useCallback(async () => {
    setLoading(true);
    try {
      const endpoint = view === "fdr" ? "fixtures-page/fdr" : "fixtures-page";
      const url = new URL(`${API_BASE_URL}/api/fpl/${endpoint}`);
      if (gameweek) {
        url.searchParams.append("gameweek", gameweek.toString());
      }
      if (view === "fdr") {
        url.searchParams.append("limit", limit.toString());
      }

      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error(`Failed to fetch fixtures: ${response.status} ${response.statusText}`);
      }
      const json = await response.json();
      
      // Normalize response structure since FDR endpoint nests under payload
      if (view === "fdr" && json.data?.payload) {
        setData({ ...json, data: json.data.payload });
      } else {
        setData(json);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An error occurred"));
    } finally {
      setLoading(false);
    }
  }, [gameweek, view, limit]);

  useEffect(() => {
    fetchFixtures();
  }, [fetchFixtures]);

  return { data, loading, error, refetch: fetchFixtures };
};
