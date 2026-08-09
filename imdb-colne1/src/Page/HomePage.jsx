import HeroSection from '../Components/HeroSection';
import MovieCard from '../Components/MovieCard';
import { useWatchlist } from '../context/WatchlistContext';
import '../styles/HomePage.css';

function HomePage() {
  const { movies } = useWatchlist();

  const trendingMovies = movies.filter((m) => m.category === 'trending');
  const popularMovies = movies.filter((m) => m.category === 'popular');
  const topRatedMovies = movies.filter((m) => m.category === 'top-rated');
  const upcomingMovies = movies.filter((m) => m.category === 'upcoming');

  return (
    <main>
      {/* Welcome Header Above HeroSection */}
      <div className="home-welcome-header">
        <h1 className="welcome-main-title">
          Welcome to <span className="gold-highlight">CineFlix</span>
        </h1>
        <p className="welcome-main-tagline">
          Discover trending blockbusters, explore movie details, and track your favorite films.
        </p>
      </div>

      <HeroSection />

      <div className="container">
        {/* Trending Movies */}
        <section className="section" style={{ padding: '20px 0' }}>
          <h2 className="section-title">Trending Movies</h2>
          <div className="movies-grid">
            {trendingMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                showWatchlistBtn={false}
              />
            ))}
          </div>
        </section>

        {/* Popular Movies */}
        <section className="section" style={{ padding: '20px 0' }}>
          <h2 className="section-title">Popular Movies</h2>
          <div className="movies-grid">
            {popularMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                showWatchlistBtn={false}
              />
            ))}
          </div>
        </section>

        {/* Top Rated Movies */}
        <section className="section" style={{ padding: '20px 0' }}>
          <h2 className="section-title">Top Rated Movies</h2>
          <div className="movies-grid">
            {topRatedMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                showWatchlistBtn={false}
              />
            ))}
          </div>
        </section>

        {/* Upcoming Movies */}
        <section className="section" style={{ padding: '20px 0' }}>
          <h2 className="section-title">Upcoming Movies</h2>
          <div className="movies-grid">
            {upcomingMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                showWatchlistBtn={false}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default HomePage;
