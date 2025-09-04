import { API_CONFIG, buildQueryString } from './config';
import type { QueryParams } from './config';
import { handleMock } from './mock';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface HttpRequestOptions<TBody = unknown> {
  headers?: Record<string, string>;
  query?: QueryParams;
  body?: TBody;
  signal?: AbortSignal;
}

export interface HttpResponse<TData> {
  status: number;
  headers: Headers;
  data: TData;
}

export class HttpClient {
  private readonly baseURL: string;
  private readonly defaultHeaders: Record<string, string>;

  constructor(baseURL: string = API_CONFIG.baseURL) {
    this.baseURL = baseURL?.replace(/\/$/, '') || '';
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  private buildURL(path: string, query?: QueryParams): string {
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return `${this.baseURL}${normalizedPath}${buildQueryString(query)}`;
  }

  private mergeHeaders(custom?: Record<string, string>): HeadersInit {
    return { ...this.defaultHeaders, ...(custom || {}) };
  }

  async request<TData, TBody = unknown>(method: HttpMethod, path: string, options: HttpRequestOptions<TBody> = {}): Promise<HttpResponse<TData>> {
    const { headers, query, body, signal } = options;
    const url = this.buildURL(path, query);
    const init: RequestInit = {
      method,
      headers: this.mergeHeaders(headers),
      signal,
    };

    if (body !== undefined && body !== null) {
      init.body = typeof body === 'string' ? body : JSON.stringify(body);
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), API_CONFIG.timeoutMs);
    try {
      // 优先走 Mock
      const mockRes = await handleMock(path, init);
      const res = mockRes || (await fetch(url, { ...init, signal: signal || controller.signal }));
      const contentType = res.headers.get('content-type') || '';
      let data: any = null;
      if (contentType.includes('application/json')) {
        data = await res.json();
      } else if (contentType.includes('text/')) {
        data = await res.text();
      } else {
        data = await res.arrayBuffer();
      }

      if (!res.ok) {
        const error = new Error(`HTTP ${res.status}`) as Error & { status?: number; data?: unknown };
        (error as any).status = res.status;
        (error as any).data = data;
        throw error;
      }

      return { status: res.status, headers: res.headers, data } as HttpResponse<TData>;
    } finally {
      clearTimeout(timeout);
    }
  }

  get<TData>(path: string, options?: HttpRequestOptions): Promise<HttpResponse<TData>> {
    return this.request<TData>('GET', path, options);
  }

  post<TData, TBody = unknown>(path: string, body?: TBody, options?: HttpRequestOptions<TBody>): Promise<HttpResponse<TData>> {
    return this.request<TData, TBody>('POST', path, { ...(options || {}), body });
  }

  put<TData, TBody = unknown>(path: string, body?: TBody, options?: HttpRequestOptions<TBody>): Promise<HttpResponse<TData>> {
    return this.request<TData, TBody>('PUT', path, { ...(options || {}), body });
  }

  patch<TData, TBody = unknown>(path: string, body?: TBody, options?: HttpRequestOptions<TBody>): Promise<HttpResponse<TData>> {
    return this.request<TData, TBody>('PATCH', path, { ...(options || {}), body });
  }

  delete<TData>(path: string, options?: HttpRequestOptions): Promise<HttpResponse<TData>> {
    return this.request<TData>('DELETE', path, options);
  }
}

export const apiClient = new HttpClient();


