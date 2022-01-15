// import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import axios from 'axios';

const API_KEY = '315e184681529069bd77249a0c74e7e1';
const BASE_URL = 'https://api.themoviedb.org/3/';

function fetchMovies(url) {
  return fetch(url)
    .then(response => {
      // console.log(response);
      return response.json();
    })
    .then(results => {
      // console.log(results);
      return results;
    })
    .catch(error => console.log(error));
}

function fetchTrendingMoviesOfTheDay() {
  return fetchMovies(`${BASE_URL}trending/movie/day?api_key=${API_KEY}`);
}

function fetchMovieByQuery(query) {
  return fetchMovies(
    `${BASE_URL}search/movie?api_key=${API_KEY}&language=en-US&page=1&query=${query}&include_adult=false`,
  );
}

function fetchDetailsOfMovie(movieId) {
  return fetchMovies(
    `${BASE_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`,
  );
}

function fetchCastOfMovie(movieId) {
  return fetchMovies(
    `${BASE_URL}movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`,
  );
}

function fetchReviewsOfMovie(movieId) {
  return fetchMovies(
    `${BASE_URL}movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US`,
  );
}

// axios
// function fetchMovies(url) {
//   return axios
//     .get(url)
//     .then(response => {
//       console.log(response);
//       return response;
//     })
//     .catch(error => console.log(error));
// }

// function fetchTrendingMoviesOfTheDay() {
//   return fetchMovies(`${BASE_URL}trending/movie/day?api_key=${API_KEY}`);
// }

// function fetchMovieByQuery(query) {
//   return fetchMovies(
//     `${BASE_URL}search/movie?api_key=${API_KEY}&language=en-US&page=1&query=${query}&include_adult=false`,
//   );
// }

// function fetchDetailsOfMovie(movieId) {
//   return fetchMovies(
//     `${BASE_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`,
//   );
// }

// function fetchCastOfMovie(movieId) {
//   return fetchMovies(
//     `${BASE_URL}movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`,
//   );
// }

// function fetchReviewsOfMovie(movieId) {
//   return fetchMovies(
//     `${BASE_URL}movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US`,
//   );
// }

const api = {
  // fetchMovies,
  fetchTrendingMoviesOfTheDay,
  fetchMovieByQuery,
  fetchDetailsOfMovie,
  fetchCastOfMovie,
  fetchReviewsOfMovie,
};

export default api;
