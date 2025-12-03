import { createContext } from 'react';
import type { StrategySubscriptionPreference } from '../types/subscription';

export interface AuthUser {
  username: string;
  role?: string;
  email?: string;
  displayName?: string;
  avatarUrl?: string;
  subscriptions?: StrategySubscriptionPreference[];
}

export interface AuthContextValue {
  isAuthenticated: boolean;
  user: AuthUser | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<AuthUser>) => void;
}

export const AUTH_TOKEN_KEY = 'auth_token';
export const AUTH_USER_KEY = 'auth_user';

export const AuthContext = createContext<AuthContextValue>({
  isAuthenticated: false,
  user: null,
  loading: false,
  login: async () => false,
  logout: () => {},
  updateUser: () => {},
});
