import { Paper, Typography, Divider } from '@mui/material';

export interface SectionProps {
  title: string;
  children: React.ReactNode;
}

/**
 * Section wrapper for consistent styling in Component Showcase
 */
export function Section({ title, children }: SectionProps) {
  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom color="primary">
        {title}
      </Typography>
      <Divider sx={{ mb: 2 }} />
      {children}
    </Paper>
  );
}

export default Section;
