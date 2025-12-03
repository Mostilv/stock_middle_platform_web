import React, { useState, useEffect, useRef } from 'react';
import {
  Alert,
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  message,
  Popconfirm,
  Row,
  Select,
  Space,
  Switch,
  Tag,
  Typography,
  Upload,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  SaveOutlined,
  ReloadOutlined,
  SettingOutlined,
  PlusOutlined,
  DeleteOutlined,
  MailOutlined,
  NotificationOutlined,
  IdcardOutlined,
  LockOutlined,
  CameraOutlined,
  EditOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import type { RcFile } from 'antd/es/upload';
import {
  changeAccountPassword,
  fetchAccountProfile,
  fetchSettingsData,
  saveSettingsData,
  updateAccountProfile,
} from './services/settings.api';
import type { SettingsDataResponse } from './services/settings.api';
import { useAuth } from '../../contexts/useAuth';
import {
  AccountActions,
  AccountCard,
  AccountInfo,
  SettingsActions,
  SettingsCard,
  SettingsContainer,
  SettingsContent,
  SettingsForm,
  SettingsHeader,
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

interface ProfileFormValues {
  username: string;
  avatarUrl?: string;
}

interface PasswordFormValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const fileToBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const Settings: React.FC = () => {
  const [form] = Form.useForm();
  const [profileForm] = Form.useForm<ProfileFormValues>();
  const [passwordForm] = Form.useForm<PasswordFormValues>();
  const [loading, setLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [previewContent, setPreviewContent] = useState<string>('');
  const [emailConfigs, setEmailConfigs] = useState<EmailConfig[]>([]);
  const [avatarPreview, setAvatarPreview] = useState<string>('');
  const navigate = useNavigate();
  const { isAuthenticated, user, logout, updateUser } = useAuth();
  const [profileExpanded, setProfileExpanded] = useState(false);
  const [passwordExpanded, setPasswordExpanded] = useState(false);
  const settingsLoadedRef = useRef(false);
  const profileLoadedRef = useRef(false);

  const [notificationTemplates, setNotificationTemplates] = useState<
    NotificationTemplate[]
  >([]);

  useEffect(() => {
    if (settingsLoadedRef.current) return;
    let mounted = true;
    settingsLoadedRef.current = true;
    fetchSettingsData()
      .then(data => {
        if (!mounted) return;
        setEmailConfigs(data.emailConfigs as any);
        setNotificationTemplates(data.notificationTemplates as any);
      })
      .catch(() => {
        settingsLoadedRef.current = false;
        // 保持空数组
      });
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    profileForm.setFieldsValue({
      username: user?.username || '',
      avatarUrl: user?.avatarUrl || '',
    });
    setAvatarPreview(user?.avatarUrl || '');
  }, [profileForm, user]);

  useEffect(() => {
    if (!isAuthenticated || profileLoadedRef.current) return;
    let mounted = true;
    profileLoadedRef.current = true;
    fetchAccountProfile()
      .then(profile => {
        if (!mounted) return;
        const usernameValue = profile.username || user?.username || '';
        const displayName =
          profile.display_name ||
          (profile as any).displayName ||
          usernameValue;
        const avatarUrl =
          profile.avatar_url || (profile as any).avatarUrl || '';
        profileForm.setFieldsValue({
          username: usernameValue,
          avatarUrl,
        });
        setAvatarPreview(avatarUrl);
        updateUser({
          username: usernameValue,
          email: profile.email ?? user?.email,
          displayName,
          avatarUrl,
        });
      })
      .catch(() => {
        profileLoadedRef.current = false;
        // ignore
      });
    return () => {
      mounted = false;
    };
  }, [isAuthenticated, profileForm, updateUser, user?.email]);

  useEffect(() => {
    if (!isAuthenticated) {
      setProfileExpanded(false);
      setPasswordExpanded(false);
      profileLoadedRef.current = false;
      settingsLoadedRef.current = false;
    }
  }, [isAuthenticated]);

  const onFinish = (_values: any) => {
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

  const updateEmailConfig = (
    id: string,
    field: keyof EmailConfig,
    value: any,
  ) => {
    setEmailConfigs(
      emailConfigs.map(config =>
        config.id === id ? { ...config, [field]: value } : config,
      ),
    );
  };

  const updateNotificationTemplate = (
    id: string,
    field: keyof NotificationTemplate,
    value: any,
  ) => {
    setNotificationTemplates(
      notificationTemplates.map(template =>
        template.id === id ? { ...template, [field]: value } : template,
      ),
    );
  };

  // 简易模板渲染：支持 {{var}} 与数组块 {{#orders}}...{{/orders}}
  const renderTemplate = (tpl: string, data: any): string => {
    if (!tpl) return '';
    let output = tpl;
    // 处理数组块 orders
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
    const renderedSubject = renderTemplate(subjectTpl, sample);
    const renderedContent = renderTemplate(contentTpl, sample);

    message.loading({ content: '正在发送测试邮件...', key });
    setTimeout(() => {
      // 这里可接入后端 API：发送到启用的邮箱列表
      console.log('测试邮件主题:', renderedSubject);
      console.log('测试邮件内容:', renderedContent);
      console.log(
        '收件人(启用):',
        emailConfigs.filter(e => e.enabled).map(e => e.email),
      );
      message.success({ content: '测试邮件已发送（模拟）', key, duration: 2 });
    }, 800);
  };

  const handleLogout = () => {
    logout();
    message.success('已退出登录');
  };

  const handleGoLogin = () => {
    navigate('/login');
  };

  const handleProfileSubmit = async (values: ProfileFormValues) => {
    if (!isAuthenticated) {
      message.warning('请先登录后再修改账户信息');
      return;
    }
    setProfileLoading(true);
    try {
      const username = values.username?.trim() || user?.username || '';
      const avatarUrl = values.avatarUrl?.trim() || '';
      const response = await updateAccountProfile({
        username,
        avatarUrl,
      });
      const resolvedUsername = response.username || username;
      const resolvedName =
        response.display_name ||
        (response as any).displayName ||
        resolvedUsername;
      const resolvedAvatar =
        response.avatar_url || (response as any).avatarUrl || avatarUrl;
      updateUser({
        username: resolvedUsername,
        displayName: resolvedName,
        avatarUrl: resolvedAvatar,
        email: response.email ?? user?.email,
      });
      setAvatarPreview(resolvedAvatar);
      profileForm.setFieldsValue({
        username: resolvedUsername,
        avatarUrl: resolvedAvatar,
      });
      message.success('账户信息已更新');
      setProfileExpanded(false);
    } catch (error) {
      message.error(
        error instanceof Error ? error.message : '账户信息更新失败',
      );
    } finally {
      setProfileLoading(false);
    }
  };

  const handleAvatarUpload = (file: RcFile) => {
    fileToBase64(file)
      .then(result => {
        setAvatarPreview(result);
        profileForm.setFieldsValue({ avatarUrl: result });
        message.success('头像预览已更新');
      })
      .catch(() => {
        message.error('头像读取失败，请重试');
      });
    return false;
  };

  const handlePasswordSubmit = async (values: PasswordFormValues) => {
    if (!isAuthenticated) {
      message.warning('请先登录后再修改密码');
      return;
    }
    setPasswordLoading(true);
    try {
      await changeAccountPassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });
      message.success('密码修改成功');
      passwordForm.resetFields();
      setPasswordExpanded(false);
    } catch (error) {
      message.error(
        error instanceof Error ? error.message : '密码修改失败',
      );
    } finally {
      setPasswordLoading(false);
    }
  };

  const accountInitial =
    user?.username?.charAt(0).toUpperCase() || 'U';
  const accountName = isAuthenticated
    ? user?.username || '我的账户'
    : '尚未登录';
  const accountRoleText = isAuthenticated
    ? `角色：${user?.role ?? '策略管理员'}`
    : '登录后可管理策略订阅、用户等权限模块';

  const toggleProfileSection = () => {
    if (!isAuthenticated) {
      message.info('请先登录后再修改账户资料');
      return;
    }
    setProfileExpanded(prev => {
      const next = !prev;
      if (next) setPasswordExpanded(false);
      return next;
    });
  };

  const togglePasswordSection = () => {
    if (!isAuthenticated) {
      message.info('请先登录后再修改密码');
      return;
    }
    setPasswordExpanded(prev => {
      const next = !prev;
      if (next) setProfileExpanded(false);
      return next;
    });
  };

  return (
    <SettingsContainer>
      <SettingsHeader>
        <div>
          <h1>系统设置</h1>
          <span>配置您的个人偏好和系统参数</span>
        </div>
      </SettingsHeader>

      <SettingsContent>
        <AccountCard>
          <AccountInfo>
          <Avatar
            size={64}
            src={user?.avatarUrl || undefined}
            style={{
              borderRadius: 16,
              backgroundColor: '#e0f2fe',
              color: '#0f172a',
            }}
          >
            {accountInitial}
          </Avatar>
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  flexWrap: 'wrap',
                }}
              >
                <h3 style={{ marginBottom: 0 }}>{accountName}</h3>
                <Button
                  type='link'
                  icon={<EditOutlined />}
                  onClick={toggleProfileSection}
                  disabled={!isAuthenticated}
                  style={{ paddingLeft: 4 }}
                >
                  编辑资料
                </Button>
              </div>
            <p>{accountRoleText}</p>
            </div>
          </AccountInfo>
          <AccountActions>
            <Tag color={isAuthenticated ? 'green' : 'orange'}>
              {isAuthenticated ? '已登录' : '未登录'}
            </Tag>
            <Button
              icon={<LockOutlined />}
              onClick={togglePasswordSection}
              disabled={!isAuthenticated}
            >
              修改密码
            </Button>
            {isAuthenticated ? (
              <Button onClick={handleLogout} danger>
                退出登录
              </Button>
            ) : (
              <Button type='primary' onClick={handleGoLogin}>
                去登录
              </Button>
            )}
          </AccountActions>
        </AccountCard>

        <SettingsForm>
          {profileExpanded && (
            <SettingsCard>
              <Card
                title={
                  <Space>
                    <CardIcon>
                      <IdcardOutlined />
                    </CardIcon>
                    <span>账户资料</span>
                  </Space>
                }
                extra={
                  <Button
                    type='text'
                    icon={<CloseOutlined />}
                    onClick={() => setProfileExpanded(false)}
                  >
                    关闭
                  </Button>
                }
              >
                <Form
                  form={profileForm}
                  layout='vertical'
                  onFinish={handleProfileSubmit}
                  initialValues={{
                    username: user?.username || '',
                    avatarUrl: user?.avatarUrl || '',
                  }}
                  disabled={!isAuthenticated}
                >
                  <Form.Item name='avatarUrl' hidden>
                    <Input type='hidden' />
                  </Form.Item>
                  <Row gutter={24}>
                    <Col span={8}>
                    <Upload
                      accept='image/*'
                      showUploadList={false}
                      beforeUpload={handleAvatarUpload}
                      disabled={!isAuthenticated}
                    >
                      <div
                        style={{
                          border: '1px dashed #cbd5f5',
                          borderRadius: 12,
                          padding: 16,
                          textAlign: 'center',
                          cursor: isAuthenticated ? 'pointer' : 'not-allowed',
                        }}
                      >
                        {avatarPreview ? (
                          <Avatar
                            size={96}
                            src={avatarPreview}
                            style={{
                              marginBottom: 12,
                              borderRadius: 18,
                            }}
                          />
                          ) : (
                            <CameraOutlined
                              style={{ fontSize: 32, color: '#94a3b8' }}
                            />
                          )}
                          <div style={{ color: '#475569' }}>
                            {isAuthenticated ? '上传头像' : '登录后可上传'}
                          </div>
                        </div>
                      </Upload>
                    </Col>
                    <Col span={16}>
                      <Form.Item
                        label='用户名'
                        name='username'
                        rules={[
                          { required: true, message: '请输入账户名称' },
                          { max: 32, message: '账户名称最多32个字符' },
                        ]}
                      >
                        <Input placeholder='请输入用户名' />
                      </Form.Item>
                      <Form.Item style={{ marginBottom: 0 }}>
                        <Space>
                          <Button
                            onClick={() => {
                              profileForm.resetFields();
                              profileForm.setFieldsValue({
                                username: user?.username || '',
                                avatarUrl: user?.avatarUrl || '',
                              });
                              setAvatarPreview(user?.avatarUrl || '');
                            }}
                          >
                            重置
                          </Button>
                          <Button
                            type='primary'
                            htmlType='submit'
                            loading={profileLoading}
                            disabled={!isAuthenticated}
                          >
                            保存资料
                          </Button>
                        </Space>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
                {!isAuthenticated && (
                  <Alert
                    type='info'
                    showIcon
                    message='当前为未登录状态，暂无法修改账户资料'
                    style={{ marginTop: 16 }}
                  />
                )}
              </Card>
            </SettingsCard>
          )}

          {passwordExpanded && (
            <SettingsCard>
              <Card
                title={
                  <Space>
                    <CardIcon>
                      <LockOutlined />
                    </CardIcon>
                    <span>账户安全</span>
                  </Space>
                }
                extra={
                  <Button
                    type='text'
                    icon={<CloseOutlined />}
                    onClick={() => setPasswordExpanded(false)}
                  >
                    关闭
                  </Button>
                }
              >
                <Form
                  form={passwordForm}
                  layout='vertical'
                  onFinish={handlePasswordSubmit}
                  disabled={!isAuthenticated}
                >
                  <Row gutter={16}>
                    <Col span={8}>
                      <Form.Item
                        label='旧密码'
                        name='currentPassword'
                        rules={[{ required: true, message: '请输入旧密码' }]}
                      >
                        <Input.Password placeholder='请输入当前密码' />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        label='新密码'
                        name='newPassword'
                        rules={[
                          { required: true, message: '请输入新密码' },
                          { min: 6, message: '新密码至少6个字符' },
                        ]}
                      >
                        <Input.Password placeholder='请输入新密码' />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        label='确认新密码'
                        name='confirmPassword'
                        dependencies={['newPassword']}
                        rules={[
                          { required: true, message: '请确认新密码' },
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (!value || getFieldValue('newPassword') === value)
                                return Promise.resolve();
                              return Promise.reject(
                                new Error('两次输入的新密码不一致'),
                              );
                            },
                          }),
                        ]}
                      >
                        <Input.Password placeholder='请再次输入新密码' />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item style={{ marginBottom: 0 }}>
                    <Space>
                      <Button
                        onClick={() => passwordForm.resetFields()}
                        disabled={passwordLoading}
                      >
                        清空
                      </Button>
                      <Button
                        type='primary'
                        htmlType='submit'
                        loading={passwordLoading}
                        disabled={!isAuthenticated}
                      >
                        修改密码
                      </Button>
                    </Space>
                  </Form.Item>
                </Form>
                {!isAuthenticated && (
                  <Alert
                    type='info'
                    showIcon
                    message='请先登录后再修改密码'
                    style={{ marginTop: 16 }}
                  />
                )}
              </Card>
            </SettingsCard>
          )}

          <Form
            form={form}
            layout='vertical'
            onFinish={onFinish}
            initialValues={{
              theme: 'light',
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

                <Divider orientation='left'>邮箱配置</Divider>
                <div style={{ marginBottom: 16 }}>
                  {emailConfigs.map(config => (
                    <Card
                      key={config.id}
                      size='small'
                      style={{ marginBottom: 12, backgroundColor: '#f9fafb' }}
                    >
                      <Row gutter={16} align='middle'>
                        <Col span={8}>
                          <div style={{ marginBottom: 8 }}>
                            <label
                              style={{
                                fontSize: '14px',
                                fontWeight: 500,
                                color: '#374151',
                              }}
                            >
                              邮箱地址
                            </label>
                          </div>
                          <Input
                            placeholder='请输入邮箱地址'
                            value={config.email}
                            onChange={e =>
                              updateEmailConfig(
                                config.id,
                                'email',
                                e.target.value,
                              )
                            }
                            prefix={<MailOutlined />}
                          />
                        </Col>
                        <Col span={8}>
                          <div style={{ marginBottom: 8 }}>
                            <label
                              style={{
                                fontSize: '14px',
                                fontWeight: 500,
                                color: '#374151',
                              }}
                            >
                              邮箱备注
                            </label>
                          </div>
                          <Input
                            placeholder='请输入备注'
                            value={config.remark}
                            onChange={e =>
                              updateEmailConfig(
                                config.id,
                                'remark',
                                e.target.value,
                              )
                            }
                          />
                        </Col>
                        <Col span={4}>
                          <div style={{ marginBottom: 8 }}>
                            <label
                              style={{
                                fontSize: '14px',
                                fontWeight: 500,
                                color: '#374151',
                              }}
                            >
                              启用状态
                            </label>
                          </div>
                          <Switch
                            checked={config.enabled}
                            onChange={checked =>
                              updateEmailConfig(config.id, 'enabled', checked)
                            }
                          />
                        </Col>
                        <Col span={4}>
                          <Popconfirm
                            title='确定要删除这个邮箱配置吗？'
                            onConfirm={() => removeEmailConfig(config.id)}
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
                    </Card>
                  ))}
                  <Button
                    type='dashed'
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
                {notificationTemplates.slice(0, 1).map(template => (
                  <Card
                    key={template.id}
                    size='small'
                    style={{ backgroundColor: '#f9fafb' }}
                  >
                    <Row gutter={16}>
                      <Col span={24}>
                        <div style={{ marginBottom: 8 }}>
                          <label
                            style={{
                              fontSize: '14px',
                              fontWeight: 500,
                              color: '#374151',
                            }}
                          >
                            模板名称
                          </label>
                        </div>
                        <Input
                          placeholder='请输入模板名称'
                          value={template.name}
                          onChange={e =>
                            updateNotificationTemplate(
                              template.id,
                              'name',
                              e.target.value,
                            )
                          }
                        />
                      </Col>
                    </Row>
                    <Row gutter={16} style={{ marginTop: 12 }}>
                      <Col span={12}>
                        <div style={{ marginBottom: 8 }}>
                          <label
                            style={{
                              fontSize: '14px',
                              fontWeight: 500,
                              color: '#374151',
                            }}
                          >
                            邮件主题
                          </label>
                        </div>
                        <Input
                          placeholder='请输入邮件主题'
                          value={template.subject}
                          onChange={e =>
                            updateNotificationTemplate(
                              template.id,
                              'subject',
                              e.target.value,
                            )
                          }
                        />
                      </Col>
                      <Col span={12}>
                        <div style={{ marginBottom: 8 }}>
                          <label
                            style={{
                              fontSize: '14px',
                              fontWeight: 500,
                              color: '#374151',
                            }}
                          >
                            启用状态
                          </label>
                        </div>
                        <Switch
                          checked={template.enabled}
                          onChange={checked =>
                            updateNotificationTemplate(
                              template.id,
                              'enabled',
                              checked,
                            )
                          }
                        />
                      </Col>
                    </Row>
                    <Row gutter={16} style={{ marginTop: 12 }}>
                      <Col span={24}>
                        <div style={{ marginBottom: 8 }}>
                          <label
                            style={{
                              fontSize: '14px',
                              fontWeight: 500,
                              color: '#374151',
                            }}
                          >
                            邮件内容
                          </label>
                          <Text
                            type='secondary'
                            style={{ fontSize: '12px', marginLeft: 8 }}
                          >
                            支持变量：{'{{date}}'} {'{{strategyName}}'}{' '}
                            {'{{orderTime}}'}；数组块：
                            {'{{#orders}}...{{/orders}}'}，行内变量：
                            {'{{stock}}'} {'{{quantity}}'} {'{{orderType}}'}{' '}
                            {'{{price}}'} {'{{action}}'} {'{{position}}'}
                          </Text>
                        </div>
                        <Input.TextArea
                          rows={8}
                          placeholder='请输入邮件内容'
                          value={template.content}
                          onChange={e =>
                            updateNotificationTemplate(
                              template.id,
                              'content',
                              e.target.value,
                            )
                          }
                        />
                        <div style={{ marginTop: 8 }}>
                          <Space>
                            <Button onClick={handleTogglePreview}>
                              {previewContent ? '关闭预览' : '预览模板'}
                            </Button>
                            <Button
                              type='primary'
                              onClick={handleTestSendEmail}
                            >
                              测试发送邮件
                            </Button>
                            <Text type='secondary'>
                              使用示例数据渲染含多只股票的表格
                            </Text>
                          </Space>
                          {previewContent && (
                            <Card
                              size='small'
                              style={{
                                marginTop: 8,
                                whiteSpace: 'pre-wrap',
                                backgroundColor: '#0f172a',
                                color: '#e2e8f0',
                                position: 'relative',
                              }}
                            >
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
                    console.log('保存设置:', {
                      emailConfigs,
                      notificationTemplates,
                    });
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
      </SettingsContent>
    </SettingsContainer>
  );
};

export default Settings;
