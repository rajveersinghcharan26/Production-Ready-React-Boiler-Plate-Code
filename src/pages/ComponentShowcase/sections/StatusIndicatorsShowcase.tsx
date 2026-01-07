import { Stack, Alert } from '@mui/material';
import { CheckCircle, Warning, Error as ErrorIcon, Info } from '@mui/icons-material';
import { Section } from '../shared';

export function StatusIndicatorsShowcase() {
  return (
    <Section title="Status Indicators (Using MUI Alert)">
      <Stack spacing={2}>
        <Alert severity="success" icon={<CheckCircle />}>
          Success - Operation completed successfully!
        </Alert>
        <Alert severity="info" icon={<Info />}>
          Info - Here's some helpful information.
        </Alert>
        <Alert severity="warning" icon={<Warning />}>
          Warning - Please review before proceeding.
        </Alert>
        <Alert severity="error" icon={<ErrorIcon />}>
          Error - Something went wrong. Please try again.
        </Alert>
      </Stack>
    </Section>
  );
}

export default StatusIndicatorsShowcase;
