/**
 * Dashboard detail page component.
 */

import { Box, Typography, Paper, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '@/config/constants';

export function DashboardDetailPage() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  return (
    <Box>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate(ROUTES.DASHBOARD)}
        sx={{ mb: 2 }}
      >
        {t('common.back')}
      </Button>

      <Typography variant="h4" component="h1" gutterBottom>
        {t('dashboard.title')} - {t('common.details')}
      </Typography>

      <Paper sx={{ p: 3 }}>
        <Typography variant="body1">
          Dashboard Item ID: <strong>{id}</strong>
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          This is the detail view for dashboard item {id}.
        </Typography>
      </Paper>
    </Box>
  );
}

export default DashboardDetailPage;
