/**
 * Redux store configuration.
 * Combines all reducers and exports store utilities.
 */

import { configureStore } from '@reduxjs/toolkit';

import authReducer from '@/features/auth/authSlice';
import uiReducer from './slices/uiSlice';

/**
 * Redux store configuration.
 * Note: Server state is now managed by React Query (TanStack Query).
 */
export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
  devTools: import.meta.env.DEV,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
