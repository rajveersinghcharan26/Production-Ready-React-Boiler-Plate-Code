# ADR-006: React Hook Form for Form Handling

## Status
Accepted

## Context

We need a form handling solution that:
- Handles complex forms with many fields
- Provides performant re-renders
- Supports validation without external schemas
- Integrates with Material UI components
- Is TypeScript friendly

### Options Considered

1. **Controlled components with useState**
   - Pros: Simple, no dependencies
   - Cons: Re-render on every change, boilerplate

2. **Formik + Yup**
   - Pros: Popular, comprehensive
   - Cons: Larger bundle, mandatory schema library

3. **React Hook Form** (Selected)
   - Pros: Performant, flexible validation, small bundle
   - Cons: Different mental model (uncontrolled)

4. **React Hook Form + Zod**
   - Pros: Type-safe schemas
   - Cons: Additional dependency

## Decision

We will use **React Hook Form** with its built-in validation (no Yup/Zod dependency).

### Implementation

```tsx
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button } from '@mui/material';

interface FormData {
  email: string;
  password: string;
}

function LoginForm() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    await loginUser(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="email"
        control={control}
        rules={{
          required: 'Email is required',
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Invalid email format',
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Email"
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        )}
      />
      
      <Button type="submit" disabled={isSubmitting}>
        Login
      </Button>
    </form>
  );
}
```

### Validation Patterns

```typescript
// Built-in rules
rules={{
  required: 'This field is required',
  minLength: { value: 8, message: 'Min 8 characters' },
  maxLength: { value: 100, message: 'Max 100 characters' },
  pattern: { value: /regex/, message: 'Invalid format' },
  validate: (value) => value > 0 || 'Must be positive',
}}

// Custom validation
rules={{
  validate: {
    notEmpty: (v) => v.trim() !== '' || 'Cannot be empty',
    isEmail: (v) => isValidEmail(v) || 'Invalid email',
    matchPassword: (v) => v === getValues('password') || 'Passwords must match',
  },
}}
```

### MUI Integration with Controller

```tsx
// Always use Controller for MUI components
<Controller
  name="role"
  control={control}
  render={({ field }) => (
    <Select {...field}>
      <MenuItem value="admin">Admin</MenuItem>
      <MenuItem value="user">User</MenuItem>
    </Select>
  )}
/>
```

## Consequences

### Positive
- Minimal re-renders (uncontrolled inputs)
- Small bundle size (~9kb)
- Flexible validation without schema library
- Excellent TypeScript support
- Works well with MUI via Controller

### Negative
- Controller needed for MUI components (slight overhead)
- Different mental model from controlled forms
- Complex validation logic can get verbose

### Mitigations
- Create reusable form field components
- Document common validation patterns
- Use consistent Controller patterns
