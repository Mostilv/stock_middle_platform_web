import { createContext } from 'react';

export interface AuthUser {
  username: string;
  role?: string;
}

export interface AuthContextValue {
  isAuthenticated: boolean;
  user: AuthUser | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const AUTH_TOKEN_KEY = 'auth_token';
export const AUTH_USER_KEY = 'auth_user';

export const AuthContext = createContext<AuthContextValue>({
  isAuthenticated: false,
  user: null,
  loading: false,
  login: async () => false,
  logout: () => {},
});
