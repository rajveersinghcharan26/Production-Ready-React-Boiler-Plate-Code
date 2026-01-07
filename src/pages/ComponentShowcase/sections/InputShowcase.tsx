import { useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { Input } from '@/components/common';
import { Section } from '../shared';

export function InputShowcase() {
  const [inputValue, setInputValue] = useState('');

  return (
    <Section title="Input Component">
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" gutterBottom>
            Basic Input
          </Typography>
          <Input
            label="Username"
            placeholder="Enter username"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" gutterBottom>
            With Helper Text
          </Typography>
          <Input
            label="Email"
            placeholder="Enter email"
            helperText="We'll never share your email"
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" gutterBottom>
            With Error
          </Typography>
          <Input
            label="Password"
            type="password"
            error
            helperText="Password must be at least 8 characters"
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" gutterBottom>
            Disabled Input
          </Typography>
          <Input
            label="Disabled"
            value="Cannot edit this"
            disabled
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" gutterBottom>
            Required Input
          </Typography>
          <Input
            label="Required Field"
            required
            placeholder="This field is required"
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" gutterBottom>
            Multiline (Textarea)
          </Typography>
          <Input
            label="Description"
            multiline
            rows={3}
            placeholder="Enter description..."
            fullWidth
          />
        </Grid>
      </Grid>
    </Section>
  );
}

export default InputShowcase;
