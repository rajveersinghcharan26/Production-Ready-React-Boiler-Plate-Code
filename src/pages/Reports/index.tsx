/**
 * Reports page component with self-contained routing.
 */

import { lazy, Suspense } from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent, CardActionArea } from '@mui/material';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Assessment, TrendingUp, PieChart, BarChart } from '@mui/icons-material';

import { ROUTES } from '@/config/constants';
import { Loader } from '@/components/common';

// Lazy load detail page
const ReportsDetailPage = lazy(() => import('./Detail'));

export function ReportsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const reportTypes = [
    { id: 'sales', title: 'Sales Report', icon: <TrendingUp sx={{ fontSize: 40 }} /> },
    { id: 'users', title: 'User Analytics', icon: <PieChart sx={{ fontSize: 40 }} /> },
    { id: 'performance', title: 'Performance Metrics', icon: <BarChart sx={{ fontSize: 40 }} /> },
    { id: 'overview', title: 'Overview Report', icon: <Assessment sx={{ fontSize: 40 }} /> },
  ];

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        {t('reports.title')}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Select a report type to view detailed analytics.
      </Typography>

      <Grid container spacing={3}>
        {reportTypes.map((report) => (
          <Grid item xs={12} sm={6} md={3} key={report.id}>
            <Card>
              <CardActionArea onClick={() => navigate(`${ROUTES.REPORTS}/${report.id}`)}>
                <CardContent sx={{ textAlign: 'center', py: 4 }}>
                  <Box sx={{ color: 'primary.main', mb: 2 }}>{report.icon}</Box>
                  <Typography variant="h6">{report.title}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Paper sx={{ p: 4, mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Recent Reports
        </Typography>
        <Typography variant="body2" color="text.secondary">
          No recent reports available. Generate a new report to see it here.
        </Typography>
      </Paper>
    </Box>
  );
}

/**
 * Reports layout with self-contained routing.
 */
function ReportsLayout() {
  return (
    <Routes>
      <Route index element={<ReportsPage />} />
      <Route
        path=":id"
        element={
          <Suspense fallback={<Loader />}>
            <ReportsDetailPage />
          </Suspense>
        }
      />
    </Routes>
  );
}

export default ReportsLayout;
