import React from 'react';
import {
  Box,
  Switch,
  FormControlLabel,
  Typography,
  FormHelperText,
  SxProps,
  Theme,
} from '@mui/material';

export interface IFormSwitchProps {
  /** Caption/label for the switch */
  caption?: string;
  /** Label displayed next to the switch */
  label: string;
  /** Whether the switch is checked */
  checked?: boolean;
  /** Callback when switch state changes */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  /** Whether the field is required */
  required?: boolean;
  /** Whether the switch is disabled */
  disabled?: boolean;
  /** Error state */
  error?: boolean;
  /** Helper text to display below */
  helperText?: string;
  /** Size of the switch */
  size?: 'small' | 'medium';
  /** Color of the switch */
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'default';
  /** Label placement */
  labelPlacement?: 'end' | 'start' | 'top' | 'bottom';
  /** Additional styles for the container */
  sx?: SxProps<Theme>;
}

/**
 * FormSwitch - A reusable switch component with caption label
 *
 * @example
 * // Basic usage
 * <FormSwitch
 *   label="Enable notifications"
 *   checked={enabled}
 *   onChange={(e, checked) => setEnabled(checked)}
 * />
 *
 * @example
 * // With caption and required
 * <FormSwitch
 *   caption="Email Settings"
 *   label="Receive marketing emails"
 *   checked={marketing}
 *   onChange={(e, checked) => setMarketing(checked)}
 *   required
 * />
 *
 * @example
 * // With error state
 * <FormSwitch
 *   label="I agree to terms"
 *   checked={agreed}
 *   onChange={(e, checked) => setAgreed(checked)}
 *   error={!agreed}
 *   helperText="You must agree to continue"
 * />
 */
export const FormSwitch: React.FC<IFormSwitchProps> = ({
  caption,
  label,
  checked = false,
  onChange,
  required = false,
  disabled = false,
  error = false,
  helperText,
  size = 'medium',
  color = 'primary',
  labelPlacement = 'end',
  sx,
}) => {
  return (
    <Box sx={{ mb: 2, ...sx }}>
      {caption && (
        <Typography
          variant="body2"
          color="text.secondary"
          component="label"
          sx={{
            display: 'block',
            mb: 0.5,
            fontWeight: 500,
          }}
        >
          {caption}
          {required && (
            <Typography component="span" color="error.main" sx={{ ml: 0.5 }}>
              *
            </Typography>
          )}
        </Typography>
      )}
      <FormControlLabel
        control={
          <Switch
            checked={checked}
            onChange={onChange}
            disabled={disabled}
            size={size}
            color={error ? 'error' : color}
          />
        }
        label={
          <Typography
            variant="body2"
            color={error ? 'error' : 'text.primary'}
            sx={{ fontWeight: 400 }}
          >
            {label}
            {!caption && required && (
              <Typography component="span" color="error.main" sx={{ ml: 0.5 }}>
                *
              </Typography>
            )}
          </Typography>
        }
        labelPlacement={labelPlacement}
        disabled={disabled}
        sx={{
          ml: 0,
          '& .MuiFormControlLabel-label': {
            ml: labelPlacement === 'end' ? 1 : 0,
            mr: labelPlacement === 'start' ? 1 : 0,
          },
        }}
      />
      {helperText && (
        <FormHelperText error={error} sx={{ ml: 0, mt: 0.5 }}>
          {helperText}
        </FormHelperText>
      )}
    </Box>
  );
};

export default FormSwitch;
