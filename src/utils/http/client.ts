import { RequestOptions, ApiResponse } from './types';
import { HttpError } from './errors';
import { useAuthStore } from '../../../store/authStore';
import { authService } from '../../../services/authService';

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
    options: RequestOptions = {}, // Initialize with empty object
    body?: any
  ): Promise<ApiResponse<T>> {
    const { headers: optionHeaders, params, isRetry } = options;
    const { accessToken } = useAuthStore.getState();

    const requestHeaders: Record<string, string> = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...optionHeaders,
    };

    if (accessToken) {
      requestHeaders['Authorization'] = `Bearer ${accessToken}`;
    }

    try {
      const url = this.buildUrl(endpoint, params);
      
      const response = await fetch(url, {
        method,
        headers: requestHeaders,
        body: body ? JSON.stringify(body) : undefined,
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
      if (error instanceof HttpError && error.status === 401 && !isRetry) {
        const { refreshToken, logout, setTokens } = useAuthStore.getState();

        if (!refreshToken) {
          logout();
          throw error; // Re-throw the original 401 error
        }

        try {
          const refreshResponse = await authService.refreshToken(refreshToken);
          if (refreshResponse && refreshResponse.access_token && refreshResponse.refresh_token) {
            setTokens(refreshResponse.access_token, refreshResponse.refresh_token);
            // Retry the original request with the new token and isRetry flag
            const retryOptions: RequestOptions = {
              ...options,
              headers: {
                ...optionHeaders, // Spread original option headers first
                'Authorization': `Bearer ${refreshResponse.access_token}`, // Override Authorization
              },
              isRetry: true,
            };
            return this.request<T>(endpoint, method, retryOptions, body);
          } else {
            logout();
            throw error; // Re-throw original 401 if refresh response is invalid
          }
        } catch (refreshError) {
          logout();
          // It might be better to throw the refreshError if it's more specific
          // For now, re-throwing the original 401 error as per instructions
          throw error;
        }
      } else if (error instanceof HttpError) {
        throw error;
      }

      throw new HttpError(
        error instanceof Error ? error.message : 'Network error or unexpected issue',
        (error instanceof HttpError) ? error.status : undefined,
        error
      );
    }
  }

  async get<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const response = await this.request<T>(endpoint, 'GET', options);
    // The request method now returns ApiResponse<T> which includes the full response.
    // The previous implementation expected only T.
    // We need to check if response.data exists and is of type T.
    // HttpError will be thrown by request() if response.ok is false.
    if (response.data === undefined) { // Check if data is undefined, which can happen with 204 or if T is void
        // If T can be void, this might be acceptable. Assuming T is not void for GET.
        throw new HttpError('No data received', response.status, response);
    }
    return response.data as T; // Type assertion
  }

  async post<T>(endpoint: string, body: any, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, 'POST', options, body);
  }

  async patch<T>(endpoint: string, body: any, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, 'PATCH', options, body);
  }

  async delete<T>(endpoint: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, 'DELETE', options);
  }
}