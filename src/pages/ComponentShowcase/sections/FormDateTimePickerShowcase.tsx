import { useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { FormDateTimePicker } from '@/components/common';
import { Section } from '../shared';

export function FormDateTimePickerShowcase() {
  const [dateValue, setDateValue] = useState('');
  const [timeValue, setTimeValue] = useState('');
  const [dateTimeValue, setDateTimeValue] = useState('');

  return (
    <Section title="FormDateTimePicker Component">
      <Typography variant="body2" sx={{ mb: 2 }}>
        A styled date/time picker with caption label. Supports date, time, datetime, month, and week types.
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FormDateTimePicker
            caption="Select Date"
            type="date"
            value={dateValue}
            onChange={(e) => setDateValue(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormDateTimePicker
            caption="Select Time"
            type="time"
            value={timeValue}
            onChange={(e) => setTimeValue(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormDateTimePicker
            caption="Date & Time"
            type="datetime-local"
            value={dateTimeValue}
            onChange={(e) => setDateTimeValue(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormDateTimePicker
            caption="Select Month"
            type="month"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormDateTimePicker
            caption="With Min/Max Date"
            type="date"
            min="2024-01-01"
            max="2024-12-31"
            helperText="Only dates in 2024 are allowed"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormDateTimePicker
            caption="Disabled Date"
            type="date"
            value="2024-06-15"
            disabled
          />
        </Grid>
      </Grid>
    </Section>
  );
}

export default FormDateTimePickerShowcase;
