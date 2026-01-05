/**
 * Guest Guard component.
 * Protects routes that should only be accessible to non-authenticated users.
 */

import { Navigate, useLocation } from 'react-router-dom';

import { useAppSelector } from '@/store/hooks';
import { ROUTES } from '@/config/constants';

interface IGuestGuardProps {
  /** Child components to render if not authenticated */
  children: React.ReactNode;
}

/**
 * Route guard for guest-only routes (login, register).
 * Redirects to dashboard if already authenticated.
 */
export function GuestGuard({ children }: IGuestGuardProps) {
  const location = useLocation();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (isAuthenticated) {
    // Redirect to the page they came from, or dashboard
    const from = (location.state as { from?: Location })?.from?.pathname ?? ROUTES.DASHBOARD;
    return <Navigate to={from} replace />;
  }

  return <>{children}</>;
}

export default GuestGuard;
