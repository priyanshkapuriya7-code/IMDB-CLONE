import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const IMDbLayout = ({ children, currentPage = 'home', selectedGenre = null, onSelectGenre = () => {} }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const navItems = [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'movies', label: 'Movies', href: '/movies' },
    { id: 'tv', label: 'TV Shows', href: '/tv' },
    { id: 'watchlist', label: 'Watchlist', href: '/watchlist' },
    { id: 'top-rated', label: 'Top Rated', href: '/top-rated' },
  ];

  const genres = [
    'All', 'Action', 'Comedy', 'Drama', 'Horror', 
    'Sci-Fi', 'Romance', 'Thriller', 'Animation'
  ];

  return (
    <div className="imdb-container">
      {/* Header */}
      <header className="imdb-header">
        <div className="imdb-header-inner">
          {/* Logo */}
          <Link to="/" className="imdb-logo">
            <span className="imdb-logo-badge">IMDb</span>
          </Link>

          {/* Navigation */}
          <nav>
            <ul className="imdb-nav">
              {navItems.map(item => {
                const isActive = location.pathname === item.href || currentPage === item.id;
                return (
                  <li key={item.id}>
                    <Link
                      to={item.href}
                      className={`imdb-nav-link ${isActive ? 'active' : ''}`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Search Bar */}
          <div className="imdb-search-bar">
            <input
              type="text"
              placeholder="Search movies, TV shows, actors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="imdb-search-input"
            />
            <button className="imdb-search-button" title="Search">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
            </button>
          </div>

          {/* User Actions */}
          <div className="imdb-user-actions">
            <Link to="/watchlist" className="imdb-nav-link">
              <span>🔖</span> Watchlist
            </Link>
            <button className="imdb-btn-primary">Sign In</button>
          </div>
        </div>
      </header>

      {/* Main Layout Wrapper */}
      <div className="imdb-main-wrapper">
        {/* Sidebar */}
        <aside className="imdb-sidebar">
          <div className="imdb-sidebar-card">
            <h3 className="imdb-sidebar-title">Genres</h3>
            <div className="imdb-genre-grid">
              {genres.map(genre => (
                <button
                  key={genre}
                  className={`imdb-genre-tag ${selectedGenre === genre || (!selectedGenre && genre === 'All') ? 'active' : ''}`}
                  onClick={() => onSelectGenre(genre === 'All' ? null : genre)}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          <div className="imdb-sidebar-card">
            <h3 className="imdb-sidebar-title">Sort By</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {['Popularity', 'Release Date', 'Top Rated', 'Trending'].map(option => (
                <button
                  key={option}
                  style={{
                    backgroundColor: '#121212',
                    border: '1px solid #333',
                    color: '#e0e0e0',
                    padding: '8px 12px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    textAlign: 'left',
                    transition: 'border-color 0.2s'
                  }}
                  onMouseOver={(e) => e.target.style.borderColor = '#f5c518'}
                  onMouseOut={(e) => e.target.style.borderColor = '#333'}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="imdb-sidebar-card" style={{ borderLeft: '4px solid #f5c518' }}>
            <h3 className="imdb-sidebar-title">Pro Tip</h3>
            <p style={{ fontSize: '13px', color: '#b3b3b3', lineHeight: '1.5', marginBottom: '12px' }}>
              Create an account to track your watchlist and rate your favorite movies!
            </p>
            <button className="imdb-btn-primary" style={{ width: '100%' }}>Join IMDb Free</button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="imdb-content">
          {children}
        </main>
      </div>

      {/* Footer */}
      <footer className="imdb-footer">
        <div className="imdb-footer-inner">
          <div className="imdb-footer-col">
            <h4>Explore IMDb</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/movies">Popular Movies</Link></li>
              <li><Link to="/tv">TV Shows</Link></li>
              <li><Link to="/top-rated">Top Rated Movies</Link></li>
            </ul>
          </div>

          <div className="imdb-footer-col">
            <h4>Account</h4>
            <ul>
              <li><Link to="/watchlist">Your Watchlist</Link></li>
              <li><a href="#">Ratings & Reviews</a></li>
              <li><a href="#">User Settings</a></li>
            </ul>
          </div>

          <div className="imdb-footer-col">
            <h4>Company</h4>
            <ul>
              <li><a href="#">About IMDb</a></li>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Press Room</a></li>
              <li><a href="#">Advertising</a></li>
            </ul>
          </div>

          <div className="imdb-footer-col">
            <h4>Follow Us</h4>
            <ul>
              <li><a href="#">TikTok</a></li>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">YouTube</a></li>
              <li><a href="#">Twitter</a></li>
            </ul>
          </div>
        </div>

        <div className="imdb-footer-bottom">
          <p>© {new Date().getFullYear()} IMDb Clone, Inc. or its affiliates. Full Page Responsive Design.</p>
        </div>
      </footer>
    </div>
  );
};

export default IMDbLayout;
