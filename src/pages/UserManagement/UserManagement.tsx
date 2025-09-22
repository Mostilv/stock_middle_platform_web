import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  Switch,
  message,
  Popconfirm,
  Tag,
  Avatar,
  Typography,
  Row,
  Col,
  Tooltip,
  Alert,
} from 'antd';
import {
  UserOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
  SearchOutlined,
  MailOutlined,
  CrownOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { fetchUsers, createUser, updateUser, deleteUser } from './services/user.api';
import type { User, UserCreate, UserUpdate } from './services/user.api';
import {
  UserManagementContainer,
  UserManagementHeader,
  UserManagementCard,
  UserActions,
  SearchContainer,
} from './UserManagement.styles';

const { Title } = Typography;
const { Search } = Input;

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchText, setSearchText] = useState('');

  // 获取用户列表
  const loadUsers = async () => {
    try {
      setTableLoading(true);
      setError(null);
      const data = await fetchUsers();
      // 确保数据是数组类型
      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '获取用户列表失败';
      setError(errorMessage);
      message.error(errorMessage);
      // 发生错误时确保users是空数组
      setUsers([]);
    } finally {
      setTableLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // 处理新增/编辑用户
  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      if (editingUser) {
        // 编辑用户
        const updateData: UserUpdate = {
          username: values.username,
          email: values.email,
          full_name: values.full_name,
          is_active: values.is_active,
          is_superuser: values.is_superuser,
        };
        await updateUser(editingUser.id, updateData);
        message.success('用户更新成功');
      } else {
        // 新增用户
        const createData: UserCreate = {
          username: values.username,
          email: values.email,
          password: values.password,
          full_name: values.full_name,
        };
        await createUser(createData);
        message.success('用户创建成功');
      }
      setIsModalVisible(false);
      form.resetFields();
      setEditingUser(null);
      loadUsers();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : (editingUser ? '用户更新失败' : '用户创建失败');
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // 处理删除用户
  const handleDelete = async (id: number) => {
    try {
      setTableLoading(true);
      await deleteUser(id);
      message.success('用户删除成功');
      loadUsers();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '用户删除失败';
      message.error(errorMessage);
      setTableLoading(false);
    }
  };

  // 打开编辑模态框
  const handleEdit = (user: User) => {
    setEditingUser(user);
    form.setFieldsValue({
      username: user.username,
      email: user.email,
      full_name: user.full_name,
      is_active: user.is_active,
      is_superuser: user.is_superuser,
    });
    setIsModalVisible(true);
  };

  // 打开新增模态框
  const handleAdd = () => {
    setEditingUser(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  // 过滤用户数据
  const filteredUsers = Array.isArray(users) ? users.filter(user =>
    user.username.toLowerCase().includes(searchText.toLowerCase()) ||
    user.email.toLowerCase().includes(searchText.toLowerCase()) ||
    (user.full_name && user.full_name.toLowerCase().includes(searchText.toLowerCase()))
  ) : [];

  // 表格列定义
  const columns: ColumnsType<User> = [
    {
      title: '用户',
      dataIndex: 'username',
      key: 'username',
      render: (text: string, record: User) => (
        <Space>
          <Avatar icon={<UserOutlined />} />
          <div>
            <div style={{ fontWeight: 500 }}>{text}</div>
            <div style={{ fontSize: '12px', color: '#666' }}>{record.full_name}</div>
          </div>
        </Space>
      ),
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      render: (email: string) => (
        <Space>
          <MailOutlined style={{ color: '#1890ff' }} />
          {email}
        </Space>
      ),
    },
    {
      title: '状态',
      dataIndex: 'is_active',
      key: 'is_active',
      render: (isActive: boolean) => (
        <Tag color={isActive ? 'green' : 'red'}>
          {isActive ? '活跃' : '禁用'}
        </Tag>
      ),
    },
    {
      title: '角色',
      dataIndex: 'is_superuser',
      key: 'is_superuser',
      render: (isSuperuser: boolean) => (
        <Tag color={isSuperuser ? 'gold' : 'blue'} icon={isSuperuser ? <CrownOutlined /> : <UserOutlined />}>
          {isSuperuser ? '管理员' : '普通用户'}
        </Tag>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (date: string) => new Date(date).toLocaleString('zh-CN'),
    },
    {
      title: '操作',
      key: 'actions',
      render: (_, record: User) => (
        <Space>
          <Tooltip title="编辑用户">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
            />
          </Tooltip>
          <Popconfirm
            title="确定要删除这个用户吗？"
            onConfirm={() => handleDelete(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Tooltip title="删除用户">
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
              />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <UserManagementContainer>
      <UserManagementHeader>
        <Title level={2} style={{ margin: 0, color: '#fff' }}>
          <UserOutlined style={{ marginRight: 8 }} />
          用户管理
        </Title>
      </UserManagementHeader>

      <UserManagementCard>
        <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
          <Col>
            <SearchContainer>
              <Search
                placeholder="搜索用户名、邮箱或姓名"
                allowClear
                style={{ width: 300 }}
                onChange={(e) => setSearchText(e.target.value)}
                prefix={<SearchOutlined />}
              />
            </SearchContainer>
          </Col>
          <Col>
            <UserActions>
              <Button
                icon={<ReloadOutlined />}
                onClick={loadUsers}
                loading={loading}
              >
                刷新
              </Button>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleAdd}
              >
                新增用户
              </Button>
            </UserActions>
          </Col>
        </Row>

        {error && (
          <Alert
            message="数据加载失败"
            description={error}
            type="error"
            showIcon
            style={{ marginBottom: 16 }}
            action={
              <Button size="small" onClick={loadUsers}>
                重试
              </Button>
            }
          />
        )}
        <Table
          columns={columns}
          dataSource={filteredUsers}
          rowKey="id"
          loading={tableLoading}
          pagination={{
            total: filteredUsers.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`,
          }}
        />
      </UserManagementCard>

      {/* 新增/编辑用户模态框 */}
      <Modal
        title={editingUser ? '编辑用户' : '新增用户'}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
          setEditingUser(null);
        }}
        footer={null}
        width={600}
        confirmLoading={loading}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              { required: true, message: '请输入用户名' },
              { min: 3, message: '用户名至少3个字符' },
              { max: 50, message: '用户名最多50个字符' },
            ]}
          >
            <Input placeholder="请输入用户名" />
          </Form.Item>

          <Form.Item
            label="邮箱"
            name="email"
            rules={[
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '请输入有效的邮箱地址' },
            ]}
          >
            <Input placeholder="请输入邮箱" />
          </Form.Item>

          <Form.Item
            label="姓名"
            name="full_name"
          >
            <Input placeholder="请输入姓名" />
          </Form.Item>

          {!editingUser && (
            <Form.Item
              label="密码"
              name="password"
              rules={[
                { required: true, message: '请输入密码' },
                { min: 6, message: '密码至少6个字符' },
              ]}
            >
              <Input.Password placeholder="请输入密码" />
            </Form.Item>
          )}

          {editingUser && (
            <>
              <Form.Item
                label="账户状态"
                name="is_active"
                valuePropName="checked"
              >
                <Switch checkedChildren="启用" unCheckedChildren="禁用" />
              </Form.Item>

              <Form.Item
                label="管理员权限"
                name="is_superuser"
                valuePropName="checked"
              >
                <Switch checkedChildren="是" unCheckedChildren="否" />
              </Form.Item>
            </>
          )}

          <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
              <Space>
                <Button 
                  onClick={() => {
                    setIsModalVisible(false);
                    setEditingUser(null);
                    form.resetFields();
                  }}
                  disabled={loading}
                >
                  取消
                </Button>
                <Button 
                  type="primary" 
                  htmlType="submit"
                  loading={loading}
                >
                  {editingUser ? '更新' : '创建'}
                </Button>
              </Space>
            </Form.Item>
        </Form>
      </Modal>
    </UserManagementContainer>
  );
};

export default UserManagement;