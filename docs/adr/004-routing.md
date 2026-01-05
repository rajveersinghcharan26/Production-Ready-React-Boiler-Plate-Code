# ADR-004: React Router v6 for Routing

## Status
Accepted

## Context

We need a routing solution that supports:
- Nested routes for layout composition
- Protected routes for authentication
- Role-based route access
- Code splitting with lazy loading
- URL parameter handling

### Options Considered

1. **React Router v5**
   - Pros: Stable, well-known
   - Cons: Older patterns, less composable

2. **React Router v6** (Selected)
   - Pros: Modern patterns, Outlet for nesting, smaller bundle
   - Cons: Breaking changes from v5

3. **TanStack Router**
   - Pros: Type-safe routes, modern
   - Cons: Newer, smaller ecosystem

## Decision

We will use **React Router v6** with the **Outlet pattern** for nested routing.

### Route Structure

```
/                     → Dashboard
/login               → Login (Guest only)
/register            → Register (Guest only)
/dashboard           → Dashboard
/dashboard/:id       → Dashboard Detail
/users               → Users Layout (Outlet)
  /users             → Users List
  /users/create      → Create User
  /users/:id         → User Detail
  /users/:id/edit    → Edit User
  /users/profile     → User Profile
/reports             → Reports
/reports/:id         → Report Detail
/settings            → Settings
/settings/:id        → Settings Detail
/notifications       → Notifications
/notifications/:id   → Notification Detail
/help                → Help
/help/:id            → Help Detail
/*                   → 404 Not Found
```

### Implementation

```tsx
// Nested routes with Outlet
{
  path: 'users',
  element: <AuthGuard><UsersLayout /></AuthGuard>,
  children: [
    { index: true, element: <UsersList /> },
    { path: 'create', element: <RoleGuard roles={['admin']}><CreateUser /></RoleGuard> },
    { path: ':id', element: <UserDetail /> },
    { path: ':id/edit', element: <EditUser /> },
  ],
}

// Layout with Outlet
function UsersLayout() {
  return (
    <div>
      <h1>Users</h1>
      <Outlet /> {/* Child routes render here */}
    </div>
  );
}
```

### Route Guards

```tsx
// AuthGuard - requires authentication
<AuthGuard>
  <ProtectedContent />
</AuthGuard>

// AuthGuard with roles - requires specific roles
<AuthGuard allowedRoles={['admin', 'manager']}>
  <AdminContent />
</AuthGuard>

// GuestGuard - only for non-authenticated users
<GuestGuard>
  <LoginPage />
</GuestGuard>
```

## Consequences

### Positive
- Clean nested routing with Outlet
- Easy-to-understand route structure
- Built-in lazy loading support
- Type-safe with TypeScript
- URL params and search params handling

### Negative
- Migration effort from v5 patterns
- Some advanced patterns require custom implementation
- Learning curve for Outlet pattern

### Mitigations
- Document routing patterns and examples
- Create reusable route guard components
- Use consistent patterns across features
