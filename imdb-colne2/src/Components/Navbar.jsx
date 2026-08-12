import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
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
          <input
            type="text"
            placeholder="Search movies..."
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
              <NavLink to="/" end>Home</NavLink>
            </li>
            <li>
              <NavLink to="/movies">Movies</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
