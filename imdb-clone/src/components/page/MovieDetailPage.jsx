import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import IMDbLayout from '../IMDbLayout';

const moviesDatabase = {
  '1': {
    id: 1,
    title: 'Dune: Part Two',
    year: '2024',
    mpaaRating: 'PG-13',
    duration: '2h 46m',
    rating: '8.5',
    votes: '482,190',
    genres: ['Sci-Fi', 'Action', 'Adventure'],
    poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
    backdrop: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1600&q=80',
    synopsis: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the universe, he endeavors to prevent a terrible future only he can foresee.',
    director: 'Denis Villeneuve',
    writers: 'Denis Villeneuve, Jon Spaihts, Frank Herbert',
    cast: [
      { name: 'Timothée Chalamet', role: 'Paul Atreides' },
      { name: 'Zendaya', role: 'Chani' },
      { name: 'Rebecca Ferguson', role: 'Lady Jessica' },
      { name: 'Javier Bardem', role: 'Stilgar' },
      { name: 'Austin Butler', role: 'Feyd-Rautha' }
    ]
  },
  '2': {
    id: 2,
    title: 'Oppenheimer',
    year: '2023',
    mpaaRating: 'R',
    duration: '3h 00m',
    rating: '8.9',
    votes: '720,410',
    genres: ['Biography', 'Drama', 'History'],
    poster: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=600&q=80',
    backdrop: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80',
    synopsis: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II, exploring the moral and political consequences of scientific triumph.',
    director: 'Christopher Nolan',
    writers: 'Christopher Nolan, Kai Bird, Martin J. Sherwin',
    cast: [
      { name: 'Cillian Murphy', role: 'J. Robert Oppenheimer' },
      { name: 'Emily Blunt', role: 'Katherine Oppenheimer' },
      { name: 'Matt Damon', role: 'Leslie Groves' },
      { name: 'Robert Downey Jr.', role: 'Lewis Strauss' }
    ]
  },
  '3': {
    id: 3,
    title: 'The Dark Knight',
    year: '2008',
    mpaaRating: 'PG-13',
    duration: '2h 32m',
    rating: '9.0',
    votes: '2,910,000',
    genres: ['Action', 'Crime', 'Drama'],
    poster: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
    backdrop: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1600&q=80',
    synopsis: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    director: 'Christopher Nolan',
    writers: 'Jonathan Nolan, Christopher Nolan, Bob Kane',
    cast: [
      { name: 'Christian Bale', role: 'Bruce Wayne / Batman' },
      { name: 'Heath Ledger', role: 'Joker' },
      { name: 'Aaron Eckhart', role: 'Harvey Dent' },
      { name: 'Michael Caine', role: 'Alfred' }
    ]
  },
  '201': {
    id: 201,
    title: 'Dune: Part Two',
    year: '2024',
    mpaaRating: 'PG-13',
    duration: '2h 46m',
    rating: '8.5',
    votes: '482,190',
    genres: ['Sci-Fi', 'Action', 'Adventure'],
    poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
    backdrop: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1600&q=80',
    synopsis: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.',
    director: 'Denis Villeneuve',
    writers: 'Denis Villeneuve, Jon Spaihts',
    cast: [
      { name: 'Timothée Chalamet', role: 'Paul Atreides' },
      { name: 'Zendaya', role: 'Chani' }
    ]
  },
  '301': {
    id: 301,
    title: 'The Shawshank Redemption',
    year: '1994',
    mpaaRating: 'R',
    duration: '2h 22m',
    rating: '9.3',
    votes: '2,900,000',
    genres: ['Drama'],
    poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
    backdrop: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1600&q=80',
    synopsis: 'Over the course of several years, two convicts form a friendship, seeking consolation and eventual redemption through basic compassion.',
    director: 'Frank Darabont',
    writers: 'Stephen King, Frank Darabont',
    cast: [
      { name: 'Tim Robbins', role: 'Andy Dufresne' },
      { name: 'Morgan Freeman', role: 'Ellis Boyd Redding' }
    ]
  }
};

const similarMoviesList = [
  {
    id: 2,
    title: 'Oppenheimer',
    year: '2023',
    rating: '8.9',
    genre: 'Drama',
    poster: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 3,
    title: 'The Dark Knight',
    year: '2008',
    rating: '9.0',
    genre: 'Action',
    poster: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 4,
    title: 'Interstellar',
    year: '2014',
    rating: '8.7',
    genre: 'Sci-Fi',
    poster: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 6,
    title: 'Inception',
    year: '2010',
    rating: '8.8',
    genre: 'Sci-Fi',
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=500&q=80',
  }
];

export default function MovieDetailPage() {
  const { id } = useParams();
  const [inWatchlist, setInWatchlist] = useState(false);

  // Retrieve movie data or build fallback
  const movie = moviesDatabase[id] || {
    id: id || '100',
    title: `Movie Title #${id}`,
    year: '2024',
    mpaaRating: 'PG-13',
    duration: '2h 15m',
    rating: '8.6',
    votes: '150,000',
    genres: ['Action', 'Drama', 'Sci-Fi'],
    poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
    backdrop: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1600&q=80',
    synopsis: 'An epic cinematic journey exploring themes of courage, fate, and destiny against impossible odds.',
    director: 'Acclaimed Director',
    writers: 'Renowned Screenwriter',
    cast: [
      { name: 'Lead Actor', role: 'Protagonist' },
      { name: 'Co-Star Actor', role: 'Deuteragonist' },
      { name: 'Supporting Actor', role: 'Antagonist' }
    ]
  };

  return (
    <IMDbLayout currentPage="movies">
      {/* Back Button */}
      <div style={{ marginBottom: '16px' }}>
        <Link 
          to="/movies" 
          style={{ 
            color: '#f5c518', 
            textDecoration: 'none', 
            fontSize: '14px', 
            fontWeight: '600',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px' 
          }}
        >
          ← Back to Movies
        </Link>
      </div>

      {/* Header Info Row */}
      <div className="imdb-detail-header">
        <div className="imdb-detail-title-row">
          <div>
            <h1 className="imdb-detail-title">{movie.title}</h1>
            <div className="imdb-detail-meta">
              <span>{movie.year}</span>
              <span>•</span>
              <span>{movie.mpaaRating}</span>
              <span>•</span>
              <span>{movie.duration}</span>
            </div>
          </div>

          <div className="imdb-detail-rating-box">
            <div>
              <div style={{ fontSize: '11px', color: '#b3b3b3', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                IMDb RATING
              </div>
              <div className="imdb-rating-value">
                <span style={{ color: '#f5c518' }}>★</span>
                <span>{movie.rating}</span>
                <span style={{ fontSize: '14px', color: '#888', fontWeight: '400' }}>/10</span>
              </div>
              <div style={{ fontSize: '12px', color: '#777' }}>{movie.votes} votes</div>
            </div>

            <button 
              onClick={() => setInWatchlist(!inWatchlist)}
              className="imdb-btn-primary"
              style={{
                backgroundColor: inWatchlist ? '#222222' : '#f5c518',
                color: inWatchlist ? '#f5c518' : '#000000',
                border: inWatchlist ? '1px solid #f5c518' : 'none'
              }}
            >
              {inWatchlist ? '✓ In Watchlist' : '+ Add to Watchlist'}
            </button>
          </div>
        </div>
      </div>

      {/* Hero Media Grid */}
      <div className="imdb-detail-hero-grid">
        {/* Poster */}
        <img 
          src={movie.poster} 
          alt={movie.title} 
          className="imdb-detail-poster" 
        />

        {/* Backdrop Trailer Container */}
        <div 
          className="imdb-detail-backdrop"
          style={{ backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(18,18,18,0.9) 100%), url(${movie.backdrop})` }}
        >
          <button className="imdb-play-btn" title="Play Trailer">
            ▶
          </button>
          <div style={{ position: 'absolute', bottom: '16px', left: '20px', color: '#ffffff', fontWeight: '600', fontSize: '15px' }}>
            🎬 Watch Official Trailer
          </div>
        </div>
      </div>

      {/* Detail Body Grid */}
      <div className="imdb-detail-body">
        {/* Left Main Information */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Genre Tags */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {movie.genres.map(g => (
              <span 
                key={g}
                style={{
                  backgroundColor: '#1a1a1a',
                  border: '1px solid #444',
                  color: '#ffffff',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontSize: '13px',
                  fontWeight: '600'
                }}
              >
                {g}
              </span>
            ))}
          </div>

          {/* Synopsis */}
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#f5c518', marginBottom: '10px' }}>
              Storyline
            </h2>
            <p style={{ fontSize: '16px', color: '#d0d0d0', lineHeight: '1.6' }}>
              {movie.synopsis}
            </p>
          </div>

          {/* Credits Box */}
          <div style={{ backgroundColor: '#1a1a1a', padding: '20px', borderRadius: '8px', border: '1px solid #333', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <strong style={{ color: '#ffffff', fontSize: '14px' }}>Director: </strong>
              <span style={{ color: '#f5c518', fontSize: '14px' }}>{movie.director}</span>
            </div>
            <hr style={{ borderColor: '#2e2e2e' }} />
            <div>
              <strong style={{ color: '#ffffff', fontSize: '14px' }}>Writers: </strong>
              <span style={{ color: '#b3b3b3', fontSize: '14px' }}>{movie.writers}</span>
            </div>
          </div>

          {/* Cast */}
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#f5c518', marginBottom: '12px' }}>
              Top Cast
            </h2>
            <div className="imdb-cast-list">
              {movie.cast.map((actor, idx) => (
                <div key={idx} className="imdb-cast-card">
                  <div className="imdb-cast-avatar">
                    {actor.name.charAt(0)}
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#ffffff', marginBottom: '2px' }}>
                    {actor.name}
                  </div>
                  <div style={{ fontSize: '11px', color: '#888888' }}>
                    as {actor.role}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="imdb-sidebar-card">
            <h3 className="imdb-sidebar-title">Movie Quick Facts</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', color: '#b3b3b3' }}>
              <div><strong>Status:</strong> Released</div>
              <div><strong>Original Language:</strong> English</div>
              <div><strong>Budget:</strong> $190,000,000</div>
              <div><strong>Box Office:</strong> $711,800,000</div>
              <div><strong>Production:</strong> Legendary Pictures, Warner Bros.</div>
            </div>
          </div>

          <div className="imdb-sidebar-card" style={{ borderLeft: '4px solid #f5c518' }}>
            <h3 className="imdb-sidebar-title">User Reviews</h3>
            <div style={{ fontSize: '28px', fontWeight: '800', color: '#ffffff', marginBottom: '4px' }}>
              4.8 <span style={{ fontSize: '14px', color: '#888' }}>/ 5</span>
            </div>
            <p style={{ fontSize: '13px', color: '#b3b3b3', lineHeight: '1.4', marginBottom: '12px' }}>
              Based on 12,450 user reviews. "A masterwork in sound, visuals, and storytelling!"
            </p>
            <button className="imdb-btn-primary" style={{ width: '100%' }}>Write a Review</button>
          </div>
        </div>
      </div>

      {/* More Like This Section */}
      <section style={{ marginTop: '40px' }}>
        <div className="imdb-section-header">
          <h2 className="imdb-section-title">More Like This</h2>
        </div>
        <div className="imdb-movie-grid">
          {similarMoviesList.map(item => (
            <Link key={item.id} to={`/movies/${item.id}`} className="imdb-card">
              <div className="imdb-card-poster-wrapper">
                <img src={item.poster} alt={item.title} className="imdb-card-poster" loading="lazy" />
              </div>
              <div className="imdb-card-content">
                <div className="imdb-card-rating">
                  <span className="imdb-star-icon">★</span>
                  <span>{item.rating}</span>
                </div>
                <h3 className="imdb-card-title">{item.title}</h3>
                <div className="imdb-card-meta">{item.year} • {item.genre}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </IMDbLayout>
  );
}