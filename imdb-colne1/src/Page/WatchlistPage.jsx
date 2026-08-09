import { Link } from 'react-router-dom';
import MovieCard from '../Components/MovieCard';
import { useWatchlist } from '../context/WatchlistContext';
import '../styles/WatchlistPage.css';

function WatchlistPage() {
  const { watchlist, toggleWatchlist, clearWatchlist } = useWatchlist();

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 className="section-title" style={{ borderBottom: 'none', marginBottom: 0, paddingBottom: 0 }}>
          Your Watchlist ({watchlist.length})
        </h2>
        {watchlist.length > 0 && (
          <button
            onClick={clearWatchlist}
            className="btn"
            style={{ background: '#333', color: '#fff', border: '1px solid #555' }}
          >
            Clear All
          </button>
        )}
      </div>

      {watchlist.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 20px', color: '#b0b0b0', background: '#1a2332', borderRadius: '8px' }}>
          <div style={{ fontSize: '48px', marginBottom: '15px', color: '#f5c518' }}>♡</div>
          <h3 style={{ color: '#fff', marginBottom: '10px' }}>Your Watchlist is empty</h3>
          <p style={{ marginBottom: '20px' }}>Save movies and TV shows to track what you want to watch.</p>
          <Link to="/movies" className="btn btn-primary">
            Explore Movies
          </Link>
        </div>
      ) : (
        <div className="movies-grid">
          {watchlist.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isInWatchlist={true}
              onToggleWatchlist={toggleWatchlist}
              showWatchlistBtn={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default WatchlistPage;
