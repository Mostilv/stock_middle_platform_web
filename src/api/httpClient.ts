import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';
import { API_CONFIG, type QueryParams } from './config';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

const baseURL = API_CONFIG.baseURL?.replace(/\/$/, '') || '';

const instance: AxiosInstance = axios.create({
  baseURL,
  timeout: API_CONFIG.timeoutMs,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface RequestConfig<TBody = unknown>
  extends Omit<AxiosRequestConfig<TBody>, 'url' | 'method' | 'params' | 'data'> {
  url: string;
  method?: HttpMethod;
  query?: QueryParams;
  data?: TBody;
}

type RequestOptions<TBody> = Omit<RequestConfig<TBody>, 'url' | 'method'>;
type ReadOnlyOptions = Omit<RequestConfig, 'url' | 'method' | 'data'>;

const normalizeUrl = (url: string): string => {
  if (!url) return '/';
  return url.startsWith('/') ? url : `/${url}`;
};

async function executeRequest<TData, TBody = unknown>(
  config: RequestConfig<TBody>,
): Promise<TData> {
  const { query, ...rest } = config;
  const axiosConfig: AxiosRequestConfig<TBody> = {
    ...rest,
    url: normalizeUrl(config.url),
    method: config.method ?? 'GET',
    params: query,
    data: config.data,
  };

  const response = await instance.request<TData>(axiosConfig);
  return response.data;
}

export const http = {
  request: executeRequest,
  get: <TData>(url: string, options?: ReadOnlyOptions) =>
    executeRequest<TData, never>({ ...(options || {}), url, method: 'GET' }),
  delete: <TData, TBody = unknown>(url: string, options?: RequestOptions<TBody>) =>
    executeRequest<TData, TBody>({ ...(options || {}), url, method: 'DELETE' }),
  post: <TData, TBody = unknown>(url: string, data?: TBody, options?: RequestOptions<TBody>) =>
    executeRequest<TData, TBody>({ ...(options || {}), url, method: 'POST', data }),
  put: <TData, TBody = unknown>(url: string, data?: TBody, options?: RequestOptions<TBody>) =>
    executeRequest<TData, TBody>({ ...(options || {}), url, method: 'PUT', data }),
  patch: <TData, TBody = unknown>(url: string, data?: TBody, options?: RequestOptions<TBody>) =>
    executeRequest<TData, TBody>({ ...(options || {}), url, method: 'PATCH', data }),
};

export type { AxiosRequestConfig };
