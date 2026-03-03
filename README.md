# Life OS

A cross-platform mobile application built with [Expo](https://expo.dev) and [React Native](https://reactnative.dev), targeting iOS, Android, and Web.

## Project Status

### Features

| Feature | Status | Notes |
| --- | --- | --- |
| Tab Navigation | ✅ Done | Bottom tabs: Home & Settings |
| Theme Switching | ✅ Done | System / Dark / Light with AsyncStorage persistence |
| Responsive Layout | ✅ Done | Scaling utilities based on device dimensions |
| Design Tokens | ✅ Done | Colors, spacing, typography, responsive helpers |
| Error Boundary | ✅ Done | Catches render errors with recovery UI |
| Accessibility | ✅ Done | ARIA labels, roles, screen reader hints |
| E2E Tests (Maestro) | ✅ Done | App flow & theme switching (disabled in CI) |
| Unit Tests | ✅ Done | Jest + React Native Testing Library |

### Tech Stack

- **Framework:** Expo ~52 with Expo Router (file-based routing)
- **Language:** TypeScript (strict mode)
- **React:** 18.3 · **React Native:** 0.76 (New Architecture enabled)
- **Package Manager:** Bun

### Architecture

```
src/
├── app/            # Expo Router screens & layouts
│   ├── (tabs)/     # Tab group (Home, Settings)
│   ├── theme-settings.tsx
│   └── +not-found.tsx
├── components/     # Reusable UI (ThemedText, ThemedView, ThemeCard, ErrorBoundary)
├── theme/          # Design tokens (colors, spacing, typography, responsive)
│   └── hooks/      # useTheme, useColorScheme, useThemeColor
└── lib/test/       # Test utilities & mocks
```

### Quality & CI

| Check | Tool | Trigger |
| --- | --- | --- |
| Linting | ESLint (18+ plugins) | Pre-commit & CI |
| Type Checking | TypeScript strict | Pre-commit & CI |
| Formatting | Prettier | Pre-commit |
| Unused Code | Knip | Pre-commit & CI |
| Unit Tests | Jest + RNTL | Pre-push & CI |
| Secrets Scan | GitLeaks | CI |
| E2E Tests | Maestro | CI (currently disabled) |
| Builds | EAS Build | CI (main branch) |

Git hooks are managed by [Lefthook](https://github.com/evilmartians/lefthook).

## Quick Start

```bash
# Install dependencies
bun install

# Start the app
bun start
```

## Scripts

```bash
# Development
bun start            # Start Expo dev server
bun ios              # Run on iOS
bun android          # Run on Android
bun web              # Run on Web

# Quality
bun lint             # ESLint
bun lint:fix         # ESLint auto-fix
bun format           # Prettier
bun typecheck        # TypeScript check
bun run:knip         # Unused code detection

# Testing
bun test             # Run unit tests
bun test:watch       # Watch mode
bun test:coverage    # Coverage report
bun e2e:local        # Run Maestro E2E tests locally

# Build
bun prebuild                   # Expo prebuild
bun build:dev:ios              # Local iOS dev build
bun build:dev:android          # Local Android dev build
```
