import { useEffect, useState } from 'react';
import { useHistory, useLocation, Link, useRouteMatch } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './MoviesSearchbarPage.module.css';
import PropTypes from 'prop-types';
import api from '../Services/ApiService';
import Loader from 'react-loader-spinner';

export default function MoviesSearchbarPage() {
  const history = useHistory();
  const location = useLocation();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [foundMovies, setFoundMovies] = useState(null);
  const { url } = useRouteMatch();

  const searchQuery = new URLSearchParams(location.search).get('query') ?? '';
  console.log(searchQuery);

  //   useEffect(() => {
  //     if (query.trim() === '') {
  //       return;
  //     }

  //     api
  //       .fetchMovieByQuery(query)
  //       .then(response => {
  //         if (response.results.length === 0) {
  //           setError(true);

  //           return;
  //         }
  //         setError(false);
  //         return response.results;
  //       })
  //       .then(setFoundMovies);
  //   }, [query]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      return;
    }

    api
      .fetchMovieByQuery(searchQuery)
      .then(response => {
        if (response.results.length === 0) {
          setError(true);

          return;
        }
        setError(false);
        return response.results;
      })
      .then(setFoundMovies);
  }, [searchQuery]);

  const handleInputChange = e => {
    // console.log(e.currentTarget.value);
    setQuery(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(query);

    if (query.trim() === '') {
      toast.warning('Enter your query!');
      return;
    }
    history.push({ ...location, search: `query=${query}` });

    // onSubmit(query);
    setQuery('');
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Enter movie's name"
          value={query}
          onChange={handleInputChange}
        />

        <button type="submit">Search</button>
      </form>

      {error && <p className={styles.error}>Movie "{query}" not found</p>}
      {foundMovies && (
        <ul>
          {foundMovies.map(movie => (
            <li key={movie.id}>
              <Link
                to={{
                  pathname: `${url}/&{movieId}`,
                  state: { from: location },
                }}
              >
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
      {loading && (
        <Loader
          type="Oval"
          color="#FF6347"
          height={80}
          width={80}
          timeout={5000}
          className="Loader"
        />
      )}
    </>
  );
}

MoviesSearchbarPage.propTypes = {
  onSubmit: PropTypes.func,
};
