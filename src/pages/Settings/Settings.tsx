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
} from 'antd';
import {
  SaveOutlined,
  ReloadOutlined,
  SettingOutlined,
  PlusOutlined,
  DeleteOutlined,
  MailOutlined,
} from '@ant-design/icons';
import {
  SettingsContainer,
  SettingsHeader,
  SettingsCard,
  SettingsForm,
  FormInput,
  SettingsActions,
  CardIcon,
  ClickableButton,
} from './Settings.styles';

const { Option } = Select;

interface EmailConfig {
  id: string;
  email: string;
  remark: string;
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

  return (
    <SettingsContainer>
      <SettingsHeader>
        <h1>系统设置</h1>
        <p>配置您的个人偏好和系统参数</p>
      </SettingsHeader>

      <SettingsForm>
        <Form
          form={form}
          layout='vertical'
          onFinish={onFinish}
          initialValues={{
            theme: 'light',
            language: 'zh-CN',
            rebalanceNotifications: true,
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
                    <SettingOutlined />
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
                          <ClickableButton 
                            type="text" 
                            danger 
                            icon={<DeleteOutlined />}
                            disabled={emailConfigs.length <= 1}
                          >
                            删除
                          </ClickableButton>
                        </Popconfirm>
                      </Col>
                    </Row>
                  </Card>
                ))}
                
                <ClickableButton 
                  type="dashed" 
                  icon={<PlusOutlined />} 
                  onClick={addEmailConfig}
                  style={{ width: '100%' }}
                >
                  添加邮箱配置
                </ClickableButton>
              </div>
            </Card>
          </SettingsCard>

          {/* 操作按钮 */}
          <SettingsCard>
            <Card>
              <SettingsActions>
                <ClickableButton
                  type='primary'
                  icon={<SaveOutlined />}
                  htmlType='submit'
                  loading={loading}
                >
                  保存设置
                </ClickableButton>
                <ClickableButton icon={<ReloadOutlined />} onClick={handleReset}>
                  重置
                </ClickableButton>
              </SettingsActions>
            </Card>
          </SettingsCard>
        </Form>
      </SettingsForm>
    </SettingsContainer>
  );
};

export default Settings;
