import { Box, Typography } from '@mui/material';

export interface SubSectionProps {
  title: string;
  children: React.ReactNode;
  noMargin?: boolean;
}

/**
 * SubSection for grouping demos within a Section
 */
export function SubSection({ title, children, noMargin = false }: SubSectionProps) {
  return (
    <Box sx={{ mb: noMargin ? 0 : 3 }}>
      <Typography variant="subtitle2" gutterBottom>
        {title}
      </Typography>
      {children}
    </Box>
  );
}

export default SubSection;
