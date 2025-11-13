import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

export type Locale = 'en-US' | 'zh-CN';

interface LocaleContextValue {
  locale: Locale;
  setLocale: (next: Locale) => void;
}

const DEFAULT_LOCALE: Locale = 'zh-CN';

const LocaleContext = createContext<LocaleContextValue>({
  locale: DEFAULT_LOCALE,
  setLocale: () => {},
});

const getStoredLocale = (): Locale => {
  if (typeof window === 'undefined') return DEFAULT_LOCALE;
  const stored = window.localStorage.getItem('locale');
  return stored === 'en-US' ? 'en-US' : DEFAULT_LOCALE;
};

export const LocaleProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [locale, setLocaleState] = useState<Locale>(() => getStoredLocale());

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('locale', next);
    }
  }, []);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
    }),
    [locale, setLocale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
};

export const useLocale = (): LocaleContextValue => useContext(LocaleContext);
