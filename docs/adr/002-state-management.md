# ADR-002: Redux Toolkit + RTK Query for State Management

## Status
Accepted

## Context

We need a state management solution for:
- Global UI state (theme, sidebar, notifications)
- Authentication state (user, tokens)
- Server state (API data caching)
- Complex data flow between components

### Options Considered

1. **React Context + useReducer**
   - Pros: Built-in, no dependencies
   - Cons: Boilerplate, no devtools, re-render issues

2. **Zustand**
   - Pros: Simple, small bundle
   - Cons: Less ecosystem, manual caching

3. **Redux Toolkit + RTK Query** (Selected)
   - Pros: Industry standard, excellent devtools, built-in caching
   - Cons: Learning curve, more setup

4. **TanStack Query (React Query)**
   - Pros: Excellent server state management
   - Cons: Needs separate solution for client state

## Decision

We will use **Redux Toolkit with RTK Query** for all state management.

### Implementation

```
src/
├── app/
│   ├── store.ts      # Store configuration
│   └── hooks.ts      # Typed hooks
├── features/
│   ├── auth/
│   │   └── authSlice.ts
│   └── ui/
│       └── uiSlice.ts
└── api/
    ├── baseQuery.ts
    └── endpoints/
```

### Redux Toolkit Usage
- `createSlice` for reducers with Immer
- `createAsyncThunk` for async actions
- TypeScript integration with RootState/AppDispatch

### RTK Query Usage
- `createApi` with custom baseQuery
- Tag-based cache invalidation
- Automatic refetching and caching

## Consequences

### Positive
- Predictable state updates with immutable patterns
- Excellent Redux DevTools for debugging
- Automatic caching eliminates duplicate requests
- TypeScript support is first-class
- Middleware support for complex side effects

### Negative
- Boilerplate for simple state (mitigated by RTK)
- Bundle size (~10kb for RTK + RTK Query)
- Learning curve for Redux patterns

### Mitigations
- Use RTK's simplified APIs consistently
- Keep local state in components when appropriate
- Document common patterns and examples
