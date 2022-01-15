import styles from './MoviesSearchbarPage.module.css';
import { useState } from 'react';

export default function MoviesSearchbarPage() {
  const [query, setQuery] = useState('');
  return (
    <>
      <form>
        <input
          className={styles.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Enter movie's name"
        />

        <button type="button">Search</button>
      </form>
    </>
  );
}
