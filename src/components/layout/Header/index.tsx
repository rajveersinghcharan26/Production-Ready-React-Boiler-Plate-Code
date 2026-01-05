/**
 * Application header component.
 * Contains app title, language switcher, theme toggle, and user menu.
 */

import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Avatar,
  Divider,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Brightness4,
  Brightness7,
  Language,
  Person,
  Logout,
  Settings,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout } from '@/features/auth/authSlice';
import { toggleTheme } from '@/store/slices/uiSlice';
import { changeLanguage } from '@/i18n';
import { ROUTES } from '@/config/constants';

/** Supported language type */
type TSupportedLanguage = 'en' | 'es';

/** Language configuration */
interface ILanguage {
  code: TSupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
}

/** Available languages */
const LANGUAGES: ILanguage[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
];

interface IHeaderProps {
  /** Handler for menu button click (opens sidebar on mobile) */
  onMenuClick: () => void;
  /** Sidebar width for positioning */
  drawerWidth: number;
}

/**
 * Main application header with navigation and user controls.
 */
export function Header({ onMenuClick, drawerWidth }: IHeaderProps) {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state.auth);
  const { themeMode } = useAppSelector((state) => state.ui);

  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);
  const [langMenuAnchor, setLangMenuAnchor] = useState<null | HTMLElement>(null);

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleLangMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setLangMenuAnchor(event.currentTarget);
  };

  const handleLangMenuClose = () => {
    setLangMenuAnchor(null);
  };

  const handleLanguageChange = (language: TSupportedLanguage) => {
    void changeLanguage(language);
    handleLangMenuClose();
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  const handleLogout = () => {
    dispatch(logout());
    handleUserMenuClose();
    navigate(ROUTES.LOGIN);
  };

  const handleProfile = () => {
    handleUserMenuClose();
    if (user?.id) {
      navigate(`${ROUTES.USERS_PROFILE}/${String(user.id)}`);
    }
  };

  const handleSettings = () => {
    handleUserMenuClose();
    navigate(ROUTES.SETTINGS);
  };

  const currentLanguage = LANGUAGES.find((lang) => lang.code === i18n.language);

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        boxShadow: 'none',
        borderBottom: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.paper',
        color: 'text.primary',
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onMenuClick}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          {t('common.appName')}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Language Selector */}
          <Tooltip title={t('settings.language')}>
            <IconButton onClick={handleLangMenuOpen} color="inherit">
              <Language />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={langMenuAnchor}
            open={Boolean(langMenuAnchor)}
            onClose={handleLangMenuClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            {LANGUAGES.map((lang) => (
              <MenuItem
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                selected={lang.code === currentLanguage?.code}
              >
                <ListItemText>
                  {lang.flag} {lang.nativeName}
                </ListItemText>
              </MenuItem>
            ))}
          </Menu>

          {/* Theme Toggle */}
          <Tooltip title={themeMode === 'light' ? t('settings.darkMode') : t('settings.lightMode')}>
            <IconButton onClick={handleThemeToggle} color="inherit">
              {themeMode === 'light' ? <Brightness4 /> : <Brightness7 />}
            </IconButton>
          </Tooltip>

          {/* User Menu */}
          <Tooltip title={t('nav.profile')}>
            <IconButton onClick={handleUserMenuOpen} sx={{ ml: 1 }}>
              <Avatar
                sx={{ width: 32, height: 32 }}
                src={user?.avatar}
                alt={user?.firstName ?? 'User'}
              >
                {user?.firstName?.[0]?.toUpperCase() ?? 'U'}
              </Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={userMenuAnchor}
            open={Boolean(userMenuAnchor)}
            onClose={handleUserMenuClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            PaperProps={{
              sx: { minWidth: 200 },
            }}
          >
            <Box sx={{ px: 2, py: 1 }}>
              <Typography variant="subtitle2">
                {user?.firstName} {user?.lastName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user?.email}
              </Typography>
            </Box>
            <Divider />
            <MenuItem onClick={handleProfile}>
              <ListItemIcon>
                <Person fontSize="small" />
              </ListItemIcon>
              <ListItemText>{t('nav.profile')}</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleSettings}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              <ListItemText>{t('nav.settings')}</ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              <ListItemText>{t('auth.logout')}</ListItemText>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
