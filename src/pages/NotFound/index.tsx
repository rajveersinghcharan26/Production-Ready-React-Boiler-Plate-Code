/**
 * 404 Not Found page component.
 */

import { Box, Typography, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SentimentDissatisfied, Home, ArrowBack } from '@mui/icons-material';

import { ROUTES } from '@/config/constants';

export function NotFoundPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'background.default',
        p: 3,
      }}
    >
      <Paper
        sx={{
          p: 6,
          maxWidth: 500,
          textAlign: 'center',
        }}
      >
        <SentimentDissatisfied
          sx={{ fontSize: 80, color: 'text.secondary', mb: 3 }}
        />
        <Typography variant="h1" sx={{ fontSize: '6rem', fontWeight: 700, color: 'primary.main' }}>
          404
        </Typography>
        <Typography variant="h5" gutterBottom>
          {t('errors.notFound')}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          {t('errors.pageNotFoundMessage')}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={() => navigate(-1)}
          >
            {t('errors.goBack')}
          </Button>
          <Button
            variant="contained"
            startIcon={<Home />}
            onClick={() => navigate(ROUTES.HOME)}
          >
            {t('errors.goHome')}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default NotFoundPage;
