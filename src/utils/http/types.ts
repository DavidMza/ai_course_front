export interface RequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, string>;
}

export interface ApiResponse<T> {
  data?: T;
  status: number;
  ok: boolean;
  error?: string;
}