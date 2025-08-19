import React from 'react';
import { Row, Col, Card, Statistic, Progress, Table } from 'antd';
import { 
  ArrowUpOutlined, 
  ArrowDownOutlined,
  RiseOutlined
} from '@ant-design/icons';

const Dashboard: React.FC = () => {
  // 模拟数据
  const portfolioData = [
    {
      key: '1',
      stock: '贵州茅台',
      code: '600519',
      price: 1688.00,
      change: 2.5,
      weight: 15.2,
    },
    {
      key: '2',
      stock: '宁德时代',
      code: '300750',
      price: 245.60,
      change: -1.8,
      weight: 12.8,
    },
    {
      key: '3',
      stock: '招商银行',
      code: '600036',
      price: 35.20,
      change: 0.5,
      weight: 8.5,
    },
  ];

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
      title: '当前价格',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `¥${price.toFixed(2)}`,
    },
    {
      title: '涨跌幅',
      dataIndex: 'change',
      key: 'change',
      render: (change: number) => (
        <span style={{ color: change >= 0 ? '#52c41a' : '#ff4d4f' }}>
          {change >= 0 ? '+' : ''}{change}%
          {change >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
        </span>
      ),
    },
    {
      title: '权重',
      dataIndex: 'weight',
      key: 'weight',
      render: (weight: number) => `${weight}%`,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">仪表盘</h1>
        <p className="text-gray-600">欢迎使用A股指标与调仓管理系统</p>
      </div>

      {/* 统计卡片 */}
      <Row gutter={16} className="mb-6">
        <Col span={6}>
          <Card>
            <Statistic
              title="总资产"
              value={1128934}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix="¥"
              suffix={<RiseOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="今日收益"
              value={11280}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix="¥"
              suffix={<RiseOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="收益率"
              value={11.28}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              suffix="%"
              prefix={<RiseOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="持仓数量"
              value={15}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
      </Row>

      {/* 资产配置 */}
      <Row gutter={16} className="mb-6">
        <Col span={12}>
          <Card title="资产配置" className="h-80">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span>股票</span>
                  <span>75%</span>
                </div>
                <Progress percent={75} strokeColor="#1890ff" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>债券</span>
                  <span>15%</span>
                </div>
                <Progress percent={15} strokeColor="#52c41a" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>现金</span>
                  <span>10%</span>
                </div>
                <Progress percent={10} strokeColor="#faad14" />
              </div>
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="行业分布" className="h-80">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span>消费</span>
                  <span>30%</span>
                </div>
                <Progress percent={30} strokeColor="#722ed1" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>科技</span>
                  <span>25%</span>
                </div>
                <Progress percent={25} strokeColor="#eb2f96" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>金融</span>
                  <span>20%</span>
                </div>
                <Progress percent={20} strokeColor="#13c2c2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>其他</span>
                  <span>25%</span>
                </div>
                <Progress percent={25} strokeColor="#fa8c16" />
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* 持仓明细 */}
      <Card title="持仓明细">
        <Table 
          columns={columns} 
          dataSource={portfolioData} 
          pagination={false}
          size="small"
        />
      </Card>
    </div>
  );
};

export default Dashboard;

