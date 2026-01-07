import { useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { FormField } from '@/components/common';
import { Section } from '../shared';

export function FormFieldShowcase() {
  const [formFieldValue, setFormFieldValue] = useState('');

  return (
    <Section title="FormField Component">
      <Typography variant="body2" sx={{ mb: 2 }} color="text.secondary">
        A combined label + text field component for consistent form layouts.
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FormField
            label="Username"
            placeholder="Enter your username"
            value={formFieldValue}
            onChange={(e) => setFormFieldValue(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <FormField
            label="Email Address"
            placeholder="example@email.com"
            type="email"
            required
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <FormField
            label="Password"
            placeholder="Enter password"
            type="password"
            helperText="Must be at least 8 characters"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <FormField
            label="Phone Number"
            placeholder="+1 (555) 000-0000"
            disabled
            value="+1 (555) 123-4567"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <FormField
            label="Invalid Field"
            placeholder="Enter value"
            error
            helperText="This field has an error"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <FormField
            label="Description"
            placeholder="Enter a detailed description..."
            multiline
            rows={3}
          />
        </Grid>
      </Grid>
    </Section>
  );
}

export default FormFieldShowcase;
