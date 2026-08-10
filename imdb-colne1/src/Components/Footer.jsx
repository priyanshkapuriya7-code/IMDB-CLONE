import { Link } from 'react-router-dom';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="cineflix-footer">
      <div className="footer-container">
        <div className="footer-main">
          {/* Brand & About */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <span className="logo-text">Cine<span className="logo-gold">Flix</span></span>
            </Link>
            <p className="footer-desc">
              Discover trending blockbusters, explore movie details, and track your favorite films.
            </p>
            <div className="footer-email">
              <span className="email-icon">✉</span>
              <a href="mailto:support@cineflix.com" className="email-link">support@cineflix.com</a>
            </div>
            <div className="footer-socials">
              <a href="#facebook" title="Facebook">FB</a>
              <a href="#twitter" title="Twitter">TW</a>
              <a href="#instagram" title="Instagram">IG</a>
              <a href="#youtube" title="YouTube">YT</a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links-col">
            <h4 className="footer-heading">Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/movies">Movies</Link></li>
              <li><Link to="/watchlist">Watchlist</Link></li>
            </ul>
          </div>

          {/* Help & Legal */}
          <div className="footer-links-col">
            <h4 className="footer-heading">Support</h4>
            <ul>
              <li><a href="#help">Help Center</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Use</a></li>
              <li><a href="mailto:support@cineflix.com">Contact: support@cineflix.com</a></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} CineFlix. All rights reserved. | Made By Priyansh</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
