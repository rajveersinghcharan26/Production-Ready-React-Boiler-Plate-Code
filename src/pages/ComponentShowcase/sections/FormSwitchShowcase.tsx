import React, { useState } from 'react';
import { Grid, Typography, Paper, Stack } from '@mui/material';
import { FormSwitch } from '@/components/common';
import { Section } from '../shared';

export function FormSwitchShowcase() {
  const [basicSwitch, setBasicSwitch] = useState(false);
  const [notificationSwitch, setNotificationSwitch] = useState(true);
  const [termsSwitch, setTermsSwitch] = useState(false);

  return (
    <Section title="FormSwitch Component">
      <Typography variant="body2" sx={{ mb: 3 }} color="text.secondary">
        A switch/toggle component with caption label support, validation states, and various configurations.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" gutterBottom>
            Basic Switch
          </Typography>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <FormSwitch
              label="Enable feature"
              checked={basicSwitch}
              onChange={(_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => setBasicSwitch(checked)}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" gutterBottom>
            With Caption
          </Typography>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <FormSwitch
              caption="Email Notifications"
              label="Receive promotional emails"
              checked={notificationSwitch}
              onChange={(_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => setNotificationSwitch(checked)}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" gutterBottom>
            Required Field
          </Typography>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <FormSwitch
              caption="Terms & Conditions"
              label="I agree to the terms of service"
              checked={termsSwitch}
              onChange={(_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => setTermsSwitch(checked)}
              required
              error={!termsSwitch}
              helperText={!termsSwitch ? "You must agree to continue" : ""}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" gutterBottom>
            Disabled States
          </Typography>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Stack spacing={1}>
              <FormSwitch
                label="Disabled (Off)"
                checked={false}
                disabled
              />
              <FormSwitch
                label="Disabled (On)"
                checked={true}
                disabled
              />
            </Stack>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" gutterBottom>
            Different Colors
          </Typography>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Stack spacing={1}>
              <FormSwitch label="Primary" checked color="primary" />
              <FormSwitch label="Secondary" checked color="secondary" />
              <FormSwitch label="Success" checked color="success" />
              <FormSwitch label="Warning" checked color="warning" />
            </Stack>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" gutterBottom>
            Sizes
          </Typography>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Stack spacing={1}>
              <FormSwitch label="Small size" checked size="small" />
              <FormSwitch label="Medium size" checked size="medium" />
            </Stack>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle2" gutterBottom>
            Settings Panel Example
          </Typography>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <FormSwitch
                  caption="Appearance"
                  label="Dark mode"
                  checked={false}
                  helperText="Switch to dark theme"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormSwitch
                  caption="Privacy"
                  label="Profile visible"
                  checked={true}
                  helperText="Allow others to view your profile"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormSwitch
                  caption="Security"
                  label="Two-factor auth"
                  checked={true}
                  color="success"
                  helperText="Enhanced account security"
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Section>
  );
}

export default FormSwitchShowcase;
