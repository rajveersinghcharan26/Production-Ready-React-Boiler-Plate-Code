/**
 * FormField component that combines a label and text field vertically.
 * Provides consistent styling for form inputs across the application.
 */

import { forwardRef } from 'react';
import {
  Box,
  Typography,
  TextField,
  type TextFieldProps,
} from '@mui/material';

export interface IFormFieldProps extends Omit<TextFieldProps, 'label'> {
  /** Label text displayed above the text field */
  label: string;
  /** Whether the field is required (adds asterisk to label) */
  required?: boolean;
}

/**
 * FormField component with label positioned above the input.
 * @example
 * <FormField
 *   label="Username"
 *   placeholder="Enter your username"
 *   value={username}
 *   onChange={(e) => setUsername(e.target.value)}
 * />
 */
export const FormField = forwardRef<HTMLDivElement, IFormFieldProps>(
  function FormField(
    { label, required = false, ...textFieldProps },
    ref
  ) {
    return (
      <Box ref={ref} sx={{ width: '100%' }}>
        <Typography
          component="label"
          variant="body2"
          fontWeight={500}
          sx={{
            display: 'block',
            mb: 0.75,
            color: 'text.primary',
          }}
        >
          {label}
          {required && (
            <Typography
              component="span"
              color="error.main"
              sx={{ ml: 0.5 }}
            >
              *
            </Typography>
          )}
        </Typography>
        <TextField
          {...textFieldProps}
          required={required}
          fullWidth
          size="small"
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'background.paper',
            },
            ...textFieldProps.sx,
          }}
        />
      </Box>
    );
  }
);

export default FormField;
