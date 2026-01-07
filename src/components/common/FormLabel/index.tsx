/**
 * FormLabel Component
 * Displays a caption label with a value label in vertical order.
 * Useful for read-only display of data in forms or detail views.
 */

import { Box, Typography, type TypographyProps } from '@mui/material';

export interface IFormLabelProps {
  /** Caption/title label text */
  caption: string;
  /** Value to display */
  value: string | number | null | undefined;
  /** Placeholder when value is empty */
  placeholder?: string;
  /** Whether the field is required (shows asterisk) */
  required?: boolean;
  /** Typography variant for caption */
  captionVariant?: TypographyProps['variant'];
  /** Typography variant for value */
  valueVariant?: TypographyProps['variant'];
  /** Custom styles for the container */
  sx?: TypographyProps['sx'];
}

/**
 * FormLabel component for displaying label-value pairs.
 * @example
 * <FormLabel
 *   caption="Email"
 *   value="john@example.com"
 * />
 *
 * @example
 * <FormLabel
 *   caption="Status"
 *   value={user.status}
 *   placeholder="Not set"
 * />
 */
export function FormLabel({
  caption,
  value,
  placeholder = '-',
  required = false,
  captionVariant = 'caption',
  valueVariant = 'body1',
  sx,
}: IFormLabelProps) {
  const displayValue = value !== null && value !== undefined && value !== '' 
    ? value 
    : placeholder;

  return (
    <Box sx={{ mb: 2, ...sx }}>
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
      <Typography
        variant={valueVariant}
        color={displayValue === placeholder ? 'text.disabled' : 'text.primary'}
      >
        {displayValue}
      </Typography>
    </Box>
  );
}

export default FormLabel;
