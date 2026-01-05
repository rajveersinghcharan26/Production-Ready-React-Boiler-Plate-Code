# ADR-008: Error Boundaries for Error Handling

## Status
Accepted

## Context

We need comprehensive error handling that:
- Catches JavaScript errors in components
- Prevents entire app crashes
- Shows user-friendly error messages
- Logs errors for debugging
- Handles API errors consistently

### Options Considered

1. **Try-catch in each component**
   - Pros: Fine-grained control
   - Cons: Boilerplate, easy to miss

2. **Error Boundaries** (Selected)
   - Pros: Catches render errors, React pattern
   - Cons: Only catches render errors (not events)

3. **Global error handler only**
   - Pros: Simple
   - Cons: Limited recovery options

## Decision

We will use **Error Boundaries** at multiple levels combined with **error normalization** for API errors.

### Error Boundary Structure

```
App
└── RootErrorBoundary (catches all)
    └── ThemeProvider
        └── Router
            └── Layout
                └── FeatureErrorBoundary (per feature)
                    └── FeatureComponent
```

### Implementation

```tsx
// src/components/feedback/ErrorBoundary.tsx
class ErrorBoundary extends Component<Props, State> {
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Log to monitoring service
    console.error('Error caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <ErrorFallback error={this.state.error} />;
    }
    return this.props.children;
  }
}
```

### Usage

```tsx
// Root level
<ErrorBoundary
  fallback={<AppCrashFallback />}
  onError={(error) => logToService(error)}
>
  <App />
</ErrorBoundary>

// Feature level
<ErrorBoundary
  fallback={<FeatureErrorFallback />}
  onReset={() => refetch()}
>
  <UserDashboard />
</ErrorBoundary>
```

### API Error Normalization

```typescript
// src/api/errorNormalizer.ts
interface NormalizedError {
  message: string;
  code: string;
  status: number;
  details?: Record<string, string[]>;
}

function normalizeError(error: unknown): NormalizedError {
  if (isAxiosError(error)) {
    return {
      message: error.response?.data?.message || 'Request failed',
      code: error.response?.data?.code || 'UNKNOWN',
      status: error.response?.status || 500,
      details: error.response?.data?.errors,
    };
  }
  // Handle other error types...
}
```

### Global Snackbar for Notifications

```tsx
// Show errors via Redux
dispatch(showSnackbar({
  message: error.message,
  severity: 'error',
}));

// Auto-dismiss success messages
dispatch(showSnackbar({
  message: 'Saved successfully',
  severity: 'success',
  autoHideDuration: 3000,
}));
```

## Consequences

### Positive
- Prevents app crashes from component errors
- Granular error recovery per feature
- Consistent API error format
- User-friendly error messages
- Centralized error logging

### Negative
- Error boundaries don't catch event handlers
- Need try-catch for async operations
- Multiple fallback UIs to maintain

### Mitigations
- Use try-catch in event handlers
- Create reusable error handling utilities
- Consistent error UI components
- Automated error monitoring setup
