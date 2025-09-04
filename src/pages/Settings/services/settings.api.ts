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

export async function fetchSettingsData(): Promise<SettingsDataResponse> {
  const { data } = await apiClient.get<SettingsDataResponse>('/settings/data');
  return data;
}

export async function saveSettingsData(payload: SettingsDataResponse): Promise<void> {
  await apiClient.post<void, SettingsDataResponse>('/settings/data', payload);
}


