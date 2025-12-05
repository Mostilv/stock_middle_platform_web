import React, { useState, useEffect, useRef } from 'react';
import {
  Alert,
  Avatar,
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  Row,
  Select,
  Space,
  Tag,
  Upload,
} from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  SettingOutlined,
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
import { useTheme } from '../../contexts/useTheme';
import type { ThemeMode } from '../../contexts/theme-context';
import EmailSettingsModule from './components/EmailSettingsModule';
import {
  getDefaultEmailConfigs,
  getDefaultNotificationTemplates,
  MAX_EMAIL_CONFIGS,
  normalizeEmailConfigs,
  normalizeNotificationTemplates,
  type EmailConfig,
  type NotificationTemplate,
} from '../../types/emailSettings';
import {
  AccountActions,
  AccountCard,
  AccountInfo,
  SettingsCard,
  SettingsContainer,
  SettingsContent,
  SettingsForm,
  SettingsHeader,
  CardIcon,
} from './Settings.styles';

const { Option } = Select;

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
  const [emailConfigs, setEmailConfigs] = useState<EmailConfig[]>(() =>
    getDefaultEmailConfigs(),
  );
  const [avatarPreview, setAvatarPreview] = useState<string>('');
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user, logout, updateUser } = useAuth();
  const { themeMode, setThemeMode } = useTheme();
  const [profileExpanded, setProfileExpanded] = useState(false);
  const [passwordExpanded, setPasswordExpanded] = useState(false);
  const settingsLoadedRef = useRef(false);
  const profileLoadedRef = useRef(false);

  const [notificationTemplates, setNotificationTemplates] = useState<
    NotificationTemplate[]
  >(() => getDefaultNotificationTemplates());

  useEffect(() => {
    if (!isAuthenticated || settingsLoadedRef.current) return;
    let mounted = true;
    settingsLoadedRef.current = true;
    fetchSettingsData()
      .then(data => {
        if (!mounted) return;
        const normalizedEmailConfigs = normalizeEmailConfigs(
          data.emailConfigs as any,
        );
        const normalizedTemplates = normalizeNotificationTemplates(
          data.notificationTemplates as any,
        );
        setEmailConfigs(normalizedEmailConfigs);
        setNotificationTemplates(normalizedTemplates);
        updateUser({
          emailConfigs: normalizedEmailConfigs,
          notificationTemplates: normalizedTemplates,
        });
      })
      .catch(() => {
        settingsLoadedRef.current = false;
      });
    return () => {
      mounted = false;
    };
  }, [isAuthenticated, updateUser]);

  useEffect(() => {
    profileForm.setFieldsValue({
      username: user?.username || '',
      avatarUrl: user?.avatarUrl || '',
    });
    setAvatarPreview(user?.avatarUrl || '');
  }, [profileForm, user]);

  useEffect(() => {
    if (!isAuthenticated || !user) return;
    if (user.emailConfigs) {
      setEmailConfigs(normalizeEmailConfigs(user.emailConfigs));
    }
    if (user.notificationTemplates) {
      setNotificationTemplates(
        normalizeNotificationTemplates(user.notificationTemplates),
      );
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    if (!isAuthenticated || profileLoadedRef.current) return;
    let mounted = true;
    profileLoadedRef.current = true;
    fetchAccountProfile()
      .then(profile => {
        if (!mounted) return;
        const usernameValue = profile.username || user?.username || '';
        const displayName =
          profile.display_name || (profile as any).displayName || usernameValue;
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
      setEmailConfigs(getDefaultEmailConfigs());
      setNotificationTemplates(getDefaultNotificationTemplates());
    }
  }, [isAuthenticated]);

  useEffect(() => {
    form.setFieldsValue({
      theme: themeMode,
    });
  }, [form, themeMode]);

  const handleSaveEmailSettings = () => {
    if (!isAuthenticated) {
      message.info('请先登录后再保存配置');
      return;
    }
    setLoading(true);
    const payload: SettingsDataResponse = {
      emailConfigs: emailConfigs as any,
      notificationTemplates: notificationTemplates as any,
    };
    saveSettingsData(payload)
      .then(() => {
        updateUser({
          emailConfigs,
          notificationTemplates,
        });
        message.success('邮箱设置保存成功');
      })
      .catch(() => message.error('设置保存失败，请稍后重试'))
      .finally(() => setLoading(false));
  };

  const handleResetEmailSettings = () => {
    const defaults = getDefaultEmailConfigs();
    const defaultTemplates = getDefaultNotificationTemplates();
    setEmailConfigs(defaults);
    setNotificationTemplates(defaultTemplates);
    updateUser({
      emailConfigs: defaults,
      notificationTemplates: defaultTemplates,
    });
    message.info('邮箱设置已重置');
  };

  const handleThemeSelect = (mode: ThemeMode) => {
    setThemeMode(mode);
    form.setFieldsValue({ theme: mode });
    message.success(`已切换到${mode === 'dark' ? '深色' : '浅色'}主题`);
  };

  const addEmailConfig = () => {
    if (emailConfigs.length >= MAX_EMAIL_CONFIGS) {
      message.warning(`每个账号最多可设置${MAX_EMAIL_CONFIGS}个通知邮箱`);
      return;
    }
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

  const handleLogout = () => {
    logout();
    message.success('已退出登录');
  };

  const handleGoLogin = () => {
    navigate('/login', { state: { from: location } });
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
      message.error(error instanceof Error ? error.message : '密码修改失败');
    } finally {
      setPasswordLoading(false);
    }
  };

  const accountInitial = user?.username?.charAt(0).toUpperCase() || 'U';
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
                              if (
                                !value ||
                                getFieldValue('newPassword') === value
                              )
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
            onFinish={handleSaveEmailSettings}
            initialValues={{
              theme: themeMode,
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
                      <Select onChange={handleThemeSelect}>
                        <Option value='light'>浅色主题</Option>
                        <Option value='dark'>深色主题</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            </SettingsCard>

            <EmailSettingsModule
              isAuthenticated={isAuthenticated}
              themeMode={themeMode}
              emailConfigs={emailConfigs}
              notificationTemplates={notificationTemplates}
              onAddEmail={addEmailConfig}
              onRemoveEmail={removeEmailConfig}
              onUpdateEmail={updateEmailConfig}
              onUpdateTemplate={updateNotificationTemplate}
              onSave={handleSaveEmailSettings}
              onReset={handleResetEmailSettings}
              loading={loading}
            />
          </Form>
        </SettingsForm>
      </SettingsContent>
    </SettingsContainer>
  );
};

export default Settings;
