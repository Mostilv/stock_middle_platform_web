// API 全局配置
const rawBaseURL = (import.meta as any).env?.VITE_API_BASE_URL || '';

export const API_CONFIG = {
  baseURL: rawBaseURL.replace(/\/$/, ''),
  timeoutMs: 15000,
  // 默认走真实后端，只有显式配置 VITE_ENABLE_API_MOCK=true 时才使用前端内置 Mock
  enableMock: (import.meta as any).env?.VITE_ENABLE_API_MOCK === 'true',
};

export type QueryParams = Record<
  string,
  string | number | boolean | undefined | null
>;

export function buildQueryString(params?: QueryParams): string {
  if (!params) return '';
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    search.set(key, String(value));
  });
  const qs = search.toString();
  return qs ? `?${qs}` : '';
}
