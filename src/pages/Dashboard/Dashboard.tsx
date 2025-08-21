import React, { useState, useEffect } from 'react';
import { Statistic, Row, Col, DatePicker, Space } from 'antd';
import { ClockCircleOutlined, RiseOutlined, FallOutlined } from '@ant-design/icons';
import EChart from '../../components/EChart';
import {
  DashboardContainer,
  TopIndicators,
  IndicatorCard,
  MainContent,
  LeftCharts,
  CenterCharts,
  RightCharts,
  TimeDisplay,
  ChartCard,
  SmallChartCard,
} from './Dashboard.styles';

const { RangePicker } = DatePicker;

const Dashboard: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // 实时时间更新
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 格式化时间显示
  const formatTime = (date: Date) => {
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  // 模拟市场数据
  const marketData = {
    shanghaiIndex: 3700.25,
    shanghaiChange: 1.25,
    nasdaqIndex: 16543.67,
    nasdaqChange: -0.85,
    goldIndex: 2345.89,
    goldChange: 2.15,
    zhongzheng2000Index: 1245.67,
    zhongzheng2000Change: 0.75,
  };

  // 左侧三个小折线图配置
  const leftChartOptions = [
    {
      title: '拥挤度',
      option: {
        backgroundColor: 'transparent',
        grid: { left: 30, right: 10, top: 20, bottom: 20 },
        tooltip: { 
          trigger: 'axis' as const,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderColor: '#1890ff',
          textStyle: { color: '#e6f7ff' }
        },
        xAxis: {
          type: 'category' as const,
          data: ['09:30', '10:00', '10:30', '11:00', '11:30', '13:00', '13:30', '14:00', '14:30', '15:00'],
          axisLine: { lineStyle: { color: '#4a5568' } },
          axisLabel: { color: '#e6f7ff', fontSize: 10 }
        },
        yAxis: { 
          type: 'value' as const,
          axisLine: { lineStyle: { color: '#4a5568' } },
          axisLabel: { color: '#e6f7ff', fontSize: 10 },
          splitLine: { lineStyle: { color: '#2d3748' } }
        },
        series: [
          {
            type: 'line' as const,
            smooth: true,
            data: [65, 68, 72, 70, 75, 78, 80, 82, 79, 76],
            lineStyle: { color: '#1890ff', width: 1 },
            symbol: 'none'
          },
        ],
      }
    },
    {
      title: '大盘股指数',
      option: {
        backgroundColor: 'transparent',
        grid: { left: 30, right: 10, top: 20, bottom: 20 },
        tooltip: { 
          trigger: 'axis' as const,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderColor: '#1890ff',
          textStyle: { color: '#e6f7ff' }
        },
        xAxis: {
          type: 'category' as const,
          data: ['09:30', '10:00', '10:30', '11:00', '11:30', '13:00', '13:30', '14:00', '14:30', '15:00'],
          axisLine: { lineStyle: { color: '#4a5568' } },
          axisLabel: { color: '#e6f7ff', fontSize: 10 }
        },
        yAxis: { 
          type: 'value' as const,
          axisLine: { lineStyle: { color: '#4a5568' } },
          axisLabel: { color: '#e6f7ff', fontSize: 10 },
          splitLine: { lineStyle: { color: '#2d3748' } }
        },
        series: [
          {
            type: 'line' as const,
            smooth: true,
            data: [120, 122, 125, 123, 128, 130, 132, 135, 133, 131],
            lineStyle: { color: '#52c41a', width: 1 },
            symbol: 'none'
          },
        ],
      }
    },
    {
      title: '微盘股指数',
      option: {
        backgroundColor: 'transparent',
        grid: { left: 30, right: 10, top: 20, bottom: 20 },
        tooltip: { 
          trigger: 'axis' as const,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderColor: '#1890ff',
          textStyle: { color: '#e6f7ff' }
        },
        xAxis: {
          type: 'category' as const,
          data: ['09:30', '10:00', '10:30', '11:00', '11:30', '13:00', '13:30', '14:00', '14:30', '15:00'],
          axisLine: { lineStyle: { color: '#4a5568' } },
          axisLabel: { color: '#e6f7ff', fontSize: 10 }
        },
        yAxis: { 
          type: 'value' as const,
          axisLine: { lineStyle: { color: '#4a5568' } },
          axisLabel: { color: '#e6f7ff', fontSize: 10 },
          splitLine: { lineStyle: { color: '#2d3748' } }
        },
        series: [
          {
            type: 'line' as const,
            smooth: true,
            data: [85, 88, 92, 90, 95, 98, 100, 102, 99, 96],
            lineStyle: { color: '#faad14', width: 1 },
            symbol: 'none'
          },
        ],
      }
    }
  ];

  // 右侧三个小折线图配置
  const rightChartOptions = [
    {
      title: '贴税率',
      option: {
        backgroundColor: 'transparent',
        grid: { left: 30, right: 10, top: 20, bottom: 20 },
        tooltip: { 
          trigger: 'axis' as const,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderColor: '#1890ff',
          textStyle: { color: '#e6f7ff' }
        },
        xAxis: {
          type: 'category' as const,
          data: ['09:30', '10:00', '10:30', '11:00', '11:30', '13:00', '13:30', '14:00', '14:30', '15:00'],
          axisLine: { lineStyle: { color: '#4a5568' } },
          axisLabel: { color: '#e6f7ff', fontSize: 10 }
        },
        yAxis: { 
          type: 'value' as const,
          axisLine: { lineStyle: { color: '#4a5568' } },
          axisLabel: { color: '#e6f7ff', fontSize: 10 },
          splitLine: { lineStyle: { color: '#2d3748' } }
        },
        series: [
          {
            type: 'line' as const,
            smooth: true,
            data: [2.5, 2.8, 3.2, 3.0, 3.5, 3.8, 4.0, 4.2, 3.9, 3.6],
            lineStyle: { color: '#f5222d', width: 1 },
            symbol: 'none'
          },
        ],
      }
    },
    {
      title: '微盘市值中枢',
      option: {
        backgroundColor: 'transparent',
        grid: { left: 30, right: 10, top: 20, bottom: 20 },
        tooltip: { 
          trigger: 'axis' as const,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderColor: '#1890ff',
          textStyle: { color: '#e6f7ff' }
        },
        xAxis: {
          type: 'category' as const,
          data: ['09:30', '10:00', '10:30', '11:00', '11:30', '13:00', '13:30', '14:00', '14:30', '15:00'],
          axisLine: { lineStyle: { color: '#4a5568' } },
          axisLabel: { color: '#e6f7ff', fontSize: 10 }
        },
        yAxis: { 
          type: 'value' as const,
          axisLine: { lineStyle: { color: '#4a5568' } },
          axisLabel: { color: '#e6f7ff', fontSize: 10 },
          splitLine: { lineStyle: { color: '#2d3748' } }
        },
        series: [
          {
            type: 'line' as const,
            smooth: true,
            data: [45, 48, 52, 50, 55, 58, 60, 62, 59, 56],
            lineStyle: { color: '#722ed1', width: 1 },
            symbol: 'none'
          },
        ],
      }
    },
    {
      title: '微盘净市率',
      option: {
        backgroundColor: 'transparent',
        grid: { left: 30, right: 10, top: 20, bottom: 20 },
        tooltip: { 
          trigger: 'axis' as const,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderColor: '#1890ff',
          textStyle: { color: '#e6f7ff' }
        },
        xAxis: {
          type: 'category' as const,
          data: ['09:30', '10:00', '10:30', '11:00', '11:30', '13:00', '13:30', '14:00', '14:30', '15:00'],
          axisLine: { lineStyle: { color: '#4a5568' } },
          axisLabel: { color: '#e6f7ff', fontSize: 10 }
        },
        yAxis: { 
          type: 'value' as const,
          axisLine: { lineStyle: { color: '#4a5568' } },
          axisLabel: { color: '#e6f7ff', fontSize: 10 },
          splitLine: { lineStyle: { color: '#2d3748' } }
        },
        series: [
          {
            type: 'line' as const,
            smooth: true,
            data: [1.2, 1.5, 1.8, 1.6, 2.0, 2.3, 2.5, 2.7, 2.4, 2.1],
            lineStyle: { color: '#13c2c2', width: 1 },
            symbol: 'none'
          },
        ],
      }
    }
  ];

  // 中间上方图表 - 行业宽度矩阵图
  const industryWidthOption = {
    backgroundColor: 'transparent',
    grid: { left: 60, right: 20, top: 30, bottom: 30 },
    tooltip: { 
      trigger: 'axis' as const,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      borderColor: '#1890ff',
      textStyle: { color: '#e6f7ff' }
    },
    xAxis: {
      type: 'category' as const,
      data: ['01-01', '01-02', '01-03', '01-04', '01-05', '01-08', '01-09', '01-10', '01-11', '01-12'],
      axisLine: { lineStyle: { color: '#4a5568' } },
      axisLabel: { color: '#e6f7ff' }
    },
    yAxis: { 
      type: 'category' as const,
      data: ['银行', '科技', '消费', '医药', '金融', '地产', '能源', '材料'],
      axisLine: { lineStyle: { color: '#4a5568' } },
      axisLabel: { color: '#e6f7ff' }
    },
    visualMap: {
      min: 0,
      max: 100,
      calculable: true,
      orient: 'horizontal' as const,
      left: 'center',
      bottom: '0%',
      inRange: {
        color: ['#52c41a', '#faad14', '#f5222d']
      },
      textStyle: { color: '#e6f7ff' }
    },
    series: [
      {
        type: 'heatmap' as const,
        data: [
          [0, 0, 85], [1, 0, 88], [2, 0, 92], [3, 0, 90], [4, 0, 95], [5, 0, 98], [6, 0, 100], [7, 0, 102], [8, 0, 99], [9, 0, 96],
          [0, 1, 65], [1, 1, 68], [2, 1, 72], [3, 1, 70], [4, 1, 75], [5, 1, 78], [6, 1, 80], [7, 1, 82], [8, 1, 79], [9, 1, 76],
          [0, 2, 45], [1, 2, 48], [2, 2, 52], [3, 2, 50], [4, 2, 55], [5, 2, 58], [6, 2, 60], [7, 2, 62], [8, 2, 59], [9, 2, 56],
          [0, 3, 25], [1, 3, 28], [2, 3, 32], [3, 3, 30], [4, 3, 35], [5, 3, 38], [6, 3, 40], [7, 3, 42], [8, 3, 39], [9, 3, 36],
          [0, 4, 15], [1, 4, 18], [2, 4, 22], [3, 4, 20], [4, 4, 25], [5, 4, 28], [6, 4, 30], [7, 4, 32], [8, 4, 29], [9, 4, 26],
          [0, 5, 35], [1, 5, 38], [2, 5, 42], [3, 5, 40], [4, 5, 45], [5, 5, 48], [6, 5, 50], [7, 5, 52], [8, 5, 49], [9, 5, 46],
          [0, 6, 55], [1, 6, 58], [2, 6, 62], [3, 6, 60], [4, 6, 65], [5, 6, 68], [6, 6, 70], [7, 6, 72], [8, 6, 69], [9, 6, 66],
          [0, 7, 75], [1, 7, 78], [2, 7, 82], [3, 7, 80], [4, 7, 85], [5, 7, 88], [6, 7, 90], [7, 7, 92], [8, 7, 89], [9, 7, 86],
        ],
        label: {
          show: false
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      },
    ],
  };

  // 中间下方图表 - 行业动量时序图
  const industryMomentumOption = {
    backgroundColor: 'transparent',
    grid: { left: 40, right: 20, top: 30, bottom: 30 },
    tooltip: { 
      trigger: 'axis' as const,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      borderColor: '#1890ff',
      textStyle: { color: '#e6f7ff' }
    },
    legend: {
      data: ['银行', '科技', '消费', '医药', '金融'],
      textStyle: { color: '#e6f7ff' },
      top: 10
    },
    xAxis: {
      type: 'category' as const,
      data: ['01-01', '01-02', '01-03', '01-04', '01-05', '01-08', '01-09', '01-10', '01-11', '01-12'],
      axisLine: { lineStyle: { color: '#4a5568' } },
      axisLabel: { color: '#e6f7ff' }
    },
    yAxis: { 
      type: 'value' as const,
      axisLine: { lineStyle: { color: '#4a5568' } },
      axisLabel: { color: '#e6f7ff' },
      splitLine: { lineStyle: { color: '#2d3748' } }
    },
    series: [
      {
        name: '银行',
        type: 'line' as const,
        smooth: true,
        data: [85, 88, 92, 90, 95, 98, 100, 102, 99, 96],
        lineStyle: { color: '#1890ff', width: 2 },
        symbol: 'none'
      },
      {
        name: '科技',
        type: 'line' as const,
        smooth: true,
        data: [65, 68, 72, 70, 75, 78, 80, 82, 79, 76],
        lineStyle: { color: '#52c41a', width: 2 },
        symbol: 'none'
      },
      {
        name: '消费',
        type: 'line' as const,
        smooth: true,
        data: [45, 48, 52, 50, 55, 58, 60, 62, 59, 56],
        lineStyle: { color: '#faad14', width: 2 },
        symbol: 'none'
      },
      {
        name: '医药',
        type: 'line' as const,
        smooth: true,
        data: [25, 28, 32, 30, 35, 38, 40, 42, 39, 36],
        lineStyle: { color: '#f5222d', width: 2 },
        symbol: 'none'
      },
      {
        name: '金融',
        type: 'line' as const,
        smooth: true,
        data: [15, 18, 22, 20, 25, 28, 30, 32, 29, 26],
        lineStyle: { color: '#722ed1', width: 2 },
        symbol: 'none'
      },
    ],
  };

  const handleTimeClick = () => {
    setShowDatePicker(!showDatePicker);
  };

  const handleTimeRangeChange = (dates: any) => {
    if (dates) {
      console.log('时间范围改变:', dates[0].toDate(), dates[1].toDate());
      setShowDatePicker(false);
    }
  };

  return (
    <DashboardContainer>
      {/* 右上角时间显示 */}
      <TimeDisplay>
        <Space>
          <ClockCircleOutlined style={{ color: '#1890ff' }} />
          <span onClick={handleTimeClick}>{formatTime(currentTime)}</span>
        </Space>
        {showDatePicker && (
          <RangePicker 
            onChange={handleTimeRangeChange}
            style={{ 
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              border: '1px solid #1890ff',
              color: '#e6f7ff'
            }}
          />
        )}
      </TimeDisplay>

      {/* 顶部数字指标 */}
      <TopIndicators>
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <IndicatorCard>
              <Statistic
                title="上证指数"
                value={marketData.shanghaiIndex}
                precision={2}
                valueStyle={{ color: marketData.shanghaiChange >= 0 ? '#52c41a' : '#ff4d4f' }}
                prefix={marketData.shanghaiChange >= 0 ? <RiseOutlined /> : <FallOutlined />}
                suffix={
                  <span style={{ fontSize: '14px', color: marketData.shanghaiChange >= 0 ? '#52c41a' : '#ff4d4f' }}>
                    {marketData.shanghaiChange >= 0 ? '+' : ''}{marketData.shanghaiChange}%
                  </span>
                }
              />
            </IndicatorCard>
          </Col>
          <Col span={6}>
            <IndicatorCard>
              <Statistic
                title="纳指"
                value={marketData.nasdaqIndex}
                precision={2}
                valueStyle={{ color: marketData.nasdaqChange >= 0 ? '#52c41a' : '#ff4d4f' }}
                prefix={marketData.nasdaqChange >= 0 ? <RiseOutlined /> : <FallOutlined />}
                suffix={
                  <span style={{ fontSize: '14px', color: marketData.nasdaqChange >= 0 ? '#52c41a' : '#ff4d4f' }}>
                    {marketData.nasdaqChange >= 0 ? '+' : ''}{marketData.nasdaqChange}%
                  </span>
                }
              />
            </IndicatorCard>
          </Col>
          <Col span={6}>
            <IndicatorCard>
              <Statistic
                title="黄金"
                value={marketData.goldIndex}
                precision={2}
                valueStyle={{ color: marketData.goldChange >= 0 ? '#52c41a' : '#ff4d4f' }}
                prefix={marketData.goldChange >= 0 ? <RiseOutlined /> : <FallOutlined />}
                suffix={
                  <span style={{ fontSize: '14px', color: marketData.goldChange >= 0 ? '#52c41a' : '#ff4d4f' }}>
                    {marketData.goldChange >= 0 ? '+' : ''}{marketData.goldChange}%
                  </span>
                }
              />
            </IndicatorCard>
          </Col>
          <Col span={6}>
            <IndicatorCard>
              <Statistic
                title="中证2000"
                value={marketData.zhongzheng2000Index}
                precision={2}
                valueStyle={{ color: marketData.zhongzheng2000Change >= 0 ? '#52c41a' : '#ff4d4f' }}
                prefix={marketData.zhongzheng2000Change >= 0 ? <RiseOutlined /> : <FallOutlined />}
                suffix={
                  <span style={{ fontSize: '14px', color: marketData.zhongzheng2000Change >= 0 ? '#52c41a' : '#ff4d4f' }}>
                    {marketData.zhongzheng2000Change >= 0 ? '+' : ''}{marketData.zhongzheng2000Change}%
                  </span>
                }
              />
            </IndicatorCard>
          </Col>
        </Row>
      </TopIndicators>

      {/* 主要内容区域 - 三列布局 */}
      <MainContent>
        {/* 左侧三个小折线图 */}
        <LeftCharts>
          {leftChartOptions.map((chart, index) => (
            <SmallChartCard key={index}>
              <h4>{chart.title}</h4>
              <EChart height={120} option={chart.option} />
            </SmallChartCard>
          ))}
        </LeftCharts>

        {/* 中间图表区域 */}
        <CenterCharts>
          <ChartCard style={{ marginBottom: '16px' }}>
            <h3>行业宽度</h3>
            <EChart height={200} option={industryWidthOption} />
          </ChartCard>
          <ChartCard>
            <h3>行业动量</h3>
            <EChart height={200} option={industryMomentumOption} />
          </ChartCard>
        </CenterCharts>

        {/* 右侧三个小折线图 */}
        <RightCharts>
          {rightChartOptions.map((chart, index) => (
            <SmallChartCard key={index}>
              <h4>{chart.title}</h4>
              <EChart height={120} option={chart.option} />
            </SmallChartCard>
          ))}
        </RightCharts>
      </MainContent>
    </DashboardContainer>
  );
};

export default Dashboard;
