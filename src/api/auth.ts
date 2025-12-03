import { http } from './httpClient';

export interface LoginRequestBody {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    username: string;
    role?: string;
  };
}

export const login = (body: LoginRequestBody): Promise<LoginResponse> =>
  http.post<LoginResponse, LoginRequestBody>('/auth/login', body);
