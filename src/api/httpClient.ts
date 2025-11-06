import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from 'axios';
import { API_CONFIG } from './config';
import type { QueryParams } from './config';
import { resolveMockResponse } from './mock';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

const baseURL = API_CONFIG.baseURL?.replace(/\/$/, '') || '';

export const httpClient: AxiosInstance = axios.create({
  baseURL,
  timeout: API_CONFIG.timeoutMs,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface RequestConfig<TBody = unknown>
  extends Omit<
    AxiosRequestConfig<TBody>,
    'url' | 'method' | 'params' | 'data'
  > {
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

  axiosConfig.baseURL = axiosConfig.baseURL ?? httpClient.defaults.baseURL;
  axiosConfig.headers = {
    ...httpClient.defaults.headers.common,
    ...(rest.headers || {}),
  };

  const mockResponse = await resolveMockResponse<TData>(axiosConfig);
  if (mockResponse) {
    return mockResponse.data;
  }

  const response = await httpClient.request<TData>(axiosConfig);
  return response.data;
}

export const http = {
  request: executeRequest,
  get: <TData>(url: string, options?: ReadOnlyOptions) =>
    executeRequest<TData, never>({ ...(options || {}), url, method: 'GET' }),
  delete: <TData, TBody = unknown>(
    url: string,
    options?: RequestOptions<TBody>,
  ) =>
    executeRequest<TData, TBody>({ ...(options || {}), url, method: 'DELETE' }),
  post: <TData, TBody = unknown>(
    url: string,
    data?: TBody,
    options?: RequestOptions<TBody>,
  ) =>
    executeRequest<TData, TBody>({
      ...(options || {}),
      url,
      method: 'POST',
      data,
    }),
  put: <TData, TBody = unknown>(
    url: string,
    data?: TBody,
    options?: RequestOptions<TBody>,
  ) =>
    executeRequest<TData, TBody>({
      ...(options || {}),
      url,
      method: 'PUT',
      data,
    }),
  patch: <TData, TBody = unknown>(
    url: string,
    data?: TBody,
    options?: RequestOptions<TBody>,
  ) =>
    executeRequest<TData, TBody>({
      ...(options || {}),
      url,
      method: 'PATCH',
      data,
    }),
};

export interface HttpResponse<TData = unknown> {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  data: TData;
}

export interface HttpRequestOptions<TBody = unknown> {
  headers?: Record<string, string>;
  query?: QueryParams;
  body?: TBody;
  signal?: AbortSignal;
  timeoutMs?: number;
}

const toHeaderRecord = (
  headers: AxiosResponse['headers'],
): Record<string, string> => {
  if (!headers) return {};
  return Object.fromEntries(
    Object.entries(headers as Record<string, string | number | string[]>).map(
      ([key, value]) => [
        key,
        Array.isArray(value) ? value.join(', ') : String(value),
      ],
    ),
  );
};

export class HttpClient {
  private readonly client: AxiosInstance;

  constructor(client: AxiosInstance = httpClient) {
    this.client = client;
  }

  private buildConfig<TBody>(
    method: HttpMethod,
    path: string,
    options: HttpRequestOptions<TBody> = {},
  ): AxiosRequestConfig<TBody> {
    const config: AxiosRequestConfig<TBody> = {
      url: normalizeUrl(path),
      method,
      params: options.query,
      data: options.body,
      signal: options.signal,
    };
    if (options.timeoutMs !== undefined) {
      config.timeout = options.timeoutMs;
    }
    config.baseURL = config.baseURL ?? this.client.defaults.baseURL;
    config.headers = {
      ...this.client.defaults.headers.common,
      ...(options.headers || {}),
    };
    return config;
  }

  private async perform<TData, TBody>(
    config: AxiosRequestConfig<TBody>,
  ): Promise<HttpResponse<TData>> {
    const mockResponse = await resolveMockResponse<TData>(config);
    const response = mockResponse ?? (await this.client.request<TData>(config));
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
      headers: toHeaderRecord(response.headers),
    };
  }

  request<TData, TBody = unknown>(
    method: HttpMethod,
    path: string,
    options: HttpRequestOptions<TBody> = {},
  ): Promise<HttpResponse<TData>> {
    const config = this.buildConfig<TBody>(method, path, options);
    return this.perform<TData, TBody>(config);
  }

  get<TData>(
    path: string,
    options?: Omit<HttpRequestOptions, 'body'>,
  ): Promise<HttpResponse<TData>> {
    return this.request<TData>('GET', path, options);
  }

  delete<TData>(
    path: string,
    options?: Omit<HttpRequestOptions, 'body'>,
  ): Promise<HttpResponse<TData>> {
    return this.request<TData>('DELETE', path, options);
  }

  post<TData, TBody = unknown>(
    path: string,
    body?: TBody,
    options?: HttpRequestOptions<TBody>,
  ): Promise<HttpResponse<TData>> {
    return this.request<TData, TBody>('POST', path, {
      ...(options || {}),
      body,
    });
  }

  put<TData, TBody = unknown>(
    path: string,
    body?: TBody,
    options?: HttpRequestOptions<TBody>,
  ): Promise<HttpResponse<TData>> {
    return this.request<TData, TBody>('PUT', path, {
      ...(options || {}),
      body,
    });
  }

  patch<TData, TBody = unknown>(
    path: string,
    body?: TBody,
    options?: HttpRequestOptions<TBody>,
  ): Promise<HttpResponse<TData>> {
    return this.request<TData, TBody>('PATCH', path, {
      ...(options || {}),
      body,
    });
  }
}

export const apiClient = new HttpClient();

export type { AxiosRequestConfig } from 'axios';
