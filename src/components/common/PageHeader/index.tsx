import React from 'react';
import { Box, Typography, Breadcrumbs, Link, SxProps, Theme } from '@mui/material';
import { NavigateNext } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export interface BreadcrumbItem {
  /** The label to display */
  label: string;
  /** The path to navigate to (optional for the last item) */
  path?: string;
}

export interface PageHeaderProps {
  /** The main title of the page */
  title: string;
  /** Optional subtitle or description */
  subtitle?: string;
  /** Breadcrumb navigation items */
  breadcrumbs?: BreadcrumbItem[];
  /** Action buttons or elements to display on the right side */
  actions?: React.ReactNode;
  /** Whether to show a divider below the header */
  divider?: boolean;
  /** Custom icon to display before the title */
  icon?: React.ReactNode;
  /** Additional styles for the container */
  sx?: SxProps<Theme>;
}

/**
 * PageHeader - A reusable component for page headers with title, breadcrumbs, and actions
 *
 * @example
 * // Basic usage
 * <PageHeader title="Dashboard" />
 *
 * @example
 * // With subtitle and actions
 * <PageHeader
 *   title="Users"
 *   subtitle="Manage user accounts and permissions"
 *   actions={<Button variant="contained">Add User</Button>}
 * />
 *
 * @example
 * // With breadcrumbs
 * <PageHeader
 *   title="Edit User"
 *   breadcrumbs={[
 *     { label: 'Home', path: '/' },
 *     { label: 'Users', path: '/users' },
 *     { label: 'Edit User' },
 *   ]}
 * />
 */
export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  breadcrumbs,
  actions,
  divider = false,
  icon,
  sx,
}) => {
  const navigate = useNavigate();

  const handleBreadcrumbClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    path?: string
  ) => {
    event.preventDefault();
    if (path) {
      navigate(path);
    }
  };

  return (
    <Box
      sx={{
        mb: 3,
        pb: divider ? 2 : 0,
        borderBottom: divider ? 1 : 0,
        borderColor: 'divider',
        ...sx,
      }}
    >
      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumbs
          separator={<NavigateNext fontSize="small" />}
          aria-label="breadcrumb"
          sx={{ mb: 1 }}
        >
          {breadcrumbs.map((item, index) => {
            const isLast = index === breadcrumbs.length - 1;
            return isLast ? (
              <Typography
                key={index}
                color="text.primary"
                sx={{ fontWeight: 500 }}
              >
                {item.label}
              </Typography>
            ) : (
              <Link
                key={index}
                href={item.path || '#'}
                onClick={(e) => handleBreadcrumbClick(e, item.path)}
                underline="hover"
                color="inherit"
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </Breadcrumbs>
      )}

      {/* Title Row */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        {/* Title and Subtitle */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          {icon && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'primary.main',
                '& > svg': {
                  fontSize: '2rem',
                },
              }}
            >
              {icon}
            </Box>
          )}
          <Box>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 600,
                color: 'text.primary',
                lineHeight: 1.2,
              }}
            >
              {title}
            </Typography>
            {subtitle && (
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mt: 0.5 }}
              >
                {subtitle}
              </Typography>
            )}
          </Box>
        </Box>

        {/* Actions */}
        {actions && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              flexShrink: 0,
            }}
          >
            {actions}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default PageHeader;
