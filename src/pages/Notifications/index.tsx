/**
 * Notifications page component with self-contained routing.
 */

import { lazy, Suspense } from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemText, IconButton, Divider, Chip } from '@mui/material';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MarkEmailRead, Delete } from '@mui/icons-material';

import { Button, EmptyState, Loader } from '@/components/common';
import { ROUTES } from '@/config/constants';

// Lazy load detail page
const NotificationsDetailPage = lazy(() => import('./Detail'));

interface INotification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'warning' | 'success' | 'error';
}

// Sample notifications
const sampleNotifications: INotification[] = [
  {
    id: '1',
    title: 'New User Registered',
    message: 'A new user has registered and is pending approval.',
    time: '2 hours ago',
    read: false,
    type: 'info',
  },
  {
    id: '2',
    title: 'Report Generated',
    message: 'Your monthly sales report has been generated successfully.',
    time: '5 hours ago',
    read: false,
    type: 'success',
  },
  {
    id: '3',
    title: 'System Maintenance',
    message: 'Scheduled maintenance will occur tonight at 2:00 AM.',
    time: '1 day ago',
    read: true,
    type: 'warning',
  },
];

export function NotificationsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleViewNotification = (id: string) => {
    navigate(`${ROUTES.NOTIFICATIONS}/${id}`);
  };

  if (sampleNotifications.length === 0) {
    return (
      <Box>
        <Typography variant="h4" component="h1" gutterBottom>
          {t('notifications.title')}
        </Typography>
        <EmptyState
          title={t('notifications.noNotifications')}
          description="You're all caught up!"
        />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          {t('notifications.title')}
        </Typography>
        <Button variant="outlined">
          {t('notifications.markAllAsRead')}
        </Button>
      </Box>

      <Paper>
        <List>
          {sampleNotifications.map((notification, index) => (
            <Box key={notification.id}>
              <ListItem
                secondaryAction={
                  <Box>
                    <IconButton size="small" title={t('notifications.markAsRead')}>
                      <MarkEmailRead />
                    </IconButton>
                    <IconButton size="small" color="error" title={t('common.delete')}>
                      <Delete />
                    </IconButton>
                  </Box>
                }
                sx={{
                  cursor: 'pointer',
                  backgroundColor: notification.read ? 'transparent' : 'action.hover',
                  '&:hover': { backgroundColor: 'action.selected' },
                }}
                onClick={() => handleViewNotification(notification.id)}
              >
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="subtitle1" fontWeight={notification.read ? 400 : 600}>
                        {notification.title}
                      </Typography>
                      {!notification.read && (
                        <Chip label="New" size="small" color="primary" />
                      )}
                    </Box>
                  }
                  secondary={
                    <>
                      <Typography component="span" variant="body2" color="text.secondary" display="block">
                        {notification.message}
                      </Typography>
                      <Typography component="span" variant="caption" color="text.secondary">
                        {notification.time}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
              {index < sampleNotifications.length - 1 && <Divider />}
            </Box>
          ))}
        </List>
      </Paper>
    </Box>
  );
}

/**
 * Notifications layout with self-contained routing.
 */
function NotificationsLayout() {
  return (
    <Routes>
      <Route index element={<NotificationsPage />} />
      <Route
        path=":id"
        element={
          <Suspense fallback={<Loader />}>
            <NotificationsDetailPage />
          </Suspense>
        }
      />
    </Routes>
  );
}

export default NotificationsLayout;
