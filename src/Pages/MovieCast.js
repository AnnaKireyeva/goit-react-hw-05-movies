import { useState, useEffect } from 'react';
import api from '../Services/ApiService';
import styles from './MovieCast.module.css';

export default function MovieCast({ movieId }) {
  const [cast, setCast] = useState(null);

  useEffect(() => {
    api
      .fetchCastOfMovie(movieId)
      .then(response => response.cast)
      .then(setCast);
  }, [movieId]);

  console.log(cast);

  return (
    <>
      {cast && (
        <ul className={styles.actorsList}>
          {cast.map(actor => {
            return (
              <li key={actor.id}>
                <div>
                  <img
                    className={styles.actorImg}
                    src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
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
