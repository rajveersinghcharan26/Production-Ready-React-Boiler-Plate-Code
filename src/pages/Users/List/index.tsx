/**
 * Users list page component.
 */

import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Tooltip,
} from '@mui/material';
import { Edit, Delete, Visibility, Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Button, ConfirmDialog, EmptyState, Loader } from '@/components/common';
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

const getStatusColor = (status: EUserStatus) => {
  switch (status) {
    case EUserStatus.ACTIVE:
      return 'success';
    case EUserStatus.INACTIVE:
      return 'default';
    case EUserStatus.SUSPENDED:
      return 'error';
    case EUserStatus.PENDING:
      return 'warning';
    default:
      return 'default';
  }
};

export function UsersListPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { data, isLoading, isError } = useGetUsersQuery();
  const { mutateAsync: deleteUser, isPending: isDeleting } = useDeleteUserMutation();

  const [mockUsers, setMockUsers] = useState<IUser[]>(MOCK_USERS);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  const handleView = (id: string) => {
    navigate(`${ROUTES.USERS_LIST}/${id}`);
  };

  const handleEdit = (id: string) => {
    navigate(`${ROUTES.USERS_EDIT}/${id}`);
  };

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
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{t('users.name')}</TableCell>
                <TableCell>{t('users.email')}</TableCell>
                <TableCell>{t('users.role')}</TableCell>
                <TableCell>{t('users.status')}</TableCell>
                <TableCell align="right">{t('common.actions')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} hover>
                  <TableCell>
                    {user.firstName} {user.lastName}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Chip label={user.role} size="small" variant="outlined" />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={user.status}
                      size="small"
                      color={getStatusColor(user.status)}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title={t('common.view')}>
                      <IconButton onClick={() => handleView(String(user.id))} size="small">
                        <Visibility />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={t('common.edit')}>
                      <IconButton onClick={() => handleEdit(String(user.id))} size="small">
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={t('common.delete')}>
                      <IconButton onClick={() => handleDeleteClick(user)} size="small" color="error">
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
