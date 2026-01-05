/**
 * Application sidebar navigation component.
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
} from '@mui/material';
import {
  Dashboard,
  People,
  Assessment,
  Settings,
  Notifications,
  Help,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '@/config/constants';
import { useAppSelector } from '@/store/hooks';
import { EUserRole } from '@/types';

interface ISidebarProps {
  /** Width of the drawer */
  drawerWidth: number;
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
 */
export function Sidebar({ drawerWidth, mobileOpen, onMobileClose }: ISidebarProps) {
  const { t } = useTranslation();
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { user } = useAppSelector((state) => state.auth);

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

  const drawerContent = (
    <Box sx={{ overflow: 'auto' }}>
      <Toolbar>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <Box
            component="img"
            src="/vite.svg"
            alt="Logo"
            sx={{ height: 32, mr: 1 }}
          />
        </Box>
      </Toolbar>
      <Divider />
      <List sx={{ px: 2, py: 1 }}>
        {filteredNavItems.map((item) => (
          <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              selected={isActive(item.path)}
              onClick={() => handleNavigation(item.path)}
              sx={{
                borderRadius: 2,
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
                  minWidth: 40,
                  color: isActive(item.path) ? 'inherit' : 'text.secondary',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      {/* Mobile Drawer */}
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
            width: drawerWidth,
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            borderRight: '1px solid',
            borderColor: 'divider',
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
}

export default Sidebar;
