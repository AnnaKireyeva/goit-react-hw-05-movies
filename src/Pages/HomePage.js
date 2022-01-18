import { useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import styles from './HomePage.module.css';
import api from '../Services/ApiService';
import { MdMovie } from 'react-icons/md';

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

      {trendingMovies && (
        <ul className={styles.movieList}>
          {trendingMovies.map(movie => (
            <li key={movie.id} className={styles.movieItem}>
              <Link
                to={`${url}movies/${movie.id}`}
                className={styles.movieLink}
              >
                <MdMovie size={16} className={styles.icon} /> {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
