import React, { useEffect, useMemo, useState } from 'react';
import { Alert, Button, Checkbox, Form, Input, Space, Typography } from 'antd';
import {
  LockOutlined,
  SafetyCertificateOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useLocation, useNavigate, type Location } from 'react-router-dom';
import {
  PageBody,
  PageContainer,
  PageHeader,
  PageTitle,
} from '../../components/PageLayout';
import { useAuth } from '../../contexts/AuthContext';
import { FormCard, Hero, LoginPage, Panel, PanelBody } from './Login.styles';

const { Title, Paragraph, Text } = Typography;

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loading, isAuthenticated } = useAuth();
  const redirectPath =
    (location.state as { from?: Location })?.from?.pathname || '/';

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectPath === '/login' ? '/' : redirectPath, {
        replace: true,
      });
    }
  }, [isAuthenticated, navigate, redirectPath]);

  const onFinish = async (values: { username: string; password: string }) => {
    setError(null);
    const ok = await login(values.username, values.password);
    if (!ok) {
      setError('账号或密码错误，请重试');
      return;
    }
    navigate(redirectPath === '/login' ? '/' : redirectPath, { replace: true });
  };

  const commonAccounts = useMemo(
    () => [
      { label: '管理员', username: 'admin', password: '123456' },
      { label: '交易员', username: 'trader', password: '123456' },
    ],
    [],
  );

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>
          <SafetyCertificateOutlined />
          登录
        </PageTitle>
        <Text type='secondary'>
          登录页作为子页面存在，如无账号可通过侧边菜单切换到其他页面。
        </Text>
      </PageHeader>

      <PageBody>
        <LoginPage>
          <Panel>
            <PanelBody>
              <Hero>
                <span className='pill'>
                  <SafetyCertificateOutlined />
                  访问控制
                </span>
                <Title level={3}>登录后才能管理用户与订阅策略</Title>
                <Paragraph>
                  - 用户管理、策略订阅为需要账号校验的入口
                  <br />
                  - 调仓页保留管理员级别的总开关，与订阅独立
                  <br />
                  - 收到交易信号后，用户可按需订阅策略并设置通知渠道
                </Paragraph>
                <div>
                  <Text style={{ color: '#cbd5e1' }}>快速体验：</Text>
                  <div className='badges'>
                    {commonAccounts.map(item => (
                      <span
                        key={item.username}
                        onClick={() =>
                          form.setFieldsValue({
                            username: item.username,
                            password: item.password,
                          })
                        }
                      >
                        {item.label}: {item.username}/{item.password}
                      </span>
                    ))}
                  </div>
                </div>
              </Hero>

              <FormCard>
                <Title level={4} style={{ margin: 0 }}>
                  账号登录
                </Title>
                <Text type='secondary'>
                  仅当访问用户管理或策略订阅时需要登录，其余页面保持可浏览。
                </Text>
                {error && <Alert type='error' message={error} showIcon />}
                <Form
                  layout='vertical'
                  form={form}
                  onFinish={onFinish}
                  initialValues={{ username: 'admin', password: '123456' }}
                >
                  <Form.Item
                    label='用户名'
                    name='username'
                    rules={[{ required: true, message: '请输入用户名' }]}
                  >
                    <Input prefix={<UserOutlined />} placeholder='请输入用户名' />
                  </Form.Item>
                  <Form.Item
                    label='密码'
                    name='password'
                    rules={[{ required: true, message: '请输入密码' }]}
                  >
                    <Input.Password
                      prefix={<LockOutlined />}
                      placeholder='请输入密码'
                    />
                  </Form.Item>
                  <Form.Item>
                    <Space
                      align='center'
                      style={{ width: '100%', justifyContent: 'space-between' }}
                    >
                      <Checkbox>记住我</Checkbox>
                      <Text type='secondary'>如需权限，请联系管理员开通</Text>
                    </Space>
                  </Form.Item>
                  <Form.Item style={{ marginBottom: 0 }}>
                    <Button
                      type='primary'
                      htmlType='submit'
                      block
                      loading={loading}
                      size='large'
                    >
                      立即登录
                    </Button>
                  </Form.Item>
                </Form>
              </FormCard>
            </PanelBody>
          </Panel>
        </LoginPage>
      </PageBody>
    </PageContainer>
  );
};

export default Login;
