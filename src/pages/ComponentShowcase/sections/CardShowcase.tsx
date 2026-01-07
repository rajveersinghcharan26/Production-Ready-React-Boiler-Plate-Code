import { Grid, Stack, Typography } from '@mui/material';
import { Info } from '@mui/icons-material';
import { Button, Card, FormField } from '@/components/common';
import { Section } from '../shared';

export function CardShowcase() {
  return (
    <Section title="Card Component">
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" gutterBottom>
            Basic Card
          </Typography>
          <Card title="User Profile">
            <Typography variant="body2">
              This is a basic card with a title and content.
              Cards are great for grouping related information.
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" gutterBottom>
            Card with Subtitle
          </Typography>
          <Card title="Statistics" subtitle="Last 30 days">
            <Typography variant="h3" color="primary" sx={{ mb: 1 }}>1,234</Typography>
            <Typography variant="body2" color="text.secondary">
              Total active users
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" gutterBottom>
            Card with Actions
          </Typography>
          <Card
            title="Account Settings"
            subtitle="Manage your account details"
            actions={
              <>
                <Button variant="outlined" size="small">Cancel</Button>
                <Button variant="contained" size="small">Save</Button>
              </>
            }
          >
            <FormField
              label="Email"
              value="user@example.com"
              onChange={() => {}}
            />
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" gutterBottom>
            Collapsible Card
          </Typography>
          <Card
            title="Advanced Options"
            subtitle="Click to expand"
            collapsible
            defaultCollapsed
          >
            <Typography variant="body2">
              This content is hidden by default. Users can expand it to see more details.
              Useful for optional or advanced settings.
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" gutterBottom>
            Card with Icon
          </Typography>
          <Card
            title="Notifications"
            subtitle="3 new notifications"
            icon={<Info color="primary" />}
          >
            <Stack spacing={1}>
              <Typography variant="body2">• New user registered</Typography>
              <Typography variant="body2">• Report generated</Typography>
              <Typography variant="body2">• System update available</Typography>
            </Stack>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" gutterBottom>
            Outlined Card
          </Typography>
          <Card
            title="Quick Stats"
            variant="outlined"
          >
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography variant="h5" color="primary">42</Typography>
                <Typography variant="caption" color="text.secondary">Orders</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="h5" color="success.main">$1.2k</Typography>
                <Typography variant="caption" color="text.secondary">Revenue</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="h5" color="warning.main">8</Typography>
                <Typography variant="caption" color="text.secondary">Pending</Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Section>
  );
}

export default CardShowcase;
