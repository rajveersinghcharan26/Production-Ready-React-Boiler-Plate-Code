/**
 * User-related type definitions.
 */

import { type IBaseEntity } from './common.types';

import { type EUserRole } from './auth.types';

/** User status */
export enum EUserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  PENDING = 'pending',
}

/** User entity */
export interface IUser extends IBaseEntity {
  email: string;
  firstName: string;
  lastName: string;
  role: EUserRole;
  status: EUserStatus;
  avatar?: string;
  phone?: string;
  department?: string;
  jobTitle?: string;
  isEmailVerified: boolean;
  lastLoginAt?: string;
}

/** Create user request */
export interface ICreateUserRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: EUserRole;
  phone?: string;
  department?: string;
  jobTitle?: string;
}

/** Update user request */
export interface IUpdateUserRequest {
  firstName?: string;
  lastName?: string;
  role?: EUserRole;
  status?: EUserStatus;
  phone?: string;
  department?: string;
  jobTitle?: string;
}

/** User profile */
export interface IUserProfile extends IUser {
  bio?: string;
  location?: string;
  timezone?: string;
  preferences: IUserPreferences;
}

/** User preferences */
export interface IUserPreferences {
  language: string;
  theme: 'light' | 'dark';
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
}
