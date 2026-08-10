import { Link } from 'react-router-dom';
import '../styles/MovieCard.css';

function MovieCard({ movie, isInWatchlist, onToggleWatchlist, showWatchlistBtn = true }) {
  return (
    <div className="movie-card">
      <div className="movie-poster-wrap">
        <Link to={`/movie/${movie.id}`} style={{ display: 'block', width: '100%', height: '100%' }}>
          <img src={movie.poster} alt={movie.title} className="movie-poster" loading="lazy" />
        </Link>
        {showWatchlistBtn && onToggleWatchlist && (
          <button
            type="button"
            className={`watchlist-btn-overlay ${isInWatchlist ? 'active' : ''}`}
            title={isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
          >
            {isInWatchlist ? '✓' : '+'}
          </button>
        )}
      </div>
      <div className="movie-info">
        <Link to={`/movie/${movie.id}`}>
          <div className="movie-name">{movie.title}</div>
          <div className="movie-rating">★ {movie.rating} / 10</div>
          <div className="movie-year">
            {movie.year} • {movie.genre}
          </div>
        </Link>
        {/* {showWatchlistBtn && onToggleWatchlist && (
          <button
            type="button"
            className={`card-watchlist-btn ${isInWatchlist ? 'active' : ''}`}
          >
            {isInWatchlist ? '✓ In Watchlist' : '+ Add to Watchlist'}
          </button>
        )} */}
      </div>
    </div>
  );
}

export default MovieCard;
