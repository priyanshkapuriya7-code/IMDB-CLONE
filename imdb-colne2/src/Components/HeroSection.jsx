import { Link } from 'react-router-dom';
import '../styles/HeroSection.css';

const featuredMovie = {
  id: "avatar-fire-ash",
  title: "Avatar: Fire & Ash",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMLUfR8pIcP6VS4SxMOR-bl_uxP35TK5vj8WmsZ3WiMA&s=10",
  rating: "9.7",
  votes: "45,234",
  year: "2025",
  genre: "Action-Adventure",
  duration: "162 min",
  director: "James Cameron",
  description: "The third chapter of the Avatar saga continues exploring the extraordinary world of Pandora with stunning visual effects and immersive storytelling."
};

function HeroSection() {
  return (
    <div className="pure-image-hero-wrap">
      <div className="pure-image-hero-card">
        <div
          className="pure-hero-bg-blur"
          style={{ backgroundImage: `url(${featuredMovie.image})` }}
        />

        <div className="hero-banner-container">
          <Link to={`/movie/${featuredMovie.id}`} className="hero-img-link">
            <img src={featuredMovie.image} alt={featuredMovie.title} className="pure-hero-img" />
            <div className="hero-gradient-overlay" />
          </Link>

          <div className="pure-hero-overlay-content">
            <div className="hero-featured-tag">🔥 FEATURED SPOTLIGHT</div>
            <h2 className="hero-movie-title">{featuredMovie.title}</h2>

            <div className="hero-meta-bar">
              <span className="hero-rating-badge">★ {featuredMovie.rating}</span>
              <span className="hero-votes">({featuredMovie.votes} votes)</span>
              <span className="hero-dot">•</span>
              <span className="hero-meta-item">{featuredMovie.year}</span>
              <span className="hero-dot">•</span>
              <span className="hero-meta-item">{featuredMovie.duration}</span>
              <span className="hero-genre-badge">{featuredMovie.genre}</span>
            </div>

            <p className="hero-movie-desc">{featuredMovie.description}</p>
            <div className="hero-director-info">
              <span className="director-label">Director:</span> {featuredMovie.director}
            </div>

            <div className="hero-action-buttons">
              <Link to={`/movie/${featuredMovie.id}`} className="hero-watch-btn">
                ▶ Watch Now
              </Link>
              <Link to={`/movie/${featuredMovie.id}`} className="hero-details-btn">
                ℹ More Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
