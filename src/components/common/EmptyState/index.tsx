/**
 * Empty state component for lists and data displays.
 */

import { Box, Typography, type SxProps, type Theme } from '@mui/material';
import { FolderOpen } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

export interface IEmptyStateProps {
  /** Title text */
  title?: string;
  /** Description text */
  description?: string;
  /** Custom icon */
  icon?: React.ReactNode;
  /** Action button/component */
  action?: React.ReactNode;
  /** Custom styles */
  sx?: SxProps<Theme>;
}

/**
 * Empty state component for when there's no data to display.
 * @example
 * <EmptyState
 *   title="No Users Found"
 *   description="Try adjusting your search criteria"
 *   action={<Button>Create User</Button>}
 * />
 */
export function EmptyState({
  title,
  description,
  icon,
  action,
  sx,
}: IEmptyStateProps) {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        py: 8,
        px: 2,
        ...sx,
      }}
    >
      <Box
        sx={{
          mb: 2,
          color: 'text.secondary',
        }}
      >
        {icon ?? <FolderOpen sx={{ fontSize: 64, opacity: 0.5 }} />}
      </Box>
      <Typography variant="h6" color="text.primary" gutterBottom>
        {title ?? t('common.noResults')}
      </Typography>
      {description && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {description}
        </Typography>
      )}
      {action && <Box>{action}</Box>}
    </Box>
  );
}

export default EmptyState;
