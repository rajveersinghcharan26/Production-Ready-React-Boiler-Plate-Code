/**
 * Users list page component.
 * Now using the DataTable component for display.
 */

import { useState } from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { Edit, Delete, Visibility, Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import {
  Button,
  ConfirmDialog,
  EmptyState,
  Loader,
  StatusBadge,
  DataTable,
  IDataTableColumn,
  IDataTableAction,
} from '@/components/common';
import { useGetUsersQuery, useDeleteUserMutation } from '@/api/endpoints/userApi';
import { useAppDispatch } from '@/store/hooks';
import { showSnackbar } from '@/store/slices/uiSlice';
import { ROUTES } from '@/config/constants';
import { env } from '@/config/env';
import { type IUser, EUserStatus, EUserRole } from '@/types';

// Mock users for demo mode
const MOCK_USERS: IUser[] = [
  {
    id: '1',
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    role: EUserRole.ADMIN,
    status: EUserStatus.ACTIVE,
    avatar: undefined,
    isEmailVerified: true,
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-06-20T14:45:00Z',
  },
  {
    id: '2',
    email: 'jane.smith@example.com',
    firstName: 'Jane',
    lastName: 'Smith',
    role: EUserRole.MANAGER,
    status: EUserStatus.ACTIVE,
    avatar: undefined,
    isEmailVerified: true,
    createdAt: '2024-02-10T09:00:00Z',
    updatedAt: '2024-07-15T11:30:00Z',
  },
  {
    id: '3',
    email: 'bob.johnson@example.com',
    firstName: 'Bob',
    lastName: 'Johnson',
    role: EUserRole.USER,
    status: EUserStatus.PENDING,
    avatar: undefined,
    isEmailVerified: false,
    createdAt: '2024-03-05T14:20:00Z',
    updatedAt: '2024-03-05T14:20:00Z',
  },
  {
    id: '4',
    email: 'alice.williams@example.com',
    firstName: 'Alice',
    lastName: 'Williams',
    role: EUserRole.USER,
    status: EUserStatus.INACTIVE,
    avatar: undefined,
    isEmailVerified: true,
    createdAt: '2024-01-20T08:15:00Z',
    updatedAt: '2024-05-10T16:00:00Z',
  },
  {
    id: '5',
    email: 'charlie.brown@example.com',
    firstName: 'Charlie',
    lastName: 'Brown',
    role: EUserRole.USER,
    status: EUserStatus.SUSPENDED,
    avatar: undefined,
    isEmailVerified: true,
    createdAt: '2024-04-01T12:00:00Z',
    updatedAt: '2024-08-01T09:30:00Z',
  },
];



export function UsersListPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { data, isLoading, isError } = useGetUsersQuery();
  const { mutateAsync: deleteUser, isPending: isDeleting } = useDeleteUserMutation();

  const [mockUsers, setMockUsers] = useState<IUser[]>(MOCK_USERS);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  // Define table columns
  const columns: IDataTableColumn<IUser>[] = [
    {
      key: 'firstName',
      label: t('users.name'),
      sortable: true,
      minWidth: 150,
      render: (row) => `${row.firstName} ${row.lastName}`,
    },
    {
      key: 'email',
      label: t('users.email'),
      sortable: true,
      minWidth: 200,
    },
    {
      key: 'role',
      label: t('users.role'),
      sortable: true,
      minWidth: 100,
      render: (row) => <Chip label={row.role} size="small" variant="outlined" />,
    },
    {
      key: 'status',
      label: t('users.status'),
      sortable: true,
      minWidth: 100,
      render: (row) => <StatusBadge label={row.status} />,
    },
    {
      key: 'createdAt',
      label: 'Created',
      sortable: true,
      minWidth: 120,
      render: (row) => new Date(row.createdAt).toLocaleDateString(),
    },
  ];

  // Define table actions
  const actions: IDataTableAction<IUser>[] = [
    {
      icon: <Visibility fontSize="small" />,
      tooltip: t('common.view'),
      onClick: (row) => navigate(`${ROUTES.USERS_LIST}/${row.id}`),
    },
    {
      icon: <Edit fontSize="small" />,
      tooltip: t('common.edit'),
      onClick: (row) => navigate(`${ROUTES.USERS_EDIT}/${row.id}`),
      color: 'primary',
    },
    {
      icon: <Delete fontSize="small" />,
      tooltip: t('common.delete'),
      onClick: (row) => handleDeleteClick(row),
      color: 'error',
    },
  ];

  const handleDeleteClick = (user: IUser) => {
    setSelectedUser(user);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedUser) {
      if (env.enableMockApi) {
        // Mock delete
        setMockUsers((prev) => prev.filter((u) => u.id !== selectedUser.id));
        dispatch(showSnackbar({ message: t('users.deleteSuccess'), severity: 'success' }));
      } else {
        try {
          await deleteUser(String(selectedUser.id));
          dispatch(showSnackbar({ message: t('users.deleteSuccess'), severity: 'success' }));
        } catch {
          // Error handled by API interceptor
        }
      }
    }
    setDeleteDialogOpen(false);
    setSelectedUser(null);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setSelectedUser(null);
  };

  if (isLoading && !env.enableMockApi) {
    return <Loader />;
  }

  if (isError && !env.enableMockApi) {
    return (
      <EmptyState
        title={t('errors.somethingWrong')}
        description={t('errors.tryAgain')}
      />
    );
  }

  // Use mock data in demo mode, otherwise use API data
  const users = env.enableMockApi ? mockUsers : (data?.data ?? []);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          {t('users.list')}
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => navigate(ROUTES.USERS_CREATE)}
        >
          {t('users.create')}
        </Button>
      </Box>

      {users.length === 0 ? (
        <EmptyState
          title={t('common.noResults')}
          action={
            <Button variant="contained" onClick={() => navigate(ROUTES.USERS_CREATE)}>
              {t('users.create')}
            </Button>
          }
        />
      ) : (
        <DataTable
          data={users}
          columns={columns}
          actions={actions}
          rowKey="id"
          pagination
          pageSize={10}
          searchable
          searchPlaceholder="Search users..."
          exportable
          exportFilename="users-export"
          sortable
          defaultSort={{ key: 'firstName', direction: 'asc' }}
          hoverable
          onRowClick={(row) => navigate(`${ROUTES.USERS_LIST}/${row.id}`)}
        />
      )}

      <ConfirmDialog
        open={deleteDialogOpen}
        title={t('common.delete')}
        message={t('users.deleteConfirm')}
        confirmColor="error"
        loading={isDeleting}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </Box>
  );
}

export default UsersListPage;
