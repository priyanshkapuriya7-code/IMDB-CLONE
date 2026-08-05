import { useState } from 'react';
import IMDbLayout from '../IMDbLayout';

const sampleTVShows = [
  {
    id: 501,
    title: 'Breaking Bad',
    year: '2008-2013',
    rating: '9.5',
    genre: 'Drama',
    poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 502,
    title: 'Game of Thrones',
    year: '2011-2019',
    rating: '9.2',
    genre: 'Action',
    poster: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 503,
    title: 'Stranger Things',
    year: '2016-2025',
    rating: '8.7',
    genre: 'Sci-Fi',
    poster: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 504,
    title: 'The Last of Us',
    year: '2023-',
    rating: '8.8',
    genre: 'Drama',
    poster: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=500&q=80',
  }
];

export default function TVShowsPage() {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [watchlist, setWatchlist] = useState([]);

  const toggleWatchlist = (id) => {
    setWatchlist(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const filteredShows = selectedGenre 
    ? sampleTVShows.filter(s => s.genre.toLowerCase() === selectedGenre.toLowerCase())
    : sampleTVShows;

  return (
    <IMDbLayout currentPage="tv" selectedGenre={selectedGenre} onSelectGenre={setSelectedGenre}>
      <div style={{ marginBottom: '16px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '800', margin: '0 0 8px 0', color: '#ffffff' }}>
          Popular TV Shows & Series
        </h1>
        <p style={{ color: '#b3b3b3', fontSize: '15px' }}>
          Binge-worthy series, top-rated TV shows, and trending television.
        </p>
      </div>

      <div className="imdb-section-header">
        <h2 className="imdb-section-title">📺 Top TV Shows</h2>
      </div>

      <div className="imdb-movie-grid">
        {filteredShows.map(show => {
          const inWatchlist = watchlist.includes(show.id);
          return (
            <div key={show.id} className="imdb-card">
              <div className="imdb-card-poster-wrapper">
                <img src={show.poster} alt={show.title} className="imdb-card-poster" loading="lazy" />
              </div>
              <div className="imdb-card-content">
                <div className="imdb-card-rating">
                  <span className="imdb-star-icon">★</span>
                  <span>{show.rating}</span>
                </div>
                <h3 className="imdb-card-title">{show.title}</h3>
                <div className="imdb-card-meta">{show.year} • {show.genre}</div>
                <button 
                  className="imdb-card-btn"
                  onClick={() => toggleWatchlist(show.id)}
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
