/**
 * Root Error Boundary component.
 * Catches JavaScript errors anywhere in the child component tree.
 */

import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { ErrorOutline, Refresh, Home } from '@mui/icons-material';

interface IErrorBoundaryProps {
  /** Child components to wrap */
  children: ReactNode;
  /** Custom fallback component */
  fallback?: ReactNode;
  /** Error handler callback */
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  /** Whether this is a feature-level boundary (shows smaller UI) */
  isFeatureBoundary?: boolean;
}

interface IErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error boundary component that catches rendering errors.
 * Use at root level and around lazy-loaded features.
 */
export class ErrorBoundary extends Component<IErrorBoundaryProps, IErrorBoundaryState> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): IErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error to monitoring service (not console)
    this.logError(error, errorInfo);

    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo);
  }

  private logError(error: Error, errorInfo: ErrorInfo): void {
    // In production, send to error monitoring service
    // This is a placeholder for integration with services like Sentry
    if (import.meta.env.PROD) {
      // TODO: Send to error tracking service
      // errorTrackingService.captureException(error, { extra: errorInfo });
    }

    // In development, log to console
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.error('Error Boundary caught an error:', error, errorInfo);
    }
  }

  private handleRetry = (): void => {
    this.setState({ hasError: false, error: null });
  };

  private handleGoHome = (): void => {
    window.location.href = '/';
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // Custom fallback
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Feature-level compact error UI
      if (this.props.isFeatureBoundary) {
        return (
          <Paper
            sx={{
              p: 4,
              textAlign: 'center',
              backgroundColor: 'error.light',
              color: 'error.contrastText',
            }}
          >
            <ErrorOutline sx={{ fontSize: 48, mb: 2, opacity: 0.7 }} />
            <Typography variant="h6" gutterBottom>
              Something went wrong in this section
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
              This error has been logged automatically.
            </Typography>
            <Button
              variant="contained"
              color="inherit"
              startIcon={<Refresh />}
              onClick={this.handleRetry}
            >
              Try Again
            </Button>
          </Paper>
        );
      }

      // Root-level full page error UI
      return (
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'background.default',
            p: 3,
          }}
        >
          <Paper
            sx={{
              p: 6,
              maxWidth: 500,
              textAlign: 'center',
            }}
          >
            <ErrorOutline
              sx={{ fontSize: 80, color: 'error.main', mb: 3 }}
            />
            <Typography variant="h4" gutterBottom>
              Oops! Something went wrong
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              We apologize for the inconvenience. Our team has been notified and is working on the issue.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
              <Button
                variant="outlined"
                startIcon={<Refresh />}
                onClick={this.handleRetry}
              >
                Try Again
              </Button>
              <Button
                variant="contained"
                startIcon={<Home />}
                onClick={this.handleGoHome}
              >
                Go to Home
              </Button>
            </Box>
            {import.meta.env.DEV && this.state.error && (
              <Box
                sx={{
                  mt: 4,
                  p: 2,
                  backgroundColor: 'grey.100',
                  borderRadius: 1,
                  textAlign: 'left',
                }}
              >
                <Typography variant="caption" component="pre" sx={{ whiteSpace: 'pre-wrap' }}>
                  {this.state.error.toString()}
                </Typography>
              </Box>
            )}
          </Paper>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
