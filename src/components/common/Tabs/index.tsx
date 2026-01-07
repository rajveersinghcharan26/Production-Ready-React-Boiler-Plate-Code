import React, { useState, useCallback, ReactNode } from 'react';
import {
  Tabs as MuiTabs,
  Tab as MuiTab,
  Box,
  Badge,
  SxProps,
  Theme,
} from '@mui/material';

export interface TabItem {
  /** Unique identifier for the tab */
  id: string;
  /** Label to display on the tab */
  label: string;
  /** Optional icon to display */
  icon?: ReactNode;
  /** Content to render when tab is active */
  content?: ReactNode;
  /** Whether the tab is disabled */
  disabled?: boolean;
  /** Optional badge count */
  badge?: number;
  /** Badge color */
  badgeColor?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
}

export interface ITabsProps {
  /** Array of tab items */
  tabs: TabItem[];
  /** Currently active tab id (controlled) */
  value?: string;
  /** Default active tab id (uncontrolled) */
  defaultValue?: string;
  /** Callback when tab changes */
  onChange?: (tabId: string) => void;
  /** Tab orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Tab variant */
  variant?: 'standard' | 'scrollable' | 'fullWidth';
  /** Whether tabs are centered (only for horizontal) */
  centered?: boolean;
  /** Indicator color */
  indicatorColor?: 'primary' | 'secondary';
  /** Text color */
  textColor?: 'primary' | 'secondary' | 'inherit';
  /** Whether to render tab content */
  renderContent?: boolean;
  /** Additional styles for the tabs container */
  sx?: SxProps<Theme>;
  /** Additional styles for the content area */
  contentSx?: SxProps<Theme>;
  /** Custom tab panel wrapper */
  TabPanelComponent?: React.ComponentType<{ children: ReactNode; isActive: boolean }>;
}

interface TabPanelProps {
  children?: ReactNode;
  isActive: boolean;
  sx?: SxProps<Theme>;
}

/**
 * Default TabPanel component
 */
const TabPanel: React.FC<TabPanelProps> = ({ children, isActive, sx }) => {
  if (!isActive) return null;
  
  return (
    <Box
      role="tabpanel"
      sx={{
        py: 3,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

/**
 * Tabs - A reusable tabs component for organizing content
 *
 * @example
 * // Basic usage
 * <Tabs
 *   tabs={[
 *     { id: 'tab1', label: 'Tab 1', content: <div>Content 1</div> },
 *     { id: 'tab2', label: 'Tab 2', content: <div>Content 2</div> },
 *   ]}
 * />
 *
 * @example
 * // Controlled with icons
 * <Tabs
 *   value={activeTab}
 *   onChange={setActiveTab}
 *   tabs={[
 *     { id: 'users', label: 'Users', icon: <PersonIcon /> },
 *     { id: 'settings', label: 'Settings', icon: <SettingsIcon /> },
 *   ]}
 * />
 *
 * @example
 * // With badges
 * <Tabs
 *   tabs={[
 *     { id: 'inbox', label: 'Inbox', badge: 5, badgeColor: 'error' },
 *     { id: 'sent', label: 'Sent' },
 *   ]}
 * />
 */
export const Tabs: React.FC<ITabsProps> = ({
  tabs,
  value: controlledValue,
  defaultValue,
  onChange,
  orientation = 'horizontal',
  variant = 'standard',
  centered = false,
  indicatorColor = 'primary',
  textColor = 'primary',
  renderContent = true,
  sx,
  contentSx,
  TabPanelComponent = TabPanel,
}) => {
  const [internalValue, setInternalValue] = useState(
    defaultValue || (tabs.length > 0 ? tabs[0]?.id ?? '' : '')
  );

  // Use controlled or uncontrolled value
  const isControlled = controlledValue !== undefined;
  const activeTabId = isControlled ? controlledValue : internalValue;

  const handleChange = useCallback(
    (_event: React.SyntheticEvent, newValue: string) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    },
    [isControlled, onChange]
  );

  const renderTabLabel = (tab: TabItem) => {
    const label = (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {tab.icon}
        <span>{tab.label}</span>
      </Box>
    );

    if (tab.badge !== undefined && tab.badge > 0) {
      return (
        <Badge
          badgeContent={tab.badge}
          color={tab.badgeColor || 'primary'}
          max={99}
        >
          {label}
        </Badge>
      );
    }

    return label;
  };

  return (
    <Box
      sx={{
        display: orientation === 'vertical' ? 'flex' : 'block',
        width: '100%',
        ...sx,
      }}
    >
      <MuiTabs
        value={activeTabId}
        onChange={handleChange}
        orientation={orientation}
        variant={variant}
        centered={centered && orientation === 'horizontal'}
        indicatorColor={indicatorColor}
        textColor={textColor}
        aria-label="tabs"
        sx={{
          borderBottom: orientation === 'horizontal' ? 1 : 0,
          borderRight: orientation === 'vertical' ? 1 : 0,
          borderColor: 'divider',
          minWidth: orientation === 'vertical' ? 200 : 'auto',
        }}
      >
        {tabs.map((tab) => (
          <MuiTab
            key={tab.id}
            value={tab.id}
            label={renderTabLabel(tab)}
            disabled={tab.disabled}
            sx={{
              textTransform: 'none',
              fontWeight: 500,
              minHeight: 48,
              '&.Mui-selected': {
                fontWeight: 600,
              },
            }}
          />
        ))}
      </MuiTabs>

      {renderContent && (
        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            ...contentSx,
          }}
        >
          {tabs.map((tab) => (
            <TabPanelComponent key={tab.id} isActive={tab.id === activeTabId}>
              {tab.content}
            </TabPanelComponent>
          ))}
        </Box>
      )}
    </Box>
  );
};

/**
 * Simple TabPanel export for custom usage
 */
export { TabPanel };

export default Tabs;
