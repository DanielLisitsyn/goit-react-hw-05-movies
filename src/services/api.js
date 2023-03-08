import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/';
const API_KEY = '8b69c3c7d27c8061f8ef1d5f73bd982d';

export const fetchTrendingMovies = async () => {
  const { data } = await axios(
    `${BASE_URL}3/trending/movie/day?api_key=${API_KEY}`
  );

  return data;
};

export const fetchMovieBySearch = async search => {
  const { data } = await axios(
    `${BASE_URL}3/search/movie?api_key=${API_KEY}&language=en-US&query=${search}&include_adult=false`
  );

  return data;
};

export const fetchMovieInformation = async id => {
  const { data } = await axios(`${BASE_URL}3/movie/${id}?api_key=${API_KEY}`);
  return data;
};

export const fetchMovieCastInformation = async id => {
  const { data } = await axios(
    `${BASE_URL}3/movie/${id}/credits?api_key=${API_KEY}`
  );

  return data;
};

export const fetchMovieReviews = async id => {
  const { data } = await axios(
    `${BASE_URL}3/movie/${id}/reviews?api_key=${API_KEY}`
  );

  return data;
};
