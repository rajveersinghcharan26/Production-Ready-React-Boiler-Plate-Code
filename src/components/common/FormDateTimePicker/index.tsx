/**
 * FormDateTimePicker Component
 * A styled date/time picker with caption label.
 * Uses native HTML date/time inputs for lightweight implementation.
 */

import { Box, Typography, TextField, type TypographyProps } from '@mui/material';
import type { ChangeEvent } from 'react';

export type DateTimePickerType = 'date' | 'time' | 'datetime-local' | 'month' | 'week';

export interface IFormDateTimePickerProps {
  /** Caption/title label text */
  caption: string;
  /** Picker type: 'date', 'time', 'datetime-local', 'month', 'week' */
  type?: DateTimePickerType;
  /** Current value (ISO format) */
  value?: string;
  /** Change handler */
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  /** Minimum date/time value */
  min?: string;
  /** Maximum date/time value */
  max?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Whether the field is disabled */
  disabled?: boolean;
  /** Error state */
  error?: boolean;
  /** Helper text or error message */
  helperText?: string;
  /** Full width */
  fullWidth?: boolean;
  /** Typography variant for caption */
  captionVariant?: TypographyProps['variant'];
  /** Custom styles for the container */
  containerSx?: TypographyProps['sx'];
}

/**
 * FormDateTimePicker component with caption label and native date/time picker.
 * @example
 * <FormDateTimePicker
 *   caption="Birth Date"
 *   type="date"
 *   value={birthDate}
 *   onChange={handleDateChange}
 * />
 *
 * @example
 * <FormDateTimePicker
 *   caption="Appointment Time"
 *   type="datetime-local"
 *   value={appointmentTime}
 *   onChange={handleTimeChange}
 *   min="2024-01-01T00:00"
 *   required
 * />
 */
export function FormDateTimePicker({
  caption,
  type = 'date',
  value = '',
  onChange,
  min,
  max,
  required = false,
  disabled = false,
  error = false,
  helperText,
  fullWidth = true,
  captionVariant = 'caption',
  containerSx,
}: IFormDateTimePickerProps) {
  return (
    <Box sx={{ mb: 2, ...containerSx }}>
      <Typography
        variant={captionVariant}
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
      <TextField
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        error={error}
        helperText={helperText}
        fullWidth={fullWidth}
        size="small"
        inputProps={{
          min,
          max,
        }}
        sx={{
          '& input::-webkit-calendar-picker-indicator': {
            cursor: 'pointer',
          },
        }}
      />
    </Box>
  );
}

export default FormDateTimePicker;
