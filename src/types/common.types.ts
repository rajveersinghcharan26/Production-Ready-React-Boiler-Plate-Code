/**
 * Common type definitions used throughout the application.
 */

/** Paginated API response */
export interface IPaginatedResponse<T> {
  data: T[];
  pagination: IPagination;
}

/** Pagination metadata */
export interface IPagination {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

/** Generic ID type */
export type TId = string | number;

/** Theme mode type */
export type TThemeMode = 'light' | 'dark';

/** Generic select option */
export interface ISelectOption<T = string> {
  label: string;
  value: T;
  disabled?: boolean;
}

/** Base entity with common fields */
export interface IBaseEntity {
  id: TId;
  createdAt: string;
  updatedAt: string;
}

/** Query parameters for list endpoints */
export interface IQueryParams {
  page?: number;
  pageSize?: number;
  search?: string;
}
