/**
 * Reusable Input component using React Hook Form.
 * Provides consistent styling and validation display.
 */

import { forwardRef } from 'react';
import {
  TextField,
  type TextFieldProps,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';

export interface IInputProps extends Omit<TextFieldProps, 'variant'> {
  /** Error message to display */
  errorMessage?: string;
  /** Show password toggle for password fields */
  showPasswordToggle?: boolean;
}

/**
 * Input component with error handling and password toggle.
 * Designed to work with React Hook Form.
 * @example
 * <Input
 *   label="Email"
 *   {...register('email')}
 *   errorMessage={errors.email?.message}
 * />
 */
export const Input = forwardRef<HTMLInputElement, IInputProps>(function Input(
  { errorMessage, showPasswordToggle = false, type, ...props },
  ref
) {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const inputType = showPasswordToggle && type === 'password'
    ? (showPassword ? 'text' : 'password')
    : type;

  return (
    <TextField
      inputRef={ref}
      variant="outlined"
      fullWidth
      error={Boolean(errorMessage)}
      helperText={errorMessage}
      type={inputType}
      InputProps={{
        endAdornment: showPasswordToggle && type === 'password' ? (
          <InputAdornment position="end">
            <IconButton
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              onClick={handleTogglePassword}
              edge="end"
              size="small"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ) : undefined,
      }}
      {...props}
    />
  );
});

export default Input;
