const ENV_BASE_URL = import.meta.env.VITE_API_URL || ''; // Get base from env or default to empty

// Ensure base URL ends correctly and append /api/v1
const cleanBaseUrl = ENV_BASE_URL.endsWith('/') ? ENV_BASE_URL.slice(0, -1) : ENV_BASE_URL;
const finalBaseUrl = `${cleanBaseUrl}/api/v1`;

export const API_CONFIG = {
  baseUrl: finalBaseUrl,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
};