import { http } from './httpClient';

export interface UserProfile {
  username: string;
  email: string;
  role: string;
  display_name: string;
  avatar_url: string;
}

export interface AuthResponse {
  token: string;
  user: UserProfile;
}

export interface LoginCredentials {
  username: string;
  password?: string;
}

let currentProfileMock: UserProfile = {
  username: 'admin',
  email: 'admin@example.com',
  role: 'admin',
  display_name: '策略管理员',
  avatar_url: 'https://api.dicebear.com/7.x/initials/svg?seed=Admin',
};

const mockAuthUsers: Record<string, { password: string; role: string; profile: UserProfile }> = {
  admin: {
    password: '123456',
    role: 'admin',
    profile: { username: 'admin', email: 'admin@example.com', role: 'admin', display_name: '策略管理员', avatar_url: 'https://api.dicebear.com/7.x/initials/svg?seed=Admin' },
  },
  trader: {
    password: '123456',
    role: 'trader',
    profile: { username: 'trader', email: 'trader@example.com', role: 'trader', display_name: '资深交易员', avatar_url: 'https://api.dicebear.com/7.x/initials/svg?seed=Trader' },
  },
};

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  if (import.meta.env.VITE_ENABLE_API_MOCK === 'true') {
    const matched = mockAuthUsers[credentials.username];
    if (matched && credentials.password === matched.password) {
      currentProfileMock = { ...matched.profile };
      return {
        token: `mock-token-${credentials.username}`,
        user: matched.profile,
      };
    }
    throw new Error('invalid credentials');
  }
  const response = await http.post<{ token: string; user: any }, LoginCredentials>('/auth/login', credentials);
  return {
    token: response.token,
    user: {
      username: response.user.username,
      email: response.user.email,
      role: response.user.role,
      display_name: response.user.displayName,
      avatar_url: response.user.avatarUrl,
    },
  };
};

export const fetchProfile = async (): Promise<UserProfile> => {
  if (import.meta.env.VITE_ENABLE_API_MOCK === 'true') {
    return { ...currentProfileMock };
  }
  const data = await http.get<any>('/account/profile');
  return {
    username: data.username,
    email: data.email,
    role: data.role,
    display_name: data.display_name || data.displayName,
    avatar_url: data.avatar_url || data.avatarUrl,
  };
};

export const updateProfile = async (data: Partial<UserProfile>): Promise<UserProfile> => {
  if (import.meta.env.VITE_ENABLE_API_MOCK === 'true') {
    currentProfileMock = { ...currentProfileMock, ...data };
    return { ...currentProfileMock };
  }
  return http.put<UserProfile, Partial<UserProfile>>('/account/profile', data);
};

export const updatePassword = async (data: any): Promise<{ ok: boolean }> => {
  if (import.meta.env.VITE_ENABLE_API_MOCK === 'true') {
    return { ok: true };
  }
  return http.post<{ ok: boolean }, any>('/account/password', data);
};
