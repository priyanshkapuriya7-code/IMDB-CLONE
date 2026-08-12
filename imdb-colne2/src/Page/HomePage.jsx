import HeroSection from '../Components/HeroSection';
import MovieCard from '../Components/MovieCard';
import { moviesData } from '../data/movies';
import '../styles/HomePage.css';

function HomePage() {
  const trendingMovies = moviesData.filter((m) => m.category === 'trending');
  const popularMovies = moviesData.filter((m) => m.category === 'popular');
  const topRatedMovies = moviesData.filter((m) => m.category === 'top-rated');
  const upcomingMovies = moviesData.filter((m) => m.category === 'upcoming');

  return (
    <main>
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
        <section className="section">
          <h2 className="section-title">Trending Movies</h2>
          <div className="movies-grid">
            {trendingMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>

        <section className="section">
          <h2 className="section-title">Popular Movies</h2>
          <div className="movies-grid">
            {popularMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>

        <section className="section">
          <h2 className="section-title">Top Rated Movies</h2>
          <div className="movies-grid">
            {topRatedMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>

        <section className="section">
          <h2 className="section-title">Upcoming Movies</h2>
          <div className="movies-grid">
            {upcomingMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default HomePage;
