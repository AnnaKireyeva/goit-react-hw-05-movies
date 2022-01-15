import { useState, useEffect } from 'react';
import { NavLink, useParams, useRouteMatch, Route } from 'react-router-dom';
import api from '../Services/ApiService';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import styles from './MovieDetailsView.module.css';
import MovieCast from './MovieCast';
import MovieReview from './MovieReview';

export default function MovieDetailsView() {
  const { movieId } = useParams();
  const { url, path } = useRouteMatch();
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);

  //   useEffect(() => {
  //     api.fetchDetailsOfMovie(movieId).then(setMovie);
  //   }, [movieId]);

  useEffect(() => {
    api.fetchDetailsOfMovie(movieId).then(movie => {
      setMovie(movie);
      setLoading(false);
      console.log(movie);
    });
  }, [movieId]);

  return (
    <>
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
      {movie && (
        <>
          <button type="button">Go back</button>
          <div className={styles.movieBox}>
            <div className={styles.imgWrapper}>
              <img
                id={movieId}
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
            </div>
            <h2 className={styles.movieTitle}>{movie.title}</h2>
            <p>
              Release date: {movie.release_date}
              {/* {movie.release_date.split(' ', 1)} */}
            </p>
            <p>
              <span className={styles.movieRating}>Rating: </span>
              {movie.vote_average}
            </p>
            <h3 className={styles.overviewTitle}>Overview:</h3>
            <p className={styles.overview}>{movie.overview}</p>
            {movie.genres ? (
              <ul className={styles.genres}>
                Genres:
                {movie.genres.map(genre => (
                  <li key={genre.id}>{`${genre.name}`}</li>
                ))}
              </ul>
            ) : (
              <p>No genres</p>
            )}
          </div>
        </>
      )}

      <p className={styles.information}>Additional information</p>
      <ul className={styles.informationList}>
        <li>
          <NavLink
            to={`${url}/Cast`}
            className={styles.informationLink}
            activeClassName={styles.active}
          >
            Cast
          </NavLink>
        </li>
        {/* <Route path={`${path}/Cast`}>
          <MovieCast movieId={movieId} />
        </Route> */}
        <li>
          <NavLink
            to={`${url}/Reviews`}
            className={styles.informationLink}
            activeClassName={styles.active}
          >
            Reviews
          </NavLink>
        </li>
        {/* <Route path={`${path}/Reviews`}>
          <MovieReview movieId={movieId} />
        </Route> */}
      </ul>

      <Route path={`${path}/Cast`}>
        <MovieCast movieId={movieId} />
      </Route>

      <Route path={`${path}/Reviews`}>
        <MovieReview movieId={movieId} />
      </Route>
    </>
  );
}
