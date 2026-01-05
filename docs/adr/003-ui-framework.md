# ADR-003: Material UI v5 as UI Framework

## Status
Accepted

## Context

We need a UI component library that provides:
- Comprehensive component set
- Theming capabilities (light/dark mode)
- Responsive design utilities
- Accessibility compliance
- Enterprise-grade quality

### Options Considered

1. **Tailwind CSS + Headless UI**
   - Pros: Flexible, small bundle with purge
   - Cons: More custom development, less components

2. **Chakra UI**
   - Pros: Good DX, accessible
   - Cons: Smaller ecosystem, fewer components

3. **Material UI v5** (Selected)
   - Pros: Comprehensive, well-documented, enterprise-ready
   - Cons: Larger bundle, opinionated design

4. **Ant Design**
   - Pros: Comprehensive, good for admin panels
   - Cons: Larger bundle, Chinese documentation primary

## Decision

We will use **Material UI v5** as our primary UI framework.

### Implementation

```
src/theme/
├── index.ts         # Theme provider setup
├── palette.ts       # Color definitions
├── typography.ts    # Font settings
└── components.ts    # Component overrides
```

### Theme Configuration
- Custom light and dark palettes
- Typography scale with Roboto font
- Component-level style overrides
- Spacing and breakpoint customization

### Usage Patterns
```tsx
// Using sx prop for styling
<Box sx={{ p: 2, bgcolor: 'background.paper' }}>

// Using styled components
const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
}));

// Using theme in components
const theme = useTheme();
```

## Consequences

### Positive
- Rapid development with pre-built components
- Consistent design language
- Built-in accessibility features
- Excellent TypeScript support
- Active community and documentation

### Negative
- Bundle size can be large without tree shaking
- Design may feel "Googly" without customization
- Learning curve for styling system

### Mitigations
- Use proper imports for tree shaking: `import Button from '@mui/material/Button'`
- Customize theme to match brand guidelines
- Create wrapper components for consistent patterns
