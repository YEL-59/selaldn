/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useCallback } from "react";

const API_BASE_URL = "https://selaldn.thesyndicates.team";

export interface Team {
  id: number;
  name: string;
  short_name: string;
  badge_url: string;
}

export interface Player {
  id: number;
  name: string;
  web_name: string;
  photo: string;
  photo_url: string;
  position_code: string;
  position_name: string;
  team: Team;
  jersey_url: string;
  now_cost: number;
  cost: number;
  form: number;
  points_per_game: number;
  minutes: number;
  total_points: number;
  selected_by_percent: number;
  chance_of_playing_next_round: number;
  status: string;
  news: string;
  ict_index: number;
  dreamteam_count: number;
  goals_scored: number;
  assists: number;
  clean_sheets: number;
  yellow_cards: number;
  red_cards: number;
  in_dreamteam: boolean;
  is_captain: boolean | null;
  is_vice_captain: boolean | null;
  multiplier: number;
  squad_position: any;
  is_starting: any;
  is_bench: any;
  next_fixtures: any[];
  search_score: number;
  is_owned_by_team: boolean;
}

export interface PlayersResponse {
  status: boolean;
  message: string;
  code: number;
  data: {
    query: any;
    count: number;
    limit: number;
    page: number;
    filters: {
      search: string | null;
      position: string | null;
      team_id: number | null;
      min_price: number | null;
      max_price: number | null;
    };
    meta: {
      current_page: number;
      per_page: number;
      from: number;
      to: number;
      total: number;
      last_page: number;
      has_more_pages: boolean;
    };
    players: Player[];
  };
}

export const usePlayers = (params: {
  page?: number;
  limit?: number;
  search?: string;
  position?: string;
  team_id?: number;
  min_price?: number;
  max_price?: number;
} = {}) => {
  const [data, setData] = useState<PlayersResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchPlayers = useCallback(async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (params.page) queryParams.append("page", params.page.toString());
      if (params.limit) queryParams.append("limit", params.limit.toString());
      if (params.search) queryParams.append("search", params.search);
      if (params.position) queryParams.append("position", params.position);
      if (params.team_id) queryParams.append("team_id", params.team_id.toString());
      if (params.min_price) queryParams.append("min_price", params.min_price.toString());
      if (params.max_price) queryParams.append("max_price", params.max_price.toString());

      const response = await fetch(`${API_BASE_URL}/api/fpl/players?${queryParams.toString()}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch players: ${response.status} ${response.statusText}`);
      }
      const json = await response.json();
      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An error occurred"));
    } finally {
      setLoading(false);
    }
  }, [
    params.page,
    params.limit,
    params.search,
    params.position,
    params.team_id,
    params.min_price,
    params.max_price,
  ]);

  useEffect(() => {
    fetchPlayers();
  }, [fetchPlayers]);

  return { data, loading, error, refetch: fetchPlayers };
};

export interface PlayerDetailsResponse {
  status: boolean;
  message: string;
  code: number;
  data: {
    player: Player;
    team: Team;
    summary: {
      fixtures: any[];
      history: any[];
      history_past: any[];
    };
    player_page: {
      summary_card: any;
      prediction: any;
      upcoming_fixtures: any[];
      profile: any;
      career_totals: any;
      insights: any[];
    };
  };
}

export const usePlayerDetails = (id: string | number) => {
  const [data, setData] = useState<PlayerDetailsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchPlayerDetails = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/fpl/player/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch player details");
      }
      const json = await response.json();
      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An error occurred"));
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchPlayerDetails();
  }, [fetchPlayerDetails]);

  return { data, loading, error, refetch: fetchPlayerDetails };
};
