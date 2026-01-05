/**
 * Material UI theme configuration.
 * Combines palette, typography, and component overrides.
 */

import { createTheme, type Theme, type ThemeOptions } from '@mui/material/styles';

import { lightPalette, darkPalette } from './palette';
import { typography } from './typography';
import { components } from './components';

/** Base theme options shared between light and dark modes */
const baseThemeOptions: ThemeOptions = {
  typography,
  components,
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
};

/**
 * Creates a theme based on the specified mode.
 * @param mode - The theme mode ('light' or 'dark')
 * @returns MUI Theme object
 */
export function createAppTheme(mode: 'light' | 'dark'): Theme {
  const palette = mode === 'light' ? lightPalette : darkPalette;

  return createTheme({
    ...baseThemeOptions,
    palette,
  });
}

/** Default light theme */
export const lightTheme = createAppTheme('light');

/** Default dark theme */
export const darkTheme = createAppTheme('dark');

export { lightPalette, darkPalette } from './palette';
export { typography } from './typography';
export { components } from './components';
