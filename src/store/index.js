import { apiTMD } from "../api"
import Environment from '../config/Environment';

async function basicFetch(url) {
  try {
    const response = await apiTMD.get(url);
    return response.data;
  } catch (error) {
    return {}
  }
}

export default {
  getHomeList: async () => {
    return [
      {
        slug: 'originals',
        title: 'Originais do Netflix',
        items: await basicFetch(`/discover/tv?with_network=213&language=pt-br&api_key=${Environment.API_TMD_KEY}`)
      },
      {
        slug: 'trending',
        title: 'Recomendados para Você',
        items: await basicFetch(`/trending/all/week?language=pt-br&api_key=${Environment.API_TMD_KEY}`)
      },
      {
        slug: 'top-rated',
        title: 'Em Alta',
        items: await basicFetch(`/movie/top_rated?language=pt-br&api_key=${Environment.API_TMD_KEY}`)
      },
      {
        slug: 'action',
        title: 'Ação',
        items: await basicFetch(`/discover/movie?with_genres=28&language=pt-br&api_key=${Environment.API_TMD_KEY}`)
      },
      {
        slug: 'comedy',
        title: 'Comédia',
        items: await basicFetch(`/discover/movie?with_genres=35&language=pt-br&api_key=${Environment.API_TMD_KEY}`)
      },
      {
        slug: 'horror',
        title: 'Terror',
        items: await basicFetch(`/discover/movie?with_genres=27&language=pt-br&api_key=${Environment.API_TMD_KEY}`)
      },
      {
        slug: 'romance',
        title: 'Romance',
        items: await basicFetch(`/discover/movie?with_genres=10749&language=pt-br&api_key=${Environment.API_TMD_KEY}`)
      },
      {
        slug: 'documentary',
        title: 'Documentários',
        items: await basicFetch(`/discover/movie?with_genres=99&language=pt-br&api_key=${Environment.API_TMD_KEY}`)
      },
    ]
  },

  getMovieDetail: async (movieID, type) => {
    let info = {};

    if (movieID) {
      switch (type) {
        case 'movie': info = await apiTMD.get(`movie/${movieID}?language=pt-br&api_key=${Environment.API_TMD_KEY}`); break;
        case 'tv': info = await apiTMD.get(`tv/${movieID}?language=pt-br&api_key=${Environment.API_TMD_KEY}`); break;
        default:
          break;
      }
      return info.data
    }
  }
}