import React, { useState } from 'react';
import {
  Card,
  Form,
  Input,
  Button,
  Switch,
  Select,
  message,
  Row,
  Col,
  Space,
  Divider,
  Popconfirm,
  Tabs,
  Typography,
} from 'antd';
import {
  SaveOutlined,
  ReloadOutlined,
  SettingOutlined,
  PlusOutlined,
  DeleteOutlined,
  MailOutlined,
  NotificationOutlined,
  GlobalOutlined,
} from '@ant-design/icons';
import {
  SettingsContainer,
  SettingsHeader,
  SettingsCard,
  SettingsForm,
  SettingsActions,
  CardIcon,
} from './Settings.styles';

const { Option } = Select;
const { Text } = Typography;

interface EmailConfig {
  id: string;
  email: string;
  remark: string;
  enabled: boolean;
}

interface NotificationTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  enabled: boolean;
}

const Settings: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [emailConfigs, setEmailConfigs] = useState<EmailConfig[]>([
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
  ]);

  const [notificationTemplates, setNotificationTemplates] = useState<NotificationTemplate[]>([
    {
      id: '1',
      name: '调仓通知模板',
      subject: '投资组合调仓通知 - {date}',
      content: `尊敬的用户：

您的投资组合已进行调仓操作。

调仓详情：
- 调仓时间：{time}
- 调仓股票：{stocks}
- 调仓金额：{amount}
- 调仓原因：{reason}

如有疑问，请联系客服。

祝投资顺利！`,
      enabled: true,
    },
    {
      id: '2',
      name: '风险预警模板',
      subject: '投资风险预警通知 - {date}',
      content: `尊敬的用户：

检测到您的投资组合存在风险，请注意：

风险详情：
- 风险类型：{riskType}
- 风险等级：{riskLevel}
- 影响股票：{stocks}
- 建议操作：{suggestion}

请及时关注并采取相应措施。

祝投资顺利！`,
      enabled: true,
    },
  ]);

  const onFinish = (values: any) => {
    setLoading(true);
    // 模拟保存设置
    setTimeout(() => {
      console.log('保存设置:', values);
      console.log('邮箱配置:', emailConfigs);
      message.success('设置保存成功');
      setLoading(false);
    }, 1000);
  };

  const handleReset = () => {
    // 重置邮箱配置
    setEmailConfigs([
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
    ]);
    
    // 重置通知模板
    setNotificationTemplates([
      {
        id: '1',
        name: '调仓通知模板',
        subject: '投资组合调仓通知 - {date}',
        content: `尊敬的用户：

您的投资组合已进行调仓操作。

调仓详情：
- 调仓时间：{time}
- 调仓股票：{stocks}
- 调仓金额：{amount}
- 调仓原因：{reason}

如有疑问，请联系客服。

祝投资顺利！`,
        enabled: true,
      },
      {
        id: '2',
        name: '风险预警模板',
        subject: '投资风险预警通知 - {date}',
        content: `尊敬的用户：

检测到您的投资组合存在风险，请注意：

风险详情：
- 风险类型：{riskType}
- 风险等级：{riskLevel}
- 影响股票：{stocks}
- 建议操作：{suggestion}

请及时关注并采取相应措施。

祝投资顺利！`,
        enabled: true,
      },
    ]);
    
    form.resetFields();
    message.info('设置已重置');
  };

  const addEmailConfig = () => {
    const newConfig: EmailConfig = {
      id: Date.now().toString(),
      email: '',
      remark: '',
      enabled: true,
    };
    setEmailConfigs([...emailConfigs, newConfig]);
  };

  const removeEmailConfig = (id: string) => {
    setEmailConfigs(emailConfigs.filter(config => config.id !== id));
  };

  const updateEmailConfig = (id: string, field: keyof EmailConfig, value: any) => {
    setEmailConfigs(emailConfigs.map(config => 
      config.id === id ? { ...config, [field]: value } : config
    ));
  };

  const updateNotificationTemplate = (id: string, field: keyof NotificationTemplate, value: any) => {
    setNotificationTemplates(notificationTemplates.map(template => 
      template.id === id ? { ...template, [field]: value } : template
    ));
  };

  const addNotificationTemplate = () => {
    const newTemplate: NotificationTemplate = {
      id: Date.now().toString(),
      name: '',
      subject: '',
      content: '',
      enabled: true,
    };
    setNotificationTemplates([...notificationTemplates, newTemplate]);
  };

  const removeNotificationTemplate = (id: string) => {
    setNotificationTemplates(notificationTemplates.filter(template => template.id !== id));
  };

  return (
    <SettingsContainer>
      <SettingsHeader>
        <h1>系统设置</h1>
        <p>配置您的个人偏好和系统参数</p>
      </SettingsHeader>

      <SettingsForm>
        <Tabs
          defaultActiveKey="basic"
          items={[
            {
              key: 'basic',
              label: (
                <Space>
                  <SettingOutlined />
                  基础设置
                </Space>
              ),
              children: (
                <Form
                  form={form}
                  layout='vertical'
                  onFinish={onFinish}
                  initialValues={{
                    theme: 'light',
                    language: 'zh-CN',
                  }}
                >
                  {/* 主题设置 */}
                  <SettingsCard>
                    <Card
                      title={
                        <Space>
                          <CardIcon>
                            <SettingOutlined />
                          </CardIcon>
                          <span>主题设置</span>
                        </Space>
                      }
                    >
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item name='theme' label='主题'>
                            <Select>
                              <Option value='light'>浅色主题</Option>
                              <Option value='dark'>深色主题</Option>
                              <Option value='auto'>跟随系统</Option>
                            </Select>
                          </Form.Item>
                        </Col>
                      </Row>
                    </Card>
                  </SettingsCard>

                  {/* 语言设置 */}
                  <SettingsCard>
                    <Card
                      title={
                        <Space>
                          <CardIcon>
                            <GlobalOutlined />
                          </CardIcon>
                          <span>语言设置</span>
                        </Space>
                      }
                    >
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item name='language' label='界面语言'>
                            <Select>
                              <Option value='zh-CN'>简体中文</Option>
                              <Option value='en-US'>English</Option>
                              <Option value='zh-TW'>繁體中文</Option>
                            </Select>
                          </Form.Item>
                        </Col>
                      </Row>
                    </Card>
                  </SettingsCard>
                </Form>
              ),
            },
            {
              key: 'notification',
              label: (
                <Space>
                  <NotificationOutlined />
                  通知设置
                </Space>
              ),
              children: (
                <Form
                  form={form}
                  layout='vertical'
                  onFinish={onFinish}
                  initialValues={{
                    rebalanceNotifications: true,
                  }}
                >
                  {/* 调仓通知设置 */}
                  <SettingsCard>
                    <Card
                      title={
                        <Space>
                          <CardIcon>
                            <MailOutlined />
                          </CardIcon>
                          <span>调仓通知设置</span>
                        </Space>
                      }
                    >
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item
                            name='rebalanceNotifications'
                            label='调仓通知'
                            valuePropName='checked'
                          >
                            <Switch />
                          </Form.Item>
                        </Col>
                      </Row>
                      
                      <Divider orientation="left">邮箱配置</Divider>
                      
                      <div style={{ marginBottom: 16 }}>
                        {emailConfigs.map((config) => (
                          <Card key={config.id} size="small" style={{ marginBottom: 12, backgroundColor: '#f9fafb' }}>
                            <Row gutter={16} align="middle">
                              <Col span={8}>
                                <div style={{ marginBottom: 8 }}>
                                  <label style={{ fontSize: '14px', fontWeight: 500, color: '#374151' }}>邮箱地址</label>
                                </div>
                                <Input
                                  placeholder='请输入邮箱地址'
                                  value={config.email}
                                  onChange={(e) => updateEmailConfig(config.id, 'email', e.target.value)}
                                  prefix={<MailOutlined />}
                                />
                              </Col>
                              <Col span={8}>
                                <div style={{ marginBottom: 8 }}>
                                  <label style={{ fontSize: '14px', fontWeight: 500, color: '#374151' }}>邮箱备注</label>
                                </div>
                                <Input
                                  placeholder='请输入备注'
                                  value={config.remark}
                                  onChange={(e) => updateEmailConfig(config.id, 'remark', e.target.value)}
                                />
                              </Col>
                              <Col span={4}>
                                <div style={{ marginBottom: 8 }}>
                                  <label style={{ fontSize: '14px', fontWeight: 500, color: '#374151' }}>启用状态</label>
                                </div>
                                <Switch
                                  checked={config.enabled}
                                  onChange={(checked) => updateEmailConfig(config.id, 'enabled', checked)}
                                />
                              </Col>
                              <Col span={4}>
                                <Popconfirm
                                  title="确定要删除这个邮箱配置吗？"
                                  onConfirm={() => removeEmailConfig(config.id)}
                                  okText="确定"
                                  cancelText="取消"
                                >
                                  <Button 
                                    type="text" 
                                    danger 
                                    icon={<DeleteOutlined />}
                                    disabled={emailConfigs.length <= 1}
                                  >
                                    删除
                                  </Button>
                                </Popconfirm>
                              </Col>
                            </Row>
                          </Card>
                        ))}
                        
                        <Button 
                          type="dashed" 
                          icon={<PlusOutlined />} 
                          onClick={addEmailConfig}
                          style={{ width: '100%' }}
                        >
                          添加邮箱配置
                        </Button>
                      </div>
                    </Card>
                  </SettingsCard>

                  {/* 通知模板设置 */}
                  <SettingsCard>
                    <Card
                      title={
                        <Space>
                          <CardIcon>
                            <NotificationOutlined />
                          </CardIcon>
                          <span>通知模板设置</span>
                        </Space>
                      }
                    >
                      <div style={{ marginBottom: 16 }}>
                        {notificationTemplates.map((template) => (
                          <Card key={template.id} size="small" style={{ marginBottom: 12, backgroundColor: '#f9fafb' }}>
                            <Row gutter={16}>
                              <Col span={24}>
                                <div style={{ marginBottom: 8 }}>
                                  <label style={{ fontSize: '14px', fontWeight: 500, color: '#374151' }}>模板名称</label>
                                </div>
                                <Input
                                  placeholder='请输入模板名称'
                                  value={template.name}
                                  onChange={(e) => updateNotificationTemplate(template.id, 'name', e.target.value)}
                                />
                              </Col>
                            </Row>
                            <Row gutter={16} style={{ marginTop: 12 }}>
                              <Col span={12}>
                                <div style={{ marginBottom: 8 }}>
                                  <label style={{ fontSize: '14px', fontWeight: 500, color: '#374151' }}>邮件主题</label>
                                </div>
                                <Input
                                  placeholder='请输入邮件主题'
                                  value={template.subject}
                                  onChange={(e) => updateNotificationTemplate(template.id, 'subject', e.target.value)}
                                />
                              </Col>
                              <Col span={12}>
                                <div style={{ marginBottom: 8 }}>
                                  <label style={{ fontSize: '14px', fontWeight: 500, color: '#374151' }}>启用状态</label>
                                </div>
                                <Switch
                                  checked={template.enabled}
                                  onChange={(checked) => updateNotificationTemplate(template.id, 'enabled', checked)}
                                />
                              </Col>
                            </Row>
                            <Row gutter={16} style={{ marginTop: 12 }}>
                              <Col span={24}>
                                <div style={{ marginBottom: 8 }}>
                                  <label style={{ fontSize: '14px', fontWeight: 500, color: '#374151' }}>邮件内容</label>
                                  <Text type="secondary" style={{ fontSize: '12px', marginLeft: 8 }}>
                                    支持变量：{'{{date}}'} {'{{time}}'} {'{{stocks}}'} {'{{amount}}'} {'{{reason}}'} {'{{riskType}}'} {'{{riskLevel}}'} {'{{suggestion}}'}
                                  </Text>
                                </div>
                                <Input.TextArea
                                  rows={8}
                                  placeholder='请输入邮件内容'
                                  value={template.content}
                                  onChange={(e) => updateNotificationTemplate(template.id, 'content', e.target.value)}
                                />
                              </Col>
                            </Row>
                            <Row style={{ marginTop: 12 }}>
                              <Col span={24}>
                                <Popconfirm
                                  title="确定要删除这个通知模板吗？"
                                  onConfirm={() => removeNotificationTemplate(template.id)}
                                  okText="确定"
                                  cancelText="取消"
                                >
                                  <Button 
                                    type="text" 
                                    danger 
                                    icon={<DeleteOutlined />}
                                  >
                                    删除模板
                                  </Button>
                                </Popconfirm>
                              </Col>
                            </Row>
                          </Card>
                        ))}
                        
                        <Button 
                          type="dashed" 
                          icon={<PlusOutlined />} 
                          onClick={addNotificationTemplate}
                          style={{ width: '100%' }}
                        >
                          添加通知模板
                        </Button>
                      </div>
                    </Card>
                  </SettingsCard>
                </Form>
              ),
            },
          ]}
        />

        {/* 操作按钮 */}
        <SettingsCard>
          <Card>
            <SettingsActions>
              <Button
                type='primary'
                icon={<SaveOutlined />}
                onClick={() => {
                  console.log('保存设置:', { emailConfigs, notificationTemplates });
                  message.success('设置保存成功');
                }}
                loading={loading}
              >
                保存设置
              </Button>
              <Button icon={<ReloadOutlined />} onClick={handleReset}>
                重置
              </Button>
            </SettingsActions>
          </Card>
        </SettingsCard>
      </SettingsForm>
    </SettingsContainer>
  );
};

export default Settings;
