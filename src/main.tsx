/**
 * Main application entry point.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';

import App from './App';
import { store } from './store';
import { queryClient } from './config/queryClient';
import { reportWebVitals, logPerformanceMetrics } from './monitoring';
import './i18n';
import './assets/styles/global.css';

// Log performance metrics in development
logPerformanceMetrics();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);

// Report Web Vitals
reportWebVitals((metric) => {
  // Log metrics in development
  if (import.meta.env.DEV) {
    console.log('[Web Vitals]', metric);
  }
});
