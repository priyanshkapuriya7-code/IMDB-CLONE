import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Components/Layout';
import HomePage from './Page/HomePage';
import MovieListPage from './Page/MovieListPage';
import MovieDetailPage from './Page/MovieDetailPage';
import WatchlistPage from './Page/WatchlistPage';
import { WatchlistProvider } from './context/WatchlistContext';
import './styles/global.css';

function App() {
  return (
    <WatchlistProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="movies" element={<MovieListPage />} />
            <Route path="movie/:id" element={<MovieDetailPage />} />
            <Route path="watchlist" element={<WatchlistPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </WatchlistProvider>
  );
}

export default App;
