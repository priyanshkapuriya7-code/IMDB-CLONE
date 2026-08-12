import { Link } from 'react-router-dom';
import '../styles/MovieCard.css';

function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <div className="movie-poster-wrap">
        <Link to={`/movie/${movie.id}`}>
          <img src={movie.poster} alt={movie.title} className="movie-poster" />
        </Link>
      </div>

      <div className="movie-info">
        <Link to={`/movie/${movie.id}`}>
          <div className="movie-name">{movie.title}</div>
          <div className="movie-rating">★ {movie.rating} / 10</div>
          <div className="movie-year">{movie.year} • {movie.genre}</div>
        </Link>
      </div>
    </div>
  );
}

export default MovieCard;
