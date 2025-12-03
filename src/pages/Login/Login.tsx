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
import { useAuth } from '../../contexts/useAuth';
import { FormCard, LoginPage, Panel } from './Login.styles';

const { Title, Text } = Typography;

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loading, isAuthenticated } = useAuth();
  const redirectPath =
    (location.state as { from?: Location })?.from?.pathname || '/';

  const commonAccounts = useMemo(
    () => [
      { label: '管理员', username: 'admin', password: '123456' },
      { label: '交易员', username: 'trader', password: '123456' },
    ],
    [],
  );

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

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>
          <SafetyCertificateOutlined />
          登录
        </PageTitle>
        <Text type='secondary'>仅在需要授权的模块中使用账号登录。</Text>
      </PageHeader>

      <PageBody>
        <LoginPage>
          <Panel>
            <FormCard>
              <Title level={4} style={{ margin: 0 }}>
                账户登录
              </Title>
              {error && (
                <Alert
                  className='login-error'
                  type='error'
                  message={error}
                  showIcon
                />
              )}
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
                  <Input
                    prefix={<UserOutlined />}
                    placeholder='请输入用户名'
                    allowClear
                  />
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
                    <Checkbox>记住账号</Checkbox>
                    <Text type='secondary'>如需扩展权限请联系管理员</Text>
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
              <div className='quick-fill'>
                <Text>快速体验</Text>
                <div className='badges'>
                  {commonAccounts.map(item => (
                    <button
                      type='button'
                      key={item.username}
                      onClick={() =>
                        form.setFieldsValue({
                          username: item.username,
                          password: item.password,
                        })
                      }
                    >
                      {item.label}&nbsp;{item.username}/{item.password}
                    </button>
                  ))}
                </div>
              </div>
            </FormCard>
          </Panel>
        </LoginPage>
      </PageBody>
    </PageContainer>
  );
};

export default Login;
