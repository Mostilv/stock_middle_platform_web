import { createContext } from 'react';

export type ThemeMode = 'light' | 'dark';

export interface ThemeContextValue {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

export const THEME_STORAGE_KEY = 'app_theme_mode';

export const ThemeContext = createContext<ThemeContextValue>({
  themeMode: 'light',
  setThemeMode: () => {},
  toggleTheme: () => {},
});
