import { http } from './httpClient';

export interface SectorData {
  name: string;
  count: number;
  value: number;
}

export interface StockItem {
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
  marketCap: number;
  pe: number;
  pb: number;
}

export interface LadderGroup {
  level: number;
  count: number;
  stocks: StockItem[];
}

export interface LimitUpOverviewResponse {
  date: string;
  sectors: SectorData[];
  ladders: LadderGroup[];
}

const limitUpOverviewMock: LimitUpOverviewResponse = {
  date: '2025-08-28',
  sectors: [
    { name: '芯片', count: 27, value: 21441 },
    { name: '算力', count: 29, value: 8221 },
    { name: '人工智能', count: 31, value: 7592 },
    { name: '通信', count: 9, value: 4830 },
    { name: '证券', count: 2, value: 4187 },
  ],
  ladders: [
    {
      level: 6,
      count: 1,
      stocks: [
        { name: '科森科技', code: '603626', time: '09:43', price: 10.02, changePercent: 28.44, volume1: 84.67, volume2: 84.67, ratio1: 0.43, ratio2: 1.9, sectors: ['机器人概念'], marketCap: 45.6, pe: 25.3, pb: 2.1 },
      ],
    },
    {
      level: 5,
      count: 1,
      stocks: [
        { name: '园林股份', code: '605303', time: '09:30', price: 9.99, changePercent: 0.49, volume1: 32.31, volume2: 32.31, ratio1: 4.31, ratio2: 4.35, sectors: ['人工智能', '数字经济'], marketCap: 32.8, pe: 18.7, pb: 1.8 },
      ],
    },
    {
      level: 4,
      count: 1,
      stocks: [
        { name: '伟隆股份', code: '002871', time: '13:02', price: 10.03, changePercent: 5.49, volume1: 46.42, volume2: 28.25, ratio1: 1.07, ratio2: 3.41, sectors: ['人工智能', '数字经济', '基础建设', '军工'], marketCap: 28.5, pe: 22.1, pb: 1.6 },
      ],
    },
    {
      level: 3,
      count: 3,
      stocks: [
        { name: '御银科技', code: '002177', time: '09:33', price: 10.01, changePercent: 23.12, volume1: 76.12, volume2: 67.49, ratio1: 1.11, ratio2: 4.15, sectors: ['通信', '证券'], marketCap: 56.2, pe: 31.5, pb: 2.8 },
        { name: '汇嘉时代', code: '603101', time: '09:31', price: 9.99, changePercent: 1.68, volume1: 53.86, volume2: 53.86, ratio1: 1.1, ratio2: 2.23, sectors: ['有色金属'], marketCap: 23.4, pe: 15.2, pb: 1.3 },
        { name: '成飞集成', code: '002190', time: '09:32', price: 10.01, changePercent: 45.52, volume1: 175.02, volume2: 175.02, ratio1: 1.32, ratio2: 6.01, sectors: ['军工'], marketCap: 67.3, pe: 28.9, pb: 2.4 },
      ],
    },
    {
      level: 2,
      count: 3,
      stocks: [
        { name: '万通发展', code: '600246', time: '09:30', price: 10.05, changePercent: 1.12, volume1: 219.48, volume2: 219.48, ratio1: 3.74, ratio2: 12.46, sectors: ['芯片', '人工智能'], marketCap: 78.9, pe: 35.6, pb: 2.9 },
        { name: '天融信', code: '002212', time: '09:30', price: 9.97, changePercent: 10.09, volume1: 119.71, volume2: 118.44, ratio1: 1.72, ratio2: 5.51, sectors: ['算力', '数字经济', '基础建设', '机器人概念'], marketCap: 45.2, pe: 26.8, pb: 2.1 },
        { name: '合力泰', code: '002217', time: '09:37', price: 10.04, changePercent: 5.57, volume1: 229.62, volume2: 174.39, ratio1: 1.49, ratio2: 12.26, sectors: ['通信', '云游戏', '化工'], marketCap: 34.7, pe: 19.3, pb: 1.7 },
      ],
    },
    {
      level: 0,
      count: 2,
      stocks: [
        { name: '模拟股票1', code: '000001', time: '14:30', price: 9.85, changePercent: -1.5, volume1: 45.23, volume2: 45.23, ratio1: 0.85, ratio2: 2.1, sectors: ['芯片'], marketCap: 52.1, pe: 29.3, pb: 2.3 },
        { name: '模拟股票2', code: '000002', time: '14:25', price: 8.92, changePercent: -2.1, volume1: 32.15, volume2: 32.15, ratio1: 0.72, ratio2: 1.8, sectors: ['人工智能'], marketCap: 41.8, pe: 23.6, pb: 1.9 },
      ],
    },
  ],
};

export const fetchLimitUpOverview = async (date?: string): Promise<LimitUpOverviewResponse> => {
  if (import.meta.env.VITE_ENABLE_API_MOCK === 'true') {
    return limitUpOverviewMock;
  }
  return http.get<LimitUpOverviewResponse>('/limitup/overview', { query: date ? { date } : undefined });
};
