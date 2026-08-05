import { useState } from 'react';
import { Link } from 'react-router-dom';
import IMDbLayout from '../IMDbLayout';

const popularMovies = [
  {
    id: 201,
    title: 'Dune: Part Two',
    year: '2024',
    rating: '8.5',
    genre: 'Sci-Fi',
    poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 202,
    title: 'Deadpool & Wolverine',
    year: '2024',
    rating: '8.0',
    genre: 'Action',
    poster: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 203,
    title: 'Inside Out 2',
    year: '2024',
    rating: '7.8',
    genre: 'Animation',
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 204,
    title: 'Gladiator II',
    year: '2024',
    rating: '7.7',
    genre: 'Action',
    poster: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 205,
    title: 'Oppenheimer',
    year: '2023',
    rating: '8.9',
    genre: 'Drama',
    poster: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 206,
    title: 'Furiosa: A Mad Max Saga',
    year: '2024',
    rating: '7.8',
    genre: 'Action',
    poster: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=500&q=80',
  }
];

const topRatedMovies = [
  {
    id: 301,
    title: 'The Shawshank Redemption',
    year: '1994',
    rating: '9.3',
    genre: 'Drama',
    poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 302,
    title: 'The Godfather',
    year: '1972',
    rating: '9.2',
    genre: 'Crime',
    poster: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 303,
    title: 'The Dark Knight',
    year: '2008',
    rating: '9.0',
    genre: 'Action',
    poster: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 304,
    title: 'Pulp Fiction',
    year: '1994',
    rating: '8.9',
    genre: 'Crime',
    poster: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 305,
    title: 'Fight Club',
    year: '1999',
    rating: '8.8',
    genre: 'Drama',
    poster: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 306,
    title: 'Inception',
    year: '2010',
    rating: '8.8',
    genre: 'Sci-Fi',
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=500&q=80',
  }
];

const trendingMovies = [
  {
    id: 401,
    title: 'Interstellar',
    year: '2014',
    rating: '8.7',
    genre: 'Sci-Fi',
    poster: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 402,
    title: 'Spider-Man: Across the Spider-Verse',
    year: '2023',
    rating: '8.7',
    genre: 'Animation',
    poster: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 403,
    title: 'The Matrix',
    year: '1999',
    rating: '8.7',
    genre: 'Sci-Fi',
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 404,
    title: 'Forrest Gump',
    year: '1994',
    rating: '8.8',
    genre: 'Romance',
    poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=500&q=80',
  }
];

export default function MoviesPage() {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [watchlist, setWatchlist] = useState([]);

  const toggleWatchlist = (id) => {
    setWatchlist(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const filterByGenre = (movieList) => {
    if (!selectedGenre) return movieList;
    return movieList.filter(m => m.genre.toLowerCase() === selectedGenre.toLowerCase());
  };

  const renderMovieGrid = (moviesList) => {
    const list = filterByGenre(moviesList);

    if (list.length === 0) {
      return (
        <div style={{ color: '#888888', padding: '20px 0', fontSize: '14px' }}>
          No movies found for genre "{selectedGenre}".
        </div>
      );
    }

    return (
      <div className="imdb-movie-grid">
        {list.map(movie => {
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
    );
  };

  return (
    <IMDbLayout currentPage="movies" selectedGenre={selectedGenre} onSelectGenre={setSelectedGenre}>
      {/* Page Title & Active Genre Banner */}
      <div style={{ marginBottom: '12px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '800', margin: '0 0 8px 0', color: '#ffffff' }}>
          Movies Catalog
        </h1>
        <p style={{ color: '#b3b3b3', fontSize: '15px' }}>
          Click any movie to view full details, cast, trailers, and reviews.
        </p>
      </div>

      {selectedGenre && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', backgroundColor: '#1a1a1a', borderRadius: '8px', border: '1px solid #333' }}>
          <span style={{ color: '#f5c518', fontWeight: '600', fontSize: '14px' }}>
            Filtering by Genre: {selectedGenre}
          </span>
          <button 
            onClick={() => setSelectedGenre(null)}
            style={{
              background: 'none',
              border: 'none',
              color: '#ffffff',
              cursor: 'pointer',
              fontSize: '13px',
              textDecoration: 'underline',
              marginLeft: 'auto'
            }}
          >
            Clear Filter
          </button>
        </div>
      )}

      {/* Section 1: Popular Movies */}
      <section style={{ marginTop: '16px' }}>
        <div className="imdb-section-header">
          <h2 className="imdb-section-title">
            🔥 Popular Movies
          </h2>
        </div>
        {renderMovieGrid(popularMovies)}
      </section>

      {/* Section 2: Top Rated Movies */}
      <section style={{ marginTop: '24px' }}>
        <div className="imdb-section-header">
          <h2 className="imdb-section-title">
            ⭐ Top Rated Movies
          </h2>
        </div>
        {renderMovieGrid(topRatedMovies)}
      </section>

      {/* Section 3: Trending / Fan Favorites */}
      <section style={{ marginTop: '24px' }}>
        <div className="imdb-section-header">
          <h2 className="imdb-section-title">
            📈 Trending & Fan Favorites
          </h2>
        </div>
        {renderMovieGrid(trendingMovies)}
      </section>
    </IMDbLayout>
  );
}