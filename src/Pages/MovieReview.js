import styles from './MovieReview.module.css';
import { useState, useEffect } from 'react';
import api from '../Services/ApiService';

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
  console.log(reviews);

  return (
    <>
      {noReviews && <p>We don't have any reviews for this movie.</p>}
      {reviews && (
        <ul>
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
