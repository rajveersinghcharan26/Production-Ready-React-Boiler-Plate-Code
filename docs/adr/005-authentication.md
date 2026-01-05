# ADR-005: JWT Authentication with Refresh Tokens

## Status
Accepted

## Context

We need an authentication system that:
- Securely authenticates users
- Maintains sessions across page refreshes
- Handles token expiration gracefully
- Supports role-based access control
- Works with RESTful APIs

### Options Considered

1. **Session-based authentication**
   - Pros: Simple, server-controlled
   - Cons: Requires server state, CORS complexity

2. **JWT with single token**
   - Pros: Stateless, simple
   - Cons: Security risk if token is compromised

3. **JWT with refresh tokens** (Selected)
   - Pros: Stateless, secure, auto-refresh
   - Cons: More complex implementation

4. **OAuth 2.0 / OpenID Connect**
   - Pros: Industry standard, SSO support
   - Cons: Overkill for single application

## Decision

We will use **JWT authentication with access and refresh tokens**.

### Token Flow

1. **Login**: User submits credentials
2. **Response**: Server returns access token (short-lived) + refresh token (long-lived)
3. **Storage**: Tokens stored in localStorage
4. **Requests**: Access token added to Authorization header
5. **Expiration**: On 401, use refresh token to get new access token
6. **Logout**: Clear tokens and redirect

### Implementation

```typescript
// Axios interceptor for token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newToken = await refreshToken();
      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      return axiosInstance(originalRequest);
    }
    return Promise.reject(error);
  }
);
```

### Storage Strategy

```typescript
// Store tokens on login
localStorage.setItem('accessToken', tokens.accessToken);
localStorage.setItem('refreshToken', tokens.refreshToken);

// Hydrate on app load
const persistedToken = localStorage.getItem('accessToken');
if (persistedToken) {
  dispatch(setCredentials({ token: persistedToken }));
}
```

### Role-Based Access Control (RBAC)

```typescript
// User roles
type UserRole = 'admin' | 'manager' | 'user';

// Check in guards
function AuthGuard({ allowedRoles, children }) {
  const { userRole } = useAuth();
  
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" />;
  }
  
  return children;
}
```

## Consequences

### Positive
- Stateless authentication scales well
- Automatic token refresh provides seamless UX
- RBAC enables fine-grained access control
- Works well with microservices

### Negative
- localStorage is vulnerable to XSS (mitigate with CSP)
- Token refresh logic adds complexity
- Need to handle edge cases (concurrent refreshes)

### Mitigations
- Implement Content Security Policy
- Use mutex for concurrent refresh requests
- Short access token expiry (15 min)
- Refresh token rotation on use
