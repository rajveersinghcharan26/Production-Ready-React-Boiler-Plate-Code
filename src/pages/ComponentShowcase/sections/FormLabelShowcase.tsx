import { Grid, Typography } from '@mui/material';
import { FormLabel } from '@/components/common';
import { Section } from '../shared';

export function FormLabelShowcase() {
  return (
    <Section title="FormLabel Component">
      <Typography variant="body2" sx={{ mb: 4 }}>
        Displays a caption label with a value label in vertical order. Useful for read-only data display.
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <FormLabel caption="Full Name" value="John Doe" />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormLabel caption="Email Address" value="john.doe@example.com" />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormLabel caption="Phone Number" value="+1 (555) 123-4567" />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormLabel caption="Department" value="Engineering" required />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormLabel caption="Manager" value={null} placeholder="Not assigned" />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormLabel caption="Employee ID" value={12345} />
        </Grid>
      </Grid>
    </Section>
  );
}

export default FormLabelShowcase;
