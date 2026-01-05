/**
 * Help detail page component.
 */

import { Box, Typography, Paper, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '@/config/constants';

export function HelpDetailPage() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const titles: Record<string, string> = {
    faq: 'Frequently Asked Questions',
    docs: 'Documentation',
    support: 'Contact Support',
    feedback: 'Submit Feedback',
  };

  return (
    <Box>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate(ROUTES.HELP)}
        sx={{ mb: 2 }}
      >
        {t('common.back')}
      </Button>

      <Typography variant="h4" component="h1" gutterBottom>
        {titles[id ?? ''] ?? t('help.title')}
      </Typography>

      <Paper sx={{ p: 4 }}>
        <Typography variant="body1">
          Help Section: <strong>{id}</strong>
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Detailed help content for the "{id}" section would be displayed here.
        </Typography>
      </Paper>
    </Box>
  );
}

export default HelpDetailPage;
