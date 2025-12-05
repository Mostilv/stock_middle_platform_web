import { http } from './httpClient';
import type { EmailConfig, NotificationTemplate } from '../types/emailSettings';

export interface LoginRequestBody {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    username: string;
    role?: string;
    email?: string;
    displayName?: string;
    avatarUrl?: string;
    emailConfigs?: EmailConfig[];
    notificationTemplates?: NotificationTemplate[];
  };
}

export const login = (body: LoginRequestBody): Promise<LoginResponse> =>
  http.post<LoginResponse, LoginRequestBody>('/auth/login', body);
