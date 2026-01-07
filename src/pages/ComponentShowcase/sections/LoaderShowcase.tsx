import { useState } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { Button, Loader } from '@/components/common';
import { Section } from '../shared';

export function LoaderShowcase() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadingDemo = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <Section title="Loader Component">
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2" gutterBottom>
            Default Loader
          </Typography>
          <Box sx={{ height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Loader />
          </Box>
        </Grid>

        <Grid item xs={12} md={8}>
          <Typography variant="subtitle2" gutterBottom>
            Interactive Demo
          </Typography>
          <Button
            variant="contained"
            onClick={handleLoadingDemo}
            loading={isLoading}
            loadingText="Loading for 2 seconds..."
          >
            Click to Show Loading
          </Button>
        </Grid>
      </Grid>
    </Section>
  );
}

export default LoaderShowcase;
