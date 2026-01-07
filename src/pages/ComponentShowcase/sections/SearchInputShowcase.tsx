import { useState } from 'react';
import { Grid, Typography, Paper } from '@mui/material';
import { SearchInput } from '@/components/common';
import { Section } from '../shared';

export function SearchInputShowcase() {
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (value: string) => {
    setSearchResult(`Searched for: "${value}"`);
  };

  const simulateLoading = (value: string) => {
    setIsLoading(true);
    setSearchValue(value);
    setTimeout(() => {
      setIsLoading(false);
      setSearchResult(`Results for: "${value}"`);
    }, 1000);
  };

  return (
    <Section title="SearchInput Component">
      <Typography variant="body2" sx={{ mb: 3 }} color="text.secondary">
        A search input with debounce support, clear button, and loading state.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" gutterBottom>
            Basic Search
          </Typography>
          <SearchInput
            placeholder="Search users..."
            onSearch={handleSearch}
          />
          {searchResult && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {searchResult}
            </Typography>
          )}
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" gutterBottom>
            Controlled Input
          </Typography>
          <SearchInput
            placeholder="Type to search..."
            value={searchValue}
            onChange={simulateLoading}
            loading={isLoading}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" gutterBottom>
            Full Width
          </Typography>
          <SearchInput
            placeholder="Search across all records..."
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" gutterBottom>
            Medium Size
          </Typography>
          <SearchInput
            placeholder="Larger search input..."
            size="medium"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" gutterBottom>
            Without Clear Button
          </Typography>
          <SearchInput
            placeholder="No clear button..."
            showClear={false}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" gutterBottom>
            Disabled
          </Typography>
          <SearchInput
            placeholder="Cannot search..."
            disabled
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle2" gutterBottom>
            In a Card/Header Context
          </Typography>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">User List</Typography>
            <SearchInput placeholder="Search users..." />
          </Paper>
        </Grid>
      </Grid>
    </Section>
  );
}

export default SearchInputShowcase;
