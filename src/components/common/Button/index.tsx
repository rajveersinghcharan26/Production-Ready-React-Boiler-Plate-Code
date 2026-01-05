/**
 * Reusable Button component with consistent styling.
 * Extends Material UI Button with additional variants.
 */

import { forwardRef } from 'react';
import {
  Button as MuiButton,
  type ButtonProps as MuiButtonProps,
  CircularProgress,
} from '@mui/material';

export interface IButtonProps extends Omit<MuiButtonProps, 'disableRipple'> {
  /** Shows loading spinner and disables the button */
  loading?: boolean;
  /** Loading text to display (optional) */
  loadingText?: string;
}

/**
 * Button component with loading state support.
 * @example
 * <Button variant="contained" loading={isSubmitting}>
 *   Submit
 * </Button>
 */
export const Button = forwardRef<HTMLButtonElement, IButtonProps>(function Button(
  { children, loading = false, loadingText, disabled, startIcon, ...props },
  ref
) {
  const isDisabled = disabled || loading;

  return (
    <MuiButton
      ref={ref}
      disabled={isDisabled}
      startIcon={
        loading ? <CircularProgress size={16} color="inherit" /> : startIcon
      }
      {...props}
    >
      {loading && loadingText ? loadingText : children}
    </MuiButton>
  );
});

export default Button;
