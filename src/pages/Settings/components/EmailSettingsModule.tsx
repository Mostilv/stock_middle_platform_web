import React, { useState } from 'react';
import {
  App as AntdApp,
  Alert,
  Button,
  Card,
  Col,
  Divider,
  Input,
  Popconfirm,
  Row,
  Space,
  Switch,
  Typography,
} from 'antd';
import {
  DeleteOutlined,
  MailOutlined,
  NotificationOutlined,
  PlusOutlined,
  ReloadOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';
import type { ThemeMode } from '../../../contexts/theme-context';
import {
  MAX_EMAIL_CONFIGS,
  type EmailConfig,
  type NotificationTemplate,
} from '../../../types/emailSettings';
import { SettingsCard } from '../Settings.styles';

const { Text } = Typography;

interface EmailSettingsModuleProps {
  isAuthenticated: boolean;
  themeMode: ThemeMode;
  emailConfigs: EmailConfig[];
  notificationTemplates: NotificationTemplate[];
  onAddEmail: () => void;
  onRemoveEmail: (id: string) => void;
  onUpdateEmail: (id: string, field: keyof EmailConfig, value: any) => void;
  onUpdateTemplate: (
    id: string,
    field: keyof NotificationTemplate,
    value: any,
  ) => void;
  onSave: () => void;
  onReset: () => void;
  loading?: boolean;
}

const SectionLabel = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: var(--app-text-primary);
  margin-bottom: 8px;
  display: flex;
  gap: 6px;
  align-items: center;
`;

const MutedCard = styled(Card)`
  margin-bottom: 12px;
  background: var(--app-surface-muted);
  border-color: var(--app-border-color);

  .ant-card-body {
    padding: 12px 16px;
  }
`;

const ModuleActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 12px;
`;

const PreviewCard = styled(Card)<{ $mode: ThemeMode }>`
  margin-top: 8px;
  white-space: pre-wrap;
  position: relative;
  border-radius: 8px;
  border: 1px solid var(--app-border-color);
  background: ${({ $mode }) =>
    $mode === 'dark' ? 'var(--app-surface-muted)' : 'var(--app-surface)'};
  color: var(--app-text-primary);
`;

const EmailSettingsModule: React.FC<EmailSettingsModuleProps> = ({
  isAuthenticated,
  themeMode,
  emailConfigs,
  notificationTemplates,
  onAddEmail,
  onRemoveEmail,
  onUpdateEmail,
  onUpdateTemplate,
  onSave,
  onReset,
  loading = false,
}) => {
  const { message } = AntdApp.useApp();
  const [previewContent, setPreviewContent] = useState<string>('');
  const accentColor = themeMode === 'dark' ? '#93c5fd' : '#2563eb';

  const renderTemplate = (tpl: string, data: any): string => {
    if (!tpl) return '';
    let output = tpl;
    output = output.replace(
      /\{\{#(\w+)\}\}([\s\S]*?)\{\{\/(\w+)\}\}/g,
      (_m, key, block, endKey) => {
        if (key !== endKey) return '';
        const arr = data[key];
        if (!Array.isArray(arr)) return '';
        return arr
          .map((item: any) =>
            block.replace(/\{\{(\w+)\}\}/g, (_m2: string, k: string) => {
              const v = item[k];
              return v === undefined || v === null ? '' : String(v);
            }),
          )
          .join('');
      },
    );
    output = output.replace(/\{\{(\w+)\}\}/g, (_m, k) => {
      const v = data[k];
      return v === undefined || v === null ? '' : String(v);
    });
    return output;
  };

  const samplePreviewData = {
    date: '2025-08-28',
    strategyName: '趋势增强策略',
    orderTime: '09:35:20',
    orders: [
      {
        stock: '招商银行',
        quantity: 2000,
        orderType: '限价',
        price: 33.58,
        action: '买入',
        position: '20%',
      },
      {
        stock: '中兴通讯',
        quantity: 1500,
        orderType: '市价',
        price: 28.4,
        action: '卖出',
        position: '10%',
      },
      {
        stock: '宁德时代',
        quantity: 500,
        orderType: '限价',
        price: 176.3,
        action: '买入',
        position: '15%',
      },
    ],
  };

  const handlePreviewTemplate = () => {
    const tpl = notificationTemplates[0]?.content || '';
    setPreviewContent(renderTemplate(tpl, samplePreviewData));
  };

  const handleTogglePreview = () => {
    if (previewContent) {
      setPreviewContent('');
    } else {
      handlePreviewTemplate();
    }
  };

  const handleTestSendEmail = () => {
    const key = 'test-mail';
    const subjectTpl = notificationTemplates[0]?.subject || '';
    const contentTpl = notificationTemplates[0]?.content || '';
    const renderedSubject = renderTemplate(subjectTpl, samplePreviewData);
    const renderedContent = renderTemplate(contentTpl, samplePreviewData);

    message.loading({ content: '正在发送测试邮件...', key });
    setTimeout(() => {
      console.log('测试邮件主题:', renderedSubject);
      console.log('测试邮件内容:', renderedContent);
      console.log(
        '收件人(启用):',
        emailConfigs.filter(e => e.enabled).map(e => e.email),
      );
      message.success({ content: '测试邮件已发送（模拟）', key, duration: 2 });
    }, 800);
  };

  return (
    <SettingsCard>
      <Card
        title={
          <Space>
            <MailOutlined style={{ color: accentColor }} />
            <span>通知与邮箱</span>
          </Space>
        }
      >
        {!isAuthenticated ? (
          <Alert
            type='info'
            showIcon
            message='请先登录后再配置调仓通知邮箱'
            description='邮箱配置与模板会跟随账号单独保存，请登录后查看或修改。'
          />
        ) : (
          <>
            <Divider orientation='left'>邮箱配置</Divider>
            <Text
              type='secondary'
              style={{ display: 'block', marginBottom: 12 }}
            >
              每个账号最多可设置{MAX_EMAIL_CONFIGS}个通知邮箱
            </Text>

            {emailConfigs.map(config => (
              <MutedCard key={config.id} size='small'>
                <Row gutter={16} align='middle'>
                  <Col span={8}>
                    <SectionLabel>
                      <MailOutlined style={{ color: accentColor }} />
                      <span>邮箱地址</span>
                    </SectionLabel>
                    <Input
                      placeholder='请输入邮箱地址'
                      value={config.email}
                      onChange={e =>
                        onUpdateEmail(config.id, 'email', e.target.value)
                      }
                      prefix={<MailOutlined />}
                    />
                  </Col>
                  <Col span={8}>
                    <SectionLabel>
                      <span style={{ color: accentColor }}>✎</span>
                      <span>邮箱备注</span>
                    </SectionLabel>
                    <Input
                      placeholder='请输入备注'
                      value={config.remark}
                      onChange={e =>
                        onUpdateEmail(config.id, 'remark', e.target.value)
                      }
                    />
                  </Col>
                  <Col span={4}>
                    <SectionLabel>
                      <span style={{ color: accentColor }}>●</span>
                      <span>启用状态</span>
                    </SectionLabel>
                    <Switch
                      checked={config.enabled}
                      onChange={checked =>
                        onUpdateEmail(config.id, 'enabled', checked)
                      }
                    />
                  </Col>
                  <Col span={4}>
                    <Popconfirm
                      title='确定要删除这个邮箱配置吗？'
                      onConfirm={() => onRemoveEmail(config.id)}
                      okText='确定'
                      cancelText='取消'
                    >
                      <Button
                        type='text'
                        danger
                        icon={<DeleteOutlined />}
                        disabled={emailConfigs.length <= 1}
                      >
                        删除
                      </Button>
                    </Popconfirm>
                  </Col>
                </Row>
              </MutedCard>
            ))}

            <Button
              type='dashed'
              icon={<PlusOutlined />}
              onClick={onAddEmail}
              style={{ width: '100%' }}
              disabled={emailConfigs.length >= MAX_EMAIL_CONFIGS}
            >
              {emailConfigs.length >= MAX_EMAIL_CONFIGS
                ? '已达到上限'
                : '添加邮箱配置'}
            </Button>

            <Divider orientation='left' style={{ marginTop: 24 }}>
              通知模板
            </Divider>

            {notificationTemplates.slice(0, 1).map(template => (
              <MutedCard key={template.id} size='small'>
                <Row gutter={16}>
                  <Col span={24}>
                    <SectionLabel>
                      <NotificationOutlined style={{ color: accentColor }} />
                      <span>模板名称</span>
                    </SectionLabel>
                    <Input
                      placeholder='请输入模板名称'
                      value={template.name}
                      onChange={e =>
                        onUpdateTemplate(template.id, 'name', e.target.value)
                      }
                    />
                  </Col>
                </Row>
                <Row gutter={16} style={{ marginTop: 12 }}>
                    <Col span={24}>
                      <SectionLabel>
                        <span style={{ color: accentColor }}>✉</span>
                        <span>邮件主题</span>
                      </SectionLabel>
                      <Input
                        placeholder='请输入邮件主题'
                        value={template.subject}
                        onChange={e =>
                          onUpdateTemplate(template.id, 'subject', e.target.value)
                        }
                      />
                    </Col>
                  </Row>
                  <Row gutter={16} style={{ marginTop: 12 }}>
                    <Col span={24}>
                    <SectionLabel>
                      <span style={{ color: accentColor }}>≡</span>
                      <span>邮件内容</span>
                      <Text type='secondary' style={{ fontSize: '12px' }}>
                        支持变量：{'{{date}}'} {'{{strategyName}}'}{' '}
                        {'{{orderTime}}'}；数组块：
                        {'{{#orders}}...{{/orders}}'}，行内变量：{'{{stock}}'}{' '}
                        {'{{quantity}}'} {'{{orderType}}'} {'{{price}}'}{' '}
                        {'{{action}}'} {'{{position}}'}
                      </Text>
                    </SectionLabel>
                    <Input.TextArea
                      rows={8}
                      placeholder='请输入邮件内容'
                      value={template.content}
                      onChange={e =>
                        onUpdateTemplate(template.id, 'content', e.target.value)
                      }
                    />
                    <div style={{ marginTop: 8 }}>
                      <Space>
                        <Button onClick={handleTogglePreview}>
                          {previewContent ? '关闭预览' : '预览模板'}
                        </Button>
                        <Button type='primary' onClick={handleTestSendEmail}>
                          测试发送邮件
                        </Button>
                        <Text type='secondary'>
                          使用示例数据渲染含多只股票的表格
                        </Text>
                      </Space>
                      {previewContent && (
                        <PreviewCard size='small' $mode={themeMode}>
                          <div
                            style={{
                              position: 'absolute',
                              right: 8,
                              top: 6,
                            }}
                          >
                            <Button
                              type='link'
                              size='small'
                              onClick={() => setPreviewContent('')}
                              style={{ color: '#93c5fd' }}
                            >
                              关闭
                            </Button>
                          </div>
                          {previewContent}
                        </PreviewCard>
                      )}
                    </div>
                  </Col>
                </Row>
              </MutedCard>
            ))}

            <ModuleActions>
              <Button
                icon={<ReloadOutlined />}
                onClick={onReset}
                disabled={loading}
              >
                重置
              </Button>
              <Button
                type='primary'
                icon={<SaveOutlined />}
                onClick={onSave}
                loading={loading}
              >
                保存邮箱设置
              </Button>
            </ModuleActions>
          </>
        )}
      </Card>
    </SettingsCard>
  );
};

export default EmailSettingsModule;
