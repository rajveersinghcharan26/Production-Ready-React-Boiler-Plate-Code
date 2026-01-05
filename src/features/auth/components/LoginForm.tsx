/**
 * Login form component using React Hook Form.
 */

import { useForm } from 'react-hook-form';
import { Box, Typography, Link as MuiLink, Alert } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Button, Input } from '@/components/common';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCredentials, setError, clearError } from '@/features/auth/authSlice';
import { useLoginMutation } from '@/api/endpoints/authApi';
import { showSnackbar } from '@/store/slices/uiSlice';
import { ROUTES } from '@/config/constants';
import { env } from '@/config/env';
import { type ILoginRequest } from '@/types';

// Mock user for demo mode
const MOCK_USER = {
  user: {
    id: '1',
    email: 'demo@example.com',
    firstName: 'Demo',
    lastName: 'User',
    role: 'admin' as const,
    avatar: null,
    isEmailVerified: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  accessToken: 'mock-access-token-12345',
  refreshToken: 'mock-refresh-token-12345',
};

/**
 * Login form with email and password fields.
 * Uses React Hook Form with built-in validation.
 */
export function LoginForm() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { error: authError } = useAppSelector((state) => state.auth);

  const { mutateAsync: login, isPending: isLoading } = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginRequest>({
    defaultValues: {
      email: env.enableMockApi ? 'demo@example.com' : '',
      password: env.enableMockApi ? 'password123' : '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: ILoginRequest) => {
    try {
      dispatch(clearError());
      
      // Use mock login in demo mode
      if (env.enableMockApi) {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        dispatch(setCredentials({
          ...MOCK_USER,
          user: { ...MOCK_USER.user, email: data.email },
        }));
        dispatch(showSnackbar({ message: t('auth.loginSuccess'), severity: 'success' }));
        navigate(ROUTES.DASHBOARD);
        return;
      }
      
      const response = await login(data);
      dispatch(setCredentials(response));
      dispatch(showSnackbar({ message: t('auth.loginSuccess'), severity: 'success' }));
      navigate(ROUTES.DASHBOARD);
    } catch {
      dispatch(setError(t('auth.loginError')));
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Typography variant="h4" component="h1" gutterBottom textAlign="center">
        {t('auth.login')}
      </Typography>
      <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mb: 4 }}>
        {t('common.appName')}
      </Typography>

      {authError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {authError}
        </Alert>
      )}

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        <Input
          label={t('auth.email')}
          type="email"
          autoComplete="email"
          autoFocus
          {...register('email', {
            required: t('validation.required'),
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: t('validation.email'),
            },
          })}
          errorMessage={errors.email?.message}
        />

        <Input
          label={t('auth.password')}
          type="password"
          autoComplete="current-password"
          showPasswordToggle
          {...register('password', {
            required: t('validation.required'),
            minLength: {
              value: 6,
              message: t('validation.minLength', { count: 6 }),
            },
          })}
          errorMessage={errors.password?.message}
        />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <MuiLink component={Link} to="#" variant="body2">
            {t('auth.forgotPassword')}
          </MuiLink>
        </Box>

        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          loading={isLoading}
          loadingText={t('common.loading')}
        >
          {t('auth.signIn')}
        </Button>

        <Typography variant="body2" textAlign="center">
          {t('auth.noAccount')}{' '}
          <MuiLink component={Link} to={ROUTES.REGISTER}>
            {t('auth.signUp')}
          </MuiLink>
        </Typography>
      </Box>
    </Box>
  );
}

export default LoginForm;
