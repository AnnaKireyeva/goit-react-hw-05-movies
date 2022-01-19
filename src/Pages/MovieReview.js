import styles from './MovieReview.module.css';
import { useState, useEffect } from 'react';
import api from '../Services/ApiService';
import PropTypes from 'prop-types';

export default function MovieReview({ movieId }) {
  const [reviews, setReviews] = useState(null);
  const [noReviews, setNoReviews] = useState(false);

  useEffect(() => {
    api
      .fetchReviewsOfMovie(movieId)
      .then(response => {
        if (response.results.length === 0) {
          setNoReviews(true);
        } else return response.results;
      })
      .then(setReviews);
  }, [movieId]);

  return (
    <>
      {noReviews && (
        <p className={styles.noReview}>
          We don't have any reviews for this movie.
        </p>
      )}
      {reviews && (
        <ul className={styles.reviewList}>
          {reviews.map(review => {
            return (
              <li key={review.id}>
                <p className={styles.author}>{review.author}</p>
                <p className={styles.content}>{review.content}</p>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

MovieReview.propTypes = {
  movieId: PropTypes.string.isRequired,
};
