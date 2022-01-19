import { useState, useEffect, lazy, Suspense } from 'react';
import {
  NavLink,
  useParams,
  useRouteMatch,
  Route,
  useHistory,
  useLocation,
} from 'react-router-dom';
import api from '../Services/ApiService';
import { LoaderSpinner } from '../Components/LoaderSpinner/LoaderSpinner';
import styles from './MovieDetailsView.module.css';
import noImage from '../Images/no-image.jpg';

const MovieCast = lazy(() =>
  import('./MovieCast.js' /* webpackChunkName: "MovieCast" */),
);
const MovieReview = lazy(() =>
  import('./MovieReview.js' /* webpackChunkName: "MovieReviews" */),
);

export default function MovieDetailsView() {
  const history = useHistory();
  const location = useLocation();
  const { movieId } = useParams();
  const { url, path } = useRouteMatch();
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.fetchDetailsOfMovie(movieId).then(movie => {
      setMovie(movie);
      setLoading(false);
    });
  }, [movieId]);

  const handleGoBackButton = () => {
    history.push(location.state?.from ? location.state.from : '/');
  };

  return (
    <>
      {loading && <LoaderSpinner />}
      {movie && (
        <>
          <button
            type="button"
            className={styles.goBackBtn}
            onClick={handleGoBackButton}
          >
            Go back
          </button>
          <div className={styles.movieBox}>
            <div className={styles.imgWrapper}>
              <img
                id={movieId}
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : noImage
                }
                alt={movie.title}
                className={styles.moviePoster}
              />
            </div>
            <div className={styles.aboutMovieWrapper}>
              <h2 className={styles.movieTitle}>{movie.title}</h2>
              <p>
                <span className={styles.releaseDate}>Release date:</span>
                {movie.release_date}
              </p>
              <p className={styles.movieRating}>
                <span className={styles.ratingCaption}>Rating: </span>
                {movie.vote_average}
              </p>
              <p className={styles.overviewTitle}>Overview:</p>
              <p className={styles.overview}>{movie.overview}</p>
              {movie.genres ? (
                <ul className={styles.genres}>
                  Genres:
                  {movie.genres.map(genre => (
                    <li
                      key={genre.id}
                      className={styles.genreItem}
                    >{`${genre.name}`}</li>
                  ))}
                </ul>
              ) : (
                <p>No genres</p>
              )}

              <p className={styles.information}>Additional information:</p>
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

                <li>
                  <NavLink
                    to={`${url}/Reviews`}
                    className={styles.informationLink}
                    activeClassName={styles.active}
                  >
                    Reviews
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </>
      )}

      <Suspense fallback={<LoaderSpinner />}>
        <Route path={`${path}/Cast`}>
          <MovieCast movieId={movieId} />
        </Route>

        <Route path={`${path}/Reviews`}>
          <MovieReview movieId={movieId} />
        </Route>
      </Suspense>
    </>
  );
}
