import { useMemo } from 'react';

/**
 * useFavorites hook — manages favorite stories from history
 * Requires history array and updateHistory function from useHistory
 */
export function useFavorites(history, updateHistory) {
  const favorites = useMemo(() => {
    return history.slice().filter(h => h.is_favorite).reverse();
  }, [history]);

  const toggleFavorite = (id) => {
    const item = history.find(h => h.id === id);
    if (item) {
      updateHistory(id, { is_favorite: !item.is_favorite });
    }
  };

  const addToFavorites = (id) => {
    const item = history.find(h => h.id === id);
    if (item && !item.is_favorite) {
      updateHistory(id, { is_favorite: true });
    }
  };

  const removeFromFavorites = (id) => {
    const item = history.find(h => h.id === id);
    if (item && item.is_favorite) {
      updateHistory(id, { is_favorite: false });
    }
  };

  const clearFavorites = () => {
    if (window.confirm('Remove all favorites?')) {
      favorites.forEach(fav => {
        updateHistory(fav.id, { is_favorite: false });
      });
    }
  };

  const isFavorite = (id) => {
    return history.some(h => h.id === id && h.is_favorite);
  };

  return {
    favorites,
    toggleFavorite,
    addToFavorites,
    removeFromFavorites,
    clearFavorites,
    isFavorite,
    favoritesCount: favorites.length,
  };
}
