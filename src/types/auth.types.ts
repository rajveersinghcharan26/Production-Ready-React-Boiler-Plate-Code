/**
 * Authentication-related type definitions.
 */

import { type TId } from './common.types';

/** User roles enum */
export enum EUserRole {
  ADMIN = 'admin',
  MANAGER = 'manager',
  USER = 'user',
  GUEST = 'guest',
}

/** Login request payload */
export interface ILoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

/** Register request payload */
export interface IRegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

/** Authenticated user */
export interface IAuthUser {
  id: TId;
  email: string;
  firstName: string;
  lastName: string;
  role: EUserRole;
  avatar?: string;
  isEmailVerified: boolean;
}

/** Authentication state */
export interface IAuthState {
  user: IAuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

/** Login response */
export interface ILoginResponse {
  user: IAuthUser;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

/** Refresh token response */
export interface IRefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}
