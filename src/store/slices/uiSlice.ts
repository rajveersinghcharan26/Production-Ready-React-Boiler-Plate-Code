/**
 * UI Redux slice.
 * Manages global UI state including theme, snackbar, and loading states.
 */

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { STORAGE_KEYS } from '@/config/constants';
import { type TThemeMode } from '@/types';

interface ISnackbarState {
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'warning' | 'info';
}

interface IUIState {
  themeMode: TThemeMode;
  snackbar: ISnackbarState;
  isGlobalLoading: boolean;
  isSidebarOpen: boolean;
}

/**
 * Load theme from localStorage or system preference.
 */
function getInitialTheme(): TThemeMode {
  const stored = localStorage.getItem(STORAGE_KEYS.THEME) as TThemeMode | null;
  if (stored === 'light' || stored === 'dark') {
    return stored;
  }
  // Check system preference
  if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
}

const initialState: IUIState = {
  themeMode: getInitialTheme(),
  snackbar: {
    open: false,
    message: '',
    severity: 'info',
  },
  isGlobalLoading: false,
  isSidebarOpen: true,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    /**
     * Set theme mode.
     */
    setThemeMode: (state, action: PayloadAction<TThemeMode>) => {
      state.themeMode = action.payload;
      localStorage.setItem(STORAGE_KEYS.THEME, action.payload);
    },

    /**
     * Toggle between light and dark theme.
     */
    toggleTheme: (state) => {
      state.themeMode = state.themeMode === 'light' ? 'dark' : 'light';
      localStorage.setItem(STORAGE_KEYS.THEME, state.themeMode);
    },

    /**
     * Show snackbar notification.
     */
    showSnackbar: (
      state,
      action: PayloadAction<{
        message: string;
        severity?: 'success' | 'error' | 'warning' | 'info';
      }>
    ) => {
      state.snackbar = {
        open: true,
        message: action.payload.message,
        severity: action.payload.severity ?? 'info',
      };
    },

    /**
     * Hide snackbar.
     */
    hideSnackbar: (state) => {
      state.snackbar.open = false;
    },

    /**
     * Set global loading state.
     */
    setGlobalLoading: (state, action: PayloadAction<boolean>) => {
      state.isGlobalLoading = action.payload;
    },

    /**
     * Toggle sidebar visibility.
     */
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },

    /**
     * Set sidebar visibility.
     */
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.isSidebarOpen = action.payload;
    },
  },
});

export const {
  setThemeMode,
  toggleTheme,
  showSnackbar,
  hideSnackbar,
  setGlobalLoading,
  toggleSidebar,
  setSidebarOpen,
} = uiSlice.actions;

// Selectors
export const selectTheme = (state: { ui: IUIState }) => state.ui.themeMode;
export const selectSnackbar = (state: { ui: IUIState }) => state.ui.snackbar;
export const selectIsGlobalLoading = (state: { ui: IUIState }) => state.ui.isGlobalLoading;
export const selectIsSidebarOpen = (state: { ui: IUIState }) => state.ui.isSidebarOpen;

export const uiReducer = uiSlice.reducer;
export default uiSlice.reducer;
