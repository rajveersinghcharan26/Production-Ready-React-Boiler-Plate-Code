/**
 * User list detail page component.
 */

import { Box, Typography, Paper, Button, Grid, Chip, Avatar, Divider } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowBack, Edit } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

import { Loader, EmptyState } from '@/components/common';
import { useGetUserByIdQuery } from '@/api/endpoints/userApi';
import { ROUTES } from '@/config/constants';
import { env } from '@/config/env';
import { type IUser, EUserStatus, EUserRole } from '@/types';

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

export function UsersListDetailPage() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: apiUser, isLoading, isError } = useGetUserByIdQuery(id ?? '');

  // Use mock data in demo mode
  const user = env.enableMockApi ? getMockUser(id ?? '1') : apiUser;

  if (isLoading && !env.enableMockApi) {
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate(ROUTES.USERS_LIST)}
        >
          {t('common.back')}
        </Button>
        <Button
          variant="contained"
          startIcon={<Edit />}
          onClick={() => navigate(`${ROUTES.USERS_EDIT}/${id}`)}
        >
          {t('common.edit')}
        </Button>
      </Box>

      <Paper sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Avatar
            src={user.avatar}
            sx={{ width: 80, height: 80, mr: 3 }}
          >
            {user.firstName[0]}
          </Avatar>
          <Box>
            <Typography variant="h5">
              {user.firstName} {user.lastName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user.email}
            </Typography>
            <Box sx={{ mt: 1 }}>
              <Chip label={user.role} size="small" sx={{ mr: 1 }} />
              <Chip label={user.status} size="small" color="success" />
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              {t('users.department')}
            </Typography>
            <Typography variant="body1">{user.department ?? '-'}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              {t('users.jobTitle')}
            </Typography>
            <Typography variant="body1">{user.jobTitle ?? '-'}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              {t('users.phone')}
            </Typography>
            <Typography variant="body1">{user.phone ?? '-'}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              {t('users.lastLogin')}
            </Typography>
            <Typography variant="body1">{user.lastLoginAt ?? '-'}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              {t('users.createdAt')}
            </Typography>
            <Typography variant="body1">{user.createdAt}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default UsersListDetailPage;
