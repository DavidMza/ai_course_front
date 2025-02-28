import { HttpClient } from '../../utils/http/client';
import { API_CONFIG } from '../../config/api';

export const apiClient = new HttpClient(API_CONFIG.baseUrl);