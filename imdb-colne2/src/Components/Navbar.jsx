import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useWatchlist } from '../context/WatchlistContext';
import '../styles/Navbar.css';

function Navbar() {
  const { watchlist } = useWatchlist();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const watchlistCount = watchlist ? watchlist.length : 0;

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/movies?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/movies');
    }
  };

  return (
    <header className="navbar">
      <div className="nav-left">
        <Link to="/" className="logo-brand">
          <img src="/logo.png" alt="CineFlix Logo" className="brand-logo-img" />
          <span className="logo-text">Cine<span className="logo-gold">Flix</span></span>
        </Link>
      </div>

      <form className="nav-search-bar" onSubmit={handleSearch}>
        <div className="search-input-wrapper">
          <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            placeholder="Search CineFlix..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button type="submit" className="nav-search-btn">
          Search
        </button>
      </form>

      <div className="nav-right">
        <nav>
          <ul>
            <li>
              <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/movies" className={({ isActive }) => (isActive ? 'active' : '')}>
                Movies
              </NavLink>
            </li>
            <li>
              <NavLink to="/watchlist" className={({ isActive }) => (isActive ? 'active' : '')}>
                Watchlist
                {watchlistCount > 0 && (
                  <span className="nav-watchlist-count">{watchlistCount}</span>
                )}
              </NavLink>
            </li>
          </ul>
        </nav>
        <button className="back-btn" onClick={() => navigate(-1)} title="Go back">
          ← Back
        </button>
      </div>
    </header>
  );
}

export default Navbar;
