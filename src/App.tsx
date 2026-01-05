/**
 * Root App component.
 */

import { useMemo } from 'react';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';

import { useAppSelector } from './store/hooks';
import { selectTheme } from './store/slices/uiSlice';
import { createAppTheme } from './theme';
import { ErrorBoundary, GlobalLoader, GlobalSnackbar } from './components/feedback';
import { router } from './routes';

function App() {
  const themeMode = useAppSelector(selectTheme);
  
  // Memoize theme to prevent unnecessary re-renders
  const theme = useMemo(() => createAppTheme(themeMode), [themeMode]);
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary>
        <RouterProvider router={router} />
        <GlobalLoader />
        <GlobalSnackbar />
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
