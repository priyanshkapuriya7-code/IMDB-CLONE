import { useState } from 'react';
import { Link } from 'react-router-dom';
import IMDbLayout from '../IMDbLayout';

const top250Movies = [
  {
    id: 701,
    rank: 1,
    title: 'The Shawshank Redemption',
    year: '1994',
    rating: '9.3',
    genre: 'Drama',
    poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 702,
    rank: 2,
    title: 'The Godfather',
    year: '1972',
    rating: '9.2',
    genre: 'Crime',
    poster: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 703,
    rank: 3,
    title: 'The Dark Knight',
    year: '2008',
    rating: '9.0',
    genre: 'Action',
    poster: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 704,
    rank: 4,
    title: 'The Godfather Part II',
    year: '1974',
    rating: '9.0',
    genre: 'Crime',
    poster: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 705,
    rank: 5,
    title: '12 Angry Men',
    year: '1957',
    rating: '9.0',
    genre: 'Drama',
    poster: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 706,
    rank: 6,
    title: 'Schindler\'s List',
    year: '1993',
    rating: '9.0',
    genre: 'Drama',
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=500&q=80',
  }
];

export default function TopRatedPage() {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [watchlist, setWatchlist] = useState([]);

  const toggleWatchlist = (id) => {
    setWatchlist(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const filteredMovies = selectedGenre
    ? top250Movies.filter(m => m.genre.toLowerCase() === selectedGenre.toLowerCase())
    : top250Movies;

  return (
    <IMDbLayout currentPage="top-rated" selectedGenre={selectedGenre} onSelectGenre={setSelectedGenre}>
      <div style={{ marginBottom: '16px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '800', margin: '0 0 8px 0', color: '#ffffff' }}>
          IMDb Top 250 Movies
        </h1>
        <p style={{ color: '#b3b3b3', fontSize: '15px' }}>
          As rated by regular IMDb voters. Click any title for details.
        </p>
      </div>

      <div className="imdb-section-header">
        <h2 className="imdb-section-title">🏆 Top Rated Movies</h2>
      </div>

      <div className="imdb-movie-grid">
        {filteredMovies.map(movie => {
          const inWatchlist = watchlist.includes(movie.id);
          return (
            <div key={movie.id} className="imdb-card">
              <Link to={`/movies/${movie.id}`} className="imdb-card-poster-wrapper" style={{ display: 'block' }}>
                <div style={{
                  position: 'absolute',
                  top: '8px',
                  left: '8px',
                  backgroundColor: '#f5c518',
                  color: '#000',
                  fontWeight: '800',
                  fontSize: '12px',
                  padding: '2px 8px',
                  borderRadius: '3px',
                  zIndex: 2
                }}>
                  #{movie.rank}
                </div>
                <img src={movie.poster} alt={movie.title} className="imdb-card-poster" loading="lazy" />
              </Link>
              <div className="imdb-card-content">
                <div className="imdb-card-rating">
                  <span className="imdb-star-icon">★</span>
                  <span>{movie.rating}</span>
                </div>
                <Link to={`/movies/${movie.id}`} className="imdb-card-title">
                  {movie.title}
                </Link>
                <div className="imdb-card-meta">{movie.year} • {movie.genre}</div>
                <button 
                  className="imdb-card-btn"
                  onClick={() => toggleWatchlist(movie.id)}
                  style={inWatchlist ? { backgroundColor: 'rgba(245, 197, 24, 0.25)', color: '#f5c518' } : {}}
                >
                  <span>{inWatchlist ? '✓' : '+'}</span>
                  {inWatchlist ? 'Watchlisted' : 'Watchlist'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </IMDbLayout>
  );
}
