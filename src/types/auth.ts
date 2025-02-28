export interface RegisterData {
  email: string;
  password: string;
  name: string;
  lastname: string;
  language: string;
  assistant: string;
  model: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  lastname: string;
  language: string;
  assistant: string;
  model: string;
}