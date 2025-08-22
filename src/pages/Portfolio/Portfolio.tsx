import React, { useState, useMemo } from 'react';
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
  Collapse,
  Typography,
  Divider,
  Switch,
  Descriptions,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  SwapOutlined,
  RiseOutlined,
  CaretRightOutlined,
  CaretDownOutlined,
  SettingOutlined,
  DollarOutlined,
  BarChartOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';
import {
  PortfolioContainer,
  PortfolioHeader,
  StatisticsRow,
  PortfolioCard,
  ActionTag,
  StatusTag,
  ActionButton,
  FormInput,
  ClickableButton,
} from './Portfolio.styles';

const { Option } = Select;
const { Panel } = Collapse;
const { Title, Text } = Typography;

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
  marketValue: number; // 市值
}

interface StockDetail {
  name: string;
  code: string;
  industry: string;
  marketCap: string;
  pe: number;
  pb: number;
  dividendYield: number;
  volume: string;
  turnover: number;
  high52w: number;
  low52w: number;
  klineData: Array<[string, number, number, number, number, number]>; // [日期, 开盘, 收盘, 最低, 最高, 成交量]
}

interface Strategy {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive';
  totalValue: number;
  totalWeight: number;
  items: PortfolioItem[];
  createdAt: string;
}

const Portfolio: React.FC = () => {
  const [strategies, setStrategies] = useState<Strategy[]>([
    {
      id: '1',
      name: '价值投资策略',
      description: '基于基本面分析的价值投资策略',
      status: 'active',
      totalValue: 1000000,
      totalWeight: 100,
      items: [
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
          marketValue: 168800,
        },
        {
          key: '2',
          stock: '招商银行',
          code: '600036',
          currentWeight: 8.5,
          targetWeight: 8.5,
          action: 'hold',
          price: 35.2,
          quantity: 0,
          status: 'completed',
          createdAt: '2024-01-13',
          marketValue: 0,
        },
      ],
      createdAt: '2024-01-01',
    },
    {
      id: '2',
      name: '成长投资策略',
      description: '专注于高成长性公司的投资策略',
      status: 'active',
      totalValue: 800000,
      totalWeight: 100,
      items: [
        {
          key: '3',
          stock: '宁德时代',
          code: '300750',
          currentWeight: 12.8,
          targetWeight: 10.0,
          action: 'sell',
          price: 245.6,
          quantity: 200,
          status: 'completed',
          createdAt: '2024-01-14',
          marketValue: 49120,
        },
      ],
      createdAt: '2024-01-05',
    },
    {
      id: '3',
      name: '量化交易策略',
      description: '基于技术指标的量化交易策略',
      status: 'inactive',
      totalValue: 500000,
      totalWeight: 100,
      items: [],
      createdAt: '2024-01-10',
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [editingStrategy, setEditingStrategy] = useState<Strategy | null>(null);
  const [stockDetailVisible, setStockDetailVisible] = useState(false);
  const [currentStockDetail, setCurrentStockDetail] = useState<StockDetail | null>(null);
  const [form] = Form.useForm();

  // 模拟股票详情数据
  const getStockDetail = (code: string): StockDetail => {
    // 生成最近30个交易日的K线数据
    const generateKlineData = (basePrice: number, volatility: number = 0.03) => {
      const data: Array<[string, number, number, number, number, number]> = [];
      let currentPrice = basePrice;
      
      for (let i = 29; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        
        // 生成随机价格波动
        const change = (Math.random() - 0.5) * 2 * volatility * currentPrice;
        const open = currentPrice;
        const close = currentPrice + change;
        const high = Math.max(open, close) + Math.random() * volatility * currentPrice;
        const low = Math.min(open, close) - Math.random() * volatility * currentPrice;
        const volume = Math.floor(Math.random() * 1000000) + 500000;
        
        data.push([dateStr, open, close, low, high, volume]);
        currentPrice = close;
      }
      
      return data;
    };

    const details: { [key: string]: StockDetail } = {
      '600519': {
        name: '贵州茅台',
        code: '600519',
        industry: '白酒',
        marketCap: '2.1万亿',
        pe: 28.5,
        pb: 12.3,
        dividendYield: 1.2,
        volume: '2.3亿',
        turnover: 3.8,
        high52w: 1899,
        low52w: 1333,
        klineData: generateKlineData(1688, 0.02),
      },
      '600036': {
        name: '招商银行',
        code: '600036',
        industry: '银行',
        marketCap: '8500亿',
        pe: 6.8,
        pb: 0.9,
        dividendYield: 4.5,
        volume: '1.8亿',
        turnover: 2.1,
        high52w: 42.5,
        low52w: 28.3,
        klineData: generateKlineData(35.2, 0.04),
      },
      '300750': {
        name: '宁德时代',
        code: '300750',
        industry: '新能源',
        marketCap: '1.2万亿',
        pe: 45.2,
        pb: 8.7,
        dividendYield: 0.8,
        volume: '3.5亿',
        turnover: 5.2,
        high52w: 289,
        low52w: 156,
        klineData: generateKlineData(245.6, 0.05),
      },
    };
    return details[code] || {
      name: '未知股票',
      code: code,
      industry: '未知',
      marketCap: '0',
      pe: 0,
      pb: 0,
      dividendYield: 0,
      volume: '0',
      turnover: 0,
      high52w: 0,
      low52w: 0,
      klineData: generateKlineData(100, 0.03),
    };
  };

  const columns = [
    {
      title: '股票名称',
      dataIndex: 'stock',
      key: 'stock',
      width: 120,
    },
    {
      title: '代码',
      dataIndex: 'code',
      key: 'code',
      width: 100,
    },
    {
      title: '当前仓位',
      dataIndex: 'currentWeight',
      key: 'currentWeight',
      width: 100,
      render: (weight: number) => `${weight}%`,
    },
    {
      title: '目标仓位',
      dataIndex: 'targetWeight',
      key: 'targetWeight',
      width: 100,
      render: (weight: number) => `${weight}%`,
    },
    {
      title: '调仓动作',
      dataIndex: 'action',
      key: 'action',
      width: 100,
      render: (action: string) => {
        const color =
          action === 'buy' ? 'green' : action === 'sell' ? 'red' : 'blue';
        const text =
          action === 'buy' ? '买入' : action === 'sell' ? '卖出' : '持有';
        return <ActionTag $action={action as 'buy' | 'sell' | 'hold'}>{text}</ActionTag>;
      },
    },
    {
      title: '市值',
      dataIndex: 'marketValue',
      key: 'marketValue',
      width: 120,
      render: (value: number) => `¥${value.toLocaleString()}`,
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      width: 100,
      render: (price: number) => `¥${price.toFixed(2)}`,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
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
        return <StatusTag $status={status as 'pending' | 'completed' | 'cancelled'}>{text}</StatusTag>;
      },
    },
    {
      title: '查看详情',
      key: 'detail',
      width: 100,
      render: (_: any, record: PortfolioItem) => (
        <ClickableButton
          type='text'
          icon={<EyeOutlined />}
          onClick={() => handleViewStockDetail(record)}
        >
          查看详情
        </ClickableButton>
      ),
    },
  ];

  const handleViewStockDetail = (item: PortfolioItem) => {
    const stockDetail = getStockDetail(item.code);
    setCurrentStockDetail(stockDetail);
    setStockDetailVisible(true);
  };

  // K线图配置
  const getKlineOption = (stockDetail: StockDetail) => {
    const dates = stockDetail.klineData.map(item => item[0]);
    const data = stockDetail.klineData.map(item => item.slice(1, 5)); // 只取OHLC数据
    
    return {
      title: {
        text: `${stockDetail.name} (${stockDetail.code}) 最近30个交易日K线图`,
        left: 'center',
        textStyle: {
          fontSize: 16,
          fontWeight: 'bold'
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        },
        formatter: function (params: any) {
          const data = params[0].data;
          return `${params[0].axisValue}<br/>
                  开盘: ${data[1]}<br/>
                  收盘: ${data[2]}<br/>
                  最低: ${data[3]}<br/>
                  最高: ${data[4]}`;
        }
      },
      grid: {
        left: '10%',
        right: '10%',
        bottom: '15%'
      },
      xAxis: {
        type: 'category',
        data: dates,
        scale: true,
        boundaryGap: false,
        axisLine: { onZero: false },
        splitLine: { show: false },
        splitNumber: 20
      },
      yAxis: {
        scale: true,
        splitArea: {
          show: true
        }
      },
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 100
        },
        {
          show: true,
          type: 'slider',
          top: '90%',
          start: 0,
          end: 100
        }
      ],
      series: [
        {
          name: 'K线',
          type: 'candlestick',
          data: data,
          itemStyle: {
            color: '#FD1050',
            color0: '#0CF49B',
            borderColor: '#FD1050',
            borderColor0: '#0CF49B'
          }
        }
      ]
    };
  };

  const handleEdit = (item: PortfolioItem) => {
    setEditingItem(item);
    setEditingStrategy(null);
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
        const updatedStrategies = strategies.map(strategy => ({
          ...strategy,
          items: strategy.items.filter(item => item.key !== key)
        }));
        setStrategies(updatedStrategies);
        message.success('删除成功');
      },
    });
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      if (editingItem) {
        // 编辑模式
        const updatedStrategies = strategies.map(strategy => ({
          ...strategy,
          items: strategy.items.map(item =>
            item.key === editingItem.key ? { ...item, ...values } : item
          )
        }));
        setStrategies(updatedStrategies);
        message.success('更新成功');
      } else {
        // 新增模式 - 添加到第一个策略
        const newItem: PortfolioItem = {
          key: Date.now().toString(),
          ...values,
          status: 'pending',
          createdAt: new Date().toISOString().split('T')[0],
          marketValue: (values.price || 0) * (values.quantity || 0),
        };
        const updatedStrategies = strategies.map((strategy, index) => 
          index === 0 ? { ...strategy, items: [...strategy.items, newItem] } : strategy
        );
        setStrategies(updatedStrategies);
        message.success('创建成功');
      }
      setIsModalVisible(false);
    });
  };

  const toggleStrategyStatus = (strategyId: string) => {
    setStrategies(strategies.map(strategy =>
      strategy.id === strategyId
        ? { ...strategy, status: strategy.status === 'active' ? 'inactive' : 'active' }
        : strategy
    ));
  };

  // 统计数据
  const totalStrategies = strategies.length;
  const activeStrategies = strategies.filter(s => s.status === 'active').length;
  const totalHoldings = strategies.reduce((sum, strategy) => sum + strategy.items.length, 0);
  const activeStrategyHoldings = strategies
    .filter(s => s.status === 'active')
    .reduce((sum, strategy) => sum + strategy.items.length, 0);
  const todayPnL = 12500; // 模拟当日盈亏
  const totalPnL = 89000; // 模拟累计盈亏
  const todayRebalance = 8; // 模拟今日调仓
  const todayPendingRebalance = 3; // 模拟今日待调仓

  return (
    <PortfolioContainer>
      <PortfolioHeader>
        <div className='header-content'>
          <h1>调仓管理</h1>
          <p>查看和管理您的投资组合调仓操作（中转数据库辅助功能）</p>
        </div>
      </PortfolioHeader>

      {/* 统计卡片 */}
      <StatisticsRow>
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <Card size="small">
              <Statistic
                title='总策略数'
                value={totalStrategies}
                valueStyle={{ color: 'var(--ant-color-primary)' }}
                prefix={<BarChartOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card size="small">
              <Statistic
                title='总持仓数'
                value={totalHoldings}
                valueStyle={{ color: 'var(--ant-color-info)' }}
                prefix={<DollarOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card size="small">
              <Statistic
                title='活跃策略'
                value={activeStrategies}
                valueStyle={{ color: 'var(--ant-color-success)' }}
                prefix={<SwapOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card size="small">
              <Statistic
                title='活跃策略持仓'
                value={activeStrategyHoldings}
                valueStyle={{ color: 'var(--ant-color-warning)' }}
                prefix={<RiseOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card size="small">
              <Statistic
                title='当日盈亏'
                value={todayPnL}
                valueStyle={{ color: todayPnL >= 0 ? 'var(--ant-color-success)' : 'var(--ant-color-error)' }}
                prefix={todayPnL >= 0 ? '+' : ''}
                suffix='元'
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card size="small">
              <Statistic
                title='累计盈亏'
                value={totalPnL}
                valueStyle={{ color: totalPnL >= 0 ? 'var(--ant-color-success)' : 'var(--ant-color-error)' }}
                prefix={totalPnL >= 0 ? '+' : ''}
                suffix='元'
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card size="small">
              <Statistic
                title='今日调仓'
                value={todayRebalance}
                valueStyle={{ color: 'var(--ant-color-purple)' }}
                prefix={<ClockCircleOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card size="small">
              <Statistic
                title='今日待调仓'
                value={todayPendingRebalance}
                valueStyle={{ color: 'var(--ant-color-orange)' }}
                prefix={<ClockCircleOutlined />}
              />
            </Card>
          </Col>
        </Row>
      </StatisticsRow>

      {/* 策略列表 */}
      <PortfolioCard>
        <Collapse defaultActiveKey={['1']} ghost>
          {strategies.map((strategy) => (
            <Panel
              key={strategy.id}
              header={
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                  <div>
                    <Title level={4} style={{ margin: 0, display: 'inline-block', marginRight: 16 }}>
                      {strategy.name}
                    </Title>
                    <Tag color={strategy.status === 'active' ? 'green' : 'red'}>
                      {strategy.status === 'active' ? '活跃' : '停用'}
                    </Tag>
                    <Text type="secondary" style={{ marginLeft: 16 }}>
                      {strategy.description}
                    </Text>
                  </div>
                  <div>
                    <Switch
                      checked={strategy.status === 'active'}
                      onChange={() => toggleStrategyStatus(strategy.id)}
                      checkedChildren="启用"
                      unCheckedChildren="停用"
                    />
                  </div>
                </div>
              }
            >
              <div style={{ marginBottom: 16 }}>
                <Row gutter={16}>
                  <Col span={8}>
                    <Text strong>策略总价值：</Text>
                    <Text>¥{strategy.totalValue.toLocaleString()}</Text>
                  </Col>
                  <Col span={8}>
                    <Text strong>总权重：</Text>
                    <Text>{strategy.totalWeight}%</Text>
                  </Col>
                  <Col span={8}>
                    <Text strong>持仓数量：</Text>
                    <Text>{strategy.items.length}只</Text>
                  </Col>
                </Row>
              </div>
              
              {strategy.items.length > 0 ? (
                <Table
                  columns={columns}
                  dataSource={strategy.items}
                  pagination={false}
                  size="small"
                  scroll={{ x: 800 }}
                />
              ) : (
                <div style={{ textAlign: 'center', padding: '20px', color: '#999' }}>
                  暂无调仓记录
                </div>
              )}
            </Panel>
          ))}
        </Collapse>
      </PortfolioCard>

      {/* 股票详情弹窗 */}
      <Modal
        title={currentStockDetail ? `${currentStockDetail.name} (${currentStockDetail.code}) 股票详情` : '股票详情'}
        open={stockDetailVisible}
        onCancel={() => setStockDetailVisible(false)}
        footer={null}
        width={900}
        style={{ top: 20 }}
      >
        {currentStockDetail && (
          <div>
            {/* K线图 */}
            <div style={{ marginBottom: 24 }}>
              <ReactECharts 
                option={getKlineOption(currentStockDetail)}
                style={{ height: '400px', width: '100%' }}
                opts={{ renderer: 'canvas' }}
              />
            </div>
            
            {/* 基本面信息 */}
            <Divider orientation="left">基本面信息</Divider>
            <Descriptions bordered column={3} size="small">
              <Descriptions.Item label="股票代码">
                {currentStockDetail.code}
              </Descriptions.Item>
              <Descriptions.Item label="所属行业">
                {currentStockDetail.industry}
              </Descriptions.Item>
              <Descriptions.Item label="市值">
                {currentStockDetail.marketCap}
              </Descriptions.Item>
              <Descriptions.Item label="市盈率(PE)">
                {currentStockDetail.pe}
              </Descriptions.Item>
              <Descriptions.Item label="市净率(PB)">
                {currentStockDetail.pb}
              </Descriptions.Item>
              <Descriptions.Item label="股息率">
                {currentStockDetail.dividendYield}%
              </Descriptions.Item>
              <Descriptions.Item label="成交量">
                {currentStockDetail.volume}
              </Descriptions.Item>
              <Descriptions.Item label="换手率">
                {currentStockDetail.turnover}%
              </Descriptions.Item>
              <Descriptions.Item label="52周最高">
                ¥{currentStockDetail.high52w}
              </Descriptions.Item>
              <Descriptions.Item label="52周最低">
                ¥{currentStockDetail.low52w}
              </Descriptions.Item>
            </Descriptions>
          </div>
        )}
      </Modal>

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
    </PortfolioContainer>
  );
};

export default Portfolio;
