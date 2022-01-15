import { useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import styles from './HomePage.module.css';
import api from '../Services/ApiService';

export default function HomePage() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const { url } = useRouteMatch();

  useEffect(() => {
    api
      .fetchTrendingMoviesOfTheDay()
      .then(response => response.results)
      .then(setTrendingMovies);
  }, []);

  // useEffect(() => {
  //   api.fetchTrendingMoviesOfTheDay().then(results => {
  //     setTrendingMovies(results);
  //     return results;
  //   });
  // }, []);

  return (
    <>
      <h2 className={styles.homePageTitle}>Trending today</h2>
      {/* {trendingMovies &&
        trendingMovies.map(movie => <li key={movie.id}>{movie.title}</li>)} */}
      {trendingMovies && (
        <ul className={styles.movieList}>
          {trendingMovies.map(movie => (
            <li key={movie.id}>
              <Link to={`${url}movies/${movie.id}`}>{movie.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
