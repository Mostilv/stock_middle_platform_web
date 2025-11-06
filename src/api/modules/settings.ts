import { http } from '../httpClient';

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

export const fetchSettingsData = (): Promise<SettingsDataResponse> =>
  http.get<SettingsDataResponse>('/settings/data');

export const saveSettingsData = (
  payload: SettingsDataResponse,
): Promise<void> =>
  http.post<void, SettingsDataResponse>('/settings/data', payload);
