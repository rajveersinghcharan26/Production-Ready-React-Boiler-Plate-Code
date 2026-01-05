/**
 * Dashboard page component with self-contained routing.
 */

import { lazy, Suspense, useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, CardActionArea, List, ListItem, ListItemAvatar, ListItemText, Avatar, Divider, Button } from '@mui/material';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  People,
  Assessment,
  Settings,
  Notifications,
  Person,
} from '@mui/icons-material';

import { Loader } from '@/components/common';

// Lazy load detail page
const DashboardDetailPage = lazy(() => import('./Detail'));

import { useAppSelector } from '@/store/hooks';
import { ROUTES } from '@/config/constants';
import { GlobalPopup } from '@/components/feedback';

interface IQuickAction {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
}

// Dummy users data for the popup
const DUMMY_USERS = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Manager' },
  { id: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com', role: 'User' },
  { id: 4, name: 'Alice Williams', email: 'alice.williams@example.com', role: 'User' },
  { id: 5, name: 'Charlie Brown', email: 'charlie.brown@example.com', role: 'User' },
];

export function DashboardPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  
  // State for controlling the popup
  const [isUsersPopupOpen, setIsUsersPopupOpen] = useState(false);

  const quickActions: IQuickAction[] = [
    {
      title: t('nav.users'),
      description: 'Manage users and permissions',
      icon: <People sx={{ fontSize: 40 }} />,
      path: ROUTES.USERS,
    },
    {
      title: t('nav.reports'),
      description: 'View and generate reports',
      icon: <Assessment sx={{ fontSize: 40 }} />,
      path: ROUTES.REPORTS,
    },
    {
      title: t('nav.notifications'),
      description: 'View notifications',
      icon: <Notifications sx={{ fontSize: 40 }} />,
      path: ROUTES.NOTIFICATIONS,
    },
    {
      title: t('nav.settings'),
      description: 'Configure application settings',
      icon: <Settings sx={{ fontSize: 40 }} />,
      path: ROUTES.SETTINGS,
    },
  ];

  // Handler for stat card clicks
  const handleStatClick = (label: string) => {
    if (label === 'Total Users') {
      setIsUsersPopupOpen(true);
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        {t('dashboard.welcome', { name: user?.firstName ?? 'User' })}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        {t('dashboard.overview')}
      </Typography>

      {/* Quick Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[
          { label: 'Total Users', value: '1,234', clickable: true },
          { label: 'Active Sessions', value: '56', clickable: false },
          { label: 'Reports Generated', value: '89', clickable: false },
          { label: 'Pending Tasks', value: '12', clickable: false },
        ].map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.label}>
            <Card 
              sx={{ 
                cursor: stat.clickable ? 'pointer' : 'default',
                '&:hover': stat.clickable ? { boxShadow: 4, transform: 'translateY(-2px)' } : {},
                transition: 'all 0.2s ease-in-out',
              }}
              onClick={() => stat.clickable && handleStatClick(stat.label)}
            >
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {stat.label}
                  {stat.clickable && (
                    <Typography component="span" variant="caption" color="primary.main" sx={{ ml: 1 }}>
                      (Click to view)
                    </Typography>
                  )}
                </Typography>
                <Typography variant="h4" sx={{ mt: 1 }}>
                  {stat.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Quick Actions */}
      <Typography variant="h6" gutterBottom>
        {t('dashboard.quickActions')}
      </Typography>
      <Grid container spacing={3}>
        {quickActions.map((action) => (
          <Grid item xs={12} sm={6} md={3} key={action.path}>
            <Card>
              <CardActionArea onClick={() => navigate(action.path)}>
                <CardContent sx={{ textAlign: 'center', py: 4 }}>
                  <Box sx={{ color: 'primary.main', mb: 2 }}>{action.icon}</Box>
                  <Typography variant="h6" gutterBottom>
                    {action.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {action.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* GlobalPopup Example - Users List */}
      <GlobalPopup
        open={isUsersPopupOpen}
        onClose={() => setIsUsersPopupOpen(false)}
        title="Total Users Overview"
        maxWidth={600}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Showing top 5 users from your organization. Click &quot;View All&quot; to see the complete list.
          </Typography>
          
          <List>
            {DUMMY_USERS.map((dummyUser, index) => (
              <Box key={dummyUser.id}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      <Person />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={dummyUser.name}
                    secondary={
                      <>
                        <Typography component="span" variant="body2" color="text.primary">
                          {dummyUser.role}
                        </Typography>
                        {` — ${dummyUser.email}`}
                      </>
                    }
                  />
                </ListItem>
                {index < DUMMY_USERS.length - 1 && <Divider variant="inset" component="li" />}
              </Box>
            ))}
          </List>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
            <Button variant="outlined" onClick={() => setIsUsersPopupOpen(false)}>
              Close
            </Button>
            <Button 
              variant="contained" 
              onClick={() => {
                setIsUsersPopupOpen(false);
                navigate(ROUTES.USERS);
              }}
            >
              View All Users
            </Button>
          </Box>
        </Box>
      </GlobalPopup>
    </Box>
  );
}

/**
 * Dashboard layout with self-contained routing.
 */
function DashboardLayout() {
  return (
    <Routes>
      <Route index element={<DashboardPage />} />
      <Route
        path=":id"
        element={
          <Suspense fallback={<Loader />}>
            <DashboardDetailPage />
          </Suspense>
        }
      />
    </Routes>
  );
}

export default DashboardLayout;
