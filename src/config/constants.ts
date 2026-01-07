/**
 * Application-wide constants.
 * Use these values throughout the application for consistency.
 */

/** Storage keys for localStorage/sessionStorage */
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  LANGUAGE: 'language',
  THEME: 'theme',
  USER: 'user',
} as const;

/** HTTP status codes */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

/** User roles for RBAC */
export const USER_ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  USER: 'user',
  GUEST: 'guest',
} as const;

/** Route paths */
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  USERS: '/users',
  USERS_LIST: '/users/list',
  USERS_CREATE: '/users/create',
  USERS_EDIT: '/users/edit',
  USERS_PROFILE: '/users/profile',
  REPORTS: '/reports',
  SETTINGS: '/settings',
  NOTIFICATIONS: '/notifications',
  HELP: '/help',
  COMPONENT_SHOWCASE: '/component-showcase',
  ADD_FORM: '/add-form',
} as const;

/** Pagination defaults */
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 25, 50, 100],
} as const;

/** Date formats */
export const DATE_FORMATS = {
  DEFAULT: 'YYYY-MM-DD',
  DISPLAY: 'MMM DD, YYYY',
  DATETIME: 'YYYY-MM-DD HH:mm:ss',
  TIME: 'HH:mm',
} as const;

/** Snackbar/Toast configuration */
export const SNACKBAR = {
  AUTO_HIDE_DURATION: 5000,
  POSITION: {
    VERTICAL: 'top',
    HORIZONTAL: 'right',
  },
} as const;

/** API endpoints */
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    REGISTER: '/auth/register',
  },
  USERS: {
    BASE: '/users',
    BY_ID: (id: string) => `/users/${id}`,
    PROFILE: (id: string) => `/users/${id}/profile`,
  },
  REPORTS: {
    BASE: '/reports',
    BY_ID: (id: string) => `/reports/${id}`,
  },
} as const;
