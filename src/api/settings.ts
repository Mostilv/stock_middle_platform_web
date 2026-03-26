import { http } from './httpClient';

export interface EmailConfig {
  id: string;
  email: string;
  remark: string;
  enabled: boolean;
}

export interface NotificationTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  enabled: boolean;
}

export interface SettingsData {
  emailConfigs: EmailConfig[];
  notificationTemplates: NotificationTemplate[];
}

let mockSettingsData: SettingsData = {
  emailConfigs: [
    { id: '1', email: 'admin@example.com', remark: '管理员邮箱', enabled: true },
    { id: '2', email: 'trader@example.com', remark: '交易员邮箱', enabled: true },
  ],
  notificationTemplates: [
    {
      id: '1',
      name: '通知模板',
      subject: '投资组合调仓通知 - {{date}}',
      content: '策略名称：{{strategyName}}\n委托时间：{{orderTime}}\n股票|委托数量|委托类型|委托价格|操作|持仓\n{{#orders}}{{stock}}|{{quantity}}|{{orderType}}|{{price}}|{{action}}|{{position}}\n{{/orders}}',
      enabled: true,
    },
  ],
};

export const fetchSettingsData = async (): Promise<SettingsData> => {
  if (import.meta.env.VITE_ENABLE_API_MOCK === 'true') {
    return JSON.parse(JSON.stringify(mockSettingsData));
  }
  return http.get<SettingsData>('/settings/data');
};

export const updateSettingsData = async (data: SettingsData): Promise<{ ok: boolean }> => {
  if (import.meta.env.VITE_ENABLE_API_MOCK === 'true') {
    mockSettingsData = JSON.parse(JSON.stringify(data));
    return { ok: true };
  }
  return http.post<{ ok: boolean }, SettingsData>('/settings/data', data);
};
