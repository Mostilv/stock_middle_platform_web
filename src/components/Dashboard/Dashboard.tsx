import React from 'react';
import { Statistic, Progress, Table } from 'antd';
import EChart from '../EChart';
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  RiseOutlined,
} from '@ant-design/icons';
import {
  DashboardContainer,
  DashboardHeader,
  StatisticsGrid,
  StatisticCard,
  ContentGrid,
  ContentCard,
  ProgressContainer,
  ProgressLabel,
  TableContainer,
  StockChange,
} from './Dashboard.styles';

const Dashboard: React.FC = (): JSX.Element => {
  // 模拟数据
  const portfolioData = [
    {
      key: '1',
      stock: '贵州茅台',
      code: '600519',
      price: 1688.0,
      change: 2.5,
      weight: 15.2,
    },
    {
      key: '2',
      stock: '宁德时代',
      code: '300750',
      price: 245.6,
      change: -1.8,
      weight: 12.8,
    },
    {
      key: '3',
      stock: '招商银行',
      code: '600036',
      price: 35.2,
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
        <StockChange $isPositive={change >= 0}>
          {change >= 0 ? '+' : ''}
          {change}%{change >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
        </StockChange>
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
    <DashboardContainer>
      <DashboardHeader>
        <h1>仪表盘</h1>
        <p>欢迎使用A股指标与调仓管理系统</p>
      </DashboardHeader>

      {/* 统计卡片 */}
      <StatisticsGrid>
        <StatisticCard>
          <Statistic
            title='总资产'
            value={1128934}
            precision={2}
            valueStyle={{ color: 'var(--ant-color-success)' }}
            prefix='¥'
            suffix={<RiseOutlined />}
          />
        </StatisticCard>
        <StatisticCard>
          <Statistic
            title='今日收益'
            value={11280}
            precision={2}
            valueStyle={{ color: 'var(--ant-color-success)' }}
            prefix='¥'
            suffix={<RiseOutlined />}
          />
        </StatisticCard>
        <StatisticCard>
          <Statistic
            title='收益率'
            value={11.28}
            precision={2}
            valueStyle={{ color: 'var(--ant-color-success)' }}
            suffix='%'
            prefix={<RiseOutlined />}
          />
        </StatisticCard>
        <StatisticCard>
          <Statistic
            title='持仓数量'
            value={15}
            valueStyle={{ color: 'var(--ant-color-primary)' }}
          />
        </StatisticCard>
      </StatisticsGrid>

      {/* 资产配置 + 示例图表 */}
      <ContentGrid>
        <ContentCard>
          <h3>资产配置</h3>
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            <ProgressContainer>
              <ProgressLabel>
                <span>股票</span>
                <span>75%</span>
              </ProgressLabel>
              <Progress percent={75} strokeColor='#1890ff' />
            </ProgressContainer>
            <ProgressContainer>
              <ProgressLabel>
                <span>债券</span>
                <span>15%</span>
              </ProgressLabel>
              <Progress percent={15} strokeColor='#52c41a' />
            </ProgressContainer>
            <ProgressContainer>
              <ProgressLabel>
                <span>现金</span>
                <span>10%</span>
              </ProgressLabel>
              <Progress percent={10} strokeColor='#faad14' />
            </ProgressContainer>
          </div>
        </ContentCard>
        <ContentCard>
          <h3>行业分布（示例图表）</h3>
          <EChart
            height={280}
            option={{
              grid: { left: 40, right: 20, top: 30, bottom: 30 },
              tooltip: { trigger: 'axis' },
              xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
              },
              yAxis: { type: 'value' },
              series: [
                {
                  type: 'line',
                  smooth: true,
                  areaStyle: {},
                  data: [120, 132, 101, 134, 90],
                },
              ],
            }}
          />
        </ContentCard>
      </ContentGrid>

      {/* 持仓明细 */}
      <TableContainer>
        <h3>持仓明细</h3>
        <Table
          columns={columns}
          dataSource={portfolioData}
          pagination={false}
          size='small'
        />
      </TableContainer>
    </DashboardContainer>
  );
};

export default Dashboard;
