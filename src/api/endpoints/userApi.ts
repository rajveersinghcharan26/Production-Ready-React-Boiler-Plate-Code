/**
 * User API endpoints using React Query.
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import axiosInstance from '../axiosInstance';
import { queryKeys } from '@/config/queryClient';
import { API_ENDPOINTS } from '@/config/constants';
import { env } from '@/config/env';
import {
  type IUser,
  type IUserProfile,
  type ICreateUserRequest,
  type IUpdateUserRequest,
  type IPaginatedResponse,
  type IQueryParams,
} from '@/types';

/** Options for query hooks */
interface IQueryOptions {
  /** Whether the query should run. Defaults to true. */
  enabled?: boolean;
}

/**
 * User API service functions.
 */
const userService = {
  getUsers: async (params?: IQueryParams): Promise<IPaginatedResponse<IUser>> => {
    const response = await axiosInstance.get<IPaginatedResponse<IUser>>(
      API_ENDPOINTS.USERS.BASE,
      { params }
    );
    return response.data;
  },

  getUserById: async (id: string): Promise<IUser> => {
    const response = await axiosInstance.get<IUser>(API_ENDPOINTS.USERS.BY_ID(id));
    return response.data;
  },

  getUserProfile: async (id: string): Promise<IUserProfile> => {
    const response = await axiosInstance.get<IUserProfile>(
      API_ENDPOINTS.USERS.PROFILE(id)
    );
    return response.data;
  },

  createUser: async (userData: ICreateUserRequest): Promise<IUser> => {
    const response = await axiosInstance.post<IUser>(
      API_ENDPOINTS.USERS.BASE,
      userData
    );
    return response.data;
  },

  updateUser: async (id: string, data: IUpdateUserRequest): Promise<IUser> => {
    const response = await axiosInstance.put<IUser>(
      API_ENDPOINTS.USERS.BY_ID(id),
      data
    );
    return response.data;
  },

  deleteUser: async (id: string): Promise<void> => {
    await axiosInstance.delete(API_ENDPOINTS.USERS.BY_ID(id));
  },
};

/**
 * Hook to fetch paginated users list.
 * Disabled in mock mode by default.
 * @example
 * const { data, isLoading, error } = useGetUsersQuery({ page: 1, limit: 10 });
 */
export function useGetUsersQuery(params?: IQueryParams, options?: IQueryOptions) {
  return useQuery({
    queryKey: queryKeys.users.list(params),
    queryFn: () => userService.getUsers(params),
    enabled: options?.enabled ?? !env.enableMockApi,
  });
}

/**
 * Hook to fetch a single user by ID.
 * Disabled in mock mode by default.
 * @example
 * const { data: user, isLoading } = useGetUserByIdQuery('user-123');
 */
export function useGetUserByIdQuery(id: string, options?: IQueryOptions) {
  return useQuery({
    queryKey: queryKeys.users.detail(id),
    queryFn: () => userService.getUserById(id),
    enabled: (options?.enabled ?? !env.enableMockApi) && !!id,
  });
}

/**
 * Hook to fetch user profile.
 * Disabled in mock mode by default.
 * @example
 * const { data: profile, isLoading } = useGetUserProfileQuery('user-123');
 */
export function useGetUserProfileQuery(id: string, options?: IQueryOptions) {
  return useQuery({
    queryKey: queryKeys.users.profile(id),
    queryFn: () => userService.getUserProfile(id),
    enabled: (options?.enabled ?? !env.enableMockApi) && !!id,
  });
}

/**
 * Hook to create a new user.
 * Automatically invalidates the users list cache on success.
 * @example
 * const { mutate: createUser, isPending } = useCreateUserMutation();
 * createUser({ email, firstName, lastName });
 */
export function useCreateUserMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userService.createUser,
    onSuccess: () => {
      // Invalidate users list to refetch
      queryClient.invalidateQueries({ queryKey: queryKeys.users.lists() });
    },
  });
}

/**
 * Hook to update an existing user.
 * Automatically invalidates both the user detail and list caches on success.
 * @example
 * const { mutate: updateUser, isPending } = useUpdateUserMutation();
 * updateUser({ id: 'user-123', data: { firstName: 'New Name' } });
 */
export function useUpdateUserMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: IUpdateUserRequest }) =>
      userService.updateUser(id, data),
    onSuccess: (_data, variables) => {
      // Invalidate both the specific user and the list
      queryClient.invalidateQueries({
        queryKey: queryKeys.users.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.users.lists() });
    },
  });
}

/**
 * Hook to delete a user.
 * Automatically invalidates both the user detail and list caches on success.
 * @example
 * const { mutate: deleteUser, isPending } = useDeleteUserMutation();
 * deleteUser('user-123');
 */
export function useDeleteUserMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userService.deleteUser,
    onSuccess: (_data, id) => {
      // Remove from cache and invalidate list
      queryClient.removeQueries({ queryKey: queryKeys.users.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.users.lists() });
    },
  });
}
