import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import {
  ThemeContext,
  type ThemeMode,
  THEME_STORAGE_KEY,
} from './theme-context';

const readStoredTheme = (): ThemeMode => {
  if (typeof window === 'undefined') return 'light';
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  return stored === 'dark' ? 'dark' : 'light';
};

export const AppThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [themeMode, setThemeModeState] = useState<ThemeMode>(() =>
    readStoredTheme(),
  );

  const persistTheme = useCallback((mode: ThemeMode) => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(THEME_STORAGE_KEY, mode);
  }, []);

  const setThemeMode = useCallback(
    (mode: ThemeMode) => {
      setThemeModeState(mode);
      persistTheme(mode);
    },
    [persistTheme],
  );

  const toggleTheme = useCallback(() => {
    setThemeModeState(prev => {
      const next = prev === 'light' ? 'dark' : 'light';
      persistTheme(next);
      return next;
    });
  }, [persistTheme]);

  useEffect(() => {
    persistTheme(themeMode);
  }, [persistTheme, themeMode]);

  const value = useMemo(
    () => ({
      themeMode,
      setThemeMode,
      toggleTheme,
    }),
    [themeMode, setThemeMode, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
