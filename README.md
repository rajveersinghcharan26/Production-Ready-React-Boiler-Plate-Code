# Production-Ready React Boilerplate

A comprehensive, enterprise-grade React 18 boilerplate with TypeScript, Vite, Redux Toolkit, Material UI, and more.

## 🚀 Features

### Core Technologies
- **React 18** - Latest React with concurrent features
- **TypeScript** - Strict mode enabled for type safety
- **Vite** - Fast build tool with HMR

### State Management
- **Redux Toolkit** - Simplified Redux with best practices
- **RTK Query** - Powerful data fetching and caching
- **Axios** - HTTP client with interceptors

### UI/UX
- **Material UI v5** - Comprehensive component library
- **Light/Dark Theme** - Toggle between themes
- **Responsive Design** - Mobile-first approach
- **i18n** - Multi-language support (English/Spanish)

### Routing & Auth
- **React Router v6** - Nested routing with Outlet pattern
- **JWT Authentication** - Access/refresh token flow
- **RBAC** - Role-based access control (Admin, Manager, User)
- **Route Guards** - Auth and Guest guards

### Forms & Validation
- **React Hook Form** - Performant form handling
- **Built-in Validation** - No schema library dependencies

### Error Handling
- **Error Boundaries** - Root and feature-level
- **Error Normalization** - Consistent API error handling
- **Global Snackbar** - Notification system

### Performance
- **Code Splitting** - Lazy loading with React.lazy
- **Bundle Optimization** - Manual chunks for vendors
- **Web Vitals** - Core Web Vitals monitoring
- **Performance Tracking** - Built-in monitoring utilities

## 📁 Project Structure

```
src/
├── api/                    # API layer
│   ├── axiosInstance.ts    # Axios with interceptors
│   ├── baseQuery.ts        # RTK Query base query
│   ├── errorNormalizer.ts  # Error standardization
│   └── endpoints/          # API endpoint definitions
│
├── app/                    # App configuration
│   ├── store.ts           # Redux store
│   └── hooks.ts           # Typed Redux hooks
│
├── assets/                 # Static assets
│   └── styles/            # Global styles
│
├── components/             # Shared components
│   ├── common/            # UI primitives
│   ├── layout/            # Layout components
│   └── feedback/          # Error boundaries, snackbar, loader
│
├── config/                 # Configuration
│   ├── env.ts             # Environment variables
│   └── constants.ts       # App constants
│
├── features/               # Feature modules
│   ├── auth/              # Authentication
│   └── ui/                # UI state management
│
├── hooks/                  # Custom hooks
│   ├── useAuth.ts         # Auth state hook
│   ├── useDebounce.ts     # Debounce hook
│   └── ...
│
├── i18n/                   # Internationalization
│   ├── index.ts           # i18n configuration
│   └── locales/           # Translation files
│
├── monitoring/             # Performance monitoring
│   ├── webVitals.ts       # Web Vitals tracking
│   └── performance.ts     # Performance utilities
│
├── pages/                  # Page components
│   ├── Dashboard/
│   ├── Users/
│   ├── Reports/
│   ├── Settings/
│   └── ...
│
├── routes/                 # Routing configuration
│   └── index.tsx          # Route definitions
│
├── theme/                  # MUI theme
│   ├── palette.ts         # Color palette
│   ├── typography.ts      # Typography
│   └── components.ts      # Component overrides
│
├── types/                  # TypeScript types
│   ├── api.types.ts
│   ├── auth.types.ts
│   └── ...
│
├── utils/                  # Utility functions
│   └── common.utils.ts
│
├── App.tsx                 # Root component
└── main.tsx               # Entry point
```

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd Production-Ready-React-Boiler-Plate-Code

# Install dependencies
npm install

# Copy environment file
cp .env.example .env.development

# Start development server
npm run dev
```

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format with Prettier
npm run type-check   # TypeScript type checking
```

## ⚙️ Configuration

### Environment Variables

Create `.env.development`, `.env.staging`, or `.env.production`:

```env
VITE_APP_NAME=My App
VITE_API_BASE_URL=https://api.example.com
VITE_API_TIMEOUT=30000
VITE_ENABLE_MOCK=false
VITE_DEBUG_MODE=true
```

### Theme Customization

Edit theme files in `src/theme/`:
- `palette.ts` - Colors
- `typography.ts` - Font settings
- `components.ts` - Component overrides

### Adding New Routes

```tsx
// src/routes/index.tsx
{
  path: 'new-feature',
  element: <AuthGuard allowedRoles={['admin']}><Outlet /></AuthGuard>,
  children: [
    { index: true, element: <NewFeaturePage /> },
    { path: ':id', element: <NewFeatureDetailPage /> },
  ],
}
```

### Adding New API Endpoints

```typescript
// src/api/endpoints/newApi.ts
import { baseApi } from '../baseQuery';

export const newApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getItems: builder.query({
      query: () => '/items',
      providesTags: ['Items'],
    }),
    createItem: builder.mutation({
      query: (body) => ({ url: '/items', method: 'POST', body }),
      invalidatesTags: ['Items'],
    }),
  }),
});

export const { useGetItemsQuery, useCreateItemMutation } = newApi;
```

## 🔐 Authentication

### Login Flow
1. User submits credentials
2. API returns access + refresh tokens
3. Tokens stored in localStorage
4. Axios interceptor adds token to requests
5. On 401, refresh token is used automatically

### Role-Based Access

```tsx
// Protect routes by role
<AuthGuard allowedRoles={['admin', 'manager']}>
  <AdminPanel />
</AuthGuard>

// Check roles in components
const { isAdmin, hasRole } = useAuth();
if (hasRole(['admin', 'manager'])) {
  // Show admin content
}
```

## 🌐 Internationalization

### Adding Translations

Edit `src/i18n/locales/en.json` and `es.json`:

```json
{
  "newFeature": {
    "title": "New Feature",
    "description": "Description text"
  }
}
```

### Using Translations

```tsx
import { useTranslation } from 'react-i18next';

function Component() {
  const { t } = useTranslation();
  return <h1>{t('newFeature.title')}</h1>;
}
```

## 📊 Performance Monitoring

### Web Vitals

Tracked automatically:
- **CLS** - Cumulative Layout Shift
- **FCP** - First Contentful Paint
- **FID** - First Input Delay
- **INP** - Interaction to Next Paint
- **LCP** - Largest Contentful Paint
- **TTFB** - Time to First Byte

### Custom Performance Tracking

```typescript
import { measureExecutionTime, mark, measure } from '@/monitoring';

// Measure async function
const { result, duration } = await measureExecutionTime(
  () => fetchData(),
  'Data Fetch'
);

// Manual marks
mark('feature-start');
// ... code
mark('feature-end');
measure('Feature Duration', 'feature-start', 'feature-end');
```

## 🧪 Testing

```bash
# Run tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e
```

## 📦 Building for Production

```bash
# Build
npm run build

# Analyze bundle
npm run build:analyze

# Preview
npm run preview
```

### Bundle Optimization

The build is optimized with:
- **Code splitting** - Separate chunks for routes
- **Vendor splitting** - React, Redux, MUI in separate chunks
- **Tree shaking** - Unused code removed
- **Minification** - JS and CSS minified

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linting and tests
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

## 📚 Documentation

- [Architecture Decision Records](./docs/adr/)
- [API Documentation](./docs/api/)
- [Component Storybook](./docs/storybook/)

## 🔗 Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Material UI](https://mui.com/)
- [React Router](https://reactrouter.com/)
- [React Hook Form](https://react-hook-form.com/)
