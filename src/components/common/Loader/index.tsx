/**
 * Page loading spinner component.
 */

import { Box, CircularProgress, type CircularProgressProps } from '@mui/material';

export interface ILoaderProps {
  /** Size of the spinner */
  size?: CircularProgressProps['size'];
  /** Full page overlay */
  fullPage?: boolean;
}

/**
 * Loading spinner component.
 * Can be used inline or as a full-page overlay.
 */
export function Loader({ size = 40, fullPage = false }: ILoaderProps) {
  if (fullPage) {
    return (
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          zIndex: 9999,
        }}
      >
        <CircularProgress size={size} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 4,
      }}
    >
      <CircularProgress size={size} />
    </Box>
  );
}

export default Loader;
