import { useState } from 'react';
import { Grid, Typography, Paper, Stack } from '@mui/material';
import { Person, Settings, Notifications, Dashboard, Mail, Security } from '@mui/icons-material';
import { Tabs } from '@/components/common';
import { Section } from '../shared';

export function TabsShowcase() {
  const [controlledTab, setControlledTab] = useState('tab1');

  const basicTabs = [
    { id: 'tab1', label: 'Tab One', content: <Typography>Content for Tab One</Typography> },
    { id: 'tab2', label: 'Tab Two', content: <Typography>Content for Tab Two</Typography> },
    { id: 'tab3', label: 'Tab Three', content: <Typography>Content for Tab Three</Typography> },
  ];

  const iconTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: <Dashboard fontSize="small" />, content: <Typography>Dashboard content with charts and metrics</Typography> },
    { id: 'profile', label: 'Profile', icon: <Person fontSize="small" />, content: <Typography>User profile settings and information</Typography> },
    { id: 'settings', label: 'Settings', icon: <Settings fontSize="small" />, content: <Typography>Application settings and preferences</Typography> },
  ];

  const badgeTabs = [
    { id: 'inbox', label: 'Inbox', icon: <Mail fontSize="small" />, badge: 12, badgeColor: 'error' as const, content: <Typography>You have 12 unread messages</Typography> },
    { id: 'notifications', label: 'Notifications', icon: <Notifications fontSize="small" />, badge: 3, badgeColor: 'primary' as const, content: <Typography>3 new notifications</Typography> },
    { id: 'security', label: 'Security', icon: <Security fontSize="small" />, content: <Typography>Security settings and alerts</Typography> },
  ];

  const disabledTabs = [
    { id: 'active1', label: 'Active Tab', content: <Typography>This tab is active</Typography> },
    { id: 'disabled', label: 'Disabled Tab', disabled: true, content: <Typography>This content won't show</Typography> },
    { id: 'active2', label: 'Another Active', content: <Typography>Another active tab</Typography> },
  ];

  return (
    <Section title="Tabs Component">
      <Typography variant="body2" sx={{ mb: 3 }} color="text.secondary">
        A flexible tabs component supporting icons, badges, controlled/uncontrolled modes, and vertical orientation.
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant="subtitle2" gutterBottom>
            Basic Tabs
          </Typography>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Tabs tabs={basicTabs} />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle2" gutterBottom>
            Controlled Tabs
          </Typography>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Active tab: <strong>{controlledTab}</strong>
              </Typography>
            </Stack>
            <Tabs
              tabs={basicTabs}
              value={controlledTab}
              onChange={setControlledTab}
            />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle2" gutterBottom>
            Tabs with Icons
          </Typography>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Tabs tabs={iconTabs} />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle2" gutterBottom>
            Tabs with Badges
          </Typography>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Tabs tabs={badgeTabs} />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle2" gutterBottom>
            Full Width Tabs
          </Typography>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Tabs tabs={basicTabs} variant="fullWidth" />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle2" gutterBottom>
            Centered Tabs
          </Typography>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Tabs tabs={basicTabs} centered />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle2" gutterBottom>
            Vertical Tabs
          </Typography>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Tabs
              tabs={iconTabs}
              orientation="vertical"
              contentSx={{ pl: 3 }}
            />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle2" gutterBottom>
            With Disabled Tab
          </Typography>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Tabs tabs={disabledTabs} />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle2" gutterBottom>
            Secondary Color
          </Typography>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Tabs
              tabs={basicTabs}
              indicatorColor="secondary"
              textColor="secondary"
            />
          </Paper>
        </Grid>
      </Grid>
    </Section>
  );
}

export default TabsShowcase;
