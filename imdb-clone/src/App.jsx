import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/page/HomePage';
import MoviesPage from './components/page/MoviesPage';
import MovieDetailPage from './components/page/MovieDetailPage';
import TVShowsPage from './components/page/TVShowsPage';
import WatchlistPage from './components/page/WatchlistPage';
import TopRatedPage from './components/page/TopRatedPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:id" element={<MovieDetailPage />} />
        <Route path="/tv" element={<TVShowsPage />} />
        <Route path="/watchlist" element={<WatchlistPage />} />
        <Route path="/top-rated" element={<TopRatedPage />} />
      </Routes>
    </BrowserRouter>
  );
}