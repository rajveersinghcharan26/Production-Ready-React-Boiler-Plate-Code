/**
 * Application footer component.
 */

import { Box, Typography, Link } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { env } from '@/config/env';

/**
 * Simple footer with copyright and version info.
 */
export function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 3,
        mt: 'auto',
        borderTop: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.paper',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 1,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          © {currentYear} {t('common.appName')}. All rights reserved.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Link href="#" variant="body2" color="text.secondary" underline="hover">
            Privacy Policy
          </Link>
          <Link href="#" variant="body2" color="text.secondary" underline="hover">
            Terms of Service
          </Link>
          <Typography variant="caption" color="text.secondary">
            v{env.appVersion}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;
