import { http } from '../httpClient';

export interface User {
  id: number;
  username: string;
  email: string;
  full_name?: string;
  is_active: boolean;
  is_superuser: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserCreate {
  username: string;
  email: string;
  password: string;
  full_name?: string;
}

export interface UserUpdate {
  username?: string;
  email?: string;
  full_name?: string;
  is_active?: boolean;
  is_superuser?: boolean;
}

export interface UserListParams {
  skip?: number;
  limit?: number;
  [key: string]: string | number | boolean | undefined | null;
}

export interface RolesUpdate {
  roles: string[];
}

export interface PermissionsUpdate {
  permissions: string[];
}

export const fetchUsers = (params?: UserListParams): Promise<User[]> =>
  http.get<User[]>('/users', {
    query: params,
  });

export const fetchUserById = (userId: number): Promise<User> =>
  http.get<User>(`/users/${userId}`);

export const createUser = (userData: UserCreate): Promise<User> =>
  http.post<User, UserCreate>('/users', userData);

export const updateUser = (userId: number, userData: UserUpdate): Promise<User> =>
  http.put<User, UserUpdate>(`/users/${userId}`, userData);

export const deleteUser = (userId: number): Promise<void> =>
  http.delete<void>(`/users/${userId}`);

export const addUserRoles = (userId: number, roles: string[]): Promise<User> =>
  http.post<User>(`/users/${userId}/roles`, { roles });

export const removeUserRoles = (userId: number, roles: string[]): Promise<User> =>
  http.delete<User, { roles: string[] }>(`/users/${userId}/roles`, {
    data: { roles },
  });

export const addUserPermissions = (userId: number, permissions: string[]): Promise<User> =>
  http.post<User>(`/users/${userId}/permissions`, { permissions });

export const removeUserPermissions = (userId: number, permissions: string[]): Promise<User> =>
  http.delete<User, { permissions: string[] }>(`/users/${userId}/permissions`, {
    data: { permissions },
  });
