# ADR-007: i18next for Internationalization

## Status
Accepted

## Context

We need internationalization (i18n) support for:
- Multiple languages (English, Spanish)
- Runtime language switching
- Date and number formatting
- Namespace organization
- TypeScript integration

### Options Considered

1. **react-intl (FormatJS)**
   - Pros: ICU message format, comprehensive
   - Cons: More complex setup, larger bundle

2. **i18next + react-i18next** (Selected)
   - Pros: Simple, flexible, good ecosystem
   - Cons: Less strict formatting standards

3. **LinguiJS**
   - Pros: ICU format, extraction tools
   - Cons: Smaller community

## Decision

We will use **i18next with react-i18next**, with translations in single JSON files per language.

### Implementation

```
src/i18n/
├── index.ts           # i18n configuration
└── locales/
    ├── en.json        # English translations
    └── es.json        # Spanish translations
```

### Configuration

```typescript
// src/i18n/index.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import es from './locales/es.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    es: { translation: es },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});
```

### Translation Structure

```json
// en.json
{
  "common": {
    "save": "Save",
    "cancel": "Cancel",
    "delete": "Delete"
  },
  "auth": {
    "login": "Login",
    "logout": "Logout",
    "welcome": "Welcome, {{name}}!"
  },
  "errors": {
    "required": "This field is required",
    "invalidEmail": "Invalid email format"
  }
}
```

### Usage

```tsx
import { useTranslation } from 'react-i18next';

function Component() {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <h1>{t('auth.welcome', { name: 'John' })}</h1>
      <button onClick={() => i18n.changeLanguage('es')}>
        Español
      </button>
    </div>
  );
}
```

### Language Switching

```tsx
// Header component
function LanguageSwitcher() {
  const { i18n } = useTranslation();
  
  return (
    <Select
      value={i18n.language}
      onChange={(e) => i18n.changeLanguage(e.target.value)}
    >
      <MenuItem value="en">English</MenuItem>
      <MenuItem value="es">Español</MenuItem>
    </Select>
  );
}
```

## Consequences

### Positive
- Simple setup and API
- Runtime language switching
- Interpolation for dynamic values
- TypeScript support with type definitions
- Small bundle with tree shaking

### Negative
- Single file per language can get large
- No built-in extraction tools
- ICU format not enforced

### Mitigations
- Organize translations by feature/namespace
- Use consistent key naming conventions
- Consider namespace splitting if files grow large
