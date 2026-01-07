/**
 * Component Showcase Page
 * A dedicated page to preview and test all reusable UI components.
 * This serves as a living style guide for the application.
 */

import { Box, Typography, Alert } from '@mui/material';

// Import all showcase sections
import {
  ButtonShowcase,
  FormFieldShowcase,
  FormLabelShowcase,
  FormSelectShowcase,
  FormMultiSelectShowcase,
  InputShowcase,
  SelectShowcase,
  LoaderShowcase,
  EmptyStateShowcase,
  ConfirmDialogShowcase,
  StatusIndicatorsShowcase,
  FormDateTimePickerShowcase,
  FormFileUploadShowcase,
  StatusBadgeShowcase,
  PageHeaderShowcase,
  CardShowcase,
  SearchInputShowcase,
  TabsShowcase,
  ComingSoonShowcase,
} from './sections';

/**
 * Component Showcase Page
 */
export function ComponentShowcasePage() {
  return (
    <Box>
      {/* Page Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Component Showcase
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Preview and test all reusable UI components in one place.
          This page serves as a living style guide for the application.
        </Typography>
      </Box>

      <Alert severity="info" sx={{ mb: 3 }}>
        This page demonstrates all the reusable components available in the application.
        Use these components throughout your app for consistency.
      </Alert>

      {/* Component Sections */}
      <ButtonShowcase />
      <FormFieldShowcase />
      <FormLabelShowcase />
      <FormSelectShowcase />
      <FormMultiSelectShowcase />
      <InputShowcase />
      <SelectShowcase />
      <LoaderShowcase />
      <EmptyStateShowcase />
      <ConfirmDialogShowcase />
      <StatusIndicatorsShowcase />
      <FormDateTimePickerShowcase />
      <FormFileUploadShowcase />
      <StatusBadgeShowcase />
      <PageHeaderShowcase />
      <CardShowcase />
      <SearchInputShowcase />
      <TabsShowcase />
      <ComingSoonShowcase />
    </Box>
  );
}

export default ComponentShowcasePage;

