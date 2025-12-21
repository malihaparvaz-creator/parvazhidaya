import { useState, useEffect, useMemo } from 'react';

/**
 * useHistory hook — manages per-user story history
 * Stores and retrieves stories from localStorage with user isolation
 */
export function useHistory(userId) {
  const LS_KEY = `parvaz_hidaya_history_v2_${userId}`;

  const [history, setHistory] = useState(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.error('Failed to load history:', e);
      return [];
    }
  });

  // Sync history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(history));
  }, [history, LS_KEY]);

  const addToHistory = (item) => {
    setHistory(prev => [...prev, item]);
  };

  const updateHistory = (id, updates) => {
    setHistory(prev =>
      prev.map(it => (it.id === id ? { ...it, ...updates } : it))
    );
  };

  const deleteFromHistory = (id) => {
    setHistory(prev => prev.filter(it => it.id !== id));
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const getHistoryStats = useMemo(() => {
    return {
      totalCount: history.length,
      oldestDate: history.length > 0 ? new Date(history[0].created_date) : null,
      newestDate: history.length > 0 ? new Date(history[history.length - 1].created_date) : null,
    };
  }, [history]);

  return {
    history,
    addToHistory,
    updateHistory,
    deleteFromHistory,
    clearHistory,
    getHistoryStats,
  };
}
