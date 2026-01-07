import { useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { FormFileUpload } from '@/components/common';
import { Section } from '../shared';

export function FormFileUploadShowcase() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  return (
    <Section title="FormFileUpload Component">
      <Typography variant="body2" sx={{ mb: 2 }}>
        A file upload component with drag & drop support, file validation, and preview list.
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FormFileUpload
            caption="Upload Documents"
            accept=".pdf,.doc,.docx"
            multiple
            value={uploadedFiles}
            onChange={setUploadedFiles}
            helperText="Accepted: PDF, DOC, DOCX files"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormFileUpload
            caption="Upload Images"
            accept="image/*"
            multiple
            maxSize={5 * 1024 * 1024}
            maxFiles={3}
            helperText="Max 3 images, 5MB each"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormFileUpload
            caption="Single File Upload"
            accept=".csv,.xlsx"
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormFileUpload
            caption="Disabled Upload"
            disabled
          />
        </Grid>
      </Grid>
    </Section>
  );
}

export default FormFileUploadShowcase;
