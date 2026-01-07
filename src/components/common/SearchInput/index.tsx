import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  TextField,
  InputAdornment,
  IconButton,
  Box,
  SxProps,
  Theme,
  CircularProgress,
} from '@mui/material';
import { Search, Clear } from '@mui/icons-material';

export interface ISearchInputProps {
  /** Placeholder text */
  placeholder?: string;
  /** Current search value */
  value?: string;
  /** Callback when search value changes */
  onChange?: (value: string) => void;
  /** Callback when search is submitted (Enter key or search icon click) */
  onSearch?: (value: string) => void;
  /** Debounce delay in milliseconds (0 to disable) */
  debounceMs?: number;
  /** Whether to show the clear button */
  showClear?: boolean;
  /** Whether the search is loading */
  loading?: boolean;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Size of the input */
  size?: 'small' | 'medium';
  /** Whether to take full width */
  fullWidth?: boolean;
  /** Variant of the text field */
  variant?: 'outlined' | 'filled' | 'standard';
  /** Auto focus on mount */
  autoFocus?: boolean;
  /** Additional styles */
  sx?: SxProps<Theme>;
}

/**
 * SearchInput - A reusable search input component with debounce support
 *
 * @example
 * // Basic usage
 * <SearchInput
 *   placeholder="Search users..."
 *   onSearch={(value) => console.log('Search:', value)}
 * />
 *
 * @example
 * // With debounce
 * <SearchInput
 *   placeholder="Search..."
 *   debounceMs={300}
 *   onChange={(value) => fetchResults(value)}
 * />
 *
 * @example
 * // Controlled input
 * <SearchInput
 *   value={searchTerm}
 *   onChange={setSearchTerm}
 *   onSearch={handleSearch}
 * />
 */
export const SearchInput: React.FC<ISearchInputProps> = ({
  placeholder = 'Search...',
  value: controlledValue,
  onChange,
  onSearch,
  debounceMs = 0,
  showClear = true,
  loading = false,
  disabled = false,
  size = 'small',
  fullWidth = false,
  variant = 'outlined',
  autoFocus = false,
  sx,
}) => {
  const [internalValue, setInternalValue] = useState('');
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Use controlled or uncontrolled value
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      
      if (!isControlled) {
        setInternalValue(newValue);
      }

      // Clear existing timer
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      if (debounceMs > 0) {
        // Set new timer for debounced callback
        debounceTimerRef.current = setTimeout(() => {
          onChange?.(newValue);
        }, debounceMs);
      } else {
        onChange?.(newValue);
      }
    },
    [isControlled, debounceMs, onChange]
  );

  const handleClear = useCallback(() => {
    if (!isControlled) {
      setInternalValue('');
    }
    onChange?.('');
    onSearch?.('');
  }, [isControlled, onChange, onSearch]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        onSearch?.(value);
      }
      if (event.key === 'Escape') {
        handleClear();
      }
    },
    [value, onSearch, handleClear]
  );

  const handleSearchClick = useCallback(() => {
    onSearch?.(value);
  }, [value, onSearch]);

  return (
    <Box sx={{ display: 'inline-flex', ...sx }}>
      <TextField
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        size={size}
        fullWidth={fullWidth}
        variant={variant}
        autoFocus={autoFocus}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton
                size="small"
                onClick={handleSearchClick}
                disabled={disabled}
                edge="start"
                aria-label="search"
                sx={{ p: 0.5 }}
              >
                {loading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <Search fontSize="small" />
                )}
              </IconButton>
            </InputAdornment>
          ),
          endAdornment: showClear && value ? (
            <InputAdornment position="end">
              <IconButton
                size="small"
                onClick={handleClear}
                disabled={disabled}
                edge="end"
                aria-label="clear search"
                sx={{ p: 0.5 }}
              >
                <Clear fontSize="small" />
              </IconButton>
            </InputAdornment>
          ) : null,
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            backgroundColor: 'background.paper',
            '&:hover': {
              backgroundColor: 'action.hover',
            },
            '&.Mui-focused': {
              backgroundColor: 'background.paper',
            },
          },
        }}
      />
    </Box>
  );
};

export default SearchInput;
