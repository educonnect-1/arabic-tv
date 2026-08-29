const TMDB_API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export async function searchMovie(title: string) {
  try {
    const res = await fetch(
      `${BASE_URL}/search/multi?query=${encodeURIComponent(title)}&api_key=${TMDB_API_KEY}`
    );
    const data = await res.json();
    return data.results?.[0] || null;
  } catch {
    return null;
  }
}

export async function getMovieDetails(id: number) {
  try {
    const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}`);
    return await res.json();
  } catch {
    return null;
  }
}