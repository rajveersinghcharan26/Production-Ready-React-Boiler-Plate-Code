import { Grid, Stack, Paper, Typography } from '@mui/material';
import { CheckCircle, Warning, Error as ErrorIcon, Info } from '@mui/icons-material';
import { StatusBadge } from '@/components/common';
import { Section } from '../shared';
import { SubSection } from './SubSection';

export function StatusBadgeShowcase() {
  return (
    <Section title="StatusBadge Component">
      <SubSection title="Status Variants">
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
          <StatusBadge label="Success" variant="success" />
          <StatusBadge label="Error" variant="error" />
          <StatusBadge label="Warning" variant="warning" />
          <StatusBadge label="Info" variant="info" />
          <StatusBadge label="Pending" variant="pending" />
          <StatusBadge label="Inactive" variant="inactive" />
          <StatusBadge label="Default" variant="default" />
        </Stack>
      </SubSection>

      <SubSection title="Auto-detected Status (variant auto-detected from label)">
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
          <StatusBadge label="Active" />
          <StatusBadge label="Failed" />
          <StatusBadge label="Processing" />
          <StatusBadge label="Approved" />
          <StatusBadge label="Blocked" />
          <StatusBadge label="Draft" />
          <StatusBadge label="Archived" />
        </Stack>
      </SubSection>

      <SubSection title="Outlined Variant">
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
          <StatusBadge label="Active" variant="success" outlined />
          <StatusBadge label="Error" variant="error" outlined />
          <StatusBadge label="Pending" variant="pending" outlined />
          <StatusBadge label="Info" variant="info" outlined />
        </Stack>
      </SubSection>

      <SubSection title="Sizes">
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap alignItems="center">
          <StatusBadge label="Small" variant="success" size="small" />
          <StatusBadge label="Medium" variant="success" size="medium" />
        </Stack>
      </SubSection>

      <SubSection title="With Pulse Animation (for active/live states)">
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
          <StatusBadge label="Live" variant="success" pulse />
          <StatusBadge label="Processing" variant="pending" pulse />
          <StatusBadge label="Recording" variant="error" pulse />
        </Stack>
      </SubSection>

      <SubSection title="With Icons">
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
          <StatusBadge label="Verified" variant="success" icon={<CheckCircle />} />
          <StatusBadge label="Warning" variant="warning" icon={<Warning />} />
          <StatusBadge label="Error" variant="error" icon={<ErrorIcon />} />
          <StatusBadge label="Info" variant="info" icon={<Info />} />
        </Stack>
      </SubSection>

      <SubSection title="Use Cases" noMargin>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                User Status
              </Typography>
              <Stack direction="row" spacing={1}>
                <StatusBadge label="Online" variant="success" size="small" />
                <StatusBadge label="Away" variant="warning" size="small" />
                <StatusBadge label="Offline" variant="inactive" size="small" />
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Order Status
              </Typography>
              <Stack direction="row" spacing={1}>
                <StatusBadge label="Completed" size="small" />
                <StatusBadge label="In Progress" size="small" />
                <StatusBadge label="Cancelled" size="small" />
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </SubSection>
    </Section>
  );
}

export default StatusBadgeShowcase;
