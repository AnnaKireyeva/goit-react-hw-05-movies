import './App.css';
import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AppBar from './Components/AppBar/AppBar';
import { LoaderSpinner } from './Components/LoaderSpinner/LoaderSpinner';
// import HomePage from './Pages/HomePage';
// import NotFoundPage from './Pages/NotFoundPage';
// import MoviesSearchbarPage from './Pages/MoviesSearchbarPage';
// import MovieDetailsView from './Pages/MovieDetailsView';

const HomePage = lazy(() =>
  import('./Pages/HomePage.js' /* webpackChunkName: "HomePage" */),
);
const NotFoundPage = lazy(() =>
  import('./Pages/NotFoundPage.js' /* webpackChunkName: "NotFoundPage" */),
);
const MoviesSearchbarPage = lazy(() =>
  import(
    './Pages/MoviesSearchbarPage.js' /* webpackChunkName: "MoviesSearchbarPage" */
  ),
);
const MovieDetailsView = lazy(() =>
  import(
    './Pages/MovieDetailsView.js' /* webpackChunkName: "MovieDetailsView" */
  ),
);

function App() {
  return (
    <>
      <AppBar />
      <Suspense fallback={<LoaderSpinner />}>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/movies" exact>
            <MoviesSearchbarPage />
          </Route>
          <Route path="/movies/:movieId">
            <MovieDetailsView />
          </Route>
          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
      </Suspense>
      <ToastContainer autoClose="3000" position="top-right" theme="colored" />
    </>
  );
}
export default App;
