import Loader from 'react-loader-spinner';
import styles from './LoaderSpinner.module.css';

export const LoaderSpinner = () => {
  return (
    <div className={styles.spinner}>
      <Loader
        type="Oval"
        color="#FF6347"
        height={80}
        width={80}
        timeout={5000}
      />
    </div>
  );
};
