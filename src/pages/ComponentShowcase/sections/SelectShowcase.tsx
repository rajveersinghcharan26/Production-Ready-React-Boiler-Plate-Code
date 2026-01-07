import { useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { Select } from '@/components/common';
import { Section } from '../shared';

const selectOptions = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
  { label: 'Disabled Option', value: '4', disabled: true },
];

export function SelectShowcase() {
  const [selectValue, setSelectValue] = useState('');

  return (
    <Section title="Select Component">
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" gutterBottom>
            Basic Select
          </Typography>
          <Select
            label="Choose Option"
            options={selectOptions}
            value={selectValue}
            onChange={(e) => setSelectValue(e.target.value as string)}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" gutterBottom>
            With Placeholder
          </Typography>
          <Select
            label="Status"
            options={selectOptions}
            placeholder="Select a status"
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" gutterBottom>
            With Error
          </Typography>
          <Select
            label="Category"
            options={selectOptions}
            error
            helperText="Please select a category"
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" gutterBottom>
            Disabled Select
          </Typography>
          <Select
            label="Disabled"
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

export default SelectShowcase;
