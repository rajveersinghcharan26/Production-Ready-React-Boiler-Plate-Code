import { useState } from 'react';
import { Typography, Stack } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { Button, ConfirmDialog } from '@/components/common';
import { Section } from '../shared';

export function ConfirmDialogShowcase() {
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <Section title="Confirm Dialog Component">
      <Typography variant="body2" sx={{ mb: 2 }}>
        Click the button below to open a confirmation dialog.
      </Typography>
      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          color="error"
          startIcon={<Delete />}
          onClick={() => setConfirmOpen(true)}
        >
          Delete Item
        </Button>
      </Stack>

      <ConfirmDialog
        open={confirmOpen}
        title="Confirm Delete"
        message="Are you sure you want to delete this item? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={() => {
          setConfirmOpen(false);
          // Show success feedback
        }}
        onCancel={() => setConfirmOpen(false)}
      />
    </Section>
  );
}

export default ConfirmDialogShowcase;
