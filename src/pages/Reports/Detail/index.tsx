/**
 * Report detail page component.
 */

import { Box, Typography, Paper, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowBack, Download } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '@/config/constants';

export function ReportsDetailPage() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate(ROUTES.REPORTS)}
        >
          {t('common.back')}
        </Button>
        <Button
          variant="contained"
          startIcon={<Download />}
        >
          {t('reports.download')}
        </Button>
      </Box>

      <Typography variant="h4" component="h1" gutterBottom>
        {t('reports.title')} - {id}
      </Typography>

      <Paper sx={{ p: 4 }}>
        <Typography variant="body1">
          Report ID: <strong>{id}</strong>
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          This is the detail view for report "{id}". Report data and visualizations would be displayed here.
        </Typography>
      </Paper>
    </Box>
  );
}

export default ReportsDetailPage;
