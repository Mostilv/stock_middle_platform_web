import React, { useState, useEffect } from 'react';
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
  
  Typography,
} from 'antd';
import { SaveOutlined, ReloadOutlined, SettingOutlined, PlusOutlined, DeleteOutlined, MailOutlined, NotificationOutlined, GlobalOutlined } from '@ant-design/icons';
import { fetchSettingsData, saveSettingsData, SettingsDataResponse } from './services/settings.api';
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
  const [previewContent, setPreviewContent] = useState<string>('');
  const [emailConfigs, setEmailConfigs] = useState<EmailConfig[]>([]);

  const [notificationTemplates, setNotificationTemplates] = useState<NotificationTemplate[]>([]);

  useEffect(() => {
    let mounted = true;
    fetchSettingsData()
      .then((data) => {
        if (!mounted) return;
        setEmailConfigs(data.emailConfigs as any);
        setNotificationTemplates(data.notificationTemplates as any);
      })
      .catch(() => {
        // 保持空数组
      });
    return () => { mounted = false; };
  }, []);

  const onFinish = (values: any) => {
    setLoading(true);
    const payload: SettingsDataResponse = {
      emailConfigs: emailConfigs as any,
      notificationTemplates: notificationTemplates as any,
    };
    saveSettingsData(payload)
      .then(() => message.success('设置保存成功'))
      .finally(() => setLoading(false));
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
    
    // 重置通知模板为单个
    setNotificationTemplates([
      {
        id: '1',
        name: '通知模板',
        subject: '投资组合调仓通知 - {date}',
        content: `策略名称：{{strategyName}}
委托时间：{{orderTime}}
股票|委托数量|委托类型|委托价格|操作|持仓
{{#orders}}{{stock}}|{{quantity}}|{{orderType}}|{{price}}|{{action}}|{{position}}
{{/orders}}`,
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

  // 简易模板渲染：支持 {{var}} 与数组块 {{#orders}}...{{/orders}}
  const renderTemplate = (tpl: string, data: any): string => {
    if (!tpl) return '';
    let output = tpl;
    // 处理数组块 orders
    output = output.replace(/\{\{#(\w+)\}\}([\s\S]*?)\{\{\/(\w+)\}\}/g, (_m, key, block, endKey) => {
      if (key !== endKey) return '';
      const arr = data[key];
      if (!Array.isArray(arr)) return '';
      return arr.map((item: any) => block.replace(/\{\{(\w+)\}\}/g, (_m2: string, k: string) => {
        const v = item[k];
        return v === undefined || v === null ? '' : String(v);
      })).join('');
    });
    // 标量变量
    output = output.replace(/\{\{(\w+)\}\}/g, (_m, k) => {
      const v = data[k];
      return v === undefined || v === null ? '' : String(v);
    });
    return output;
  };

  const handlePreviewTemplate = () => {
    const tpl = notificationTemplates[0]?.content || '';
    const sample = {
      date: '2025-08-28',
      strategyName: '趋势增强策略',
      orderTime: '09:35:20',
      orders: [
        { stock: '招商银行', quantity: 2000, orderType: '限价', price: 33.58, action: '买入', position: '20%' },
        { stock: '中兴通讯', quantity: 1500, orderType: '市价', price: 28.40, action: '卖出', position: '10%' },
        { stock: '宁德时代', quantity: 500, orderType: '限价', price: 176.30, action: '买入', position: '15%' },
      ],
    };
    setPreviewContent(renderTemplate(tpl, sample));
  };

  // 预览开关：再次点击关闭预览
  const handleTogglePreview = () => {
    if (previewContent) {
      setPreviewContent('');
    } else {
      handlePreviewTemplate();
    }
  };

  // 测试发送邮件（模拟）
  const handleTestSendEmail = () => {
    const key = 'test-mail';
    const subjectTpl = notificationTemplates[0]?.subject || '';
    const contentTpl = notificationTemplates[0]?.content || '';
    const sample = {
      date: '2025-08-28',
      strategyName: '趋势增强策略',
      orderTime: '09:35:20',
      orders: [
        { stock: '招商银行', quantity: 2000, orderType: '限价', price: 33.58, action: '买入', position: '20%' },
        { stock: '中兴通讯', quantity: 1500, orderType: '市价', price: 28.40, action: '卖出', position: '10%' },
        { stock: '宁德时代', quantity: 500, orderType: '限价', price: 176.30, action: '买入', position: '15%' },
      ],
    };
    const renderedSubject = renderTemplate(subjectTpl, sample);
    const renderedContent = renderTemplate(contentTpl, sample);

    message.loading({ content: '正在发送测试邮件...', key });
    setTimeout(() => {
      // 这里可接入后端 API：发送到启用的邮箱列表
      console.log('测试邮件主题:', renderedSubject);
      console.log('测试邮件内容:', renderedContent);
      console.log('收件人(启用):', emailConfigs.filter(e => e.enabled).map(e => e.email));
      message.success({ content: '测试邮件已发送（模拟）', key, duration: 2 });
    }, 800);
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

          {/* 调仓通知设置 + 邮箱配置 */}
          <SettingsCard>
            <Card
              title={
                <Space>
                  <CardIcon>
                    <MailOutlined />
                  </CardIcon>
                  <span>通知与邮箱</span>
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

          {/* 通知模板设置（仅保留单个模板，不允许新增） */}
          <SettingsCard>
            <Card
              title={
                <Space>
                  <CardIcon>
                    <NotificationOutlined />
                  </CardIcon>
                  <span>通知模板</span>
                </Space>
              }
            >
              {notificationTemplates.slice(0,1).map((template) => (
                <Card key={template.id} size="small" style={{ backgroundColor: '#f9fafb' }}>
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
                          支持变量：{'{{date}}'} {'{{strategyName}}'} {'{{orderTime}}'}；数组块：{'{{#orders}}...{{/orders}}'}，行内变量：{'{{stock}}'} {'{{quantity}}'} {'{{orderType}}'} {'{{price}}'} {'{{action}}'} {'{{position}}'}
                        </Text>
                      </div>
                      <Input.TextArea
                        rows={8}
                        placeholder='请输入邮件内容'
                        value={template.content}
                        onChange={(e) => updateNotificationTemplate(template.id, 'content', e.target.value)}
                      />
                      <div style={{ marginTop: 8 }}>
                        <Space>
                          <Button onClick={handleTogglePreview}>{previewContent ? '关闭预览' : '预览模板'}</Button>
                          <Button type="primary" onClick={handleTestSendEmail}>测试发送邮件</Button>
                          <Text type="secondary">使用示例数据渲染含多只股票的表格</Text>
                        </Space>
                        {previewContent && (
                          <Card size="small" style={{ marginTop: 8, whiteSpace: 'pre-wrap', backgroundColor: '#0f172a', color: '#e2e8f0', position: 'relative' }}>
                            <div style={{ position: 'absolute', right: 8, top: 6 }}>
                              <Button type="link" size="small" onClick={() => setPreviewContent('')} style={{ color: '#93c5fd' }}>关闭</Button>
                            </div>
                            {previewContent}
                          </Card>
                        )}
                      </div>
                    </Col>
                  </Row>
                </Card>
              ))}
            </Card>
          </SettingsCard>
        </Form>

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
