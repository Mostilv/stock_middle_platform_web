import { useContext } from 'react';
import { LocaleContext, type LocaleContextValue } from './locale-context';

export const useLocale = (): LocaleContextValue => useContext(LocaleContext);
