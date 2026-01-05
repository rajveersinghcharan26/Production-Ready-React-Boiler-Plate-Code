/**
 * Reusable Select component using React Hook Form.
 * Provides consistent styling and validation display.
 */

import { forwardRef } from 'react';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
  type SelectProps as MuiSelectProps,
} from '@mui/material';

import { type ISelectOption } from '@/types';

export interface ISelectProps extends Omit<MuiSelectProps, 'variant'> {
  /** Select options */
  options: ISelectOption[];
  /** Error message to display */
  errorMessage?: string;
  /** Helper text when no error */
  helperText?: string;
}

/**
 * Select component with error handling.
 * Designed to work with React Hook Form.
 * @example
 * <Select
 *   label="Role"
 *   options={roleOptions}
 *   {...register('role')}
 *   errorMessage={errors.role?.message}
 * />
 */
export const Select = forwardRef<HTMLSelectElement, ISelectProps>(function Select(
  { options, errorMessage, helperText, label, fullWidth = true, ...props },
  ref
) {
  const hasError = Boolean(errorMessage);
  const displayHelperText = errorMessage ?? helperText;

  return (
    <FormControl fullWidth={fullWidth} error={hasError} size="small">
      {label && <InputLabel>{label}</InputLabel>}
      <MuiSelect
        ref={ref}
        label={label}
        variant="outlined"
        {...props}
      >
        {options.map((option) => (
          <MenuItem
            key={String(option.value)}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </MenuItem>
        ))}
      </MuiSelect>
      {displayHelperText && (
        <FormHelperText>{displayHelperText}</FormHelperText>
      )}
    </FormControl>
  );
});

export default Select;
