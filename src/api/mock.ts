import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_CONFIG } from './config';

interface MockResult<T = unknown> {
  status?: number;
  statusText?: string;
  headers?: Record<string, string>;
  data: T;
}

type MockHandler = (request: { path: string; config: AxiosRequestConfig }) => Promise<MockResult | undefined> | MockResult | undefined;

const jsonResponse = (data: unknown, init?: Partial<MockResult>): MockResult => ({
  status: 200,
  statusText: 'OK',
  headers: { 'Content-Type': 'application/json' },
  data,
  ...(init || {}),
});

// 杩欓噷闆嗕腑瀹氫箟 Mock 璺敱
const routes: Record<string, MockHandler> = {
  'GET /market/data': async () => {
    const payload = {
      shanghaiIndex: { current: 3700.25, change: 1.25, history: [3680.5, 3695.2, 3710.8, 3698.45, 3700.25] },
      nasdaqIndex: { current: 16543.67, change: -0.85, history: [16680.3, 16620.15, 16580.9, 16560.25, 16543.67] },
      goldIndex: { current: 2345.89, change: 2.15, history: [2295.6, 2310.25, 2325.8, 2335.45, 2345.89] },
      zhongzheng2000Index: { current: 1245.67, change: 0.75, history: [1235.2, 1240.8, 1242.5, 1243.9, 1245.67] },
    };
    return jsonResponse(payload);
  },
  'GET /limitup/overview': async () => {
    // 鍙牴鎹煡璇㈠弬鏁扮敓鎴愪笉鍚屾棩鏈燂紝浣嗚繖閲岀畝鍗曡繑鍥炲浐瀹氶泦
    const payload = {
      date: '2025-08-28',
      sectors: [
        { name: '鑺墖', count: 27, value: 21441 },
        { name: '绠楀姏', count: 29, value: 8221 },
        { name: '浜哄伐鏅鸿兘', count: 31, value: 7592 },
        { name: '閫氫俊', count: 9, value: 4830 },
        { name: '璇佸埜', count: 2, value: 4187 },
      ],
      ladders: [
        {
          level: 6,
          count: 1,
          stocks: [
            {
              name: '绉戞．绉戞妧',
              code: '603626',
              time: '09:43',
              price: 10.02,
              changePercent: 28.44,
              volume1: 84.67,
              volume2: 84.67,
              ratio1: 0.43,
              ratio2: 1.9,
              sectors: ['鏈哄櫒浜烘蹇?],
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
              name: '鍥灄鑲′唤',
              code: '605303',
              time: '09:30',
              price: 9.99,
              changePercent: 0.49,
              volume1: 32.31,
              volume2: 32.31,
              ratio1: 4.31,
              ratio2: 4.35,
              sectors: ['浜哄伐鏅鸿兘', '鏁板瓧缁忔祹'],
              marketCap: 32.8,
              pe: 18.7,
              pb: 1.8,
            },
          ],
        },
        {
          level: 4,
          count: 1,
          stocks: [
            {
              name: '浼熼殕鑲′唤',
              code: '002871',
              time: '13:02',
              price: 10.03,
              changePercent: 5.49,
              volume1: 46.42,
              volume2: 28.25,
              ratio1: 1.07,
              ratio2: 3.41,
              sectors: ['浜哄伐鏅鸿兘', '鏁板瓧缁忔祹', '鍩虹寤鸿', '鍐涘伐'],
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
              name: '寰￠摱绉戞妧',
              code: '002177',
              time: '09:33',
              price: 10.01,
              changePercent: 23.12,
              volume1: 76.12,
              volume2: 67.49,
              ratio1: 1.11,
              ratio2: 4.15,
              sectors: ['閫氫俊', '璇佸埜'],
              marketCap: 56.2,
              pe: 31.5,
              pb: 2.8,
            },
            {
              name: '姹囧槈鏃朵唬',
              code: '603101',
              time: '09:31',
              price: 9.99,
              changePercent: 1.68,
              volume1: 53.86,
              volume2: 53.86,
              ratio1: 1.1,
              ratio2: 2.23,
              sectors: ['鏈夎壊閲戝睘'],
              marketCap: 23.4,
              pe: 15.2,
              pb: 1.3,
            },
            {
              name: '鎴愰闆嗘垚',
              code: '002190',
              time: '09:32',
              price: 10.01,
              changePercent: 45.52,
              volume1: 175.02,
              volume2: 175.02,
              ratio1: 1.32,
              ratio2: 6.01,
              sectors: ['鍐涘伐'],
              marketCap: 67.3,
              pe: 28.9,
              pb: 2.4,
            },
          ],
        },
        {
          level: 2,
          count: 3,
          stocks: [
            {
              name: '涓囬€氬彂灞?,
              code: '600246',
              time: '09:30',
              price: 10.05,
              changePercent: 1.12,
              volume1: 219.48,
              volume2: 219.48,
              ratio1: 3.74,
              ratio2: 12.46,
              sectors: ['鑺墖', '浜哄伐鏅鸿兘'],
              marketCap: 78.9,
              pe: 35.6,
              pb: 2.9,
            },
            {
              name: '澶╄瀺淇?,
              code: '002212',
              time: '09:30',
              price: 9.97,
              changePercent: 10.09,
              volume1: 119.71,
              volume2: 118.44,
              ratio1: 1.72,
              ratio2: 5.51,
              sectors: ['绠楀姏', '鏁板瓧缁忔祹', '鍩虹寤鸿', '鏈哄櫒浜烘蹇?],
              marketCap: 45.2,
              pe: 26.8,
              pb: 2.1,
            },
            {
              name: '鍚堝姏娉?,
              code: '002217',
              time: '09:37',
              price: 10.04,
              changePercent: 5.57,
              volume1: 229.62,
              volume2: 174.39,
              ratio1: 1.49,
              ratio2: 12.26,
              sectors: ['閫氫俊', '浜戞父鎴?, '鍖栧伐'],
              marketCap: 34.7,
              pe: 19.3,
              pb: 1.7,
            },
          ],
        },
        {
          level: 0,
          count: 2,
          stocks: [
            {
              name: '鏂澘鑲＄エ1',
              code: '000001',
              time: '14:30',
              price: 9.85,
              changePercent: -1.5,
              volume1: 45.23,
              volume2: 45.23,
              ratio1: 0.85,
              ratio2: 2.1,
              sectors: ['鑺墖'],
              marketCap: 52.1,
              pe: 29.3,
              pb: 2.3,
            },
            {
              name: '鏂澘鑲＄エ2',
              code: '000002',
              time: '14:25',
              price: 8.92,
              changePercent: -2.1,
              volume1: 32.15,
              volume2: 32.15,
              ratio1: 0.72,
              ratio2: 1.8,
              sectors: ['浜哄伐鏅鸿兘'],
              marketCap: 41.8,
              pe: 23.6,
              pb: 1.9,
            },
          ],
        },
      ],
    };
    return jsonResponse(payload);
  },
  'GET /portfolio/overview': async () => {
    const payload = {
      strategies: [
        {
          id: '1',
          name: '浠峰€兼姇璧勭瓥鐣?,
          description: '鍩轰簬鍩烘湰闈㈠垎鏋愮殑浠峰€兼姇璧勭瓥鐣?,
          status: 'active',
          totalValue: 1000000,
          totalWeight: 100,
          items: [
            { key: '1', stock: '璐靛窞鑼呭彴', code: '600519', currentWeight: 15.2, targetWeight: 18.0, action: 'buy', price: 1688.0, quantity: 100, status: 'pending', createdAt: '2024-01-15', marketValue: 168800 },
            { key: '2', stock: '鎷涘晢閾惰', code: '600036', currentWeight: 8.5, targetWeight: 8.5, action: 'hold', price: 35.2, quantity: 0, status: 'completed', createdAt: '2024-01-13', marketValue: 0 },
          ],
          createdAt: '2024-01-01',
        },
        {
          id: '2',
          name: '鎴愰暱鎶曡祫绛栫暐',
          description: '涓撴敞浜庨珮鎴愰暱鎬у叕鍙哥殑鎶曡祫绛栫暐',
          status: 'active',
          totalValue: 800000,
          totalWeight: 100,
          items: [
            { key: '3', stock: '瀹佸痉鏃朵唬', code: '300750', currentWeight: 12.8, targetWeight: 10.0, action: 'sell', price: 245.6, quantity: 200, status: 'completed', createdAt: '2024-01-14', marketValue: 49120 },
          ],
          createdAt: '2024-01-05',
        },
      ],
      todayPnL: 12500,
      totalPnL: 89000,
      todayRebalance: 8,
      todayPendingRebalance: 3,
    };
    return jsonResponse(payload);
  },
  'GET /settings/data': async () => {
    const payload = {
      emailConfigs: [
        { id: '1', email: 'admin@example.com', remark: '绠＄悊鍛橀偖绠?, enabled: true },
        { id: '2', email: 'trader@example.com', remark: '浜ゆ槗鍛橀偖绠?, enabled: true },
      ],
      notificationTemplates: [
        {
          id: '1',
          name: '閫氱煡妯℃澘',
          subject: '鎶曡祫缁勫悎璋冧粨閫氱煡 - {date}',
          content:
            '绛栫暐鍚嶇О锛歿{strategyName}}\n濮旀墭鏃堕棿锛歿{orderTime}}\n鑲＄エ|濮旀墭鏁伴噺|濮旀墭绫诲瀷|濮旀墭浠锋牸|鎿嶄綔|鎸佷粨\n{{#orders}}{{stock}}|{{quantity}}|{{orderType}}|{{price}}|{{action}}|{{position}}\n{{/orders}}',
          enabled: true,
        },
      ],
    };
    return jsonResponse(payload);
  },
  'POST /settings/data': async () => {
    // 鍥炴樉鎴愬姛
    return jsonResponse({ ok: true } as any);
  },
  'GET /users': async () => {
    const payload = [
      {
        id: 1,
        username: 'admin',
        email: 'admin@example.com',
        full_name: '绯荤粺绠＄悊鍛?,
        is_active: true,
        is_superuser: true,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      },
      {
        id: 2,
        username: 'trader',
        email: 'trader@example.com',
        full_name: '浜ゆ槗鍛?,
        is_active: true,
        is_superuser: false,
        created_at: '2024-01-02T00:00:00Z',
        updated_at: '2024-01-02T00:00:00Z',
      },
      {
        id: 3,
        username: 'analyst',
        email: 'analyst@example.com',
        full_name: '鍒嗘瀽甯?,
        is_active: true,
        is_superuser: false,
        created_at: '2024-01-03T00:00:00Z',
        updated_at: '2024-01-03T00:00:00Z',
      },
      {
        id: 4,
        username: 'viewer',
        email: 'viewer@example.com',
        full_name: '瑙傚療鑰?,
        is_active: false,
        is_superuser: false,
        created_at: '2024-01-04T00:00:00Z',
        updated_at: '2024-01-04T00:00:00Z',
      },
    ];
    return jsonResponse(payload);
  },
};

export async function resolveMockResponse<T = unknown>(config: AxiosRequestConfig): Promise<AxiosResponse<T> | undefined> {
  if (!API_CONFIG.enableMock) return undefined;
  const method = (config.method || 'GET').toUpperCase();
  const rawUrl = config.url || '';
  const [pathPart] = rawUrl.split('?');
  const normalizedPath = pathPart.startsWith('/') ? pathPart : `/${pathPart}`;
  const key = `${method} ${normalizedPath}`;
  const handler = routes[key];
  if (!handler) return undefined;
  const result = await handler({ path: normalizedPath, config });
  if (!result) return undefined;
  return {
    data: result.data as T,
    status: result.status ?? 200,
    statusText: result.statusText ?? 'OK',
    headers: result.headers ?? { 'Content-Type': 'application/json' },
    config,
  } as AxiosResponse<T>;
}

