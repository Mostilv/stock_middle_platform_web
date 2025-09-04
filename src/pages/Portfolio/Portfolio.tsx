import React, { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Tag,
  Modal,
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
  EyeOutlined,
  SwapOutlined,
  RiseOutlined,
  DollarOutlined,
  BarChartOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import StockChart from '../../components/StockChart';
import type { StockDataPoint } from '../../components/StockChart';
import { fetchPortfolioOverview } from './services/portfolio.api';
import type { PortfolioOverviewResponse } from './services/portfolio.api';
import {
  PortfolioContainer,
  PortfolioHeader,
  StatisticsRow,
  PortfolioCard,
  ActionTag,
  StatusTag,
  ClickableButton,
} from './Portfolio.styles';

// 删除未使用的导入
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
  const [overview, setOverview] = useState<PortfolioOverviewResponse | null>(null);

  useEffect(() => {
    let mounted = true;
    fetchPortfolioOverview()
      .then((data) => { if (!mounted) return; setOverview(data); setStrategies(data.strategies as any); })
      .catch(() => {});
    return () => { mounted = false; };
  }, []);

  const [stockDetailVisible, setStockDetailVisible] = useState(false);
  const [currentStockDetail, setCurrentStockDetail] =
    useState<StockDetail | null>(null);


  // 模拟股票详情数据
  const getStockDetail = (code: string): StockDetail => {
    // 生成最近30个交易日的K线数据
    const generateKlineData = (
      basePrice: number,
      volatility: number = 0.03
    ) => {
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
        const high =
          Math.max(open, close) + Math.random() * volatility * currentPrice;
        const low =
          Math.min(open, close) - Math.random() * volatility * currentPrice;
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
    return (
      details[code] || {
        name: '未知股票',
        code,
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
      }
    );
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
        const text =
          action === 'buy' ? '买入' : action === 'sell' ? '卖出' : '持有';
        return (
          <ActionTag $action={action as 'buy' | 'sell' | 'hold'}>
            {text}
          </ActionTag>
        );
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
        const text =
          status === 'completed'
            ? '已完成'
            : status === 'pending'
              ? '待执行'
              : '已取消';
        return (
          <StatusTag $status={status as 'pending' | 'completed' | 'cancelled'}>
            {text}
          </StatusTag>
        );
      },
    },
    {
      title: '操作',
      key: 'action',
      width: 100,
      render: (_: any, record: PortfolioItem) => (
        <ClickableButton
          type='text'
          icon={<EyeOutlined />}
          onClick={() => handleViewStockDetail(record)}
        >
          详情
        </ClickableButton>
      ),
    },
  ];

  const handleViewStockDetail = (item: PortfolioItem) => {
    const stockDetail = getStockDetail(item.code);
    setCurrentStockDetail(stockDetail);
    setStockDetailVisible(true);
  };

  // 生成股票K线数据
  const generateStockKLineData = (stockDetail: StockDetail): StockDataPoint[] => {
    return stockDetail.klineData.map(item => ({
      time: item[0],
      open: item[1],
      high: item[4],
      low: item[3],
      close: item[2],
      volume: item[5]
    }));
  };

  // 删除编辑功能，只保留详情查看



  // 删除删除功能，只保留详情查看

  // 删除模态框相关功能，只保留详情查看

  // 删除模态框相关功能，只保留详情查看

  const toggleStrategyStatus = (strategyId: string) => {
    setStrategies(
      strategies.map(strategy =>
        strategy.id === strategyId
          ? {
              ...strategy,
              status: strategy.status === 'active' ? 'inactive' : 'active',
            }
          : strategy,
      ),
    );
    // 不触发策略折叠样式，保持当前展开状态
  };

  // 统计数据
  const totalStrategies = strategies.length;
  const activeStrategies = strategies.filter(s => s.status === 'active').length;
  const totalHoldings = strategies.reduce(
    (sum, strategy) => sum + strategy.items.length,
    0
  );
  const activeStrategyHoldings = strategies
    .filter(s => s.status === 'active')
    .reduce((sum, strategy) => sum + strategy.items.length, 0);
  const todayPnL = overview?.todayPnL ?? 12500;
  const totalPnL = overview?.totalPnL ?? 89000;
  const todayRebalance = overview?.todayRebalance ?? 8;
  const todayPendingRebalance = overview?.todayPendingRebalance ?? 3;

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
            <Card size='small'>
              <Statistic
                title='总策略数'
                value={totalStrategies}
                valueStyle={{ color: 'var(--ant-color-primary)' }}
                prefix={<BarChartOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card size='small'>
              <Statistic
                title='总持仓数'
                value={totalHoldings}
                valueStyle={{ color: 'var(--ant-color-info)' }}
                prefix={<DollarOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card size='small'>
              <Statistic
                title='活跃策略'
                value={activeStrategies}
                valueStyle={{ color: 'var(--ant-color-success)' }}
                prefix={<SwapOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card size='small'>
              <Statistic
                title='活跃策略持仓'
                value={activeStrategyHoldings}
                valueStyle={{ color: 'var(--ant-color-warning)' }}
                prefix={<RiseOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card size='small'>
              <Statistic
                title='当日盈亏'
                value={todayPnL}
                valueStyle={{
                  color:
                    todayPnL >= 0
                      ? 'var(--ant-color-success)'
                      : 'var(--ant-color-error)',
                }}
                prefix={todayPnL >= 0 ? '+' : ''}
                suffix='元'
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card size='small'>
              <Statistic
                title='累计盈亏'
                value={totalPnL}
                valueStyle={{
                  color:
                    totalPnL >= 0
                      ? 'var(--ant-color-success)'
                      : 'var(--ant-color-error)',
                }}
                prefix={totalPnL >= 0 ? '+' : ''}
                suffix='元'
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card size='small'>
              <Statistic
                title='今日调仓'
                value={todayRebalance}
                valueStyle={{ color: 'var(--ant-color-purple)' }}
                prefix={<ClockCircleOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card size='small'>
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
          {strategies.map(strategy => (
            <Panel
              key={strategy.id}
              header={
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}
                >
                  <div>
                    <Title
                      level={4}
                      style={{
                        margin: 0,
                        display: 'inline-block',
                        marginRight: 16,
                      }}
                    >
                      {strategy.name}
                    </Title>
                    <Tag color={strategy.status === 'active' ? 'green' : 'red'}>
                      {strategy.status === 'active' ? '活跃' : '停用'}
                    </Tag>
                    <Text type='secondary' style={{ marginLeft: 16 }}>
                      {strategy.description}
                    </Text>
                  </div>
                  <div>
                    <Switch
                      checked={strategy.status === 'active'}
                      onChange={() => toggleStrategyStatus(strategy.id)}
                      checkedChildren='启用'
                      unCheckedChildren='停用'
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
                  size='small'
                  scroll={{ x: 800 }}
                />
              ) : (
                <div
                  style={{
                    textAlign: 'center',
                    padding: '20px',
                    color: '#999',
                  }}
                >
                  暂无调仓记录
                </div>
              )}
            </Panel>
          ))}
        </Collapse>
      </PortfolioCard>

      {/* 股票详情弹窗 */}
      <Modal
        title={
          currentStockDetail
            ? `${currentStockDetail.name} (${currentStockDetail.code}) 股票详情`
            : '股票详情'
        }
        open={stockDetailVisible}
        onCancel={() => setStockDetailVisible(false)}
        footer={null}
        width={1000}
        style={{ top: 20 }}
      >
        {currentStockDetail && (
          <div>
            {/* K线图 */}
            <div style={{ marginBottom: 24 }}>
              <StockChart
                data={generateStockKLineData(currentStockDetail)}
                chartType="candlestick"
                theme="light"
                showVolume={true}
                height={400}
                stockCode={currentStockDetail.code}
                title={`${currentStockDetail.name} K线图`}
                showTimeSelector={true}
              />
            </div>

            {/* 基本面信息 */}
            <Divider orientation='left'>基本面信息</Divider>
            <Descriptions bordered column={3} size='small'>
              <Descriptions.Item label='股票代码'>
                {currentStockDetail.code}
              </Descriptions.Item>
              <Descriptions.Item label='所属行业'>
                {currentStockDetail.industry}
              </Descriptions.Item>
              <Descriptions.Item label='市值'>
                {currentStockDetail.marketCap}
              </Descriptions.Item>
              <Descriptions.Item label='市盈率(PE)'>
                {currentStockDetail.pe}
              </Descriptions.Item>
              <Descriptions.Item label='市净率(PB)'>
                {currentStockDetail.pb}
              </Descriptions.Item>
              <Descriptions.Item label='股息率'>
                {currentStockDetail.dividendYield}%
              </Descriptions.Item>
              <Descriptions.Item label='成交量'>
                {currentStockDetail.volume}
              </Descriptions.Item>
              <Descriptions.Item label='换手率'>
                {currentStockDetail.turnover}%
              </Descriptions.Item>
              <Descriptions.Item label='52周最高'>
                ¥{currentStockDetail.high52w}
              </Descriptions.Item>
              <Descriptions.Item label='52周最低'>
                ¥{currentStockDetail.low52w}
              </Descriptions.Item>
            </Descriptions>
          </div>
        )}
      </Modal>
    </PortfolioContainer>
  );
};

export default Portfolio;
