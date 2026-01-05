/**
 * Global popup component using createPortal.
 */

import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Box, Paper, IconButton, Typography, Fade } from '@mui/material';
import { Close } from '@mui/icons-material';

interface GlobalPopupProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  maxWidth?: number | string;
}

/**
 * Global popup component that renders outside the React tree using createPortal.
 * Useful for modals that need to escape overflow hidden containers.
 */
export function GlobalPopup({
  open,
  onClose,
  title,
  children,
  maxWidth = 500,
}: GlobalPopupProps) {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // Create portal container
    const portalContainer = document.createElement('div');
    portalContainer.id = 'global-popup-portal';
    document.body.appendChild(portalContainer);
    setContainer(portalContainer);

    return () => {
      document.body.removeChild(portalContainer);
    };
  }, []);

  useEffect(() => {
    // Prevent body scroll when popup is open
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, onClose]);

  if (!container || !open) return null;

  return createPortal(
    <Fade in={open}>
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
          bgcolor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 9999,
        }}
        onClick={onClose}
      >
        <Paper
          sx={{
            maxWidth,
            width: '90%',
            maxHeight: '90vh',
            overflow: 'auto',
            position: 'relative',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {title && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 2,
                borderBottom: 1,
                borderColor: 'divider',
              }}
            >
              <Typography variant="h6">{title}</Typography>
              <IconButton onClick={onClose} size="small">
                <Close />
              </IconButton>
            </Box>
          )}
          <Box sx={{ p: title ? 2 : 3 }}>{children}</Box>
        </Paper>
      </Box>
    </Fade>,
    container
  );
}

export default GlobalPopup;
