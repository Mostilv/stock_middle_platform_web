import { apiClient } from '../../../api/httpClient';

// 用户数据类型定义
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

// API 函数
export const fetchUsers = async (params?: UserListParams): Promise<User[]> => {
  const response = await apiClient.get<User[]>('/users', {
    query: params,
  });
  return response.data;
};

export const fetchUserById = async (userId: number): Promise<User> => {
  const response = await apiClient.get<User>(`/users/${userId}`);
  return response.data;
};

export const createUser = async (userData: UserCreate): Promise<User> => {
  const response = await apiClient.post<User>('/users', userData);
  return response.data;
};

export const updateUser = async (
  userId: number,
  userData: UserUpdate,
): Promise<User> => {
  const response = await apiClient.put<User>(`/users/${userId}`, userData);
  return response.data;
};

export const deleteUser = async (userId: number): Promise<void> => {
  await apiClient.delete(`/users/${userId}`);
};

// 角色管理相关API
export interface RolesUpdate {
  roles: string[];
}

export interface PermissionsUpdate {
  permissions: string[];
}

export const addUserRoles = async (
  userId: number,
  roles: string[],
): Promise<User> => {
  const response = await apiClient.post<User>(`/users/${userId}/roles`, {
    roles,
  });
  return response.data;
};

export const removeUserRoles = async (
  userId: number,
  roles: string[],
): Promise<User> => {
  const response = await apiClient.delete<User>(`/users/${userId}/roles`, {
    body: { roles },
  });
  return response.data;
};

export const addUserPermissions = async (
  userId: number,
  permissions: string[],
): Promise<User> => {
  const response = await apiClient.post<User>(`/users/${userId}/permissions`, {
    permissions,
  });
  return response.data;
};

export const removeUserPermissions = async (
  userId: number,
  permissions: string[],
): Promise<User> => {
  const response = await apiClient.delete<User>(
    `/users/${userId}/permissions`,
    { body: { permissions } },
  );
  return response.data;
};
