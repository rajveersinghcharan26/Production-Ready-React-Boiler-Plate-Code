import React from 'react';
import {
  Card as MuiCard,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Collapse,
  Box,
  Divider,
  SxProps,
  Theme,
} from '@mui/material';
import { ExpandMore, ExpandLess, MoreVert } from '@mui/icons-material';

export interface CardProps {
  /** The title of the card */
  title?: string;
  /** Subtitle or secondary text */
  subtitle?: string;
  /** The main content of the card */
  children: React.ReactNode;
  /** Action buttons to display at the bottom of the card */
  actions?: React.ReactNode;
  /** Whether the card is collapsible */
  collapsible?: boolean;
  /** Initial collapsed state (only used if collapsible is true) */
  defaultCollapsed?: boolean;
  /** Whether to show a menu icon in the header */
  showMenu?: boolean;
  /** Callback when the menu icon is clicked */
  onMenuClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Custom header action element */
  headerAction?: React.ReactNode;
  /** Icon to display before the title */
  icon?: React.ReactNode;
  /** Card variant */
  variant?: 'elevation' | 'outlined';
  /** Elevation level (only for elevation variant) */
  elevation?: number;
  /** Whether to show a loading state */
  loading?: boolean;
  /** Whether the card should take full height of its container */
  fullHeight?: boolean;
  /** Whether to remove padding from content */
  noPadding?: boolean;
  /** Additional styles for the card */
  sx?: SxProps<Theme>;
  /** Additional styles for the content */
  contentSx?: SxProps<Theme>;
}

/**
 * Card - A reusable card component for grouping related content
 *
 * @example
 * // Basic usage
 * <Card title="User Information">
 *   <Typography>Name: John Doe</Typography>
 * </Card>
 *
 * @example
 * // With actions
 * <Card
 *   title="Settings"
 *   subtitle="Configure your preferences"
 *   actions={<Button>Save Changes</Button>}
 * >
 *   <FormField label="Email" value={email} onChange={setEmail} />
 * </Card>
 *
 * @example
 * // Collapsible card
 * <Card title="Advanced Options" collapsible defaultCollapsed>
 *   <Typography>Hidden content...</Typography>
 * </Card>
 */
export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  children,
  actions,
  collapsible = false,
  defaultCollapsed = false,
  showMenu = false,
  onMenuClick,
  headerAction,
  icon,
  variant = 'elevation',
  elevation = 1,
  loading = false,
  fullHeight = false,
  noPadding = false,
  sx,
  contentSx,
}) => {
  const [collapsed, setCollapsed] = React.useState(defaultCollapsed);

  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const renderHeaderAction = () => {
    if (headerAction) return headerAction;

    const actions: React.ReactNode[] = [];

    if (collapsible) {
      actions.push(
        <IconButton
          key="collapse"
          onClick={handleToggleCollapse}
          size="small"
          aria-label={collapsed ? 'expand' : 'collapse'}
        >
          {collapsed ? <ExpandMore /> : <ExpandLess />}
        </IconButton>
      );
    }

    if (showMenu) {
      actions.push(
        <IconButton
          key="menu"
          onClick={onMenuClick}
          size="small"
          aria-label="more options"
        >
          <MoreVert />
        </IconButton>
      );
    }

    if (actions.length === 0) return undefined;

    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        {actions}
      </Box>
    );
  };

  const hasHeader = title || subtitle || icon || collapsible || showMenu || headerAction;

  return (
    <MuiCard
      variant={variant}
      elevation={variant === 'elevation' ? elevation : 0}
      sx={{
        height: fullHeight ? '100%' : 'auto',
        display: fullHeight ? 'flex' : 'block',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'visible',
        ...sx,
      }}
    >
      {/* Loading Overlay */}
      {loading && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
            borderRadius: 'inherit',
          }}
        >
          <Typography color="text.secondary">Loading...</Typography>
        </Box>
      )}

      {/* Header */}
      {hasHeader && (
        <CardHeader
          avatar={
            icon ? (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'primary.main',
                }}
              >
                {icon}
              </Box>
            ) : undefined
          }
          title={
            title ? (
              <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
                {title}
              </Typography>
            ) : undefined
          }
          subheader={subtitle}
          action={renderHeaderAction()}
          sx={{
            pb: collapsible && collapsed ? 2 : 0,
            '& .MuiCardHeader-action': {
              alignSelf: 'center',
              m: 0,
            },
          }}
        />
      )}

      {/* Divider between header and content */}
      {hasHeader && !collapsed && <Divider />}

      {/* Content */}
      <Collapse in={!collapsible || !collapsed} timeout="auto">
        <CardContent
          sx={{
            flexGrow: fullHeight ? 1 : 0,
            p: noPadding ? 0 : 2,
            '&:last-child': {
              pb: noPadding ? 0 : 2,
            },
            ...contentSx,
          }}
        >
          {children}
        </CardContent>

        {/* Actions */}
        {actions && (
          <>
            <Divider />
            <CardActions
              sx={{
                justifyContent: 'flex-end',
                px: 2,
                py: 1.5,
                gap: 1,
              }}
            >
              {actions}
            </CardActions>
          </>
        )}
      </Collapse>
    </MuiCard>
  );
};

export default Card;
