/**
 * Edit user page component.
 */

import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Box, Typography, Paper, Grid } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

import { Button, Input, Select, Loader, EmptyState } from '@/components/common';
import { useGetUserByIdQuery, useUpdateUserMutation } from '@/api/endpoints/userApi';
import { useAppDispatch } from '@/store/hooks';
import { showSnackbar } from '@/store/slices/uiSlice';
import { ROUTES } from '@/config/constants';
import { env } from '@/config/env';
import { type IUser, type IUpdateUserRequest, EUserRole, EUserStatus } from '@/types';

// Mock user for demo mode
const getMockUser = (id: string): IUser => ({
  id,
  email: `user${id}@example.com`,
  firstName: ['John', 'Jane', 'Bob', 'Alice', 'Charlie'][Number(id) - 1] || 'User',
  lastName: ['Doe', 'Smith', 'Johnson', 'Williams', 'Brown'][Number(id) - 1] || 'Name',
  role: [EUserRole.ADMIN, EUserRole.MANAGER, EUserRole.USER, EUserRole.USER, EUserRole.USER][Number(id) - 1] || EUserRole.USER,
  status: [EUserStatus.ACTIVE, EUserStatus.ACTIVE, EUserStatus.PENDING, EUserStatus.INACTIVE, EUserStatus.SUSPENDED][Number(id) - 1] || EUserStatus.ACTIVE,
  avatar: undefined,
  department: 'Engineering',
  jobTitle: 'Software Developer',
  phone: '+1 (555) 123-4567',
  isEmailVerified: true,
  lastLoginAt: '2024-12-30T10:30:00Z',
  createdAt: '2024-01-15T10:30:00Z',
  updatedAt: '2024-06-20T14:45:00Z',
});

const roleOptions = [
  { value: EUserRole.USER, label: 'User' },
  { value: EUserRole.MANAGER, label: 'Manager' },
  { value: EUserRole.ADMIN, label: 'Admin' },
];

const statusOptions = [
  { value: EUserStatus.ACTIVE, label: 'Active' },
  { value: EUserStatus.INACTIVE, label: 'Inactive' },
  { value: EUserStatus.SUSPENDED, label: 'Suspended' },
  { value: EUserStatus.PENDING, label: 'Pending' },
];

export function UsersEditPage() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isMockLoading, setIsMockLoading] = useState(env.enableMockApi);

  const { data: apiUser, isLoading: isLoadingUser, isError } = useGetUserByIdQuery(id ?? '');
  const { mutateAsync: updateUser, isPending: isUpdating } = useUpdateUserMutation();

  // Use mock data in demo mode
  const mockUser = env.enableMockApi ? getMockUser(id ?? '1') : null;
  const user = env.enableMockApi ? mockUser : apiUser;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IUpdateUserRequest>();

  // Simulate loading for mock mode
  useEffect(() => {
    if (env.enableMockApi) {
      const timer = setTimeout(() => setIsMockLoading(false), 300);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, []);

  // Populate form when user data loads
  useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        status: user.status,
        phone: user.phone,
        department: user.department,
        jobTitle: user.jobTitle,
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: IUpdateUserRequest) => {
    if (!id) return;

    // Mock mode: simulate update
    if (env.enableMockApi) {
      await new Promise(resolve => setTimeout(resolve, 500));
      dispatch(showSnackbar({ message: t('users.updateSuccess'), severity: 'success' }));
      navigate(ROUTES.USERS_LIST);
      return;
    }

    try {
      await updateUser({ id, data });
      dispatch(showSnackbar({ message: t('users.updateSuccess'), severity: 'success' }));
      navigate(ROUTES.USERS_LIST);
    } catch {
      // Error handled by API interceptor
    }
  };

  if (isLoadingUser || isMockLoading) {
    return <Loader />;
  }

  if ((isError || !user) && !env.enableMockApi) {
    return (
      <EmptyState
        title={t('errors.notFound')}
        action={
          <Button onClick={() => navigate(ROUTES.USERS_LIST)}>
            {t('common.back')}
          </Button>
        }
      />
    );
  }

  if (!user) {
    return <Loader />;
  }

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
        {t('users.edit')}
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
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <Select
                    label={t('users.role')}
                    options={roleOptions}
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select
                    label={t('users.status')}
                    options={statusOptions}
                    {...field}
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
            <Grid item xs={12}>
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
              loading={isUpdating}
            >
              {t('common.save')}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default UsersEditPage;
