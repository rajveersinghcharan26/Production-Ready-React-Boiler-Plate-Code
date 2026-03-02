/**
 * DataTable Component Showcase
 */

import { useState } from 'react';
import { Grid, Typography, Paper, Stack, Chip, Avatar, Box } from '@mui/material';
import { Edit, Delete, Visibility, PersonAdd } from '@mui/icons-material';
import { DataTable, IDataTableColumn, IDataTableAction } from '@/components/common/DataTable';
import { StatusBadge } from '@/components/common';
import { Button } from '@/components/common';
import { Section } from '../shared';

// Sample data types
interface IUser {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  department: string;
  joinDate: string;
  salary: number;
}

interface IProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
}

// Sample users data
const sampleUsers: IUser[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', department: 'Engineering', joinDate: '2023-01-15', salary: 85000 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Manager', status: 'active', department: 'Marketing', joinDate: '2023-03-22', salary: 75000 },
  { id: 3, name: 'Bob Wilson', email: 'bob@example.com', role: 'Developer', status: 'pending', department: 'Engineering', joinDate: '2023-06-10', salary: 65000 },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Designer', status: 'active', department: 'Design', joinDate: '2023-02-28', salary: 70000 },
  { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', role: 'Developer', status: 'inactive', department: 'Engineering', joinDate: '2022-11-05', salary: 72000 },
  { id: 6, name: 'Diana Evans', email: 'diana@example.com', role: 'HR Manager', status: 'active', department: 'HR', joinDate: '2023-04-18', salary: 68000 },
  { id: 7, name: 'Edward Harris', email: 'edward@example.com', role: 'Developer', status: 'active', department: 'Engineering', joinDate: '2023-07-01', salary: 67000 },
  { id: 8, name: 'Fiona Garcia', email: 'fiona@example.com', role: 'Analyst', status: 'pending', department: 'Analytics', joinDate: '2023-08-15', salary: 62000 },
  { id: 9, name: 'George Miller', email: 'george@example.com', role: 'Developer', status: 'active', department: 'Engineering', joinDate: '2023-05-20', salary: 71000 },
  { id: 10, name: 'Helen Johnson', email: 'helen@example.com', role: 'Manager', status: 'active', department: 'Operations', joinDate: '2022-09-12', salary: 78000 },
  { id: 11, name: 'Ivan Lee', email: 'ivan@example.com', role: 'Developer', status: 'active', department: 'Engineering', joinDate: '2023-09-01', salary: 64000 },
  { id: 12, name: 'Julia Kim', email: 'julia@example.com', role: 'Designer', status: 'pending', department: 'Design', joinDate: '2023-10-05', salary: 66000 },
];

// Sample products data
const sampleProducts: IProduct[] = [
  { id: 1, name: 'Laptop Pro 15"', category: 'Electronics', price: 1299.99, stock: 45, status: 'in_stock' },
  { id: 2, name: 'Wireless Mouse', category: 'Accessories', price: 49.99, stock: 5, status: 'low_stock' },
  { id: 3, name: 'Mechanical Keyboard', category: 'Accessories', price: 149.99, stock: 0, status: 'out_of_stock' },
  { id: 4, name: 'USB-C Hub', category: 'Accessories', price: 79.99, stock: 120, status: 'in_stock' },
  { id: 5, name: 'Monitor 27"', category: 'Electronics', price: 399.99, stock: 8, status: 'low_stock' },
];

export function DataTableShowcase() {
  const [selectedUsers, setSelectedUsers] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // User columns configuration
  const userColumns: IDataTableColumn<IUser>[] = [
    {
      key: 'name',
      label: 'Name',
      sortable: true,
      minWidth: 150,
      render: (row) => (
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
            {row.name.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="body2" fontWeight={500}>
              {row.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {row.email}
            </Typography>
          </Box>
        </Stack>
      ),
    },
    {
      key: 'role',
      label: 'Role',
      sortable: true,
      minWidth: 100,
    },
    {
      key: 'department',
      label: 'Department',
      sortable: true,
      minWidth: 120,
      render: (row) => (
        <Chip label={row.department} size="small" variant="outlined" />
      ),
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      minWidth: 100,
      render: (row) => (
        <StatusBadge
          label={row.status}
          variant={
            row.status === 'active' ? 'success' :
            row.status === 'pending' ? 'warning' : 'error'
          }
        />
      ),
    },
    {
      key: 'salary',
      label: 'Salary',
      sortable: true,
      align: 'right',
      minWidth: 100,
      render: (row) => `$${row.salary.toLocaleString()}`,
    },
    {
      key: 'joinDate',
      label: 'Join Date',
      sortable: true,
      minWidth: 110,
      render: (row) => new Date(row.joinDate).toLocaleDateString(),
    },
  ];

  // User actions
  const userActions: IDataTableAction<IUser>[] = [
    {
      icon: <Visibility fontSize="small" />,
      tooltip: 'View',
      onClick: (row) => alert(`View user: ${row.name}`),
    },
    {
      icon: <Edit fontSize="small" />,
      tooltip: 'Edit',
      onClick: (row) => alert(`Edit user: ${row.name}`),
      color: 'primary',
    },
    {
      icon: <Delete fontSize="small" />,
      tooltip: 'Delete',
      onClick: (row) => alert(`Delete user: ${row.name}`),
      color: 'error',
      disabled: (row) => row.status === 'active',
    },
  ];

  // Product columns
  const productColumns: IDataTableColumn<IProduct>[] = [
    { key: 'name', label: 'Product Name', sortable: true, minWidth: 180 },
    { key: 'category', label: 'Category', sortable: true },
    {
      key: 'price',
      label: 'Price',
      sortable: true,
      align: 'right',
      render: (row) => `$${row.price.toFixed(2)}`,
    },
    {
      key: 'stock',
      label: 'Stock',
      sortable: true,
      align: 'right',
      render: (row) => (
        <Typography
          variant="body2"
          color={row.stock === 0 ? 'error.main' : row.stock < 10 ? 'warning.main' : 'text.primary'}
        >
          {row.stock}
        </Typography>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (row) => (
        <StatusBadge
          label={row.status.replace('_', ' ')}
          variant={
            row.status === 'in_stock' ? 'success' :
            row.status === 'low_stock' ? 'warning' : 'error'
          }
        />
      ),
    },
  ];

  const handleLoadingDemo = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <Section title="DataTable Component">
      <Typography variant="body2" sx={{ mb: 3 }} color="text.secondary">
        A powerful, feature-rich data table component with sorting, pagination, selection,
        search, export, and custom rendering capabilities.
      </Typography>

      {/* Full Featured Example */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="subtitle2" gutterBottom>
            Full Featured Table (Users)
          </Typography>
          <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2 }}>
            With selection, search, sorting, pagination, column toggle, export, and actions
          </Typography>
          <DataTable
            title="User Management"
            data={sampleUsers}
            columns={userColumns}
            actions={userActions}
            selectable
            selectedRows={selectedUsers}
            onSelectionChange={setSelectedUsers}
            searchable
            searchPlaceholder="Search users..."
            exportable
            exportFilename="users-export"
            columnToggle
            pagination
            pageSize={5}
            sortable
            defaultSort={{ key: 'name', direction: 'asc' }}
            hoverable
            stickyHeader
            maxHeight={400}
            onRowClick={(row) => console.log('Clicked:', row)}
            toolbarActions={
              <Button
                variant="contained"
                size="small"
                startIcon={<PersonAdd />}
                onClick={() => alert('Add new user')}
              >
                Add User
              </Button>
            }
          />
        </Grid>

        {/* Simple Table */}
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" gutterBottom>
            Simple Table (Products)
          </Typography>
          <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2 }}>
            Basic table with sorting and pagination only
          </Typography>
          <DataTable
            data={sampleProducts}
            columns={productColumns}
            pagination
            pageSize={3}
            sortable
            striped
          />
        </Grid>

        {/* Loading State */}
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" gutterBottom>
            Loading State
          </Typography>
          <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2 }}>
            Skeleton loading while fetching data
          </Typography>
          <Button
            variant="outlined"
            size="small"
            onClick={handleLoadingDemo}
            sx={{ mb: 2 }}
          >
            Simulate Loading
          </Button>
          <DataTable
            data={isLoading ? [] : sampleProducts.slice(0, 3)}
            columns={productColumns}
            loading={isLoading}
            loadingRows={3}
            pagination={false}
          />
        </Grid>

        {/* Empty State */}
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" gutterBottom>
            Empty State
          </Typography>
          <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2 }}>
            Custom message when no data available
          </Typography>
          <DataTable
            data={[]}
            columns={productColumns}
            emptyMessage="No products found. Try adjusting your search."
            pagination={false}
            searchable
          />
        </Grid>

        {/* Compact/Dense Table */}
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" gutterBottom>
            Compact Table
          </Typography>
          <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2 }}>
            Dense padding for more data visibility
          </Typography>
          <DataTable
            data={sampleProducts}
            columns={productColumns}
            dense
            size="small"
            pagination={false}
          />
        </Grid>
      </Grid>

      {/* Usage Code Example */}
      <Paper sx={{ p: 2, mt: 3, bgcolor: 'grey.50' }}>
        <Typography variant="subtitle2" gutterBottom>
          Usage Example
        </Typography>
        <Box
          component="pre"
          sx={{
            p: 2,
            bgcolor: 'grey.900',
            color: 'grey.100',
            borderRadius: 1,
            overflow: 'auto',
            fontSize: '0.75rem',
          }}
        >
{`// Define columns
const columns: IDataTableColumn<User>[] = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { 
    key: 'status', 
    label: 'Status',
    render: (row) => <StatusBadge label={row.status} />
  },
];

// Define actions
const actions: IDataTableAction<User>[] = [
  { icon: <Edit />, tooltip: 'Edit', onClick: handleEdit },
  { icon: <Delete />, tooltip: 'Delete', onClick: handleDelete, color: 'error' },
];

// Render
<DataTable
  data={users}
  columns={columns}
  actions={actions}
  selectable
  searchable
  exportable
  pagination
  pageSize={10}
/>`}
        </Box>
      </Paper>
    </Section>
  );
}

export default DataTableShowcase;
