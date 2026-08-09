import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useWatchlist } from '../context/WatchlistContext';
import '../styles/MovieDetailPage.css';

function MovieDetailPage() {
  const { movies } = useWatchlist();
  const { id } = useParams();
  const navigate = useNavigate();
  const movie = movies.find((m) => m.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!movie) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '80px 20px' }}>
        <h2 style={{ color: '#f5c518', marginBottom: '15px' }}>Movie Not Found</h2>
        <p style={{ color: '#b0b0b0', marginBottom: '25px' }}>
          We couldn't find the requested movie details.
        </p>
        <button className="back-btn" onClick={() => navigate('/movies')}>
          Back to Movies
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Header Banner */}
      <div className="movie-header">
        <div className="movie-header-content">
          <img
            src={movie.poster}
            alt={movie.title}
            className="movie-detail-poster"
          />
          <div className="movie-header-info">
            <h1 className="movie-title">{movie.title}</h1>
            <div className="movie-meta">
              <div className="meta-item">
                <span className="rating-badge">★ {movie.rating}</span>
                {movie.votes && <span className="rating-text">/10 ({movie.votes} votes)</span>}
              </div>
              <div className="meta-item">{movie.year}</div>
              <div className="meta-item">{movie.duration}</div>
              <div className="meta-item">
                <span className="genre-badge">{movie.genre}</span>
              </div>
            </div>
            <p className="movie-description">{movie.description}</p>
            <div className="action-buttons">
              <button className="btn btn-primary">▶ Watch Now</button>
              <button
                type="button"
                className="btn btn-secondary"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Add to Watchlist
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Details & Cast Content */}
      <div className="content">
        {/* About & Detailed Information Section */}
        <section className="section">
          <h2 className="section-title">About & Details</h2>
          {movie.about && movie.about.map((para, index) => (
            <p key={index} className="about-text">
              {para}
            </p>
          ))}

          {movie.details && (
            <div className="details-grid">
              {Object.entries(movie.details).map(([key, value]) => {
                if (!value) return null;
                const label = key
                  .replace(/([A-Z])/g, ' $1')
                  .replace(/^./, (str) => str.toUpperCase());

                return (
                  <div key={key} className="detail-item">
                    <div className="detail-label">{label}</div>
                    <div className="detail-value">{value}</div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Cast Section */}
        {movie.cast && movie.cast.length > 0 && (
          <section className="section">
            <h2 className="section-title">Cast & Crew</h2>
            <div className="cast-grid">
              {movie.cast.map((actor, idx) => (
                <div key={idx} className="cast-member">
                  <img
                    src={actor.image}
                    alt={actor.name}
                    className="cast-image"
                    loading="lazy"
                  />
                  <div className="cast-info">
                    <div className="cast-name">{actor.name}</div>
                    <div className="cast-character">{actor.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default MovieDetailPage;
