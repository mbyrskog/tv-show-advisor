import axios from "axios";
import { VITE_BASE_URL } from "../config/config";
import { TVShow } from "../types/tvShow";

const api = axios.create({
  baseURL: VITE_BASE_URL,
  params: {
    api_key: import.meta.env.VITE_API_KEY_PARAM,
  },
});

export class TVShowService {
  static async fetchPopular(): Promise<TVShow[]> {
    const response = await api.get<{ results: TVShow[] }>("tv/popular");
    return response.data.results;
  }

  static async fetchRecommendations(tvShowId: number): Promise<TVShow[]> {
    const response = await api.get<{ results: TVShow[] }>(
      `tv/${tvShowId}/recommendations`,
    );
    return response.data.results;
  }

  static async fetchByTitle(title: string): Promise<TVShow[]> {
    const response = await api.get<{ results: TVShow[] }>("search/tv", {
      params: { query: title },
    });
    return response.data.results;
  }
}
