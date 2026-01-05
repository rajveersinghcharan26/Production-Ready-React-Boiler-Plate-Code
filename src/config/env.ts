/**
 * Environment configuration with typed access to environment variables.
 * All environment access must go through this module.
 */

/**
 * Validates that a required environment variable is defined.
 * @param key - The environment variable key
 * @param value - The environment variable value
 * @returns The validated value
 * @throws Error if the value is undefined or empty
 */
function requireEnv(key: string, value: string | undefined): string {
  if (!value || value.trim() === '') {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

/**
 * Parses a boolean environment variable.
 * @param value - The string value to parse
 * @returns Boolean value
 */
function parseBoolean(value: string | undefined): boolean {
  return value?.toLowerCase() === 'true';
}

/**
 * Parses a number environment variable.
 * @param value - The string value to parse
 * @param defaultValue - Default value if parsing fails
 * @returns Parsed number
 */
function parseNumber(value: string | undefined, defaultValue: number): number {
  const parsed = Number(value);
  return isNaN(parsed) ? defaultValue : parsed;
}

/**
 * Parses a comma-separated list environment variable.
 * @param value - The string value to parse
 * @returns Array of strings
 */
function parseList(value: string | undefined): string[] {
  return value?.split(',').map((item) => item.trim()) ?? [];
}

/**
 * Typed environment configuration object.
 * Access all environment variables through this object.
 */
export const env = {
  // API Configuration
  apiBaseUrl: requireEnv('VITE_API_BASE_URL', import.meta.env.VITE_API_BASE_URL),
  apiTimeout: parseNumber(import.meta.env.VITE_API_TIMEOUT, 30000),

  // Authentication
  authTokenKey: import.meta.env.VITE_AUTH_TOKEN_KEY || 'auth_token',
  refreshTokenKey: import.meta.env.VITE_REFRESH_TOKEN_KEY || 'refresh_token',

  // Feature Flags
  enableMockApi: parseBoolean(import.meta.env.VITE_ENABLE_MOCK_API),
  enablePerformanceMonitoring: parseBoolean(import.meta.env.VITE_ENABLE_PERFORMANCE_MONITORING),

  // i18n
  defaultLanguage: import.meta.env.VITE_DEFAULT_LANGUAGE || 'en',
  supportedLanguages: parseList(import.meta.env.VITE_SUPPORTED_LANGUAGES),

  // App Info
  appName: import.meta.env.VITE_APP_NAME || 'Enterprise App',
  appVersion: import.meta.env.VITE_APP_VERSION || '1.0.0',

  // Runtime
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  mode: import.meta.env.MODE,
} as const;

export type Env = typeof env;
