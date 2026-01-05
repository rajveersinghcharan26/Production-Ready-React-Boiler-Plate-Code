/**
 * Authentication API endpoints using React Query.
 */

import { useMutation } from '@tanstack/react-query';

import axiosInstance from '../axiosInstance';
import { API_ENDPOINTS } from '@/config/constants';
import {
  type ILoginRequest,
  type ILoginResponse,
  type IRegisterRequest,
  type IRefreshTokenResponse,
} from '@/types';

/**
 * Auth API service functions.
 */
const authService = {
  login: async (credentials: ILoginRequest): Promise<ILoginResponse> => {
    const response = await axiosInstance.post<ILoginResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials
    );
    return response.data;
  },

  register: async (userData: IRegisterRequest): Promise<ILoginResponse> => {
    const response = await axiosInstance.post<ILoginResponse>(
      API_ENDPOINTS.AUTH.REGISTER,
      userData
    );
    return response.data;
  },

  logout: async (): Promise<void> => {
    await axiosInstance.post(API_ENDPOINTS.AUTH.LOGOUT);
  },

  refreshToken: async (refreshToken: string): Promise<IRefreshTokenResponse> => {
    const response = await axiosInstance.post<IRefreshTokenResponse>(
      API_ENDPOINTS.AUTH.REFRESH,
      { refreshToken }
    );
    return response.data;
  },
};

/**
 * Hook for user login.
 * @example
 * const { mutate: login, isPending } = useLoginMutation();
 * login({ email, password });
 */
export function useLoginMutation() {
  return useMutation({
    mutationFn: authService.login,
  });
}

/**
 * Hook for user registration.
 * @example
 * const { mutate: register, isPending } = useRegisterMutation();
 * register({ email, password, firstName, lastName });
 */
export function useRegisterMutation() {
  return useMutation({
    mutationFn: authService.register,
  });
}

/**
 * Hook for user logout.
 * @example
 * const { mutate: logout, isPending } = useLogoutMutation();
 * logout();
 */
export function useLogoutMutation() {
  return useMutation({
    mutationFn: authService.logout,
  });
}

/**
 * Hook for refreshing access token.
 * @example
 * const { mutate: refresh, isPending } = useRefreshTokenMutation();
 * refresh({ refreshToken });
 */
export function useRefreshTokenMutation() {
  return useMutation({
    mutationFn: (data: { refreshToken: string }) =>
      authService.refreshToken(data.refreshToken),
  });
}
