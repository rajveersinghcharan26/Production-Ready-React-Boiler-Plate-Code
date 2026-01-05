/**
 * Users module with nested routing.
 * All user-related routes are defined here to keep the main router clean.
 */

import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Loader } from '@/components/common';
import { ErrorBoundary } from '@/components/feedback';

// Lazy load user pages
const UsersListPage = lazy(() => import('./List'));
const UsersListDetailPage = lazy(() => import('./List/Detail'));
const UsersCreatePage = lazy(() => import('./Create'));
const UsersEditPage = lazy(() => import('./Edit'));
const UsersProfilePage = lazy(() => import('./Profile'));

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
 * Users layout with nested routes.
 * Add new user-related routes here without touching the main router.
 */
export function UsersLayout() {
  return (
    <Routes>
      <Route index element={<Navigate to="list" replace />} />
      <Route
        path="list"
        element={
          <SuspenseWrapper>
            <UsersListPage />
          </SuspenseWrapper>
        }
      />
      <Route
        path="list/:id"
        element={
          <SuspenseWrapper>
            <UsersListDetailPage />
          </SuspenseWrapper>
        }
      />
      <Route
        path="create"
        element={
          <SuspenseWrapper>
            <UsersCreatePage />
          </SuspenseWrapper>
        }
      />
      <Route
        path="edit/:id"
        element={
          <SuspenseWrapper>
            <UsersEditPage />
          </SuspenseWrapper>
        }
      />
      <Route
        path="profile/:id"
        element={
          <SuspenseWrapper>
            <UsersProfilePage />
          </SuspenseWrapper>
        }
      />
    </Routes>
  );
}

export default UsersLayout;
