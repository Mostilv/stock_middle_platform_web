import { createContext } from 'react';

export type Locale = 'en-US' | 'zh-CN';

export interface LocaleContextValue {
  locale: Locale;
  setLocale: (next: Locale) => void;
}

export const DEFAULT_LOCALE: Locale = 'zh-CN';

export const LocaleContext = createContext<LocaleContextValue>({
  locale: DEFAULT_LOCALE,
  setLocale: () => {},
});
