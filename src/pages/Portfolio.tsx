import React, { useState } from 'react';
import {
  Card,
  Button,
  Table,
  Tag,
  Space,
  Modal,
  Form,
  Input,
  Select,
  InputNumber,
  message,
  Row,
  Col,
  Statistic,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  SwapOutlined,
  RiseOutlined,
} from '@ant-design/icons';

const { Option } = Select;

interface PortfolioItem {
  key: string;
  stock: string;
  code: string;
  currentWeight: number;
  targetWeight: number;
  action: 'buy' | 'sell' | 'hold';
  price: number;
  quantity: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
}

const Portfolio: React.FC = () => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([
    {
      key: '1',
      stock: '贵州茅台',
      code: '600519',
      currentWeight: 15.2,
      targetWeight: 18.0,
      action: 'buy',
      price: 1688.0,
      quantity: 100,
      status: 'pending',
      createdAt: '2024-01-15',
    },
    {
      key: '2',
      stock: '宁德时代',
      code: '300750',
      currentWeight: 12.8,
      targetWeight: 10.0,
      action: 'sell',
      price: 245.6,
      quantity: 200,
      status: 'completed',
      createdAt: '2024-01-14',
    },
    {
      key: '3',
      stock: '招商银行',
      code: '600036',
      currentWeight: 8.5,
      targetWeight: 8.5,
      action: 'hold',
      price: 35.2,
      quantity: 0,
      status: 'completed',
      createdAt: '2024-01-13',
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [form] = Form.useForm();

  const columns = [
    {
      title: '股票名称',
      dataIndex: 'stock',
      key: 'stock',
    },
    {
      title: '代码',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '当前权重',
      dataIndex: 'currentWeight',
      key: 'currentWeight',
      render: (weight: number) => `${weight}%`,
    },
    {
      title: '目标权重',
      dataIndex: 'targetWeight',
      key: 'targetWeight',
      render: (weight: number) => `${weight}%`,
    },
    {
      title: '调仓动作',
      dataIndex: 'action',
      key: 'action',
      render: (action: string) => {
        const color =
          action === 'buy' ? 'green' : action === 'sell' ? 'red' : 'blue';
        const text =
          action === 'buy' ? '买入' : action === 'sell' ? '卖出' : '持有';
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `¥${price.toFixed(2)}`,
    },
    {
      title: '数量',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (quantity: number) => (quantity > 0 ? quantity : '-'),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const color =
          status === 'completed'
            ? 'green'
            : status === 'pending'
              ? 'orange'
              : 'red';
        const text =
          status === 'completed'
            ? '已完成'
            : status === 'pending'
              ? '待执行'
              : '已取消';
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: PortfolioItem) => (
        <Space size='middle'>
          <Button
            type='text'
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
          >
            查看
          </Button>
          <Button
            type='text'
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            disabled={record.status === 'completed'}
          >
            编辑
          </Button>
          <Button
            type='text'
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.key)}
            disabled={record.status === 'completed'}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const handleAdd = () => {
    setEditingItem(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (item: PortfolioItem) => {
    setEditingItem(item);
    form.setFieldsValue(item);
    setIsModalVisible(true);
  };

  const handleView = (item: PortfolioItem) => {
    Modal.info({
      title: `${item.stock} (${item.code}) 调仓详情`,
      content: (
        <div>
          <p>
            <strong>当前权重：</strong>
            {item.currentWeight}%
          </p>
          <p>
            <strong>目标权重：</strong>
            {item.targetWeight}%
          </p>
          <p>
            <strong>调仓动作：</strong>
            {item.action === 'buy'
              ? '买入'
              : item.action === 'sell'
                ? '卖出'
                : '持有'}
          </p>
          <p>
            <strong>价格：</strong>¥{item.price.toFixed(2)}
          </p>
          <p>
            <strong>数量：</strong>
            {item.quantity > 0 ? item.quantity : '-'}
          </p>
          <p>
            <strong>状态：</strong>
            {item.status === 'completed'
              ? '已完成'
              : item.status === 'pending'
                ? '待执行'
                : '已取消'}
          </p>
          <p>
            <strong>创建时间：</strong>
            {item.createdAt}
          </p>
        </div>
      ),
    });
  };

  const handleDelete = (key: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个调仓记录吗？',
      onOk: () => {
        setPortfolioItems(portfolioItems.filter(item => item.key !== key));
        message.success('删除成功');
      },
    });
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      if (editingItem) {
        // 编辑模式
        setPortfolioItems(
          portfolioItems.map(item =>
            item.key === editingItem.key ? { ...item, ...values } : item,
          ),
        );
        message.success('更新成功');
      } else {
        // 新增模式
        const newItem: PortfolioItem = {
          key: Date.now().toString(),
          ...values,
          status: 'pending',
          createdAt: new Date().toISOString().split('T')[0],
        };
        setPortfolioItems([...portfolioItems, newItem]);
        message.success('创建成功');
      }
      setIsModalVisible(false);
    });
  };

  // 统计数据
  const totalItems = portfolioItems.length;
  const pendingItems = portfolioItems.filter(
    item => item.status === 'pending',
  ).length;
  const completedItems = portfolioItems.filter(
    item => item.status === 'completed',
  ).length;
  const buyItems = portfolioItems.filter(item => item.action === 'buy').length;
  const sellItems = portfolioItems.filter(
    item => item.action === 'sell',
  ).length;

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-2xl font-bold text-gray-800'>调仓管理</h1>
          <p className='text-gray-600'>管理您的投资组合调仓操作</p>
        </div>
        <Button type='primary' icon={<PlusOutlined />} onClick={handleAdd}>
          新建调仓
        </Button>
      </div>

      {/* 统计卡片 */}
      <Row gutter={16} className='mb-6'>
        <Col span={6}>
          <Card>
            <Statistic
              title='总调仓数'
              value={totalItems}
              valueStyle={{ color: 'var(--ant-color-primary)' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title='待执行'
              value={pendingItems}
              valueStyle={{ color: 'var(--ant-color-warning)' }}
              suffix={<SwapOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title='已完成'
              value={completedItems}
              valueStyle={{ color: 'var(--ant-color-success)' }}
              suffix={<RiseOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title='买入/卖出'
              value={`${buyItems}/${sellItems}`}
              valueStyle={{ color: 'var(--ant-color-purple)' }}
            />
          </Card>
        </Col>
      </Row>

      <Card>
        <Table
          columns={columns}
          dataSource={portfolioItems}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: total => `共 ${total} 条记录`,
          }}
        />
      </Card>

      <Modal
        title={editingItem ? '编辑调仓' : '新建调仓'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        width={600}
      >
        <Form
          form={form}
          layout='vertical'
          initialValues={{ action: 'hold', status: 'pending' }}
        >
          <Form.Item
            name='stock'
            label='股票名称'
            rules={[{ required: true, message: '请输入股票名称' }]}
          >
            <Input placeholder='请输入股票名称' />
          </Form.Item>

          <Form.Item
            name='code'
            label='股票代码'
            rules={[{ required: true, message: '请输入股票代码' }]}
          >
            <Input placeholder='请输入股票代码' />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name='currentWeight'
                label='当前权重(%)'
                rules={[{ required: true, message: '请输入当前权重' }]}
              >
                <InputNumber
                  min={0}
                  max={100}
                  placeholder='当前权重'
                  className='form-input-full-width'
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name='targetWeight'
                label='目标权重(%)'
                rules={[{ required: true, message: '请输入目标权重' }]}
              >
                <InputNumber
                  min={0}
                  max={100}
                  placeholder='目标权重'
                  className='form-input-full-width'
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name='action'
            label='调仓动作'
            rules={[{ required: true, message: '请选择调仓动作' }]}
          >
            <Select placeholder='请选择调仓动作'>
              <Option value='buy'>买入</Option>
              <Option value='sell'>卖出</Option>
              <Option value='hold'>持有</Option>
            </Select>
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name='price'
                label='价格'
                rules={[{ required: true, message: '请输入价格' }]}
              >
                <InputNumber
                  min={0}
                  placeholder='价格'
                  className='form-input-full-width'
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name='quantity'
                label='数量'
                rules={[{ required: true, message: '请输入数量' }]}
              >
                <InputNumber
                  min={0}
                  placeholder='数量'
                  className='form-input-full-width'
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name='status' label='状态'>
            <Select>
              <Option value='pending'>待执行</Option>
              <Option value='completed'>已完成</Option>
              <Option value='cancelled'>已取消</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Portfolio;
