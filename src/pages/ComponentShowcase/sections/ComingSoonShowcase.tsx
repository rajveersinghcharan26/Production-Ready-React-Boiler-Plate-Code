import { Grid, Paper, Typography, Alert } from '@mui/material';
import { Section } from '../shared';

const comingSoonComponents = [
  'DataTable',
  'Modal',
];

export function ComingSoonShowcase() {
  return (
    <Section title="🆕 New Components (Coming Soon)">
      <Alert severity="info" sx={{ mb: 2 }}>
        The following components will be added here as we create them:
      </Alert>
      <Grid container spacing={2}>
        {comingSoonComponents.map((component) => (
          <Grid item xs={6} sm={4} md={3} key={component}>
            <Paper
              variant="outlined"
              sx={{
                p: 2,
                textAlign: 'center',
                backgroundColor: 'action.hover',
              }}
            >
              <Typography variant="body2" color="text.secondary">
                {component}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Section>
  );
}

export default ComingSoonShowcase;
