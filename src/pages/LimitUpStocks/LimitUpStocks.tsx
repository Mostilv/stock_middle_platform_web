import React, { useState, useEffect, useRef } from 'react';
import {
  Card,
  Checkbox,
  Table,
  DatePicker,
  Modal,
  Tabs,
  Tag,
  Descriptions,
  Space,
} from 'antd';
import dayjs from 'dayjs';
import { fetchLimitUpOverview, LimitUpOverviewResponse } from './services/limitUp.api';
import {
  LineChartOutlined,
  BarChartOutlined,
} from '@ant-design/icons';
import {
  LimitUpStocksContainer,
  LimitUpStocksHeader,
} from './LimitUpStocks.styles';
import StockChart from '../../components/StockChart';
import type { StockDataPoint } from '../../components/StockChart';

const { Group: CheckboxGroup } = Checkbox;
const { TabPane } = Tabs;

interface Stock {
  name: string;
  code: string;
  time: string;
  price: number;
  changePercent: number;
  volume1: number;
  volume2: number;
  ratio1: number;
  ratio2: number;
  sectors: string[];
  marketCap?: number;
  pe?: number;
  pb?: number;
}

interface LadderData {
  level: number;
  count: number;
  stocks: Stock[];
}

interface SectorData {
  name: string;
  count: number;
  value: number;
}

const LimitUpStocks: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>(dayjs().format('YYYY-MM-DD'));
  const [remote, setRemote] = useState<LimitUpOverviewResponse | null>(null);
  const [visibleColumns, setVisibleColumns] = useState<string[]>(['行情', '个数', '时间', '分数', '成交额', '市值', '封单', '流通市值']);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tableScrollY, setTableScrollY] = useState<number>(400);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateTableHeight = () => {
      if (containerRef.current && headerRef.current) {
        const containerHeight = containerRef.current.clientHeight;
        const headerHeight = headerRef.current.clientHeight;
        const containerPadding = 32; // Container padding (16px * 2)
        const cardPadding = 24; // Card padding (12px * 2)
        const cardMargin = 16; // Card margin bottom
        const tablePadding = 24; // Table internal padding
        
        const availableHeight = containerHeight - headerHeight - containerPadding - cardPadding - cardMargin - tablePadding;
        const newScrollY = Math.max(300, availableHeight);
        
        setTableScrollY(newScrollY);
      }
    };

    // 初始计算
    updateTableHeight();
    
    // 添加防抖处理，避免频繁计算
    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateTableHeight, 100);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    fetchLimitUpOverview(selectedDate)
      .then((resp) => {
        if (!mounted) return;
        setRemote(resp);
      })
      .catch(() => {
        // 静默失败，继续使用内置示例
      });
    return () => {
      mounted = false;
    };
  }, [selectedDate]);

  // 板块数据（将被 API 数据覆盖）
  let sectors: SectorData[] = [
    { name: '芯片', count: 27, value: 21441 },
    { name: '算力', count: 29, value: 8221 },
    { name: '人工智能', count: 31, value: 7592 },
    { name: '通信', count: 9, value: 4830 },
    { name: '证券', count: 2, value: 4187 },
    { name: '中报增长', count: 23, value: 2838 },
    { name: '数字经济', count: 28, value: 2329 },
    { name: '基础建设', count: 11, value: 1810 },
    { name: '云游戏', count: 2, value: 1603 },
    { name: '有色金属', count: 3, value: 1535 },
    { name: '化工', count: 10, value: 1490 },
    { name: '军工', count: 10, value: 1489 },
    { name: '机器人概念', count: 15, value: 1458 },
    { name: '实控人变更', count: 8, value: 1340 },
    { name: '股权转让', count: 4, value: 1308 },
  ];

  // 梯队数据（将被 API 数据覆盖）
  let ladderData: LadderData[] = [
    {
      level: 6,
      count: 1,
      stocks: [
        {
          name: '科森科技',
          code: '603626',
          time: '09:43',
          price: 10.02,
          changePercent: 28.44,
          volume1: 84.67,
          volume2: 84.67,
          ratio1: 0.43,
          ratio2: 1.9,
          sectors: ['机器人概念'],
          marketCap: 45.6,
          pe: 25.3,
          pb: 2.1,
        },
      ],
    },
    {
      level: 5,
      count: 1,
      stocks: [
        {
          name: '园林股份',
          code: '605303',
          time: '09:30',
          price: 9.99,
          changePercent: 0.49,
          volume1: 32.31,
          volume2: 32.31,
          ratio1: 4.31,
          ratio2: 4.35,
          sectors: ['人工智能', '数字经济'],
          marketCap: 32.8,
          pe: 18.7,
          pb: 1.8,
        },
      ],
    },
    {
      level: 4,
      count: 3,
      stocks: [
        {
          name: '伟隆股',
          code: '002871',
          time: '13:02',
          price: 10.03,
          changePercent: 5.49,
          volume1: 46.42,
          volume2: 28.25,
          ratio1: 1.07,
          ratio2: 3.41,
          sectors: ['人工智能', '数字经济', '基础建设', '军工'],
          marketCap: 28.5,
          pe: 22.1,
          pb: 1.6,
        },
      ],
    },
    {
      level: 3,
      count: 3,
      stocks: [
        {
          name: '御银股',
          code: '002177',
          time: '09:33',
          price: 10.01,
          changePercent: 23.12,
          volume1: 76.12,
          volume2: 67.49,
          ratio1: 1.11,
          ratio2: 4.15,
          sectors: ['通信', '证券'],
          marketCap: 56.2,
          pe: 31.5,
          pb: 2.8,
        },
        {
          name: '汇嘉时代',
          code: '603101',
          time: '09:31',
          price: 9.99,
          changePercent: 1.68,
          volume1: 53.86,
          volume2: 53.86,
          ratio1: 1.1,
          ratio2: 2.23,
          sectors: ['有色金属'],
          marketCap: 23.4,
          pe: 15.2,
          pb: 1.3,
        },
        {
          name: '中油资本',
          code: '000617',
          time: '13:26',
          price: 10.03,
          changePercent: 81.09,
          volume1: 1511.99,
          volume2: 1511.99,
          ratio1: 1.92,
          ratio2: 15.81,
          sectors: ['化工'],
          marketCap: 89.7,
          pe: 42.8,
          pb: 3.2,
        },
        {
          name: '成飞集成',
          code: '002190',
          time: '09:32',
          price: 10.01,
          changePercent: 45.52,
          volume1: 175.02,
          volume2: 175.02,
          ratio1: 1.32,
          ratio2: 6.01,
          sectors: ['军工'],
          marketCap: 67.3,
          pe: 28.9,
          pb: 2.4,
        },
      ],
    },
    {
      level: 2,
      count: 7,
      stocks: [
        {
          name: '万通发展',
          code: '600246',
          time: '09:30',
          price: 10.05,
          changePercent: 1.12,
          volume1: 219.48,
          volume2: 219.48,
          ratio1: 3.74,
          ratio2: 12.46,
          sectors: ['芯片', '人工智能'],
          marketCap: 78.9,
          pe: 35.6,
          pb: 2.9,
        },
        {
          name: '天融信',
          code: '002212',
          time: '09:30',
          price: 9.97,
          changePercent: 10.09,
          volume1: 119.71,
          volume2: 118.44,
          ratio1: 1.72,
          ratio2: 5.51,
          sectors: ['算力', '数字经济', '基础建设', '机器人概念'],
          marketCap: 45.2,
          pe: 26.8,
          pb: 2.1,
        },
        {
          name: '合力泰',
          code: '002217',
          time: '09:37',
          price: 10.04,
          changePercent: 5.57,
          volume1: 229.62,
          volume2: 174.39,
          ratio1: 1.49,
          ratio2: 12.26,
          sectors: ['通信', '云游戏', '化工'],
          marketCap: 34.7,
          pe: 19.3,
          pb: 1.7,
        },
        {
          name: '道恩股',
          code: '002838',
          time: '13:10',
          price: 9.99,
          changePercent: 8.87,
          volume1: 136.92,
          volume2: 120.38,
          ratio1: 0.68,
          ratio2: 4.29,
          sectors: ['有色金属', '实控人变更'],
          marketCap: 29.8,
          pe: 16.4,
          pb: 1.5,
        },
        {
          name: '群兴玩',
          code: '002575',
          time: '09:31',
          price: 10.04,
          changePercent: 11.67,
          volume1: 57.46,
          volume2: 53.9,
          ratio1: 0.32,
          ratio2: 4.06,
          sectors: ['军工', '机器人概念'],
          marketCap: 38.5,
          pe: 24.7,
          pb: 2.0,
        },
        {
          name: '皓宸医',
          code: '002622',
          time: '13:34',
          price: 9.99,
          changePercent: 0.0,
          volume1: 0,
          volume2: 0,
          ratio1: 0,
          ratio2: 0,
          sectors: ['股权转让'],
          marketCap: 21.3,
          pe: 12.8,
          pb: 1.2,
        },
      ],
    },
    // 断板数据
    {
      level: 0,
      count: 5,
      stocks: [
        {
          name: '断板股票1',
          code: '000001',
          time: '14:30',
          price: 9.85,
          changePercent: -1.5,
          volume1: 45.23,
          volume2: 45.23,
          ratio1: 0.85,
          ratio2: 2.1,
          sectors: ['芯片'],
          marketCap: 52.1,
          pe: 29.3,
          pb: 2.3,
        },
        {
          name: '断板股票2',
          code: '000002',
          time: '14:25',
          price: 8.92,
          changePercent: -2.1,
          volume1: 32.15,
          volume2: 32.15,
          ratio1: 0.72,
          ratio2: 1.8,
          sectors: ['人工智能'],
          marketCap: 41.8,
          pe: 23.6,
          pb: 1.9,
        },
      ],
    },
  ];

  // 生成表格数据
  const generateTableData = () => {
    const tableData = [];
    
    // 添加连板数据
    ladderData.forEach((ladder) => {
      if (ladder.level > 0) { // 排除断板
        const rowData: any = {
          key: `ladder-${ladder.level}`,
          level: `${ladder.level}板`,
          count: `${ladder.count}个`,
        };

        // 为每个板块添加股票数据
        sectors.forEach((sector) => {
          const stocksInSector = ladder.stocks.filter(stock => 
            stock.sectors.includes(sector.name)
          );
          
          if (stocksInSector.length > 0) {
            const stock = stocksInSector[0]; // 取第一个股票
            rowData[sector.name] = (
              <div 
                style={{ 
                  fontSize: '12px', 
                  lineHeight: '1.4',
                  cursor: 'pointer',
                  padding: '4px',
                  borderRadius: '4px',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f0f0f0';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
                onClick={() => {
                  setSelectedStock(stock);
                  setIsModalVisible(true);
                }}
              >
                <div style={{ color: '#666' }}>{stock.time}</div>
                <div style={{ fontWeight: 'bold', color: '#333' }}>{stock.name}</div>
                <div style={{ color: '#1890ff', fontWeight: 'bold' }}>{stock.price}</div>
                <div style={{ color: '#52c41a' }}>{stock.changePercent}%</div>
                <div style={{ color: '#666', fontSize: '11px' }}>{stock.volume1}万</div>
                <div style={{ color: '#999', fontSize: '11px' }}>{stock.ratio1}/{stock.ratio2}</div>
              </div>
            );
          } else {
            rowData[sector.name] = null;
          }
        });

        tableData.push(rowData);
      }
    });

    // 添加断板数据（放在最下侧）
    const brokenLadder = ladderData.find(l => l.level === 0);
    if (brokenLadder) {
      const brokenRowData: any = {
        key: 'broken',
        level: '断板',
        count: `${brokenLadder.count}个`,
      };

      sectors.forEach((sector) => {
        const stocksInSector = brokenLadder.stocks.filter(stock => 
          stock.sectors.includes(sector.name)
        );
        
        if (stocksInSector.length > 0) {
          const stock = stocksInSector[0];
          brokenRowData[sector.name] = (
            <div 
              style={{ 
                fontSize: '12px', 
                lineHeight: '1.4', 
                opacity: 0.7,
                cursor: 'pointer',
                padding: '4px',
                borderRadius: '4px',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f0f0f0';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
              onClick={() => {
                setSelectedStock(stock);
                setIsModalVisible(true);
              }}
            >
              <div style={{ color: '#666' }}>{stock.time}</div>
              <div style={{ fontWeight: 'bold', color: '#333' }}>{stock.name}</div>
              <div style={{ color: '#ff4d4f', fontWeight: 'bold' }}>{stock.price}</div>
              <div style={{ color: '#ff4d4f' }}>{stock.changePercent}%</div>
              <div style={{ color: '#666', fontSize: '11px' }}>{stock.volume1}万</div>
              <div style={{ color: '#999', fontSize: '11px' }}>{stock.ratio1}/{stock.ratio2}</div>
            </div>
          );
        } else {
          brokenRowData[sector.name] = null;
        }
      });

      tableData.push(brokenRowData);
    }

    return tableData;
  };

  // 生成表格列配置
  const generateColumns = () => {
    const columns: any[] = [
      {
        title: '梯队/板块',
        dataIndex: 'level',
        key: 'level',
        width: 100,
        fixed: 'left' as const,
        render: (text: string, record: any) => (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{text}</div>
            <div style={{ fontSize: '12px', color: '#666' }}>{record.count}</div>
          </div>
        ),
      },
    ];

    // 添加板块列
    sectors.forEach((sector) => {
      columns.push({
        title: sector.name,
        dataIndex: sector.name,
        key: sector.name,
        width: 120,
        render: (value: any) => value,
      });
    });

    return columns;
  };



  // 生成股票K线数据
  const generateStockKLineData = (stock: Stock): StockDataPoint[] => {
    const dates = ['2025-08-18', '2025-08-19', '2025-08-20', '2025-08-21', '2025-08-22'];
    const klineData = [
      { open: 8.5, high: 8.8, low: 8.3, close: 8.6, volume: 1500000 },
      { open: 8.6, high: 9.0, low: 8.5, close: 8.9, volume: 1800000 },
      { open: 8.9, high: 9.3, low: 8.7, close: 9.2, volume: 2200000 },
      { open: 9.2, high: 9.8, low: 9.0, close: 9.7, volume: 2500000 },
      { open: 9.7, high: stock.price, low: 9.5, close: stock.price, volume: 3000000 }
    ];
    
    return dates.map((date, index) => ({
      time: date,
      ...klineData[index]
    }));
  };

  // 生成股票走势数据
  const generateStockTrendData = (stock: Stock): StockDataPoint[] => {
    const times = ['09:30', '10:00', '10:30', '11:00', '11:30', '13:00', '13:30', '14:00', '14:30', '15:00'];
    const basePrice = stock.price * 0.95;
    
    return times.map((time, index) => {
      const priceChange = (Math.random() - 0.5) * 0.1 * basePrice;
      const currentPrice = basePrice + priceChange + (index * 0.01 * basePrice);
      
      return {
        time,
        open: currentPrice,
        high: currentPrice * 1.02,
        low: currentPrice * 0.98,
        close: currentPrice,
        volume: Math.floor(Math.random() * 500000) + 100000
      };
    });
  };

  const sectorsToUse = remote?.sectors || sectors;
  const ladderDataToUse = remote?.ladders || ladderData;

  // 生成表格数据/列时使用远程覆盖数据
  const generateTableData = () => {
    const tableData = [] as any[];
    ladderDataToUse.forEach((ladder) => {
      if (ladder.level > 0) {
        const rowData: any = {
          key: `ladder-${ladder.level}`,
          level: `${ladder.level}板`,
          count: `${ladder.count}个`,
        };
        sectorsToUse.forEach((sector) => {
          const stocksInSector = ladder.stocks.filter(stock => stock.sectors.includes(sector.name));
          if (stocksInSector.length > 0) {
            const stock = stocksInSector[0];
            rowData[sector.name] = (
              <div 
                style={{ fontSize: '12px', lineHeight: '1.4', cursor: 'pointer', padding: '4px', borderRadius: '4px', transition: 'background-color 0.2s' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.backgroundColor = '#f0f0f0'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.backgroundColor = 'transparent'; }}
                onClick={() => { setSelectedStock(stock); setIsModalVisible(true); }}
              >
                <div style={{ color: '#666' }}>{stock.time}</div>
                <div style={{ fontWeight: 'bold', color: '#333' }}>{stock.name}</div>
                <div style={{ color: '#1890ff', fontWeight: 'bold' }}>{stock.price}</div>
                <div style={{ color: '#52c41a' }}>{stock.changePercent}%</div>
                <div style={{ color: '#666', fontSize: '11px' }}>{stock.volume1}万</div>
                <div style={{ color: '#999', fontSize: '11px' }}>{stock.ratio1}/{stock.ratio2}</div>
              </div>
            );
          } else {
            rowData[sector.name] = null;
          }
        });
        tableData.push(rowData);
      }
    });
    const brokenLadder = ladderDataToUse.find(l => l.level === 0);
    if (brokenLadder) {
      const brokenRowData: any = { key: 'broken', level: '断板', count: `${brokenLadder.count}个` };
      sectorsToUse.forEach((sector) => {
        const stocksInSector = brokenLadder.stocks.filter(stock => stock.sectors.includes(sector.name));
        if (stocksInSector.length > 0) {
          const stock = stocksInSector[0];
          brokenRowData[sector.name] = (
            <div 
              style={{ fontSize: '12px', lineHeight: '1.4', opacity: 0.7, cursor: 'pointer', padding: '4px', borderRadius: '4px', transition: 'background-color 0.2s' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.backgroundColor = '#f0f0f0'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.backgroundColor = 'transparent'; }}
              onClick={() => { setSelectedStock(stock); setIsModalVisible(true); }}
            >
              <div style={{ color: '#666' }}>{stock.time}</div>
              <div style={{ fontWeight: 'bold', color: '#333' }}>{stock.name}</div>
              <div style={{ color: '#ff4d4f', fontWeight: 'bold' }}>{stock.price}</div>
              <div style={{ color: '#ff4d4f' }}>{stock.changePercent}%</div>
              <div style={{ color: '#666', fontSize: '11px' }}>{stock.volume1}万</div>
              <div style={{ color: '#999', fontSize: '11px' }}>{stock.ratio1}/{stock.ratio2}</div>
            </div>
          );
        } else {
          brokenRowData[sector.name] = null;
        }
      });
      tableData.push(brokenRowData);
    }
    return tableData;
  };

  const generateColumns = () => {
    const columns: any[] = [
      { title: '梯队/板块', dataIndex: 'level', key: 'level', width: 100, fixed: 'left' as const, render: (text: string, record: any) => (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{text}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>{record.count}</div>
        </div>
      ) },
    ];
    sectorsToUse.forEach((sector) => {
      columns.push({ title: sector.name, dataIndex: sector.name, key: sector.name, width: 120, render: (value: any) => value });
    });
    return columns;
  };

  const tableData = generateTableData();
  const columns = generateColumns();

  return (
    <LimitUpStocksContainer ref={containerRef}>
      {/* 顶部标题栏 */}
      <LimitUpStocksHeader ref={headerRef}>
        <div className="header-left">
          <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold' }}>梯队复盘</h2>
        </div>
        <div className="header-right">
          <Space size="large">
            <CheckboxGroup
              options={[
                { label: '行情', value: '行情' },
                { label: '个数', value: '个数' },
                { label: '时间', value: '时间' },
                { label: '分数', value: '分数' },
                { label: '成交额', value: '成交额' },
                { label: '市值', value: '市值' },
                { label: '封单', value: '封单' },
                { label: '流通市值', value: '流通市值' },
              ]}
              value={visibleColumns}
              onChange={setVisibleColumns}
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '14px', color: '#666' }}>日期：</span>
              <DatePicker 
                value={dayjs(selectedDate)}
                onChange={(date) => setSelectedDate(date?.format('YYYY-MM-DD') || dayjs().format('YYYY-MM-DD'))}
                style={{ width: 150 }}
              />
            </div>
          </Space>
        </div>
      </LimitUpStocksHeader>

      {/* 梯队复盘表格 */}
      <Card 
        size="small" 
        bodyStyle={{ 
          padding: 12,
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}
        style={{ 
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        <Table
          columns={columns}
          dataSource={tableData}
          pagination={false}
          size="small"
          scroll={{ 
            x: 'max-content',
            y: tableScrollY
          }}
          bordered
          rowClassName={(record) => {
            if (record.key === 'broken') return 'broken-row';
            return '';
          }}
          style={{ 
            flex: 1,
            width: '100%'
          }}
        />
      </Card>

      {/* 股票详情模态框 */}
      <Modal
        title={`${selectedStock?.name}(${selectedStock?.code}) 股票详情`}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={1000}
        destroyOnClose
      >
        {selectedStock && (
          <div>
            {/* 基本信息 */}
            <Descriptions title="基本信息" bordered size="small" style={{ marginBottom: 16 }}>
              <Descriptions.Item label="股票名称">{selectedStock.name}</Descriptions.Item>
              <Descriptions.Item label="股票代码">{selectedStock.code}</Descriptions.Item>
              <Descriptions.Item label="当前价格">{selectedStock.price}</Descriptions.Item>
              <Descriptions.Item label="涨跌幅">{selectedStock.changePercent}%</Descriptions.Item>
              <Descriptions.Item label="涨停时间">{selectedStock.time}</Descriptions.Item>
              <Descriptions.Item label="成交量">{selectedStock.volume1}万</Descriptions.Item>
              <Descriptions.Item label="成交额">{selectedStock.volume2}万</Descriptions.Item>
              <Descriptions.Item label="市值">{selectedStock.marketCap}亿</Descriptions.Item>
              <Descriptions.Item label="市盈率">{selectedStock.pe}</Descriptions.Item>
              <Descriptions.Item label="市净率">{selectedStock.pb}</Descriptions.Item>
            </Descriptions>

            {/* 概念标签 */}
            <div style={{ marginBottom: 16 }}>
              <h4>概念标签：</h4>
              <Space wrap>
                {selectedStock.sectors.map((sector, index) => (
                  <Tag key={index} color="blue">{sector}</Tag>
                ))}
              </Space>
            </div>

            {/* 图表 */}
            <Tabs defaultActiveKey="trend">
              <TabPane 
                tab={
                  <span>
                    <LineChartOutlined />
                    当日走势
                  </span>
                } 
                key="trend"
              >
                <StockChart
                  data={generateStockTrendData(selectedStock)}
                  chartType="line"
                  theme="light"
                  showVolume={true}
                  height={400}
                  stockCode={selectedStock.code}
                  title={`${selectedStock.name} 当日走势`}
                  showTimeSelector={false}
                />
              </TabPane>
              <TabPane 
                tab={
                  <span>
                    <BarChartOutlined />
                    日K线图
                  </span>
                } 
                key="kline"
              >
                <StockChart
                  data={generateStockKLineData(selectedStock)}
                  chartType="candlestick"
                  theme="light"
                  showVolume={true}
                  height={400}
                  stockCode={selectedStock.code}
                  title={`${selectedStock.name} 日K线图`}
                  showTimeSelector={true}
                />
              </TabPane>
            </Tabs>
          </div>
        )}
      </Modal>
    </LimitUpStocksContainer>
  );
};

export default LimitUpStocks;
