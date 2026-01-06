/**
 * Main application layout with sidebar, header, and content area.
 */

import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Toolbar } from '@mui/material';

import { Header } from '../Header';
import { Sidebar } from '../Sidebar';
import { Footer } from '../Footer';
import { useAppSelector } from '@/store/hooks';
import { selectIsSidebarOpen } from '@/store/slices/uiSlice';

/** Expanded sidebar width */
const DRAWER_WIDTH_EXPANDED = 260;
/** Collapsed sidebar width (icons only) */
const DRAWER_WIDTH_COLLAPSED = 72;

/**
 * Main layout wrapper for authenticated pages.
 * Provides consistent structure with sidebar navigation.
 */
export function MainLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isSidebarExpanded = useAppSelector(selectIsSidebarOpen);

  const currentDrawerWidth = isSidebarExpanded ? DRAWER_WIDTH_EXPANDED : DRAWER_WIDTH_COLLAPSED;

  const handleMobileDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Header
        onMobileMenuClick={handleMobileDrawerToggle}
        drawerWidth={currentDrawerWidth}
      />
      <Sidebar
        expandedWidth={DRAWER_WIDTH_EXPANDED}
        collapsedWidth={DRAWER_WIDTH_COLLAPSED}
        mobileOpen={mobileOpen}
        onMobileClose={handleMobileDrawerToggle}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          width: { sm: `calc(100% - ${currentDrawerWidth}px)` },
          ml: { sm: `${currentDrawerWidth}px` },
          minHeight: '100vh',
          transition: (theme) =>
            theme.transitions.create(['width', 'margin-left'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
        }}
      >
        <Toolbar /> {/* Spacer for fixed header */}
        <Box
          sx={{
            flexGrow: 1,
            p: 3,
            backgroundColor: 'background.default',
          }}
        >
          <Outlet />
        </Box>
        <Footer />
      </Box>
    </Box>
  );
}

export default MainLayout;
