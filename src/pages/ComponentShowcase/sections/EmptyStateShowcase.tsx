import { Grid, Paper } from '@mui/material';
import { Search } from '@mui/icons-material';
import { Button, EmptyState } from '@/components/common';
import { Section } from '../shared';

export function EmptyStateShowcase() {
  return (
    <Section title="Empty State Component">
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <EmptyState
              title="No Data Found"
              description="There are no items to display at the moment."
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <EmptyState
              title="No Results"
              description="Try adjusting your search or filters."
              action={
                <Button variant="contained" startIcon={<Search />}>
                  Clear Filters
                </Button>
              }
            />
          </Paper>
        </Grid>
      </Grid>
    </Section>
  );
}

export default EmptyStateShowcase;
