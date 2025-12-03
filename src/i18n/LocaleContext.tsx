import React, { useCallback, useMemo, useState } from 'react';
import { DEFAULT_LOCALE, LocaleContext, type Locale } from './locale-context';

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

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
};
