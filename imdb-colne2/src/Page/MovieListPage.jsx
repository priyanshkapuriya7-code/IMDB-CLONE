import { Link, useSearchParams } from 'react-router-dom';
import { moviesData } from '../data/movies';
import '../styles/MovieListPage.css';

function MovieListPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('search') || '';

  const filteredMovies = moviesData.filter((movie) => {
    const titleMatch = movie.title.toLowerCase().includes(query.toLowerCase());
    const genreMatch = movie.genre.toLowerCase().includes(query.toLowerCase());
    return titleMatch || genreMatch;
  });

  return (
    <div className="container">
      <h2 className="section-title">Movie List</h2>

      {filteredMovies.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#b0b0b0' }}>
          <h3>No movies found matching "{query}"</h3>
          <p>Try searching for another movie or genre.</p>
        </div>
      ) : (
        <div className="movie-list">
          {filteredMovies.map((movie) => (
            <div key={movie.id} className="movie-list-item">
              <Link to={`/movie/${movie.id}`}>
                <img src={movie.poster} alt={movie.title} className="movie-list-img" />
              </Link>

              <div className="movie-list-details">
                <Link to={`/movie/${movie.id}`}>
                  <div className="movie-list-title">{movie.title}</div>
                </Link>

                <div className="movie-list-rating">
                  ★ {movie.rating} / 10
                </div>

                <div className="movie-meta">
                  <span>{movie.year}</span>
                  <span className="genre-badge">{movie.genre}</span>
                  <span>{movie.duration}</span>
                </div>

                <p className="movie-description">{movie.description}</p>

                <div className="action-buttons">
                  <Link to={`/movie/${movie.id}`} className="btn btn-primary">
                    ▶ Watch Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MovieListPage;
