/**
 * Registration form component using React Hook Form.
 */

import { useForm } from 'react-hook-form';
import { Box, Typography, Link as MuiLink, Alert } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Button, Input } from '@/components/common';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCredentials, setError, clearError } from '@/features/auth/authSlice';
import { useRegisterMutation } from '@/api/endpoints/authApi';
import { showSnackbar } from '@/store/slices/uiSlice';
import { ROUTES } from '@/config/constants';
import { env } from '@/config/env';
import { type IRegisterRequest } from '@/types';

/**
 * Registration form with validation.
 * Uses React Hook Form with built-in validation rules.
 */
export function RegisterForm() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { error: authError } = useAppSelector((state) => state.auth);

  const { mutateAsync: registerUser, isPending: isLoading } = useRegisterMutation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IRegisterRequest>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
    },
  });

  const password = watch('password');

  const onSubmit = async (data: IRegisterRequest) => {
    try {
      dispatch(clearError());
      
      // Use mock registration in demo mode
      if (env.enableMockApi) {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        dispatch(setCredentials({
          user: {
            id: '1',
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            role: 'user' as const,
            avatar: undefined,
            isEmailVerified: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          accessToken: 'mock-access-token-12345',
          refreshToken: 'mock-refresh-token-12345',
        }));
        dispatch(showSnackbar({ message: t('auth.registerSuccess'), severity: 'success' }));
        navigate(ROUTES.DASHBOARD);
        return;
      }
      
      const response = await registerUser(data);
      dispatch(setCredentials(response));
      dispatch(showSnackbar({ message: t('auth.registerSuccess'), severity: 'success' }));
      navigate(ROUTES.DASHBOARD);
    } catch {
      dispatch(setError(t('errors.generic')));
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Typography variant="h4" component="h1" gutterBottom textAlign="center">
        {t('auth.register')}
      </Typography>
      <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mb: 4 }}>
        Create your account
      </Typography>

      {authError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {authError}
        </Alert>
      )}

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Input
            label={t('auth.firstName')}
            autoComplete="given-name"
            autoFocus
            {...register('firstName', {
              required: t('validation.required'),
              minLength: {
                value: 2,
                message: t('validation.minLength', { count: 2 }),
              },
            })}
            errorMessage={errors.firstName?.message}
          />

          <Input
            label={t('auth.lastName')}
            autoComplete="family-name"
            {...register('lastName', {
              required: t('validation.required'),
              minLength: {
                value: 2,
                message: t('validation.minLength', { count: 2 }),
              },
            })}
            errorMessage={errors.lastName?.message}
          />
        </Box>

        <Input
          label={t('auth.email')}
          type="email"
          autoComplete="email"
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
          autoComplete="new-password"
          showPasswordToggle
          {...register('password', {
            required: t('validation.required'),
            minLength: {
              value: 8,
              message: t('validation.minLength', { count: 8 }),
            },
          })}
          errorMessage={errors.password?.message}
        />

        <Input
          label={t('auth.confirmPassword')}
          type="password"
          autoComplete="new-password"
          showPasswordToggle
          {...register('confirmPassword', {
            required: t('validation.required'),
            validate: (value) => value === password || t('validation.passwordMatch'),
          })}
          errorMessage={errors.confirmPassword?.message}
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          loading={isLoading}
          loadingText={t('common.loading')}
        >
          {t('auth.signUp')}
        </Button>

        <Typography variant="body2" textAlign="center">
          {t('auth.hasAccount')}{' '}
          <MuiLink component={Link} to={ROUTES.LOGIN}>
            {t('auth.signIn')}
          </MuiLink>
        </Typography>
      </Box>
    </Box>
  );
}

export default RegisterForm;
