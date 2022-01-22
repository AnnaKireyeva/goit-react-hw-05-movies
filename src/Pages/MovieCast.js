import { useState, useEffect } from 'react';
import api from '../Services/ApiService';
import styles from './MovieCast.module.css';
import noImage from '../Images/no-image.jpg';
import PropTypes from 'prop-types';

export default function MovieCast({ movieId }) {
  const [cast, setCast] = useState(null);
  const [noCast, setNoCast] = useState(false);

  // useEffect(() => {
  //   api
  //     .fetchCastOfMovie(movieId)
  //     .then(response => response.cast)
  //     .then(setCast);
  // }, [movieId]);

  useEffect(() => {
    api
      .fetchCastOfMovie(movieId)
      .then(response => {
        if (response.cast.length === 0) {
          setNoCast(true);
        } else return response.cast;
      })
      .then(setCast);
  }, [movieId]);

  return (
    <>
      {noCast && <p>We don't have cast for this movie.</p>}
      {cast && (
        <ul className={styles.actorsList}>
          {cast.map(actor => {
            return (
              <li key={actor.id}>
                <div>
                  <img
                    className={styles.actorImg}
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                        : noImage
                    }
                    alt={actor.original_name}
                  />
                </div>
                <p className={styles.actorName}>{actor.original_name}</p>
                <p className={styles.character}>{actor.character}</p>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

MovieCast.propTypes = {
  movieId: PropTypes.string.isRequired,
};
