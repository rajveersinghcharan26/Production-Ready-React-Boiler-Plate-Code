/**
 * Global Snackbar/Toast component using createPortal.
 * Mounted once at app root, controlled via Redux.
 */

import { createPortal } from 'react-dom';
import { Snackbar, Alert, type AlertColor } from '@mui/material';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { hideSnackbar } from '@/store/slices/uiSlice';
import { SNACKBAR } from '@/config/constants';

/**
 * Global snackbar for displaying notifications.
 * Uses createPortal to render outside the component tree.
 */
export function GlobalSnackbar() {
  const dispatch = useAppDispatch();
  const { snackbar } = useAppSelector((state) => state.ui);

  const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(hideSnackbar());
  };

  const portalRoot = document.getElementById('portal-root');

  if (!portalRoot) {
    return null;
  }

  return createPortal(
    <Snackbar
      open={snackbar.open}
      autoHideDuration={SNACKBAR.AUTO_HIDE_DURATION}
      onClose={handleClose}
      anchorOrigin={{
        vertical: SNACKBAR.POSITION.VERTICAL,
        horizontal: SNACKBAR.POSITION.HORIZONTAL,
      }}
    >
      <Alert
        onClose={handleClose}
        severity={snackbar.severity as AlertColor}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {snackbar.message}
      </Alert>
    </Snackbar>,
    portalRoot
  );
}

export default GlobalSnackbar;
