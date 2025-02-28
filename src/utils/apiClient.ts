interface RequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, string>;
}

interface ApiResponse<T> {
  data?: T;
  status: number;
  ok: boolean;
}

export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private buildUrl(endpoint: string, params?: Record<string, string>): string {
    const url = new URL(endpoint, window.location.origin + this.baseUrl);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
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

      const result: ApiResponse<T> = {
        status: response.status,
        ok: response.ok
      };

      if (response.status !== 204) {
        try {
          result.data = await response.json();
        } catch (e) {
          console.warn('Could not parse JSON response');
        }
      }

      return result;
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  }

  async get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    const response = await this.request<T>(endpoint, 'GET', options);
    if (!response.ok) {
      throw new Error('API request failed');
    }
    return response.data as T;
  }

  async post<T>(endpoint: string, body: any, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, 'POST', options, body);
  }
}