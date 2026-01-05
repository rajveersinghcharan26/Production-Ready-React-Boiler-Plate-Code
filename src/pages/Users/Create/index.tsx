/**
 * Create user page component.
 */

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Box, Typography, Paper, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

import { Button, Input, Select } from '@/components/common';
import { useCreateUserMutation } from '@/api/endpoints/userApi';
import { useAppDispatch } from '@/store/hooks';
import { showSnackbar } from '@/store/slices/uiSlice';
import { ROUTES } from '@/config/constants';
import { env } from '@/config/env';
import { type ICreateUserRequest, EUserRole } from '@/types';

const roleOptions = [
  { value: EUserRole.USER, label: 'User' },
  { value: EUserRole.MANAGER, label: 'Manager' },
  { value: EUserRole.ADMIN, label: 'Admin' },
];

export function UsersCreatePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isMockSubmitting, setIsMockSubmitting] = useState(false);

  const { mutateAsync: createUser, isPending: isLoading } = useCreateUserMutation();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ICreateUserRequest>({
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      role: EUserRole.USER,
      phone: '',
      department: '',
      jobTitle: '',
    },
  });

  const onSubmit = async (data: ICreateUserRequest) => {
    // Mock mode: simulate create
    if (env.enableMockApi) {
      setIsMockSubmitting(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      setIsMockSubmitting(false);
      dispatch(showSnackbar({ message: t('users.createSuccess'), severity: 'success' }));
      navigate(ROUTES.USERS_LIST);
      return;
    }

    try {
      await createUser(data);
      dispatch(showSnackbar({ message: t('users.createSuccess'), severity: 'success' }));
      navigate(ROUTES.USERS_LIST);
    } catch {
      // Error handled by API interceptor
    }
  };

  return (
    <Box>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate(ROUTES.USERS_LIST)}
        sx={{ mb: 2 }}
      >
        {t('common.back')}
      </Button>

      <Typography variant="h4" component="h1" gutterBottom>
        {t('users.create')}
      </Typography>

      <Paper sx={{ p: 4 }}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Input
                label={t('auth.firstName')}
                {...register('firstName', {
                  required: t('validation.required'),
                })}
                errorMessage={errors.firstName?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input
                label={t('auth.lastName')}
                {...register('lastName', {
                  required: t('validation.required'),
                })}
                errorMessage={errors.lastName?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input
                label={t('auth.email')}
                type="email"
                {...register('email', {
                  required: t('validation.required'),
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: t('validation.email'),
                  },
                })}
                errorMessage={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input
                label={t('auth.password')}
                type="password"
                {...register('password', {
                  required: t('validation.required'),
                  minLength: {
                    value: 8,
                    message: t('validation.minLength', { count: 8 }),
                  },
                })}
                errorMessage={errors.password?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="role"
                control={control}
                rules={{ required: t('validation.required') }}
                render={({ field }) => (
                  <Select
                    label={t('users.role')}
                    options={roleOptions}
                    {...field}
                    errorMessage={errors.role?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input
                label={t('users.phone')}
                {...register('phone')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input
                label={t('users.department')}
                {...register('department')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input
                label={t('users.jobTitle')}
                {...register('jobTitle')}
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button variant="outlined" onClick={() => navigate(ROUTES.USERS_LIST)}>
              {t('common.cancel')}
            </Button>
            <Button
              type="submit"
              variant="contained"
              loading={isLoading || isMockSubmitting}
            >
              {t('common.create')}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default UsersCreatePage;
