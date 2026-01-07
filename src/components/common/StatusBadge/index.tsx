import React from 'react';
import { Chip, ChipProps, SxProps, Theme } from '@mui/material';

export type StatusVariant = 
  | 'success' 
  | 'error' 
  | 'warning' 
  | 'info' 
  | 'pending' 
  | 'inactive' 
  | 'default';

export interface StatusBadgeProps {
  /** The status label to display */
  label: string;
  /** The status variant that determines the color scheme */
  variant?: StatusVariant;
  /** Size of the badge */
  size?: 'small' | 'medium';
  /** Whether to show as outlined or filled */
  outlined?: boolean;
  /** Custom icon to display before the label */
  icon?: React.ReactElement;
  /** Whether the badge should pulse/animate (for active states) */
  pulse?: boolean;
  /** Additional styles */
  sx?: SxProps<Theme>;
}

const statusColors: Record<StatusVariant, { bg: string; color: string; border: string }> = {
  success: {
    bg: 'rgba(46, 125, 50, 0.12)',
    color: '#2e7d32',
    border: '#2e7d32',
  },
  error: {
    bg: 'rgba(211, 47, 47, 0.12)',
    color: '#d32f2f',
    border: '#d32f2f',
  },
  warning: {
    bg: 'rgba(237, 108, 2, 0.12)',
    color: '#ed6c02',
    border: '#ed6c02',
  },
  info: {
    bg: 'rgba(2, 136, 209, 0.12)',
    color: '#0288d1',
    border: '#0288d1',
  },
  pending: {
    bg: 'rgba(156, 39, 176, 0.12)',
    color: '#9c27b0',
    border: '#9c27b0',
  },
  inactive: {
    bg: 'rgba(158, 158, 158, 0.12)',
    color: '#757575',
    border: '#9e9e9e',
  },
  default: {
    bg: 'rgba(66, 66, 66, 0.12)',
    color: '#424242',
    border: '#616161',
  },
};

// Predefined status mappings for common use cases
export const statusPresets: Record<string, StatusVariant> = {
  // General statuses
  active: 'success',
  enabled: 'success',
  approved: 'success',
  completed: 'success',
  published: 'success',
  verified: 'success',
  online: 'success',
  
  inactive: 'inactive',
  disabled: 'inactive',
  offline: 'inactive',
  archived: 'inactive',
  
  pending: 'pending',
  processing: 'pending',
  'in-progress': 'pending',
  reviewing: 'pending',
  draft: 'pending',
  
  error: 'error',
  failed: 'error',
  rejected: 'error',
  cancelled: 'error',
  expired: 'error',
  blocked: 'error',
  suspended: 'error',
  
  warning: 'warning',
  'needs-attention': 'warning',
  overdue: 'warning',
  
  info: 'info',
  new: 'info',
  updated: 'info',
};

/**
 * Get the status variant based on a status string
 * @param status - The status string to look up
 * @returns The corresponding StatusVariant
 */
export const getStatusVariant = (status: string): StatusVariant => {
  const normalizedStatus = status.toLowerCase().replace(/[\s_]/g, '-');
  return statusPresets[normalizedStatus] || 'default';
};

/**
 * StatusBadge - A reusable component for displaying status indicators
 * 
 * @example
 * // Basic usage with explicit variant
 * <StatusBadge label="Active" variant="success" />
 * 
 * @example
 * // Auto-detect variant from label
 * <StatusBadge label="Pending" />
 * 
 * @example
 * // With pulse animation
 * <StatusBadge label="Processing" variant="pending" pulse />
 */
export const StatusBadge: React.FC<StatusBadgeProps> = ({
  label,
  variant,
  size = 'small',
  outlined = false,
  icon,
  pulse = false,
  sx,
}) => {
  // Auto-detect variant from label if not provided
  const resolvedVariant = variant || getStatusVariant(label);
  const colors = statusColors[resolvedVariant];

  const pulseAnimation = pulse ? {
    '@keyframes pulse': {
      '0%': { boxShadow: `0 0 0 0 ${colors.border}40` },
      '70%': { boxShadow: `0 0 0 6px ${colors.border}00` },
      '100%': { boxShadow: `0 0 0 0 ${colors.border}00` },
    },
    animation: 'pulse 2s infinite',
  } : {};

  const chipProps: ChipProps = {
    label,
    size,
    icon,
    variant: outlined ? 'outlined' : 'filled',
    sx: {
      fontWeight: 600,
      fontSize: size === 'small' ? '0.75rem' : '0.875rem',
      letterSpacing: '0.02em',
      ...(outlined
        ? {
            backgroundColor: 'transparent',
            borderColor: colors.border,
            color: colors.color,
            borderWidth: '1.5px',
          }
        : {
            backgroundColor: colors.bg,
            color: colors.color,
            border: 'none',
          }),
      '& .MuiChip-icon': {
        color: colors.color,
        fontSize: size === 'small' ? '1rem' : '1.125rem',
      },
      ...pulseAnimation,
      ...sx,
    },
  };

  return <Chip {...chipProps} />;
};

export default StatusBadge;
