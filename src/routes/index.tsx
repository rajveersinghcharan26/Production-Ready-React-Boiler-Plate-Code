/**
 * Application routing configuration.
 * Defines all routes with lazy loading and nested structure.
 */

import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import { MainLayout, AuthLayout } from '@/components/layout';
import { ErrorBoundary } from '@/components/feedback';
import { Loader } from '@/components/common';
import { AuthGuard, GuestGuard } from '@/features/auth';
import { ROUTES } from '@/config/constants';
import { EUserRole } from '@/types';

// Lazy load pages (each module handles its own Detail routes internally)
const LoginPage = lazy(() => import('@/pages/Login'));
const RegisterPage = lazy(() => import('@/pages/Register'));
const DashboardLayout = lazy(() => import('@/pages/Dashboard'));
const UsersLayout = lazy(() => import('@/pages/Users'));
const ReportsLayout = lazy(() => import('@/pages/Reports'));
const SettingsLayout = lazy(() => import('@/pages/Settings'));
const NotificationsLayout = lazy(() => import('@/pages/Notifications'));
const HelpLayout = lazy(() => import('@/pages/Help'));
const ComponentShowcasePage = lazy(() => import('@/pages/ComponentShowcase'));
const NotFoundPage = lazy(() => import('@/pages/NotFound'));

/**
 * Suspense wrapper for lazy-loaded components.
 */
function SuspenseWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary isFeatureBoundary>
      <Suspense fallback={<Loader />}>{children}</Suspense>
    </ErrorBoundary>
  );
}

/**
 * Router configuration with nested routes using Outlet.
 */
export const router = createBrowserRouter([
  // Auth routes (public)
  {
    element: (
      <GuestGuard>
        <AuthLayout />
      </GuestGuard>
    ),
    children: [
      {
        path: ROUTES.LOGIN,
        element: (
          <SuspenseWrapper>
            <LoginPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: ROUTES.REGISTER,
        element: (
          <SuspenseWrapper>
            <RegisterPage />
          </SuspenseWrapper>
        ),
      },
    ],
  },

  // Protected routes
  {
    element: (
      <AuthGuard>
        <MainLayout />
      </AuthGuard>
    ),
    children: [
      // Root redirect
      {
        path: ROUTES.HOME,
        element: <Navigate to={ROUTES.DASHBOARD} replace />,
      },

      // Dashboard
      {
        path: `${ROUTES.DASHBOARD}/*`,
        element: (
          <SuspenseWrapper>
            <DashboardLayout />
          </SuspenseWrapper>
        ),
      },

      // Users (RBAC protected - routes defined in UsersLayout)
      {
        path: `${ROUTES.USERS}/*`,
        element: (
          <AuthGuard requiredRoles={[EUserRole.ADMIN, EUserRole.MANAGER]}>
            <SuspenseWrapper>
              <UsersLayout />
            </SuspenseWrapper>
          </AuthGuard>
        ),
      },

      // Reports
      {
        path: `${ROUTES.REPORTS}/*`,
        element: (
          <SuspenseWrapper>
            <ReportsLayout />
          </SuspenseWrapper>
        ),
      },

      // Settings
      {
        path: `${ROUTES.SETTINGS}/*`,
        element: (
          <SuspenseWrapper>
            <SettingsLayout />
          </SuspenseWrapper>
        ),
      },

      // Notifications
      {
        path: `${ROUTES.NOTIFICATIONS}/*`,
        element: (
          <SuspenseWrapper>
            <NotificationsLayout />
          </SuspenseWrapper>
        ),
      },

      // Help
      {
        path: `${ROUTES.HELP}/*`,
        element: (
          <SuspenseWrapper>
            <HelpLayout />
          </SuspenseWrapper>
        ),
      },

      // Component Showcase (for testing UI components)
      {
        path: ROUTES.COMPONENT_SHOWCASE,
        element: (
          <SuspenseWrapper>
            <ComponentShowcasePage />
          </SuspenseWrapper>
        ),
      },
    ],
  },

  // 404 - Catch all
  {
    path: '*',
    element: (
      <SuspenseWrapper>
        <NotFoundPage />
      </SuspenseWrapper>
    ),
  },
]);

export default router;
