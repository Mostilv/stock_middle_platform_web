import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { App as AntdApp } from 'antd';
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
  const { message } = AntdApp.useApp();
  const user = useGlobalStore(state => state.user);
  const setUser = useGlobalStore(state => state.setUser);
  const [hydrated, setHydrated] = useState(false);
  const [loading, setLoading] = useState(false);
  const isAuthenticated = Boolean(user);

  const persistUser = useCallback((nextUser: AuthUser | null) => {
    if (typeof window === 'undefined') return;
    if (nextUser) {
      window.localStorage.setItem(AUTH_USER_KEY, JSON.stringify(nextUser));
    } else {
      window.localStorage.removeItem(AUTH_USER_KEY);
    }
  }, []);

  const applyUser = useCallback(
    (nextUser: AuthUser | null) => {
      setUser(nextUser);
      persistUser(nextUser);
    },
    [persistUser, setUser],
  );

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
          }
          applyUser(result.user || { username });
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
    [applyUser],
  );

  const logout = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(AUTH_TOKEN_KEY);
    }
    applyUser(null);
  }, [applyUser]);

  const updateUser = useCallback(
    (updates: Partial<AuthUser>) => {
      if (!user) return;
      const nextUser: AuthUser = {
        ...user,
        ...updates,
      };
      applyUser(nextUser);
    },
    [applyUser, user],
  );

  const value = useMemo(
    () => ({
      isAuthenticated,
      user,
      loading,
      login,
      logout,
      updateUser,
    }),
    [isAuthenticated, user, loading, login, logout, updateUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
