import type {
  EmailConfigDTO,
  NotificationTemplateDTO,
} from '../pages/Settings/services/settings.api';

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

export const MAX_EMAIL_CONFIGS = 3;

const DEFAULT_EMAIL_CONFIGS: EmailConfig[] = [
  {
    id: '1',
    email: 'admin@example.com',
    remark: '管理员邮箱',
    enabled: true,
  },
  {
    id: '2',
    email: 'trader@example.com',
    remark: '交易员邮箱',
    enabled: true,
  },
];

const DEFAULT_NOTIFICATION_TEMPLATE: NotificationTemplate = {
  id: 'tpl-default',
  name: '通知模板',
  subject: '投资组合调仓通知 - {{date}}',
  content: `策略名称：{{strategyName}}
委托时间：{{orderTime}}
股票|委托数量|委托类型|委托价格|操作|持仓
{{#orders}}{{stock}}|{{quantity}}|{{orderType}}|{{price}}|{{action}}|{{position}}
{{/orders}}`,
  enabled: true,
};

export const getDefaultEmailConfigs = (): EmailConfig[] =>
  DEFAULT_EMAIL_CONFIGS.map(config => ({ ...config }));

export const getDefaultNotificationTemplates = (): NotificationTemplate[] => [
  { ...DEFAULT_NOTIFICATION_TEMPLATE },
];

export const normalizeEmailConfigs = (
  configs?: EmailConfigDTO[] | EmailConfig[],
): EmailConfig[] => {
  if (!Array.isArray(configs) || configs.length === 0) {
    return getDefaultEmailConfigs();
  }
  return configs.map((config, index) => ({
    id: config.id || `email-${index + 1}`,
    email: config.email || '',
    remark: config.remark || '',
    enabled: typeof config.enabled === 'boolean' ? config.enabled : true,
  }));
};

export const normalizeNotificationTemplates = (
  templates?: NotificationTemplateDTO[] | NotificationTemplate[],
): NotificationTemplate[] => {
  if (!Array.isArray(templates) || templates.length === 0) {
    return getDefaultNotificationTemplates();
  }
  return templates.map((template, index) => ({
    id: template.id || `tpl-${index + 1}`,
    name: template.name || DEFAULT_NOTIFICATION_TEMPLATE.name,
    subject: template.subject || DEFAULT_NOTIFICATION_TEMPLATE.subject,
    content: template.content || DEFAULT_NOTIFICATION_TEMPLATE.content,
    enabled:
      typeof template.enabled === 'boolean'
        ? template.enabled
        : DEFAULT_NOTIFICATION_TEMPLATE.enabled,
  }));
};
