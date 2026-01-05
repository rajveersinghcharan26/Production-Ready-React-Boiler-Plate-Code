/**
 * Authentication Guard component.
 * Protects routes that require authentication.
 */

import { Navigate, useLocation } from 'react-router-dom';

import { useAppSelector } from '@/store/hooks';
import { ROUTES } from '@/config/constants';
import { type EUserRole } from '@/types';

interface IAuthGuardProps {
  /** Child components to render if authorized */
  children: React.ReactNode;
  /** Required roles (optional, any authenticated user if not specified) */
  requiredRoles?: EUserRole[];
}

/**
 * Route guard for protected routes.
 * Redirects to login if not authenticated.
 * Redirects to dashboard if authenticated but lacking required role.
 */
export function AuthGuard({ children, requiredRoles }: IAuthGuardProps) {
  const location = useLocation();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  // Not authenticated - redirect to login
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  // Check role-based access
  if (requiredRoles && requiredRoles.length > 0) {
    const hasRequiredRole = user?.role && requiredRoles.includes(user.role);
    if (!hasRequiredRole) {
      // User is authenticated but doesn't have required role
      return <Navigate to={ROUTES.DASHBOARD} replace />;
    }
  }

  return <>{children}</>;
}

export default AuthGuard;
