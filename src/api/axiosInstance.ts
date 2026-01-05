/**
 * Axios instance configuration with interceptors.
 * Handles authentication, token refresh, and basic error handling.
 */

import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';

import { env } from '@/config/env';
import { STORAGE_KEYS } from '@/config/constants';

/** Extended Axios request config with retry flag */
interface IExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

/** Flag to prevent multiple refresh token requests */
let isRefreshing = false;

/** Queue of failed requests waiting for token refresh */
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: Error) => void;
}> = [];

/**
 * Process the queue of failed requests after token refresh.
 */
function processQueue(error: Error | null, token: string | null = null): void {
  failedQueue.forEach((request) => {
    if (error) {
      request.reject(error);
    } else if (token) {
      request.resolve(token);
    }
  });
  failedQueue = [];
}

/**
 * Get error message from various error formats.
 */
function getErrorMessage(error: AxiosError): string {
  const data = error.response?.data as Record<string, unknown> | undefined;
  return (
    (data?.message as string) ||
    (data?.error as string) ||
    error.message ||
    'Something went wrong'
  );
}

/**
 * Show error snackbar (lazy import to avoid circular dependency).
 */
async function showErrorSnackbar(message: string): Promise<void> {
  const { store } = await import('@/store');
  const { showSnackbar } = await import('@/store/slices/uiSlice');
  store.dispatch(showSnackbar({ message, severity: 'error' }));
}

/**
 * Handle logout (lazy import to avoid circular dependency).
 */
async function handleLogout(): Promise<void> {
  const { store } = await import('@/store');
  const { logout } = await import('@/features/auth/authSlice');
  store.dispatch(logout());
}

/**
 * Create and configure the Axios instance.
 */
const axiosInstance: AxiosInstance = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: env.apiTimeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request interceptor - adds auth token to requests.
 */
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response interceptor - handles errors and token refresh.
 */
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as IExtendedAxiosRequestConfig | undefined;
    const status = error.response?.status;

    // Network error (no response)
    if (!error.response) {
      showErrorSnackbar('Unable to connect to server');
      return Promise.reject(error);
    }

    // Handle 401 - attempt token refresh
    if (
      status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !originalRequest.url?.includes('/auth/refresh')
    ) {
      if (isRefreshing) {
        // Wait for refresh to complete
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);

      if (!refreshToken) {
        await handleLogout();
        processQueue(new Error('No refresh token'), null);
        isRefreshing = false;
        return Promise.reject(error);
      }

      try {
        const response = await axios.post<{ accessToken: string; refreshToken: string }>(
          `${env.apiBaseUrl}/auth/refresh`,
          { refreshToken }
        );

        const { accessToken, refreshToken: newRefreshToken } = response.data;

        // Update storage
        localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
        localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, newRefreshToken);

        // Update Redux store
        const { store } = await import('@/store');
        const { setTokens } = await import('@/features/auth/authSlice');
        store.dispatch(setTokens({ accessToken, refreshToken: newRefreshToken }));

        processQueue(null, accessToken);
        isRefreshing = false;

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch {
        await handleLogout();
        processQueue(new Error('Token refresh failed'), null);
        isRefreshing = false;
        return Promise.reject(error);
      }
    }

    // Show error snackbar for other errors
    const message = getErrorMessage(error);
    showErrorSnackbar(message);

    return Promise.reject(error);
  }
);

export default axiosInstance;
