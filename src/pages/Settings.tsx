import React, { useState } from 'react';
import { 
  Card, 
  Form, 
  Input, 
  Button, 
  Switch, 
  Select, 
  InputNumber,
  message,
  Row,
  Col,
  Space
} from 'antd';
import { 
  SaveOutlined, 
  ReloadOutlined,
  UserOutlined,
  BellOutlined,
  SecurityScanOutlined,
  SettingOutlined
} from '@ant-design/icons';

const { Option } = Select;

const Settings: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = (values: any) => {
    setLoading(true);
    // 模拟保存设置
    setTimeout(() => {
      console.log('保存设置:', values);
      message.success('设置保存成功');
      setLoading(false);
    }, 1000);
  };

  const handleReset = () => {
    form.resetFields();
    message.info('设置已重置');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">系统设置</h1>
        <p className="text-gray-600">配置您的个人偏好和系统参数</p>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          username: 'admin',
          email: 'admin@example.com',
          theme: 'light',
          language: 'zh-CN',
          autoRefresh: true,
          refreshInterval: 30,
          notifications: true,
          emailNotifications: false,
          riskLevel: 'medium',
          maxPositions: 20,
          stopLoss: 5,
          takeProfit: 10,
        }}
      >
        {/* 个人信息设置 */}
        <Card 
          title={
            <Space>
              <UserOutlined />
              <span>个人信息</span>
            </Space>
          }
          className="mb-6"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="username"
                label="用户名"
                rules={[{ required: true, message: '请输入用户名' }]}
              >
                <Input placeholder="请输入用户名" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                label="邮箱"
                rules={[
                  { required: true, message: '请输入邮箱' },
                  { type: 'email', message: '请输入有效的邮箱地址' }
                ]}
              >
                <Input placeholder="请输入邮箱" />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* 界面设置 */}
        <Card 
          title={
            <Space>
              <SettingOutlined />
              <span>界面设置</span>
            </Space>
          }
          className="mb-6"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="theme"
                label="主题"
              >
                <Select>
                  <Option value="light">浅色主题</Option>
                  <Option value="dark">深色主题</Option>
                  <Option value="auto">跟随系统</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="language"
                label="语言"
              >
                <Select>
                  <Option value="zh-CN">简体中文</Option>
                  <Option value="en-US">English</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* 数据设置 */}
        <Card 
          title={
            <Space>
              <ReloadOutlined />
              <span>数据设置</span>
            </Space>
          }
          className="mb-6"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="autoRefresh"
                label="自动刷新"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="refreshInterval"
                label="刷新间隔(秒)"
                rules={[{ required: true, message: '请输入刷新间隔' }]}
              >
                <InputNumber 
                  min={10} 
                  max={300} 
                  placeholder="刷新间隔"
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* 通知设置 */}
        <Card 
          title={
            <Space>
              <BellOutlined />
              <span>通知设置</span>
            </Space>
          }
          className="mb-6"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="notifications"
                label="系统通知"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="emailNotifications"
                label="邮件通知"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* 风控设置 */}
        <Card 
          title={
            <Space>
              <SecurityScanOutlined />
              <span>风控设置</span>
            </Space>
          }
          className="mb-6"
        >
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="riskLevel"
                label="风险等级"
              >
                <Select>
                  <Option value="low">低风险</Option>
                  <Option value="medium">中风险</Option>
                  <Option value="high">高风险</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="maxPositions"
                label="最大持仓数"
                rules={[{ required: true, message: '请输入最大持仓数' }]}
              >
                <InputNumber 
                  min={1} 
                  max={100} 
                  placeholder="最大持仓数"
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="stopLoss"
                label="止损比例(%)"
                rules={[{ required: true, message: '请输入止损比例' }]}
              >
                <InputNumber 
                  min={1} 
                  max={50} 
                  placeholder="止损比例"
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="takeProfit"
                label="止盈比例(%)"
                rules={[{ required: true, message: '请输入止盈比例' }]}
              >
                <InputNumber 
                  min={1} 
                  max={100} 
                  placeholder="止盈比例"
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* 操作按钮 */}
        <Card>
          <Space>
            <Button 
              type="primary" 
              icon={<SaveOutlined />} 
              htmlType="submit"
              loading={loading}
            >
              保存设置
            </Button>
            <Button 
              icon={<ReloadOutlined />} 
              onClick={handleReset}
            >
              重置
            </Button>
          </Space>
        </Card>
      </Form>
    </div>
  );
};

export default Settings;

