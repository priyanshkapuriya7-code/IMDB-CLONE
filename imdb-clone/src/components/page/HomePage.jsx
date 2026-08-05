import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import IMDbLayout from '../IMDbLayout';

const sampleMovies = [
  {
    id: 1,
    title: 'Dune: Part Two',
    year: '2024',
    rating: '8.5',
    genre: 'Sci-Fi',
    poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=500&q=80',
    description: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.'
  },
  {
    id: 2,
    title: 'Oppenheimer',
    year: '2023',
    rating: '8.9',
    genre: 'Drama',
    poster: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=500&q=80',
    description: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.'
  },
  {
    id: 3,
    title: 'The Dark Knight',
    year: '2008',
    rating: '9.0',
    genre: 'Action',
    poster: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=500&q=80',
    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.'
  },
  {
    id: 4,
    title: 'Interstellar',
    year: '2014',
    rating: '8.7',
    genre: 'Sci-Fi',
    poster: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=500&q=80',
    description: 'When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers.'
  },
  {
    id: 5,
    title: 'Spider-Man: Across the Spider-Verse',
    year: '2023',
    rating: '8.7',
    genre: 'Animation',
    poster: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=500&q=80',
    description: 'Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.'
  },
  {
    id: 6,
    title: 'Inception',
    year: '2010',
    rating: '8.8',
    genre: 'Action',
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=500&q=80',
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.'
  }
];

export default function HomePage() {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [watchlist, setWatchlist] = useState([]);

  const toggleWatchlist = (movieId) => {
    setWatchlist(prev =>
      prev.includes(movieId) ? prev.filter(id => id !== movieId) : [...prev, movieId]
    );
  };

  const filteredMovies = selectedGenre
    ? sampleMovies.filter(movie => movie.genre === selectedGenre)
    : sampleMovies;

  return (
    <IMDbLayout currentPage="home" selectedGenre={selectedGenre} onSelectGenre={setSelectedGenre}>
      {/* Hero Featured Movie Section */}
      <section className="imdb-hero">
        <div className="imdb-hero-content">
          <span className="imdb-hero-badge">Featured Today</span>
          <h1 className="imdb-hero-title">Dune: Part Two</h1>
          <p className="imdb-hero-desc">
            Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the universe.
          </p>
          <div className="imdb-hero-actions">
            <Link to="/movies/1" className="imdb-btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <span>▶</span> View Details & Trailer
            </Link>
            <button
              onClick={() => toggleWatchlist(1)}
              style={{
                backgroundColor: 'rgba(255,255,255,0.15)',
                color: '#ffffff',
                border: '1px solid rgba(255,255,255,0.3)',
                padding: '8px 16px',
                borderRadius: '4px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              {watchlist.includes(1) ? '✓ In Watchlist' : '+ Add to Watchlist'}
            </button>
          </div>
        </div>
      </section>

      {/* Fan Favorites / Movie Grid */}
      <section>
        <div className="imdb-section-header">
          <h2 className="imdb-section-title">
            Top Picks {selectedGenre ? `• ${selectedGenre}` : ''}
          </h2>
          {selectedGenre && (
            <button
              onClick={() => setSelectedGenre(null)}
              style={{
                background: 'none',
                border: 'none',
                color: '#f5c518',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600'
              }}
            >
              Clear Filter ✕
            </button>
          )}
        </div>

        <div className="imdb-movie-grid">
          {filteredMovies.map(movie => {
            const inWatchlist = watchlist.includes(movie.id);
            return (
              <div key={movie.id} className="imdb-card">
                <Link to={`/movies/${movie.id}`} className="imdb-card-poster-wrapper" style={{ display: 'block' }}>
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="imdb-card-poster"
                    loading="lazy"
                  />
                </Link>
                <div className="imdb-card-content">
                  <div className="imdb-card-rating">
                    <span className="imdb-star-icon">★</span>
                    <span>{movie.rating}</span>
                  </div>
                  <Link to={`/movies/${movie.id}`} className="imdb-card-title">
                    {movie.title}
                  </Link>
                  <div className="imdb-card-meta">
                    {movie.year} • {movie.genre}
                  </div>
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
      </section>
    </IMDbLayout>
  );
}