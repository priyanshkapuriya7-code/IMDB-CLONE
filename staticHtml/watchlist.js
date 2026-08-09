(function () {
  const STORAGE_KEY = 'cineflix_watchlist';

  function getWatchlist() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  function saveWatchlist(list) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      updateNavCount();
      updateAllButtonsState();
      renderWatchlistPage();
    } catch (e) {
      console.error(e);
    }
  }

  function showToast(message, isAdded) {
    let toast = document.getElementById('cineflix-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'cineflix-toast';
      toast.style.cssText = `
        position: fixed;
        top: 25px;
        right: 25px;
        background: #1a2332;
        color: #fff;
        border: 2px solid #f5c518;
        padding: 12px 24px;
        border-radius: 8px;
        font-weight: bold;
        font-size: 14px;
        box-shadow: 0 8px 25px rgba(0,0,0,0.7);
        z-index: 9999;
        transition: all 0.3s ease;
        opacity: 0;
        transform: translateY(-20px);
        display: flex;
        align-items: center;
        gap: 10px;
      `;
      document.body.appendChild(toast);
    }

    toast.innerHTML = isAdded
      ? `<span style="color:#f5c518; font-size:18px;">✓</span> ${message}`
      : `<span style="color:#ff4d4d; font-size:18px;">✕</span> ${message}`;

    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';

    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-20px)';
    }, 2800);
  }

  function updateNavCount() {
    const list = getWatchlist();
    const count = list.length;
    const navWatchlistLinks = document.querySelectorAll('nav a[href*="watchlist"]');
    navWatchlistLinks.forEach(link => {
      link.textContent = count > 0 ? `Watchlist (${count})` : 'Watchlist';
      if (link.getAttribute('href') === '#watchlist') {
        link.setAttribute('href', 'watchlist.html');
      }
    });
  }

  function isMovieInWatchlist(title) {
    if (!title) return false;
    const list = getWatchlist();
    return list.some(m => m.title.toLowerCase().trim() === title.toLowerCase().trim());
  }

  function toggleMovieInWatchlist(movieData) {
    let list = getWatchlist();
    const index = list.findIndex(m => m.title.toLowerCase().trim() === movieData.title.toLowerCase().trim());

    if (index > -1) {
      list.splice(index, 1);
      showToast(`Removed "${movieData.title}" from Watchlist`, false);
    } else {
      list.push(movieData);
      showToast(`Added "${movieData.title}" to Watchlist!`, true);
    }

    saveWatchlist(list);
  }

  function getMovieDataFromButton(btn) {
    const listItem = btn.closest('.movie-list-item');
    if (listItem) {
      const title = listItem.querySelector('.movie-list-title, .movie-name')?.textContent.trim() || 'Movie';
      const img = listItem.querySelector('.movie-list-img, .movie-poster')?.src || '';
      const rating = listItem.querySelector('.rating-number, .movie-rating')?.textContent.trim() || '';
      const href = listItem.querySelector('a')?.href || window.location.href;
      return { title, img, rating, href };
    }

    const card = btn.closest('.movie-card');
    if (card) {
      const title = card.querySelector('.movie-name, .movie-list-title')?.textContent.trim() || 'Movie';
      const img = card.querySelector('.movie-poster, .movie-list-img')?.src || '';
      const rating = card.querySelector('.movie-rating, .rating-number')?.textContent.trim() || '';
      const href = card.getAttribute('href') || card.querySelector('a')?.href || window.location.href;
      return { title, img, rating, href };
    }

    const title = document.querySelector('.movie-title, h1')?.textContent.trim() ||
                  document.title.split('-')[0].trim();
    const img = document.querySelector('.movie-detail-poster, .movie-header img, .movie-poster')?.src || '';
    const rating = document.querySelector('.rating-number, .rating-badge, .rating')?.textContent.trim() || '';
    const href = window.location.href;

    return { title, img, rating, href };
  }

  function updateAllButtonsState() {
    const buttons = document.querySelectorAll('.btn-secondary, button');
    buttons.forEach(btn => {
      if (btn.textContent.includes('Watchlist') && !btn.classList.contains('remove-watchlist-item-btn') && btn.id !== 'clearWatchlistBtn') {
        const movieData = getMovieDataFromButton(btn);

        if (isMovieInWatchlist(movieData.title)) {
          btn.textContent = '✓ In Watchlist';
          btn.classList.add('active');
        } else {
          btn.textContent = '♡ Add to Watchlist';
          btn.classList.remove('active');
        }
      }
    });
  }

  function renderWatchlistPage() {
    const container = document.getElementById('watchlistContent');
    const clearBtn = document.getElementById('clearWatchlistBtn');
    if (!container) return;

    const list = getWatchlist();

    if (list.length === 0) {
      if (clearBtn) clearBtn.style.display = 'none';
      container.innerHTML = `
        <div style="text-align: center; padding: 80px 20px; color: #b0b0b0;">
          <div style="font-size: 54px; margin-bottom: 15px; color: #f5c518;">♡</div>
          <h3 style="font-size: 24px; color: #fff; margin-bottom: 12px;">Your Watchlist is Empty</h3>
          <p style="margin-bottom: 25px; font-size: 15px; color: #888;">Explore our collection of movies and click "Add to Watchlist" to save them here.</p>
          <a href="movie.html" class="btn btn-primary" style="display: inline-block; padding: 12px 28px; text-decoration: none; font-size: 14px;">Browse Movies</a>
        </div>
      `;
      return;
    }

    if (clearBtn) {
      clearBtn.style.display = 'inline-block';
      clearBtn.onclick = function () {
        if (confirm('Are you sure you want to clear your entire watchlist?')) {
          localStorage.removeItem(STORAGE_KEY);
          updateNavCount();
          updateAllButtonsState();
          renderWatchlistPage();
          showToast('Watchlist cleared', false);
        }
      };
    }

    let html = '<div class="movie-list">';
    list.forEach((movie, index) => {
      html += `
        <div class="movie-list-item">
          <a href="${movie.href || 'movie.html'}">
            <img src="${movie.img}" alt="${movie.title}" class="movie-list-img" />
          </a>
          <div class="movie-list-details">
            <a href="${movie.href || 'movie.html'}">
              <div class="movie-list-title">${movie.title}</div>
            </a>
            ${movie.rating ? `<div class="movie-list-rating">${movie.rating}</div>` : ''}
            <div class="action-buttons" style="margin-top: 15px;">
              <a href="${movie.href || 'movie.html'}" class="btn btn-primary">▶ Watch Now</a>
              <button type="button" class="btn btn-secondary remove-watchlist-item-btn" data-index="${index}" style="background: #2a3a4a; color: #ff4d4d; border-color: #ff4d4d;">
                ✕ Remove
              </button>
            </div>
          </div>
        </div>
      `;
    });
    html += '</div>';

    container.innerHTML = html;

    container.querySelectorAll('.remove-watchlist-item-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const idx = parseInt(this.getAttribute('data-index'), 10);
        const removedItem = list[idx];
        list.splice(idx, 1);
        saveWatchlist(list);
        if (removedItem) {
          showToast(`Removed "${removedItem.title}" from Watchlist`, false);
        }
      });
    });
  }

  function initWatchlistButtons() {
    updateNavCount();
    updateAllButtonsState();
    renderWatchlistPage();

    const buttons = document.querySelectorAll('.btn-secondary, button');
    buttons.forEach(btn => {
      if (btn.textContent.includes('Watchlist') && !btn.classList.contains('remove-watchlist-item-btn') && btn.id !== 'clearWatchlistBtn') {
        if (btn._hasWatchlistListener) return;
        btn._hasWatchlistListener = true;

        btn.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          const currentData = getMovieDataFromButton(btn);
          toggleMovieInWatchlist(currentData);
        });
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWatchlistButtons);
  } else {
    initWatchlistButtons();
  }
})();
