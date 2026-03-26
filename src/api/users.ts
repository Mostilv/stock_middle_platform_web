import { http } from './httpClient';

export interface User {
  id: number;
  username: string;
  email: string;
  full_name?: string;
  display_name?: string;
  avatar_url?: string;
  is_active: boolean;
  is_superuser: boolean;
  created_at: string;
  updated_at: string;
  isReal: boolean;
  remark?: string;
  roles?: string[];
  permissions?: string[];
  password?: string;
}

export interface UserQueryParams {
  skip?: number;
  limit?: number;
  [key: string]: any;
}

let usersMock: User[] = [
  { id: 1, username: 'admin', email: 'admin@example.com', full_name: '系统管理员', display_name: '策略管理员', avatar_url: 'https://api.dicebear.com/7.x/initials/svg?seed=Admin', is_active: true, is_superuser: true, created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z', isReal: true, remark: '系统默认管理员' },
  { id: 2, username: 'trader', email: 'trader@example.com', full_name: '交易员', display_name: '资深交易员', avatar_url: 'https://api.dicebear.com/7.x/initials/svg?seed=Trader', is_active: true, is_superuser: false, created_at: '2024-01-02T00:00:00Z', updated_at: '2024-01-02T00:00:00Z', isReal: true, remark: '量化交易员' },
];

export const fetchUsers = async (params?: UserQueryParams): Promise<User[]> => {
  if (import.meta.env.VITE_ENABLE_API_MOCK === 'true') {
    return [...usersMock];
  }
  return http.get<User[]>('/users', { query: params as Record<string, string | number> });
};

export const fetchUserById = async (id: number): Promise<User> => {
  if (import.meta.env.VITE_ENABLE_API_MOCK === 'true') {
    const user = usersMock.find((u) => u.id === id);
    if (!user) throw new Error('Not Found');
    return { ...user };
  }
  return http.get<User>(`/users/${id}`);
};

export const createUser = async (data: Partial<User>): Promise<User> => {
  if (import.meta.env.VITE_ENABLE_API_MOCK === 'true') {
    const nextId = usersMock.reduce((max, item) => Math.max(max, item.id), 0) + 1;
    const now = new Date().toISOString();
    const newUser: User = {
      id: nextId,
      username: data.username || `user-${nextId}`,
      email: data.email || `${data.username}@example.com`,
      full_name: data.full_name || '',
      display_name: data.display_name || data.username,
      avatar_url: data.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${data.username}`,
      is_active: data.is_active ?? true,
      is_superuser: data.is_superuser ?? false,
      created_at: now,
      updated_at: now,
      isReal: data.isReal ?? true,
      remark: data.remark || '',
    };
    usersMock.push(newUser);
    return { ...newUser };
  }
  return http.post<User, Partial<User>>('/users', data);
};

export const updateUser = async (id: number, data: Partial<User>): Promise<User> => {
  if (import.meta.env.VITE_ENABLE_API_MOCK === 'true') {
    const index = usersMock.findIndex((u) => u.id === id);
    if (index === -1) throw new Error('Not Found');
    usersMock[index] = { ...usersMock[index], ...data, updated_at: new Date().toISOString() };
    return { ...usersMock[index] };
  }
  return http.put<User, Partial<User>>(`/users/${id}`, data);
};

export const deleteUser = async (id: number): Promise<{ ok: boolean }> => {
  if (import.meta.env.VITE_ENABLE_API_MOCK === 'true') {
    usersMock = usersMock.filter((u) => u.id !== id);
    return { ok: true };
  }
  return http.delete<{ ok: boolean }>(`/users/${id}`);
};
