import './App.css';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AppBar from './Components/AppBar/AppBar';
import HomePage from './Pages/HomePage';
import NotFoundPage from './Pages/NotFoundPage';
import MoviesSearchbarPage from './Pages/MoviesSearchbarPage';
import MovieDetailsView from './Pages/MovieDetailsView';

function App() {
  return (
    <>
      <AppBar />
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
      <ToastContainer autoClose="3000" position="top-right" theme="colored" />
    </>
  );
}
export default App;
