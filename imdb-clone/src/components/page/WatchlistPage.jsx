import { useState } from 'react';
import IMDbLayout from '../IMDbLayout';

const defaultWatchlist = [
  {
    id: 601,
    title: 'Dune: Part Two',
    year: '2024',
    rating: '8.5',
    genre: 'Sci-Fi',
    poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 602,
    title: 'Oppenheimer',
    year: '2023',
    rating: '8.9',
    genre: 'Drama',
    poster: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=500&q=80',
  }
];

export default function WatchlistPage() {
  const [items, setItems] = useState(defaultWatchlist);
  const [selectedGenre, setSelectedGenre] = useState(null);

  const removeItem = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const filteredItems = selectedGenre
    ? items.filter(item => item.genre.toLowerCase() === selectedGenre.toLowerCase())
    : items;

  return (
    <IMDbLayout currentPage="watchlist" selectedGenre={selectedGenre} onSelectGenre={setSelectedGenre}>
      <div style={{ marginBottom: '16px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '800', margin: '0 0 8px 0', color: '#ffffff' }}>
          Your Watchlist 🔖
        </h1>
        <p style={{ color: '#b3b3b3', fontSize: '15px' }}>
          Track movies and TV shows you want to watch.
        </p>
      </div>

      <div className="imdb-section-header">
        <h2 className="imdb-section-title">Saved Titles ({filteredItems.length})</h2>
      </div>

      {filteredItems.length === 0 ? (
        <div style={{ padding: '40px', backgroundColor: '#1a1a1a', borderRadius: '8px', textAlign: 'center', border: '1px solid #333' }}>
          <p style={{ color: '#b3b3b3', fontSize: '16px', marginBottom: '16px' }}>Your watchlist is empty.</p>
          <a href="/movies" className="imdb-btn-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>
            Browse Movies
          </a>
        </div>
      ) : (
        <div className="imdb-movie-grid">
          {filteredItems.map(movie => (
            <div key={movie.id} className="imdb-card">
              <div className="imdb-card-poster-wrapper">
                <img src={movie.poster} alt={movie.title} className="imdb-card-poster" loading="lazy" />
              </div>
              <div className="imdb-card-content">
                <div className="imdb-card-rating">
                  <span className="imdb-star-icon">★</span>
                  <span>{movie.rating}</span>
                </div>
                <h3 className="imdb-card-title">{movie.title}</h3>
                <div className="imdb-card-meta">{movie.year} • {movie.genre}</div>
                <button 
                  className="imdb-card-btn"
                  onClick={() => removeItem(movie.id)}
                  style={{ backgroundColor: 'rgba(255, 68, 68, 0.15)', color: '#ff6b6b' }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </IMDbLayout>
  );
}
