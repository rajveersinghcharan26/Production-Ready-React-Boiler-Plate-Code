/**
 * Confirmation dialog component.
 */

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

import { Button } from '../Button';

export interface IConfirmDialogProps {
  /** Whether the dialog is open */
  open: boolean;
  /** Dialog title */
  title: string;
  /** Dialog message */
  message: string;
  /** Confirm button text */
  confirmText?: string;
  /** Cancel button text */
  cancelText?: string;
  /** Whether confirm action is in progress */
  loading?: boolean;
  /** Confirm button color */
  confirmColor?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  /** Handler for confirm action */
  onConfirm: () => void;
  /** Handler for cancel action */
  onCancel: () => void;
}

/**
 * Reusable confirmation dialog.
 * @example
 * <ConfirmDialog
 *   open={isDeleteDialogOpen}
 *   title="Delete User"
 *   message="Are you sure you want to delete this user?"
 *   confirmColor="error"
 *   onConfirm={handleDelete}
 *   onCancel={() => setIsDeleteDialogOpen(false)}
 * />
 */
export function ConfirmDialog({
  open,
  title,
  message,
  confirmText,
  cancelText,
  loading = false,
  confirmColor = 'primary',
  onConfirm,
  onCancel,
}: IConfirmDialogProps) {
  const { t } = useTranslation();

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description"
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle id="confirm-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="confirm-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onCancel} variant="outlined" disabled={loading}>
          {cancelText ?? t('common.cancel')}
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color={confirmColor}
          loading={loading}
          autoFocus
        >
          {confirmText ?? t('common.confirm')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDialog;
