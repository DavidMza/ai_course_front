import { RequestOptions, ApiResponse } from './types';
import { HttpError } from './errors';

export class HttpClient {
  constructor(private baseUrl: string) {}

  private buildUrl(endpoint: string, params?: Record<string, string>): string {
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
    const cleanBaseUrl = this.baseUrl.endsWith('/') ? this.baseUrl.slice(0, -1) : this.baseUrl;
    const url = new URL(`${cleanBaseUrl}/${cleanEndpoint}`, window.location.origin);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value) url.searchParams.append(key, value);
      });
    }
    
    return url.toString();
  }

  private async request<T>(
    endpoint: string,
    method: string,
    options?: RequestOptions,
    body?: any
  ): Promise<ApiResponse<T>> {
    try {
      const url = this.buildUrl(endpoint, options?.params);
      
      const response = await fetch(url, {
        method,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          ...options?.headers
        },
        body: body ? JSON.stringify(body) : undefined
      });

      let data: any;
      let error: string | undefined;

      if (response.status !== 204) {
        try {
          data = await response.json();
        } catch (e) {
          error = 'Invalid response format';
        }
      }

      const result: ApiResponse<T> = {
        data,
        error,
        status: response.status,
        ok: response.ok
      };

      if (!response.ok) {
        throw new HttpError(
          error || data?.message || `Request failed with status ${response.status}`,
          response.status,
          data
        );
      }

      return result;
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }
      throw new HttpError(
        error instanceof Error ? error.message : 'Network error',
        undefined,
        error
      );
    }
  }

  async get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    const response = await this.request<T>(endpoint, 'GET', options);
    if (!response.ok || !response.data) {
      throw new HttpError('Failed to get data', response.status);
    }
    return response.data;
  }

  async post<T>(endpoint: string, body: any, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, 'POST', options, body);
  }

  async patch<T>(endpoint: string, body: any, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, 'PATCH', options, body);
  }

  async delete<T>(endpoint: string, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, 'DELETE', options);
  }
}