import { Link } from 'react-router-dom';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-logo"><span className="logo-text">Cine<span className="logo-gold">Flix</span></span></div>
        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/movies">Movies</Link>
          <Link to="/watchlist">Watchlist</Link>
          <a href="#help">Help</a>
          <a href="#about">About Us</a>
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Use</a>
          <a href="#contact">Contact Us</a>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} CineFlix. All rights reserved. | Made By Priyansh</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
