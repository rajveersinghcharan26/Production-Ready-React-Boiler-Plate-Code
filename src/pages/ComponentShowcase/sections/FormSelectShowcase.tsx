import { useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { FormSelect } from '@/components/common';
import { Section } from '../shared';

const selectOptions = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
  { label: 'Disabled Option', value: '4', disabled: true },
];

export function FormSelectShowcase() {
  const [formSelectValue, setFormSelectValue] = useState('');

  return (
    <Section title="FormSelect Component">
      <Typography variant="body2" sx={{ mb: 2 }}>
        Combines a caption label with a Select control in vertical order.
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FormSelect
            caption="Country"
            options={selectOptions}
            value={formSelectValue}
            onChange={(e) => setFormSelectValue(e.target.value as string)}
            placeholder="Select a country"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormSelect
            caption="Status"
            options={selectOptions}
            placeholder="Select status"
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormSelect
            caption="Category"
            options={selectOptions}
            error
            helperText="Please select a category"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormSelect
            caption="Priority"
            options={selectOptions}
            value="1"
            disabled
            fullWidth
          />
        </Grid>
      </Grid>
    </Section>
  );
}

export default FormSelectShowcase;
