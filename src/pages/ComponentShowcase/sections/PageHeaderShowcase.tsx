import { Paper, Stack } from '@mui/material';
import { Add, Edit } from '@mui/icons-material';
import { Button, PageHeader } from '@/components/common';
import { Section } from '../shared';
import { SubSection } from './SubSection';

export function PageHeaderShowcase() {
  return (
    <Section title="PageHeader Component">
      <SubSection title="Basic PageHeader">
        <Paper variant="outlined" sx={{ p: 2 }}>
          <PageHeader
            title="Dashboard"
            subtitle="Welcome back! Here's what's happening today."
          />
        </Paper>
      </SubSection>

      <SubSection title="With Actions">
        <Paper variant="outlined" sx={{ p: 2 }}>
          <PageHeader
            title="Users Management"
            subtitle="Manage user accounts and permissions"
            actions={
              <Stack direction="row" spacing={1}>
                <Button variant="outlined" size="small">Export</Button>
                <Button variant="contained" size="small" startIcon={<Add />}>Add User</Button>
              </Stack>
            }
          />
        </Paper>
      </SubSection>

      <SubSection title="With Breadcrumbs">
        <Paper variant="outlined" sx={{ p: 2 }}>
          <PageHeader
            title="Edit User"
            breadcrumbs={[
              { label: 'Home', path: '/' },
              { label: 'Users', path: '/users' },
              { label: 'Edit User' },
            ]}
          />
        </Paper>
      </SubSection>

      <SubSection title="With Icon and Divider" noMargin>
        <Paper variant="outlined" sx={{ p: 2 }}>
          <PageHeader
            title="Settings"
            subtitle="Configure your application preferences"
            icon={<Edit />}
            divider
          />
        </Paper>
      </SubSection>
    </Section>
  );
}

export default PageHeaderShowcase;
