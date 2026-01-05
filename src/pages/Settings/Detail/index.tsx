/**
 * Settings detail page component.
 */

import { Box, Typography, Paper, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '@/config/constants';

export function SettingsDetailPage() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const titles: Record<string, string> = {
    profile: 'Profile Settings',
    appearance: 'Appearance Settings',
    notifications: 'Notification Settings',
    security: 'Security Settings',
    language: 'Language Settings',
  };

  return (
    <Box>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate(ROUTES.SETTINGS)}
        sx={{ mb: 2 }}
      >
        {t('common.back')}
      </Button>

      <Typography variant="h4" component="h1" gutterBottom>
        {titles[id ?? ''] ?? t('settings.title')}
      </Typography>

      <Paper sx={{ p: 4 }}>
        <Typography variant="body1">
          Settings Section: <strong>{id}</strong>
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Configure your {id} settings here. Form fields and options would be displayed in this section.
        </Typography>
      </Paper>
    </Box>
  );
}

export default SettingsDetailPage;
