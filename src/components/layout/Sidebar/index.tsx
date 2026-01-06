/**
 * Application sidebar navigation component.
 * Supports expanded/collapsed states with smooth transitions.
 */

import { useLocation, useNavigate } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Toolbar,
  Divider,
  useTheme,
  useMediaQuery,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Dashboard,
  People,
  Assessment,
  Settings,
  Notifications,
  Help,
  ChevronLeft,
  ChevronRight,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '@/config/constants';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { toggleSidebar, selectIsSidebarOpen } from '@/store/slices/uiSlice';
import { EUserRole } from '@/types';

interface ISidebarProps {
  /** Width of expanded drawer */
  expandedWidth: number;
  /** Width of collapsed drawer (icons only) */
  collapsedWidth: number;
  /** Whether mobile drawer is open */
  mobileOpen: boolean;
  /** Handler to close mobile drawer */
  onMobileClose: () => void;
}

interface INavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
  roles?: EUserRole[];
}

/**
 * Sidebar navigation with role-based menu items.
 * Supports expanded and collapsed states on desktop.
 */
export function Sidebar({
  expandedWidth,
  collapsedWidth,
  mobileOpen,
  onMobileClose,
}: ISidebarProps) {
  const { t } = useTranslation();
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isExpanded = useAppSelector(selectIsSidebarOpen);

  const { user } = useAppSelector((state) => state.auth);

  const currentWidth = isExpanded ? expandedWidth : collapsedWidth;

  const navItems: INavItem[] = [
    {
      path: ROUTES.DASHBOARD,
      label: t('nav.dashboard'),
      icon: <Dashboard />,
    },
    {
      path: ROUTES.USERS,
      label: t('nav.users'),
      icon: <People />,
      roles: [EUserRole.ADMIN, EUserRole.MANAGER],
    },
    {
      path: ROUTES.REPORTS,
      label: t('nav.reports'),
      icon: <Assessment />,
    },
    {
      path: ROUTES.NOTIFICATIONS,
      label: t('nav.notifications'),
      icon: <Notifications />,
    },
    {
      path: ROUTES.SETTINGS,
      label: t('nav.settings'),
      icon: <Settings />,
    },
    {
      path: ROUTES.HELP,
      label: t('nav.help'),
      icon: <Help />,
    },
  ];

  // Filter items based on user role
  const filteredNavItems = navItems.filter((item) => {
    if (!item.roles) return true;
    return user?.role && item.roles.includes(user.role);
  });

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile) {
      onMobileClose();
    }
  };

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  /** Navigation item component */
  const NavItem = ({ item }: { item: INavItem }) => {
    const active = isActive(item.path);
    
    const button = (
      <ListItemButton
        selected={active}
        onClick={() => handleNavigation(item.path)}
        sx={{
          borderRadius: 2,
          minHeight: 48,
          justifyContent: isExpanded ? 'initial' : 'center',
          px: 2.5,
          '&.Mui-selected': {
            backgroundColor: 'primary.main',
            color: 'primary.contrastText',
            '&:hover': {
              backgroundColor: 'primary.dark',
            },
            '& .MuiListItemIcon-root': {
              color: 'inherit',
            },
          },
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: isExpanded ? 2 : 'auto',
            justifyContent: 'center',
            color: active ? 'inherit' : 'text.secondary',
            transition: (t) =>
              t.transitions.create(['margin'], {
                easing: t.transitions.easing.sharp,
                duration: t.transitions.duration.leavingScreen,
              }),
          }}
        >
          {item.icon}
        </ListItemIcon>
        <ListItemText
          primary={item.label}
          sx={{
            opacity: isExpanded ? 1 : 0,
            width: isExpanded ? 'auto' : 0,
            overflow: 'hidden',
            transition: (t) =>
              t.transitions.create(['opacity', 'width'], {
                easing: t.transitions.easing.sharp,
                duration: t.transitions.duration.leavingScreen,
              }),
            whiteSpace: 'nowrap',
          }}
        />
      </ListItemButton>
    );

    // Show tooltip only when collapsed
    if (!isExpanded) {
      return (
        <Tooltip title={item.label} placement="right" arrow>
          {button}
        </Tooltip>
      );
    }

    return button;
  };

  /** Drawer content for both mobile and desktop */
  const drawerContent = (showToggle: boolean) => (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
        overflowX: 'hidden',
        position: 'relative',
      }}
    >
      {/* Logo Header */}
      <Toolbar
        sx={{
          justifyContent: 'center',
          px: isExpanded ? 2 : 1,
          minHeight: 64,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            overflow: 'hidden',
          }}
        >
          <Box
            component="img"
            src="/vite.svg"
            alt="Logo"
            sx={{
              height: 32,
              flexShrink: 0,
            }}
          />
        </Box>
      </Toolbar>
      <Divider />

      {/* Navigation List */}
      <List
        sx={{
          px: isExpanded ? 2 : 1,
          py: 1,
          flexGrow: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          '&::-webkit-scrollbar': {
            width: 4,
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'divider',
            borderRadius: 2,
          },
        }}
      >
        {filteredNavItems.map((item) => (
          <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
            <NavItem item={item} />
          </ListItem>
        ))}
      </List>

      {/* Collapse/Expand Toggle (Desktop only) - On the divider line, vertically centered */}
      {showToggle && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            right: -15,
            transform: 'translateY(-50%)',
            zIndex: 1200,
          }}
        >
          <Tooltip
            title={isExpanded ? t('common.collapse', 'Collapse') : t('common.expand', 'Expand')}
            placement="right"
            arrow
          >
            <IconButton
              onClick={handleToggleSidebar}
              size="large"
              sx={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                border: '1px solid',
                borderColor: 'divider',
                color: 'text.secondary',
                '&:hover': {
                  color: 'primary.main',
                  borderColor: 'primary.main',
                },
              }}
            >
              {isExpanded ? <ChevronLeft sx={{ fontSize: 18 }} /> : <ChevronRight sx={{ fontSize: 18 }} />}
            </IconButton>
          </Tooltip>
        </Box>
      )}
    </Box>
  );

  return (
    <Box component="nav" sx={{ flexShrink: { sm: 0 } }}>
      {/* Mobile Drawer - Always fully expanded */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: expandedWidth,
          },
        }}
      >
        {drawerContent(false)}
      </Drawer>

      {/* Desktop Drawer - Collapsible */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: currentWidth,
            borderRight: '1px solid',
            borderColor: 'divider',
            overflowX: 'hidden',
            transition: (t) =>
              t.transitions.create(['width'], {
                easing: t.transitions.easing.sharp,
                duration: t.transitions.duration.leavingScreen,
              }),
          },
        }}
        open
      >
        {drawerContent(true)}
      </Drawer>
    </Box>
  );
}

export default Sidebar;
