/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';
import { moviesData } from '../data/movies';

const WatchlistContext = createContext();

export function WatchlistProvider({ children }) {
  const [movies] = useState(moviesData);
  const [watchlist, setWatchlist] = useState(() => {
    try {
      const saved = localStorage.getItem('imdb_watchlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [toast, setToast] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('imdb_watchlist', JSON.stringify(watchlist));
    } catch {
      console.error('Failed to save watchlist to localStorage');
    }
  }, [watchlist]);

  const showToastNotification = (message, isAdded = true) => {
    setToast({ message, isAdded });
    setTimeout(() => {
      setToast(null);
    }, 2800);
  };

  const toggleWatchlist = (movie) => {
    setWatchlist((prev) => {
      const exists = prev.some((m) => m.id === movie.id);
      if (exists) {
        showToastNotification(`Removed "${movie.title}" from Watchlist`, false);
        return prev.filter((m) => m.id !== movie.id);
      } else {
        showToastNotification(`Added "${movie.title}" to Watchlist!`, true);
        return [...prev, movie];
      }
    });
  };

  const clearWatchlist = () => {
    setWatchlist([]);
    showToastNotification('Watchlist cleared', false);
  };

  const isMovieInWatchlist = (id) => watchlist.some((m) => m.id === id);

  return (
    <WatchlistContext.Provider
      value={{
        movies,
        watchlist,
        toggleWatchlist,
        clearWatchlist,
        isMovieInWatchlist,
      }}
    >
      {children}
      {toast && (
        <div
          style={{
            position: 'fixed',
            top: '25px',
            right: '25px',
            backgroundColor: '#1a2332',
            color: '#ffffff',
            border: '2px solid #f5c518',
            padding: '12px 24px',
            borderRadius: '8px',
            fontWeight: 'bold',
            fontSize: '14px',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.7)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <span style={{ color: toast.isAdded ? '#f5c518' : '#ff4d4d', fontSize: '18px' }}>
            {toast.isAdded ? '✓' : '✕'}
          </span>
          {toast.message}
        </div>
      )}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error('useWatchlist must be used within a WatchlistProvider');
  }
  return context;
}
