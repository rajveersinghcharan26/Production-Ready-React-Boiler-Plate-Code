/**
 * Component Showcase Page
 * A dedicated page to preview and test all reusable UI components.
 * This serves as a living style guide for the application.
 */

import { useNavigate } from 'react-router-dom';
import { Box, Typography, Alert } from '@mui/material';
import { Add } from '@mui/icons-material';

import { Button } from '@/components/common';
import { ROUTES } from '@/config/constants';

// Import all showcase sections
import {
  ButtonShowcase,
  FormFieldShowcase,
  FormLabelShowcase,
  FormSelectShowcase,
  FormMultiSelectShowcase,
  FormSwitchShowcase,
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
  const navigate = useNavigate();

  const handleNavigateToAddForm = () => {
    navigate(ROUTES.ADD_FORM);
  };

  return (
    <Box>
      {/* Page Header */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Component Showcase
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Preview and test all reusable UI components in one place.
            This page serves as a living style guide for the application.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleNavigateToAddForm}
          sx={{ flexShrink: 0, ml: 2 }}
        >
          Add New Form
        </Button>
      </Box>

      <Alert severity="info" sx={{ mb: 3 }}>
        This page demonstrates all the reusable components available in the application.
        Use these components throughout your app for consistency.
        Click "Add New Form" to see a comprehensive form validation demo.
      </Alert>

      {/* Component Sections */}
      <ButtonShowcase />
      <FormFieldShowcase />
      <FormLabelShowcase />
      <FormSelectShowcase />
      <FormMultiSelectShowcase />
      <FormSwitchShowcase />
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

