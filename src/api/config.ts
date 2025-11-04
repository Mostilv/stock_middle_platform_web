// API 全局配置
export const API_CONFIG = {
  baseURL: (import.meta as any).env?.VITE_API_BASE_URL || '',
  timeoutMs: 15000,
  enableMock:
    (import.meta as any).env?.VITE_ENABLE_API_MOCK === 'true' ||
    !(import.meta as any).env?.VITE_API_BASE_URL,
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
