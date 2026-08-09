import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useWatchlist } from '../context/WatchlistContext';
import '../styles/MovieListPage.css';

function MovieListPage() {
  const { movies } = useWatchlist();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Movies' },
    { id: 'trending', label: 'Trending' },
    { id: 'popular', label: 'Popular' },
    { id: 'top-rated', label: 'Top Rated' },
    { id: 'upcoming', label: 'Upcoming' },
  ];

  const filteredMovies = movies.filter((movie) => {
    const matchesCategory =
      selectedCategory === 'all' || movie.category === selectedCategory;
    const matchesSearch =
      movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container">
      <h2 className="section-title">Movie List</h2>

      {/* Category Filter Bar */}
      <div style={{ marginBottom: '25px' }}>
        <div className="filter-bar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`filter-btn ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {filteredMovies.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#b0b0b0' }}>
          <h3>No movies found matching "{searchQuery}"</h3>
          <p>Try searching for another keyword or selecting a different category.</p>
        </div>
      ) : (
        <div className="movie-list">
          {filteredMovies.map((movie) => (
            <div key={movie.id} className="movie-list-item">
                <Link to={`/movie/${movie.id}`}>
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="movie-list-img"
                  />
                </Link>
                <div className="movie-list-details">
                  <Link to={`/movie/${movie.id}`}>
                    <div className="movie-list-title">{movie.title}</div>
                  </Link>
                  <div className="movie-list-rating">
                    ★ {movie.rating} / 10
                    {movie.votes && <span className="rating-votes">({movie.votes} votes)</span>}
                  </div>
                  <div className="movie-meta">
                    <span>{movie.year}</span>
                    <span className="genre-badge">{movie.genre}</span>
                    <span>{movie.duration}</span>
                  </div>
                  <p className="movie-description">{movie.description}</p>
                  <div className="action-buttons">
                    <Link to={`/movie/${movie.id}`} className="btn btn-primary">
                      ▶ Watch Now
                    </Link>
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
          ))}
        </div>
      )}
    </div>
  );
}

export default MovieListPage;
