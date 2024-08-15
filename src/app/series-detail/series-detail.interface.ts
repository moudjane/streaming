export interface Episode {
  episode_number: number;
  name: string;
}

export interface Season {
  season_number: number;
  name: string;
  episodes?: Episode[];
}

export interface SeriesDetails {
  name: string;
  overview: string;
  poster_path: string;
  seasons: Season[];
}
