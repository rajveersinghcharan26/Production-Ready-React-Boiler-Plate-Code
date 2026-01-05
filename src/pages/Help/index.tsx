/**
 * Help page component with self-contained routing.
 */

import { lazy, Suspense } from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Help,
  Book,
  ContactSupport,
  Feedback,
  ExpandMore,
} from '@mui/icons-material';

import { ROUTES } from '@/config/constants';
import { Loader } from '@/components/common';

// Lazy load detail page
const HelpDetailPage = lazy(() => import('./Detail'));

export function HelpPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const helpSections = [
    { id: 'faq', title: t('help.faq'), icon: <Help />, description: 'Frequently asked questions' },
    { id: 'docs', title: t('help.documentation'), icon: <Book />, description: 'User guides and documentation' },
    { id: 'support', title: t('help.contactSupport'), icon: <ContactSupport />, description: 'Get help from our support team' },
    { id: 'feedback', title: t('help.feedback'), icon: <Feedback />, description: 'Share your feedback with us' },
  ];

  const faqItems = [
    { question: 'How do I reset my password?', answer: 'Go to Settings > Security > Change Password to reset your password.' },
    { question: 'How do I change my language?', answer: 'Click on the language icon in the header to switch between available languages.' },
    { question: 'How do I contact support?', answer: 'You can reach our support team via email at support@example.com or through the Contact Support section.' },
    { question: 'How do I export reports?', answer: 'Navigate to Reports, select the report type, and click the Download button to export.' },
  ];

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        {t('help.title')}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Find answers, browse documentation, or get in touch with support.
      </Typography>

      <Paper sx={{ mb: 4 }}>
        <List>
          {helpSections.map((section, index) => (
            <ListItem key={section.id} divider={index < helpSections.length - 1}>
              <ListItemButton onClick={() => navigate(`${ROUTES.HELP}/${section.id}`)}>
                <ListItemIcon>{section.icon}</ListItemIcon>
                <ListItemText
                  primary={section.title}
                  secondary={section.description}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Paper>

      <Typography variant="h6" gutterBottom>
        Quick FAQ
      </Typography>
      {faqItems.map((faq, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography>{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="text.secondary">
              {faq.answer}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}

/**
 * Help layout with self-contained routing.
 */
function HelpLayout() {
  return (
    <Routes>
      <Route index element={<HelpPage />} />
      <Route
        path=":id"
        element={
          <Suspense fallback={<Loader />}>
            <HelpDetailPage />
          </Suspense>
        }
      />
    </Routes>
  );
}

export default HelpLayout;
