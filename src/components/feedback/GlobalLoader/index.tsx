/**
 * Global Loading indicator component.
 * Shows loading state for API requests.
 */

import { createPortal } from 'react-dom';
import { Box, LinearProgress } from '@mui/material';

import { useAppSelector } from '@/store/hooks';

/**
 * Global loader that shows during API requests.
 * Uses RTK Query's loading state.
 */
export function GlobalLoader() {
  const { isGlobalLoading } = useAppSelector((state) => state.ui);

  const portalRoot = document.getElementById('portal-root');

  if (!portalRoot || !isGlobalLoading) {
    return null;
  }

  return createPortal(
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
      }}
    >
      <LinearProgress color="primary" />
    </Box>,
    portalRoot
  );
}

export default GlobalLoader;
