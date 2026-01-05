/**
 * Settings page component with self-contained routing.
 */

import { lazy, Suspense } from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Person,
  Palette,
  Notifications,
  Security,
  Language,
} from '@mui/icons-material';

import { ROUTES } from '@/config/constants';
import { Loader } from '@/components/common';

// Lazy load detail page
const SettingsDetailPage = lazy(() => import('./Detail'));

export function SettingsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const settingsSections = [
    { id: 'profile', title: t('nav.profile'), icon: <Person />, description: 'Manage your profile information' },
    { id: 'appearance', title: t('settings.appearance'), icon: <Palette />, description: 'Customize theme and display' },
    { id: 'notifications', title: t('settings.notifications'), icon: <Notifications />, description: 'Configure notification preferences' },
    { id: 'security', title: t('settings.security'), icon: <Security />, description: 'Password and security settings' },
    { id: 'language', title: t('settings.language'), icon: <Language />, description: 'Language and region settings' },
  ];

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        {t('settings.title')}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Manage your application settings and preferences.
      </Typography>

      <Paper>
        <List>
          {settingsSections.map((section, index) => (
            <ListItem key={section.id} divider={index < settingsSections.length - 1}>
              <ListItemButton onClick={() => navigate(`${ROUTES.SETTINGS}/${section.id}`)}>
                <ListItemIcon>{section.icon}</ListItemIcon>
                <ListItemText
                  primary={section.title}
                  secondary={section.description}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}

/**
 * Settings layout with self-contained routing.
 */
function SettingsLayout() {
  return (
    <Routes>
      <Route index element={<SettingsPage />} />
      <Route
        path=":id"
        element={
          <Suspense fallback={<Loader />}>
            <SettingsDetailPage />
          </Suspense>
        }
      />
    </Routes>
  );
}

export default SettingsLayout;
