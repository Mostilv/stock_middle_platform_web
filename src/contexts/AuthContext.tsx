import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { message } from 'antd';
import { login as loginRequest } from '../api/auth';
import {
  AUTH_TOKEN_KEY,
  AUTH_USER_KEY,
  AuthContext,
  type AuthUser,
} from './auth-context';
import { useGlobalStore } from '../stores/globalStore';

const readStoredUser = (): AuthUser | null => {
  if (typeof window === 'undefined') return null;
  const stored = window.localStorage.getItem(AUTH_USER_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored) as AuthUser;
  } catch {
    return null;
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const user = useGlobalStore(state => state.user);
  const setUser = useGlobalStore(state => state.setUser);
  const [hydrated, setHydrated] = useState(false);
  const [loading, setLoading] = useState(false);
  const isAuthenticated = Boolean(user);

  useEffect(() => {
    if (hydrated) return;
    const storedUser = readStoredUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setHydrated(true);
  }, [hydrated, setUser]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hasToken = window.localStorage.getItem(AUTH_TOKEN_KEY);
    if (!hasToken && user) {
      setUser(null);
    }
  }, [user, setUser]);

  const login = useCallback(
    async (username: string, password: string) => {
      setLoading(true);
      try {
        const result = await loginRequest({ username, password });
        if (result?.token) {
          if (typeof window !== 'undefined') {
            window.localStorage.setItem(AUTH_TOKEN_KEY, result.token);
            window.localStorage.setItem(
              AUTH_USER_KEY,
              JSON.stringify(result.user || { username }),
            );
          }
          setUser(result.user || { username });
          message.success('ç™»å½•æˆåŠŸ');
          return true;
        }
        message.error('ç™»å½•å¤±è´¥ï¼Œè¯·é‡è¯•');
        return false;
      } catch (error) {
        const msg =
          error instanceof Error
            ? error.message
            : 'ç™»å½•å¤±è´¥ï¼Œè¯·æ£€æŸ¥è´¦å·ä¿¡æ?';
        message.error(msg);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [setUser],
  );

  const logout = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(AUTH_TOKEN_KEY);
      window.localStorage.removeItem(AUTH_USER_KEY);
    }
    setUser(null);
  }, [setUser]);

  const value = useMemo(
    () => ({
      isAuthenticated,
      user,
      loading,
      login,
      logout,
    }),
    [isAuthenticated, user, loading, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
