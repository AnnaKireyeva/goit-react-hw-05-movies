import styles from './Navigation.module.css';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className={styles.list}>
      <NavLink
        exact
        to="/"
        className={styles.link}
        activeClassName={styles.active}
      >
        Home
      </NavLink>
      <NavLink
        to="/movies"
        className={styles.link}
        activeClassName={styles.active}
      >
        Movies
      </NavLink>
    </nav>
  );
};

export default Navigation;
