/**
 * DataTable Component
 * A powerful, reusable table component with sorting, pagination,
 * selection, search, and export capabilities.
 */

import React, { useState, useMemo, useCallback } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Paper,
  Checkbox,
  IconButton,
  Tooltip,
  TextField,
  InputAdornment,
  Typography,
  Skeleton,
  Stack,
  Menu,
  MenuItem,
  ListItemText,
  alpha,
  SxProps,
  Theme,
} from '@mui/material';
import {
  Search,
  Download,
  ViewColumn,
  Close,
} from '@mui/icons-material';

import { EmptyState } from '../EmptyState';

// ==================== TYPES ====================

export type SortDirection = 'asc' | 'desc';

export interface IDataTableColumn<T> {
  /** Unique key for the column (must match data property) */
  key: keyof T | string;
  /** Display label for column header */
  label: string;
  /** Enable sorting for this column */
  sortable?: boolean;
  /** Column width */
  width?: number | string;
  /** Minimum column width */
  minWidth?: number;
  /** Text alignment */
  align?: 'left' | 'center' | 'right';
  /** Custom render function for cell content */
  render?: (row: T, index: number) => React.ReactNode;
  /** Whether column is visible (default: true) */
  visible?: boolean;
  /** Whether column is searchable (default: true) */
  searchable?: boolean;
  /** Whether to include in CSV export (default: true) */
  exportable?: boolean;
  /** Custom export formatter */
  exportFormatter?: (value: unknown, row: T) => string;
}

export interface IDataTableAction<T> {
  /** Icon to display */
  icon: React.ReactNode;
  /** Tooltip text */
  tooltip?: string;
  /** Click handler */
  onClick: (row: T, index: number) => void;
  /** Conditionally show/hide action */
  hidden?: (row: T) => boolean;
  /** Conditionally disable action */
  disabled?: (row: T) => boolean;
  /** Icon color */
  color?: 'inherit' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
}

export interface IDataTableProps<T extends object> {
  /** Data array to display */
  data: T[];
  /** Column configuration */
  columns: IDataTableColumn<T>[];
  /** Unique key for each row */
  rowKey?: keyof T | ((row: T) => string | number);
  
  // Pagination
  /** Enable pagination */
  pagination?: boolean;
  /** Default page size */
  pageSize?: number;
  /** Page size options */
  pageSizeOptions?: number[];
  
  // Sorting
  /** Enable sorting */
  sortable?: boolean;
  /** Default sort configuration */
  defaultSort?: { key: keyof T | string; direction: SortDirection };
  /** External sort handler (for server-side sorting) */
  onSort?: (key: keyof T | string, direction: SortDirection) => void;
  
  // Selection
  /** Enable row selection */
  selectable?: boolean;
  /** Selection change handler */
  onSelectionChange?: (selectedRows: T[]) => void;
  /** Pre-selected rows */
  selectedRows?: T[];
  
  // Search
  /** Enable global search */
  searchable?: boolean;
  /** Search placeholder text */
  searchPlaceholder?: string;
  /** External search handler (for server-side search) */
  onSearch?: (query: string) => void;
  
  // Actions
  /** Row action buttons */
  actions?: IDataTableAction<T>[];
  /** Row click handler */
  onRowClick?: (row: T, index: number) => void;
  
  // Export
  /** Enable CSV export */
  exportable?: boolean;
  /** Export filename */
  exportFilename?: string;
  
  // Column visibility
  /** Enable column visibility toggle */
  columnToggle?: boolean;
  
  // States
  /** Loading state */
  loading?: boolean;
  /** Number of skeleton rows to show when loading */
  loadingRows?: number;
  /** Empty state message */
  emptyMessage?: string;
  /** Empty state icon */
  emptyIcon?: React.ReactNode;
  
  // Styling
  /** Sticky header */
  stickyHeader?: boolean;
  /** Max height with scroll */
  maxHeight?: number | string;
  /** Table size */
  size?: 'small' | 'medium';
  /** Striped rows */
  striped?: boolean;
  /** Hoverable rows */
  hoverable?: boolean;
  /** Dense padding */
  dense?: boolean;
  /** Custom styles */
  sx?: SxProps<Theme>;
  
  // Toolbar
  /** Custom toolbar actions */
  toolbarActions?: React.ReactNode;
  /** Table title */
  title?: string;
}

// ==================== HELPER FUNCTIONS ====================

/**
 * Get nested property value from object using dot notation
 */
function getNestedValue<T>(obj: T, path: string): unknown {
  return path.split('.').reduce((acc: unknown, part: string) => {
    if (acc && typeof acc === 'object' && part in acc) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, obj);
}

/**
 * Compare values for sorting
 */
function compareValues(a: unknown, b: unknown, direction: SortDirection): number {
  // Handle null/undefined
  if (a == null && b == null) return 0;
  if (a == null) return direction === 'asc' ? 1 : -1;
  if (b == null) return direction === 'asc' ? -1 : 1;

  // Compare based on type
  if (typeof a === 'string' && typeof b === 'string') {
    return direction === 'asc' 
      ? a.localeCompare(b) 
      : b.localeCompare(a);
  }
  
  if (typeof a === 'number' && typeof b === 'number') {
    return direction === 'asc' ? a - b : b - a;
  }
  
  if (a instanceof Date && b instanceof Date) {
    return direction === 'asc' 
      ? a.getTime() - b.getTime() 
      : b.getTime() - a.getTime();
  }

  // Fallback to string comparison
  const strA = String(a);
  const strB = String(b);
  return direction === 'asc' 
    ? strA.localeCompare(strB) 
    : strB.localeCompare(strA);
}

/**
 * Export data to CSV
 */
function exportToCSV<T extends object>(
  data: T[],
  columns: IDataTableColumn<T>[],
  filename: string
): void {
  const exportableColumns = columns.filter(col => col.exportable !== false && col.visible !== false);
  
  // Create header row
  const headers = exportableColumns.map(col => `"${col.label}"`).join(',');
  
  // Create data rows
  const rows = data.map(row => {
    return exportableColumns.map(col => {
      const value = getNestedValue(row, String(col.key));
      
      // Use custom formatter if provided
      if (col.exportFormatter) {
        return `"${col.exportFormatter(value, row)}"`;
      }
      
      // Handle different types
      if (value == null) return '""';
      if (typeof value === 'string') return `"${value.replace(/"/g, '""')}"`;
      if (typeof value === 'number' || typeof value === 'boolean') return String(value);
      if (value instanceof Date) return `"${value.toISOString()}"`;
      return `"${String(value).replace(/"/g, '""')}"`;
    }).join(',');
  });

  // Combine and download
  const csv = [headers, ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${filename}.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
}

// ==================== COMPONENT ====================

export function DataTable<T extends object>({
  data,
  columns: initialColumns,
  rowKey = 'id' as keyof T,
  
  // Pagination
  pagination = true,
  pageSize: defaultPageSize = 10,
  pageSizeOptions = [5, 10, 25, 50, 100],
  
  // Sorting
  sortable = true,
  defaultSort,
  onSort,
  
  // Selection
  selectable = false,
  onSelectionChange,
  selectedRows: controlledSelectedRows,
  
  // Search
  searchable = false,
  searchPlaceholder = 'Search...',
  onSearch,
  
  // Actions
  actions,
  onRowClick,
  
  // Export
  exportable = false,
  exportFilename = 'data-export',
  
  // Column visibility
  columnToggle = false,
  
  // States
  loading = false,
  loadingRows = 5,
  emptyMessage = 'No data available',
  emptyIcon,
  
  // Styling
  stickyHeader = false,
  maxHeight,
  size = 'medium',
  striped = false,
  hoverable = true,
  dense = false,
  sx,
  
  // Toolbar
  toolbarActions,
  title,
}: IDataTableProps<T>) {
  // ==================== STATE ====================
  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultPageSize);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: SortDirection } | null>(
    defaultSort ? { key: String(defaultSort.key), direction: defaultSort.direction } : null
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [internalSelectedRows, setInternalSelectedRows] = useState<T[]>([]);
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>(() => {
    const visibility: Record<string, boolean> = {};
    initialColumns.forEach(col => {
      visibility[String(col.key)] = col.visible !== false;
    });
    return visibility;
  });
  const [columnMenuAnchor, setColumnMenuAnchor] = useState<null | HTMLElement>(null);

  // Use controlled or internal selection
  const selectedRows = controlledSelectedRows ?? internalSelectedRows;
  const setSelectedRows = (rows: T[]) => {
    if (!controlledSelectedRows) {
      setInternalSelectedRows(rows);
    }
    onSelectionChange?.(rows);
  };

  // ==================== MEMOIZED VALUES ====================

  // Visible columns
  const columns = useMemo(() => {
    return initialColumns.filter(col => columnVisibility[String(col.key)] !== false);
  }, [initialColumns, columnVisibility]);

  // Get row key
  const getRowKey = useCallback((row: T, index: number): string | number => {
    if (typeof rowKey === 'function') {
      return rowKey(row);
    }
    const value = row[rowKey];
    if (value != null) {
      return String(value);
    }
    return index;
  }, [rowKey]);

  // Filter data by search query
  const filteredData = useMemo(() => {
    if (!searchQuery || onSearch) return data;

    const query = searchQuery.toLowerCase();
    return data.filter(row => {
      return columns.some(col => {
        if (col.searchable === false) return false;
        const value = getNestedValue(row, String(col.key));
        if (value == null) return false;
        return String(value).toLowerCase().includes(query);
      });
    });
  }, [data, searchQuery, columns, onSearch]);

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortConfig || onSort) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = getNestedValue(a, sortConfig.key);
      const bValue = getNestedValue(b, sortConfig.key);
      return compareValues(aValue, bValue, sortConfig.direction);
    });
  }, [filteredData, sortConfig, onSort]);

  // Paginate data
  const paginatedData = useMemo(() => {
    if (!pagination) return sortedData;
    const start = page * rowsPerPage;
    return sortedData.slice(start, start + rowsPerPage);
  }, [sortedData, page, rowsPerPage, pagination]);

  // Check if all rows are selected
  const isAllSelected = useMemo(() => {
    if (paginatedData.length === 0) return false;
    return paginatedData.every(row => 
      selectedRows.some(selected => getRowKey(selected, -1) === getRowKey(row, -1))
    );
  }, [paginatedData, selectedRows, getRowKey]);

  const isSomeSelected = useMemo(() => {
    if (paginatedData.length === 0) return false;
    const selectedCount = paginatedData.filter(row =>
      selectedRows.some(selected => getRowKey(selected, -1) === getRowKey(row, -1))
    ).length;
    return selectedCount > 0 && selectedCount < paginatedData.length;
  }, [paginatedData, selectedRows, getRowKey]);

  // ==================== HANDLERS ====================

  const handleSort = (columnKey: string) => {
    const newDirection: SortDirection = 
      sortConfig?.key === columnKey && sortConfig.direction === 'asc' 
        ? 'desc' 
        : 'asc';
    
    setSortConfig({ key: columnKey, direction: newDirection });
    onSort?.(columnKey as keyof T, newDirection);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    setPage(0);
    onSearch?.(query);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setPage(0);
    onSearch?.('');
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      // Add all visible rows to selection
      const newSelected = [...selectedRows];
      paginatedData.forEach(row => {
        if (!selectedRows.some(selected => getRowKey(selected, -1) === getRowKey(row, -1))) {
          newSelected.push(row);
        }
      });
      setSelectedRows(newSelected);
    } else {
      // Remove all visible rows from selection
      setSelectedRows(
        selectedRows.filter(selected => 
          !paginatedData.some(row => getRowKey(row, -1) === getRowKey(selected, -1))
        )
      );
    }
  };

  const handleSelectRow = (row: T) => {
    const isSelected = selectedRows.some(
      selected => getRowKey(selected, -1) === getRowKey(row, -1)
    );
    
    if (isSelected) {
      setSelectedRows(
        selectedRows.filter(selected => getRowKey(selected, -1) !== getRowKey(row, -1))
      );
    } else {
      setSelectedRows([...selectedRows, row]);
    }
  };

  const handlePageChange = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleExport = () => {
    exportToCSV(sortedData, initialColumns, exportFilename);
  };

  const handleToggleColumn = (columnKey: string) => {
    setColumnVisibility(prev => ({
      ...prev,
      [columnKey]: !prev[columnKey],
    }));
  };

  // ==================== RENDER ====================

  const hasToolbar = searchable || exportable || columnToggle || toolbarActions || title || (selectable && selectedRows.length > 0);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', ...sx }}>
      {/* Toolbar */}
      {hasToolbar && (
        <Box
          sx={{
            p: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            flexWrap: 'wrap',
            borderBottom: 1,
            borderColor: 'divider',
            bgcolor: selectedRows.length > 0 ? alpha('#1976d2', 0.08) : 'transparent',
          }}
        >
          {/* Title or Selection Count */}
          {selectedRows.length > 0 ? (
            <Typography color="primary" variant="subtitle1" sx={{ flex: '1 1 auto' }}>
              {selectedRows.length} selected
            </Typography>
          ) : title ? (
            <Typography variant="h6" sx={{ flex: '1 1 auto' }}>
              {title}
            </Typography>
          ) : (
            <Box sx={{ flex: '1 1 auto' }} />
          )}

          {/* Search */}
          {searchable && (
            <TextField
              size="small"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={handleSearch}
              sx={{ minWidth: 200 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search fontSize="small" />
                  </InputAdornment>
                ),
                endAdornment: searchQuery && (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={handleClearSearch}>
                      <Close fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}

          {/* Column Toggle */}
          {columnToggle && (
            <>
              <Tooltip title="Toggle columns">
                <IconButton onClick={(e) => setColumnMenuAnchor(e.currentTarget)}>
                  <ViewColumn />
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={columnMenuAnchor}
                open={Boolean(columnMenuAnchor)}
                onClose={() => setColumnMenuAnchor(null)}
              >
                {initialColumns.map(col => (
                  <MenuItem
                    key={String(col.key)}
                    onClick={() => handleToggleColumn(String(col.key))}
                  >
                    <Checkbox
                      checked={columnVisibility[String(col.key)] !== false}
                      size="small"
                    />
                    <ListItemText primary={col.label} />
                  </MenuItem>
                ))}
              </Menu>
            </>
          )}

          {/* Export */}
          {exportable && (
            <Tooltip title="Export to CSV">
              <IconButton onClick={handleExport}>
                <Download />
              </IconButton>
            </Tooltip>
          )}

          {/* Custom Toolbar Actions */}
          {toolbarActions}
        </Box>
      )}

      {/* Table */}
      <TableContainer sx={{ maxHeight: maxHeight }}>
        <Table
          stickyHeader={stickyHeader}
          size={dense ? 'small' : size}
          sx={{ minWidth: 650 }}
        >
          {/* Header */}
          <TableHead>
            <TableRow>
              {/* Selection Checkbox */}
              {selectable && (
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={isSomeSelected}
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                    disabled={loading}
                  />
                </TableCell>
              )}

              {/* Column Headers */}
              {columns.map(column => (
                <TableCell
                  key={String(column.key)}
                  align={column.align || 'left'}
                  style={{ 
                    width: column.width, 
                    minWidth: column.minWidth,
                    fontWeight: 600,
                  }}
                  sortDirection={
                    sortConfig?.key === column.key ? sortConfig.direction : false
                  }
                >
                  {sortable && column.sortable !== false ? (
                    <TableSortLabel
                      active={sortConfig?.key === String(column.key)}
                      direction={
                        sortConfig?.key === String(column.key) 
                          ? sortConfig.direction 
                          : 'asc'
                      }
                      onClick={() => handleSort(String(column.key))}
                    >
                      {column.label}
                    </TableSortLabel>
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}

              {/* Actions Header */}
              {actions && actions.length > 0 && (
                <TableCell align="right" style={{ width: actions.length * 48 }}>
                  Actions
                </TableCell>
              )}
            </TableRow>
          </TableHead>

          {/* Body */}
          <TableBody>
            {/* Loading State */}
            {loading && (
              <>
                {Array.from({ length: loadingRows }).map((_, index) => (
                  <TableRow key={`skeleton-${index}`}>
                    {selectable && (
                      <TableCell padding="checkbox">
                        <Skeleton variant="rectangular" width={24} height={24} />
                      </TableCell>
                    )}
                    {columns.map(column => (
                      <TableCell key={String(column.key)}>
                        <Skeleton variant="text" />
                      </TableCell>
                    ))}
                    {actions && actions.length > 0 && (
                      <TableCell>
                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                          {actions.map((_, actionIndex) => (
                            <Skeleton 
                              key={actionIndex} 
                              variant="circular" 
                              width={32} 
                              height={32} 
                            />
                          ))}
                        </Stack>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </>
            )}

            {/* Empty State */}
            {!loading && paginatedData.length === 0 && (
              <TableRow>
                <TableCell 
                  colSpan={
                    columns.length + 
                    (selectable ? 1 : 0) + 
                    (actions && actions.length > 0 ? 1 : 0)
                  }
                >
                  <EmptyState
                    title={emptyMessage}
                    icon={emptyIcon}
                  />
                </TableCell>
              </TableRow>
            )}

            {/* Data Rows */}
            {!loading && paginatedData.map((row, rowIndex) => {
              const rowId = getRowKey(row, rowIndex);
              const isSelected = selectedRows.some(
                selected => getRowKey(selected, -1) === rowId
              );
              const actualIndex = page * rowsPerPage + rowIndex;

              return (
                <TableRow
                  key={rowId}
                  hover={hoverable}
                  selected={isSelected}
                  onClick={() => onRowClick?.(row, actualIndex)}
                  sx={{
                    cursor: onRowClick ? 'pointer' : 'default',
                    bgcolor: striped && rowIndex % 2 === 1 
                      ? 'action.hover' 
                      : 'transparent',
                  }}
                >
                  {/* Selection Checkbox */}
                  {selectable && (
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onClick={(e) => e.stopPropagation()}
                        onChange={() => handleSelectRow(row)}
                      />
                    </TableCell>
                  )}

                  {/* Data Cells */}
                  {columns.map(column => {
                    const value = getNestedValue(row, String(column.key));
                    
                    return (
                      <TableCell 
                        key={String(column.key)} 
                        align={column.align || 'left'}
                      >
                        {column.render 
                          ? column.render(row, actualIndex)
                          : value != null 
                            ? String(value) 
                            : '-'
                        }
                      </TableCell>
                    );
                  })}

                  {/* Action Buttons */}
                  {actions && actions.length > 0 && (
                    <TableCell align="right">
                      <Stack 
                        direction="row" 
                        spacing={0.5} 
                        justifyContent="flex-end"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {actions.map((action, actionIndex) => {
                          if (action.hidden?.(row)) return null;
                          
                          return (
                            <Tooltip key={actionIndex} title={action.tooltip || ''}>
                              <span>
                                <IconButton
                                  size="small"
                                  color={action.color || 'default'}
                                  disabled={action.disabled?.(row)}
                                  onClick={() => action.onClick(row, actualIndex)}
                                >
                                  {action.icon}
                                </IconButton>
                              </span>
                            </Tooltip>
                          );
                        })}
                      </Stack>
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      {pagination && !loading && (
        <TablePagination
          component="div"
          count={sortedData.length}
          page={page}
          onPageChange={handlePageChange}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleRowsPerPageChange}
          rowsPerPageOptions={pageSizeOptions}
        />
      )}
    </Paper>
  );
}

export default DataTable;
