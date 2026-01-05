/**
 * Authentication Redux slice.
 * Manages authentication state including user, tokens, and loading states.
 */

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { STORAGE_KEYS } from '@/config/constants';
import { type IAuthUser, type IAuthState, type ILoginResponse } from '@/types';

/**
 * Load initial auth state from localStorage.
 */
function loadInitialState(): IAuthState {
  try {
    const accessToken = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
    const userJson = localStorage.getItem(STORAGE_KEYS.USER);
    const user = userJson ? (JSON.parse(userJson) as IAuthUser) : null;

    return {
      user,
      accessToken,
      refreshToken,
      isAuthenticated: Boolean(accessToken && user),
      isLoading: false,
      error: null,
    };
  } catch {
    return {
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    };
  }
}

const initialState: IAuthState = loadInitialState();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /**
     * Set loading state.
     */
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    /**
     * Set authentication data after successful login.
     */
    setCredentials: (state, action: PayloadAction<ILoginResponse>) => {
      const { user, accessToken, refreshToken } = action.payload;

      state.user = user;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;

      // Persist to localStorage
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    },

    /**
     * Update tokens after refresh.
     */
    setTokens: (
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string }>
    ) => {
      const { accessToken, refreshToken } = action.payload;

      state.accessToken = accessToken;
      state.refreshToken = refreshToken;

      // Update localStorage
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
    },

    /**
     * Update user data.
     */
    updateUser: (state, action: PayloadAction<Partial<IAuthUser>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(state.user));
      }
    },

    /**
     * Set authentication error.
     */
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    /**
     * Clear error.
     */
    clearError: (state) => {
      state.error = null;
    },

    /**
     * Logout and clear all auth state.
     */
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;

      // Clear localStorage
      localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER);
    },
  },
});

export const {
  setLoading,
  setCredentials,
  setTokens,
  updateUser,
  setError,
  clearError,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
