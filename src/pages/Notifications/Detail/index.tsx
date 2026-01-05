/**
 * Notification detail page component.
 */

import { Box, Typography, Paper, Button, Chip } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowBack, Delete, MarkEmailRead } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '@/config/constants';

export function NotificationsDetailPage() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate(ROUTES.NOTIFICATIONS)}
        >
          {t('common.back')}
        </Button>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<MarkEmailRead />}
          >
            {t('notifications.markAsRead')}
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<Delete />}
          >
            {t('common.delete')}
          </Button>
        </Box>
      </Box>

      <Paper sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Typography variant="h5">
            Notification Title
          </Typography>
          <Chip label="Info" color="info" size="small" />
        </Box>

        <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 3 }}>
          Received 2 hours ago
        </Typography>

        <Typography variant="body1">
          Notification ID: <strong>{id}</strong>
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          This is the detailed content of the notification. Full message content and any associated actions would be displayed here.
        </Typography>
      </Paper>
    </Box>
  );
}

export default NotificationsDetailPage;
