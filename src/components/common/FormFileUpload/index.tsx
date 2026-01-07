/**
 * FormFileUpload Component
 * A file upload component with drag & drop support and file preview.
 */

import { useRef, useState, type DragEvent, type ChangeEvent } from 'react';
import {
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Paper,
  type TypographyProps,
} from '@mui/material';
import {
  CloudUpload,
  InsertDriveFile,
  Image as ImageIcon,
  PictureAsPdf,
  Delete,
  Description,
} from '@mui/icons-material';

export interface IFormFileUploadProps {
  /** Caption/title label text */
  caption: string;
  /** Accepted file types (e.g., '.jpg,.png,.pdf' or 'image/*') */
  accept?: string;
  /** Allow multiple file selection */
  multiple?: boolean;
  /** Maximum file size in bytes */
  maxSize?: number;
  /** Maximum number of files (when multiple is true) */
  maxFiles?: number;
  /** Currently selected files */
  value?: File[];
  /** Change handler */
  onChange?: (files: File[]) => void;
  /** Whether the field is required */
  required?: boolean;
  /** Whether the field is disabled */
  disabled?: boolean;
  /** Error state */
  error?: boolean;
  /** Helper text or error message */
  helperText?: string;
  /** Typography variant for caption */
  captionVariant?: TypographyProps['variant'];
  /** Custom styles for the container */
  containerSx?: TypographyProps['sx'];
}

/**
 * Get file icon based on MIME type
 */
function getFileIcon(file: File) {
  const type = file.type;
  if (type.startsWith('image/')) return <ImageIcon color="primary" />;
  if (type === 'application/pdf') return <PictureAsPdf color="error" />;
  if (type.includes('document') || type.includes('text')) return <Description color="info" />;
  return <InsertDriveFile color="action" />;
}

/**
 * Format file size for display
 */
function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

/**
 * FormFileUpload component with drag & drop and file list display.
 * @example
 * <FormFileUpload
 *   caption="Upload Documents"
 *   accept=".pdf,.doc,.docx"
 *   multiple
 *   onChange={handleFilesChange}
 * />
 *
 * @example
 * <FormFileUpload
 *   caption="Profile Picture"
 *   accept="image/*"
 *   maxSize={5 * 1024 * 1024} // 5MB
 *   onChange={handleImageChange}
 *   required
 * />
 */
export function FormFileUpload({
  caption,
  accept,
  multiple = false,
  maxSize,
  maxFiles,
  value = [],
  onChange,
  required = false,
  disabled = false,
  error = false,
  helperText,
  captionVariant = 'caption',
  containerSx,
}: IFormFileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const validateFiles = (files: File[]): { valid: File[]; errors: string[] } => {
    const valid: File[] = [];
    const errors: string[] = [];

    for (const file of files) {
      // Check file size
      if (maxSize && file.size > maxSize) {
        errors.push(`${file.name} exceeds max size of ${formatFileSize(maxSize)}`);
        continue;
      }

      // Check file type if accept is specified
      if (accept) {
        const acceptedTypes = accept.split(',').map((t) => t.trim().toLowerCase());
        const fileExt = `.${file.name.split('.').pop()?.toLowerCase()}`;
        const fileMime = file.type.toLowerCase();

        const isAccepted = acceptedTypes.some((type) => {
          if (type.startsWith('.')) {
            return fileExt === type;
          }
          if (type.endsWith('/*')) {
            return fileMime.startsWith(type.replace('/*', '/'));
          }
          return fileMime === type;
        });

        if (!isAccepted) {
          errors.push(`${file.name} is not an accepted file type`);
          continue;
        }
      }

      valid.push(file);
    }

    return { valid, errors };
  };

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList || disabled) return;

    const newFiles = Array.from(fileList);
    const { valid, errors } = validateFiles(newFiles);

    if (errors.length > 0) {
      setLocalError(errors[0] ?? null);
      return;
    }

    setLocalError(null);

    let finalFiles: File[];
    if (multiple) {
      finalFiles = [...value, ...valid];
      if (maxFiles && finalFiles.length > maxFiles) {
        finalFiles = finalFiles.slice(0, maxFiles);
        setLocalError(`Maximum ${maxFiles} files allowed`);
      }
    } else {
      finalFiles = valid.slice(0, 1);
    }

    onChange?.(finalFiles);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
    // Reset input value to allow selecting the same file again
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = value.filter((_, i) => i !== index);
    onChange?.(newFiles);
    setLocalError(null);
  };

  const handleClick = () => {
    if (!disabled) {
      inputRef.current?.click();
    }
  };

  const displayError = localError || (error ? helperText : null);
  const displayHelper = !displayError ? helperText : null;

  return (
    <Box sx={{ mb: 2, ...containerSx }}>
      <Typography
        variant={captionVariant}
        color="text.secondary"
        component="label"
        sx={{
          display: 'block',
          mb: 0.5,
          fontWeight: 500,
        }}
      >
        {caption}
        {required && (
          <Typography component="span" color="error.main" sx={{ ml: 0.5 }}>
            *
          </Typography>
        )}
      </Typography>

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleInputChange}
        style={{ display: 'none' }}
        disabled={disabled}
      />

      {/* Drop zone */}
      <Paper
        variant="outlined"
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        sx={{
          p: 3,
          textAlign: 'center',
          cursor: disabled ? 'not-allowed' : 'pointer',
          borderStyle: 'dashed',
          borderWidth: 2,
          borderColor: displayError
            ? 'error.main'
            : isDragging
              ? 'primary.main'
              : 'divider',
          backgroundColor: isDragging
            ? 'action.hover'
            : disabled
              ? 'action.disabledBackground'
              : 'background.paper',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            borderColor: disabled ? 'divider' : 'primary.main',
            backgroundColor: disabled ? 'action.disabledBackground' : 'action.hover',
          },
        }}
      >
        <CloudUpload
          sx={{
            fontSize: 48,
            color: disabled ? 'action.disabled' : 'primary.main',
            mb: 1,
          }}
        />
        <Typography variant="body1" color={disabled ? 'text.disabled' : 'text.primary'}>
          {isDragging ? 'Drop files here' : 'Drag & drop files here'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          or click to browse
        </Typography>
        {accept && (
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
            Accepted: {accept}
          </Typography>
        )}
        {maxSize && (
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
            Max size: {formatFileSize(maxSize)}
          </Typography>
        )}
      </Paper>

      {/* Helper/Error text */}
      {(displayError || displayHelper) && (
        <Typography
          variant="caption"
          color={displayError ? 'error.main' : 'text.secondary'}
          sx={{ display: 'block', mt: 0.5, ml: 1.75 }}
        >
          {displayError || displayHelper}
        </Typography>
      )}

      {/* File list */}
      {value.length > 0 && (
        <List dense sx={{ mt: 1 }}>
          {value.map((file, index) => (
            <ListItem
              key={`${file.name}-${index}`}
              sx={{
                backgroundColor: 'action.hover',
                borderRadius: 1,
                mb: 0.5,
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                {getFileIcon(file)}
              </ListItemIcon>
              <ListItemText
                primary={file.name}
                secondary={formatFileSize(file.size)}
                primaryTypographyProps={{ noWrap: true }}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  size="small"
                  onClick={() => handleRemoveFile(index)}
                  disabled={disabled}
                >
                  <Delete fontSize="small" />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}

export default FormFileUpload;
