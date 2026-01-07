/**
 * FormSelect Component
 * Combines a caption label with a Select control in vertical order.
 * Provides consistent form field layout across the application.
 */

import { Box, Typography, type TypographyProps } from '@mui/material';
import { Select } from '../Select';
import type { ISelectOption } from '@/types';
import type { SelectChangeEvent } from '@mui/material';

export interface IFormSelectProps {
  /** Caption/title label text */
  caption: string;
  /** Select options */
  options: ISelectOption[];
  /** Current value */
  value?: string | number;
  /** Change handler */
  onChange?: (event: SelectChangeEvent<unknown>) => void;
  /** Placeholder text */
  placeholder?: string;
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
 * FormSelect component with caption label and select control.
 * @example
 * <FormSelect
 *   caption="Country"
 *   options={countryOptions}
 *   value={selectedCountry}
 *   onChange={handleCountryChange}
 *   placeholder="Select a country"
 * />
 *
 * @example
 * <FormSelect
 *   caption="Status"
 *   options={statusOptions}
 *   value={status}
 *   onChange={handleStatusChange}
 *   required
 *   error
 *   helperText="Please select a status"
 * />
 */
export function FormSelect({
  caption,
  options,
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  error = false,
  helperText,
  fullWidth = true,
  captionVariant = 'caption',
  containerSx,
}: IFormSelectProps) {
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
      <Select
        options={options}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        error={error}
        helperText={helperText}
        fullWidth={fullWidth}
        size="small"
      />
    </Box>
  );
}

export default FormSelect;
