/**
 * User profile page component.
 */

import { Box, Typography, Paper, Avatar, Grid, Chip, Divider, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowBack, Edit } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

import { Loader, EmptyState } from '@/components/common';
import { useGetUserProfileQuery } from '@/api/endpoints/userApi';
import { ROUTES } from '@/config/constants';
import { env } from '@/config/env';
import { type IUserProfile, EUserStatus, EUserRole } from '@/types';

// Mock profile for demo mode
const getMockProfile = (id: string): IUserProfile => ({
  id,
  email: `user${id}@example.com`,
  firstName: ['John', 'Jane', 'Bob', 'Alice', 'Charlie'][Number(id) - 1] || 'User',
  lastName: ['Doe', 'Smith', 'Johnson', 'Williams', 'Brown'][Number(id) - 1] || 'Name',
  role: [EUserRole.ADMIN, EUserRole.MANAGER, EUserRole.USER, EUserRole.USER, EUserRole.USER][Number(id) - 1] || EUserRole.USER,
  status: [EUserStatus.ACTIVE, EUserStatus.ACTIVE, EUserStatus.PENDING, EUserStatus.INACTIVE, EUserStatus.SUSPENDED][Number(id) - 1] || EUserStatus.ACTIVE,
  avatar: undefined,
  bio: 'Passionate software developer with experience in React, TypeScript, and Node.js.',
  location: 'San Francisco, CA',
  timezone: 'America/Los_Angeles',
  department: 'Engineering',
  jobTitle: 'Senior Software Developer',
  isEmailVerified: true,
  preferences: {
    language: 'en',
    theme: 'light',
    notifications: {
      email: true,
      push: true,
      sms: false,
    },
  },
  createdAt: '2024-01-15T10:30:00Z',
  updatedAt: '2024-06-20T14:45:00Z',
});

export function UsersProfilePage() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: apiProfile, isLoading, isError } = useGetUserProfileQuery(id ?? '');

  // Use mock data in demo mode
  const profile = env.enableMockApi ? getMockProfile(id ?? '1') : apiProfile;

  if (isLoading && !env.enableMockApi) {
    return <Loader />;
  }

  if ((isError || !profile) && !env.enableMockApi) {
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

  if (!profile) {
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

      <Typography variant="h4" component="h1" gutterBottom>
        {t('users.profile')}
      </Typography>

      <Paper sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Avatar
            src={profile.avatar}
            sx={{ width: 100, height: 100, mr: 3 }}
          >
            {profile.firstName[0]}
          </Avatar>
          <Box>
            <Typography variant="h4">
              {profile.firstName} {profile.lastName}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {profile.email}
            </Typography>
            <Box sx={{ mt: 1 }}>
              <Chip label={profile.role} sx={{ mr: 1 }} />
              <Chip label={profile.status} color="success" />
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Bio
            </Typography>
            <Typography variant="body1">
              {profile.bio ?? 'No bio provided.'}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              Location
            </Typography>
            <Typography variant="body1">{profile.location ?? '-'}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              Timezone
            </Typography>
            <Typography variant="body1">{profile.timezone ?? '-'}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              {t('users.department')}
            </Typography>
            <Typography variant="body1">{profile.department ?? '-'}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              {t('users.jobTitle')}
            </Typography>
            <Typography variant="body1">{profile.jobTitle ?? '-'}</Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>
          Preferences
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Typography variant="body2" color="text.secondary">
              Language
            </Typography>
            <Typography variant="body1">{profile.preferences.language}</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="body2" color="text.secondary">
              Theme
            </Typography>
            <Typography variant="body1">{profile.preferences.theme}</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="body2" color="text.secondary">
              Notifications
            </Typography>
            <Box>
              {profile.preferences.notifications.email && <Chip label="Email" size="small" sx={{ mr: 0.5 }} />}
              {profile.preferences.notifications.push && <Chip label="Push" size="small" sx={{ mr: 0.5 }} />}
              {profile.preferences.notifications.sms && <Chip label="SMS" size="small" />}
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default UsersProfilePage;
