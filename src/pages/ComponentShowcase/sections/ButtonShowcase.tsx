import { Stack } from '@mui/material';
import { Add, Edit, Delete, Save, Cancel } from '@mui/icons-material';
import { Button } from '@/components/common';
import { Section } from '../shared';
import { SubSection } from './SubSection';

export function ButtonShowcase() {
  return (
    <Section title="Button Component">
      <SubSection title="Variants">
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
          <Button variant="contained">Contained</Button>
          <Button variant="outlined">Outlined</Button>
          <Button variant="text">Text</Button>
        </Stack>
      </SubSection>

      <SubSection title="Colors">
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
          <Button variant="contained" color="primary">Primary</Button>
          <Button variant="contained" color="secondary">Secondary</Button>
          <Button variant="contained" color="success">Success</Button>
          <Button variant="contained" color="error">Error</Button>
          <Button variant="contained" color="warning">Warning</Button>
          <Button variant="contained" color="info">Info</Button>
        </Stack>
      </SubSection>

      <SubSection title="Sizes">
        <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap" useFlexGap>
          <Button variant="contained" size="small">Small</Button>
          <Button variant="contained" size="medium">Medium</Button>
          <Button variant="contained" size="large">Large</Button>
        </Stack>
      </SubSection>

      <SubSection title="With Icons">
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
          <Button variant="contained" startIcon={<Add />}>Add New</Button>
          <Button variant="outlined" startIcon={<Edit />}>Edit</Button>
          <Button variant="contained" color="error" startIcon={<Delete />}>Delete</Button>
          <Button variant="contained" color="success" startIcon={<Save />}>Save</Button>
          <Button variant="outlined" startIcon={<Cancel />}>Cancel</Button>
        </Stack>
      </SubSection>

      <SubSection title="Loading State">
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
          <Button variant="contained" loading>Loading</Button>
          <Button variant="contained" loading loadingText="Saving...">Save</Button>
          <Button variant="outlined" loading loadingText="Processing...">Process</Button>
        </Stack>
      </SubSection>

      <SubSection title="Disabled State" noMargin>
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
          <Button variant="contained" disabled>Disabled</Button>
          <Button variant="outlined" disabled>Disabled</Button>
          <Button variant="text" disabled>Disabled</Button>
        </Stack>
      </SubSection>
    </Section>
  );
}

export default ButtonShowcase;
