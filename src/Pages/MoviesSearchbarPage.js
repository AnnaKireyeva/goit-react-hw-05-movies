import { useEffect, useState } from 'react';
import { useHistory, useLocation, Link, useRouteMatch } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './MoviesSearchbarPage.module.css';
import PropTypes from 'prop-types';
import api from '../Services/ApiService';
import { MdSearch, MdMovie } from 'react-icons/md';

export default function MoviesSearchbarPage() {
  const history = useHistory();
  const location = useLocation();
  const [query, setQuery] = useState('');

  const [error, setError] = useState(false);
  const [foundMovies, setFoundMovies] = useState([]);
  const { url } = useRouteMatch();

  const searchQuery = new URLSearchParams(location.search).get('query') ?? '';

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
    setQuery(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (query.trim() === '') {
      toast.warning('Enter your query!');
      return;
    }
    history.push({ ...location, search: `query=${query}` });

    setQuery('');
  };

  return (
    <>
      <div className={styles.searchFormWrapper}>
        <form onSubmit={handleSubmit} className={styles.searchForm}>
          <input
            className={styles.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Enter movie's name"
            value={query}
            onChange={handleInputChange}
          />

          <button type="submit" className={styles.searchBtn}>
            <MdSearch size={24} />
          </button>
        </form>
      </div>

      {error && <p className={styles.error}>Movie "{query}" not found</p>}
      {foundMovies && (
        <ul className={styles.listMovies}>
          {foundMovies.map(movie => (
            <li key={movie.id}>
              <Link
                to={{
                  pathname: `${url}/${movie.id}`,
                  state: { from: location },
                }}
                className={styles.movieLink}
              >
                <MdMovie size={16} className={styles.icon} />
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

MoviesSearchbarPage.propTypes = {
  onSubmit: PropTypes.func,
};
