import { useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { FormMultiSelect } from '@/components/common';
import { Section } from '../shared';

const selectOptions = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
  { label: 'Disabled Option', value: '4', disabled: true },
];

const userOptions = [
  { label: 'John Doe', value: 'john' },
  { label: 'Jane Smith', value: 'jane' },
  { label: 'Bob Wilson', value: 'bob' },
  { label: 'Alice Brown', value: 'alice' },
  { label: 'Charlie Davis', value: 'charlie' },
];

export function FormMultiSelectShowcase() {
  const [multiSelectValue, setMultiSelectValue] = useState<(string | number)[]>([]);

  return (
    <Section title="FormMultiSelect Component">
      <Typography variant="body2" sx={{ mb: 2 }}>
        Combines a caption label with a multi-select control. Allows selecting multiple values with chip display.
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FormMultiSelect
            caption="Select Categories"
            options={selectOptions}
            value={multiSelectValue}
            onChange={(e) => setMultiSelectValue(e.target.value as (string | number)[])}
            placeholder="Choose categories"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormMultiSelect
            caption="Assign Users"
            options={userOptions}
            value={['john', 'jane', 'bob']}
            placeholder="Select users"
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormMultiSelect
            caption="Select Skills"
            options={selectOptions}
            value={[]}
            error
            helperText="Please select at least one skill"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormMultiSelect
            caption="Departments (Disabled)"
            options={selectOptions}
            value={['1', '2']}
            disabled
            fullWidth
          />
        </Grid>
      </Grid>
    </Section>
  );
}

export default FormMultiSelectShowcase;
