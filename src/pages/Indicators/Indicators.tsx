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
  message,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from '@ant-design/icons';

const { Option } = Select;

interface Indicator {
  key: string;
  name: string;
  description: string;
  type: string;
  formula: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

const Indicators: React.FC = () => {
  const [indicators, setIndicators] = useState<Indicator[]>([
    {
      key: '1',
      name: 'RSI相对强弱指标',
      description: '衡量股票超买超卖状态的技术指标',
      type: '技术指标',
      formula: 'RSI = 100 - (100 / (1 + RS))',
      status: 'active',
      createdAt: '2024-01-15',
    },
    {
      key: '2',
      name: 'MACD指标',
      description: '移动平均收敛散度指标',
      type: '技术指标',
      formula: 'MACD = EMA(12) - EMA(26)',
      status: 'active',
      createdAt: '2024-01-10',
    },
    {
      key: '3',
      name: '自定义动量指标',
      description: '基于价格动量的自定义指标',
      type: '自定义',
      formula: 'MOM = (CLOSE - CLOSE[10]) / CLOSE[10] * 100',
      status: 'inactive',
      createdAt: '2024-01-05',
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingIndicator, setEditingIndicator] = useState<Indicator | null>(
    null,
  );
  const [form] = Form.useForm();

  const columns = [
    {
      title: '指标名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => (
        <Tag color={type === '技术指标' ? 'blue' : 'green'}>{type}</Tag>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status === 'active' ? '启用' : '禁用'}
        </Tag>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: Indicator) => (
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
          >
            编辑
          </Button>
          <Button
            type='text'
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.key)}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const handleAdd = () => {
    setEditingIndicator(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (indicator: Indicator) => {
    setEditingIndicator(indicator);
    form.setFieldsValue(indicator);
    setIsModalVisible(true);
  };

  const handleView = (indicator: Indicator) => {
    Modal.info({
      title: indicator.name,
      content: (
        <div>
          <p>
            <strong>描述：</strong>
            {indicator.description}
          </p>
          <p>
            <strong>类型：</strong>
            {indicator.type}
          </p>
          <p>
            <strong>公式：</strong>
            {indicator.formula}
          </p>
          <p>
            <strong>状态：</strong>
            {indicator.status === 'active' ? '启用' : '禁用'}
          </p>
          <p>
            <strong>创建时间：</strong>
            {indicator.createdAt}
          </p>
        </div>
      ),
    });
  };

  const handleDelete = (key: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个指标吗？',
      onOk: () => {
        setIndicators(indicators.filter(item => item.key !== key));
        message.success('删除成功');
      },
    });
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      if (editingIndicator) {
        // 编辑模式
        setIndicators(
          indicators.map(item =>
            item.key === editingIndicator.key ? { ...item, ...values } : item,
          ),
        );
        message.success('更新成功');
      } else {
        // 新增模式
        const newIndicator: Indicator = {
          key: Date.now().toString(),
          ...values,
          status: 'active',
          createdAt: new Date().toISOString().split('T')[0],
        };
        setIndicators([...indicators, newIndicator]);
        message.success('创建成功');
      }
      setIsModalVisible(false);
    });
  };

  return (
    <div className='space-y-6'>
      <div className='text-center mb-6'>
        <h1 className='text-2xl font-bold text-gray-800 mb-2'>自定义指标</h1>
        <p className='text-gray-600'>管理和创建您的自定义技术指标</p>
      </div>
      
      <div className='flex justify-end mb-6'>
        <Button type='primary' icon={<PlusOutlined />} onClick={handleAdd}>
          新建指标
        </Button>
      </div>

      <Card>
        <Table
          columns={columns}
          dataSource={indicators}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: total => `共 ${total} 条记录`,
          }}
        />
      </Card>

      <Modal
        title={editingIndicator ? '编辑指标' : '新建指标'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        width={600}
      >
        <Form
          form={form}
          layout='vertical'
          initialValues={{ status: 'active' }}
        >
          <Form.Item
            name='name'
            label='指标名称'
            rules={[{ required: true, message: '请输入指标名称' }]}
          >
            <Input placeholder='请输入指标名称' />
          </Form.Item>

          <Form.Item
            name='description'
            label='描述'
            rules={[{ required: true, message: '请输入指标描述' }]}
          >
            <Input.TextArea rows={3} placeholder='请输入指标描述' />
          </Form.Item>

          <Form.Item
            name='type'
            label='类型'
            rules={[{ required: true, message: '请选择指标类型' }]}
          >
            <Select placeholder='请选择指标类型'>
              <Option value='技术指标'>技术指标</Option>
              <Option value='自定义'>自定义</Option>
              <Option value='基本面'>基本面</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name='formula'
            label='计算公式'
            rules={[{ required: true, message: '请输入计算公式' }]}
          >
            <Input.TextArea
              rows={3}
              placeholder='请输入计算公式，例如：RSI = 100 - (100 / (1 + RS))'
            />
          </Form.Item>

          <Form.Item name='status' label='状态'>
            <Select>
              <Option value='active'>启用</Option>
              <Option value='inactive'>禁用</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Indicators;
