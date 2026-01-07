/**
 * FormMultiSelect Component
 * Combines a caption label with a multi-select control in vertical order.
 * Allows selecting multiple values from a list of options.
 */

import { Box, Typography, Chip, type TypographyProps } from '@mui/material';
import {
  FormControl,
  FormHelperText,
  MenuItem,
  Select as MuiSelect,
  type SelectChangeEvent,
  OutlinedInput,
} from '@mui/material';
import type { ISelectOption } from '@/types';

export interface IFormMultiSelectProps {
  /** Caption/title label text */
  caption: string;
  /** Select options */
  options: ISelectOption[];
  /** Current selected values (array) */
  value?: (string | number)[];
  /** Change handler */
  onChange?: (event: SelectChangeEvent<(string | number)[]>) => void;
  /** Placeholder text when no selection */
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
  /** Maximum number of chips to display before showing count */
  maxChips?: number;
}

/**
 * FormMultiSelect component with caption label and multi-select control.
 * @example
 * <FormMultiSelect
 *   caption="Select Categories"
 *   options={categoryOptions}
 *   value={selectedCategories}
 *   onChange={handleCategoryChange}
 *   placeholder="Choose categories"
 * />
 *
 * @example
 * <FormMultiSelect
 *   caption="Assign Users"
 *   options={userOptions}
 *   value={assignedUsers}
 *   onChange={handleUserChange}
 *   required
 *   error={hasError}
 *   helperText="Please select at least one user"
 * />
 */
export function FormMultiSelect({
  caption,
  options,
  value = [],
  onChange,
  placeholder = 'Select options',
  required = false,
  disabled = false,
  error = false,
  helperText,
  fullWidth = true,
  captionVariant = 'caption',
  containerSx,
  maxChips = 3,
}: IFormMultiSelectProps) {
  // Get label for a value
  const getOptionLabel = (val: string | number): string => {
    const option = options.find((opt) => opt.value === val);
    return option?.label ?? String(val);
  };

  // Render selected values as chips
  const renderValue = (selected: (string | number)[]) => {
    if (selected.length === 0) {
      return (
        <Typography color="text.disabled" sx={{ py: 0.5 }}>
          {placeholder}
        </Typography>
      );
    }

    const displayedChips = selected.slice(0, maxChips);
    const remainingCount = selected.length - maxChips;

    return (
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
        {displayedChips.map((val) => (
          <Chip
            key={String(val)}
            label={getOptionLabel(val)}
            size="small"
            sx={{ height: 24 }}
          />
        ))}
        {remainingCount > 0 && (
          <Chip
            label={`+${remainingCount} more`}
            size="small"
            sx={{ height: 24 }}
            color="primary"
            variant="outlined"
          />
        )}
      </Box>
    );
  };

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
      <FormControl fullWidth={fullWidth} error={error} size="small">
        <MuiSelect
          multiple
          value={value}
          onChange={onChange}
          input={<OutlinedInput />}
          renderValue={renderValue}
          disabled={disabled}
          displayEmpty
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 300,
              },
            },
          }}
        >
          {options.map((option) => (
            <MenuItem
              key={String(option.value)}
              value={option.value}
              disabled={option.disabled}
              sx={{
                fontWeight: value.includes(option.value) ? 600 : 400,
              }}
            >
              {option.label}
            </MenuItem>
          ))}
        </MuiSelect>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </Box>
  );
}

export default FormMultiSelect;
