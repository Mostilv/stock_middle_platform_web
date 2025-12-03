import { apiClient } from '../../../api';

export interface EmailConfigDTO {
  id: string;
  email: string;
  remark: string;
  enabled: boolean;
}

export interface NotificationTemplateDTO {
  id: string;
  name: string;
  subject: string;
  content: string;
  enabled: boolean;
}

export interface SettingsDataResponse {
  emailConfigs: EmailConfigDTO[];
  notificationTemplates: NotificationTemplateDTO[];
}

export interface AccountProfileResponse {
  username: string;
  email?: string;
  role?: string;
  display_name?: string;
  avatar_url?: string;
}

export interface AccountProfilePayload {
  displayName: string;
  avatarUrl?: string;
}

export interface PasswordChangePayload {
  currentPassword: string;
  newPassword: string;
}

export async function fetchSettingsData(): Promise<SettingsDataResponse> {
  const { data } = await apiClient.get<SettingsDataResponse>('/settings/data');
  return data;
}

export async function saveSettingsData(
  payload: SettingsDataResponse,
): Promise<void> {
  await apiClient.post<void, SettingsDataResponse>('/settings/data', payload);
}

export async function fetchAccountProfile(): Promise<AccountProfileResponse> {
  const { data } = await apiClient.get<AccountProfileResponse>(
    '/account/profile',
  );
  return data;
}

export async function updateAccountProfile(
  payload: AccountProfilePayload,
): Promise<AccountProfileResponse> {
  const body = {
    display_name: payload.displayName,
    avatar_url: payload.avatarUrl,
  };
  const { data } = await apiClient.put<
    AccountProfileResponse,
    typeof body
  >('/account/profile', body);
  return data;
}

export async function changeAccountPassword(
  payload: PasswordChangePayload,
): Promise<void> {
  await apiClient.post<void, PasswordChangePayload>(
    '/account/password',
    payload,
  );
}
