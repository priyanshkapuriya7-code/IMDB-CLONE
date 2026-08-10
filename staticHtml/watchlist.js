// CineFlix Watchlist Helper Script
(function() {
    const WATCHLIST_STORAGE_KEY = 'cineflix_watchlist';

    function getWatchlist() {
        try {
            return JSON.parse(localStorage.getItem(WATCHLIST_STORAGE_KEY)) || [];
        } catch(e) {
            return [];
        }
    }

    function saveWatchlist(list) {
        localStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(list));
    }

    window.toggleWatchlist = function(movie) {
        let list = getWatchlist();
        const index = list.findIndex(m => m.id === movie.id || m.title === movie.title);
        if (index > -1) {
            list.splice(index, 1);
            saveWatchlist(list);
            return false; // Removed
        } else {
            list.push(movie);
            saveWatchlist(list);
            return true; // Added
        }
    };

    window.isInWatchlist = function(idOrTitle) {
        const list = getWatchlist();
        return list.some(m => m.id === idOrTitle || m.title === idOrTitle);
    };

    document.addEventListener('DOMContentLoaded', () => {
        const watchlistContent = document.getElementById('watchlistContent');
        const clearBtn = document.getElementById('clearWatchlistBtn');

        if (watchlistContent) {
            function renderWatchlistPage() {
                const list = getWatchlist();
                if (list.length === 0) {
                    watchlistContent.innerHTML = `
                        <div style="text-align: center; padding: 60px 20px; color: #b0b0b0;">
                            <div style="font-size: 48px; margin-bottom: 15px;">🎬</div>
                            <h3 style="font-size: 22px; color: #fff; margin-bottom: 10px;">Your Watchlist is empty</h3>
                            <p style="margin-bottom: 20px;">Explore movies and click "Add to Watchlist" to save them here.</p>
                            <a href="index.html" class="btn btn-primary" style="display: inline-block; padding: 10px 24px; background: #f5c518; color: #000; font-weight: bold; text-decoration: none; border-radius: 6px;">Browse Movies</a>
                        </div>
                    `;
                    if (clearBtn) clearBtn.style.display = 'none';
                    return;
                }

                if (clearBtn) clearBtn.style.display = 'inline-block';
                watchlistContent.innerHTML = `
                    <div class="movies-grid">
                        ${list.map(movie => `
                            <div class="movie-card" style="position: relative;">
                                <a href="${movie.href || 'movie.html'}" style="text-decoration: none; color: inherit;">
                                    <img src="${movie.image}" alt="${movie.title}" class="movie-poster">
                                    <div class="movie-info">
                                        <div class="movie-name">${movie.title}</div>
                                        <div class="movie-rating">★ ${movie.rating || '9.0'}/10</div>
                                        <div class="movie-year">${movie.year || '2025'} • ${movie.genre || 'Movie'}</div>
                                    </div>
                                </a>
                                <button onclick="removeFromWatchlist('${movie.id || movie.title}')" style="position: absolute; top: 10px; right: 10px; background: rgba(0,0,0,0.8); color: #ff4d4d; border: 1px solid #ff4d4d; border-radius: 50%; width: 30px; height: 30px; cursor: pointer; font-weight: bold;">✕</button>
                            </div>
                        `).join('')}
                    </div>
                `;
            }

            window.removeFromWatchlist = function(idOrTitle) {
                let list = getWatchlist();
                list = list.filter(m => m.id !== idOrTitle && m.title !== idOrTitle);
                saveWatchlist(list);
                renderWatchlistPage();
            };

            if (clearBtn) {
                clearBtn.addEventListener('click', () => {
                    if (confirm('Are you sure you want to clear your watchlist?')) {
                        saveWatchlist([]);
                        renderWatchlistPage();
                    }
                });
            }

            renderWatchlistPage();
        }
    });
})();
