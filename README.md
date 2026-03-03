# Life OS

A personal life management mobile application built with React Native and Expo, targeting iOS, Android, and Web platforms.

## Project Status

🟢 **Active Development** — v1.0.0

| Area                | Status |
| ------------------- | ------ |
| Core App Structure  | ✅ Complete |
| Theme System        | ✅ Complete (light/dark/system modes with persistence) |
| Navigation          | ✅ Complete (tab-based with Home and Settings) |
| CI/CD Pipeline      | ✅ Active (lint, type-check, test, build via GitHub Actions) |
| Unit Testing        | 🟡 In Progress (infrastructure ready, expanding coverage) |
| E2E Testing         | 🟡 In Progress (Maestro tests written, CI integration pending) |
| Production Builds   | ✅ Configured (EAS preview and production profiles) |

## Tech Stack

- **Framework:** Expo 52 + React Native 0.76 + React 18.3
- **Language:** TypeScript
- **Routing:** Expo Router v4
- **Navigation:** React Navigation (bottom tabs)
- **Storage:** React Native Async Storage
- **Build & Deploy:** Expo Application Services (EAS)
- **Testing:** Jest + Testing Library (unit), Maestro (E2E)
- **Code Quality:** ESLint, Prettier, Knip (unused code detection), Lefthook (git hooks)
- **Package Manager:** Bun (Node 22+)

## Project Structure

```
src/
├── app/                    # Expo Router pages
│   ├── (tabs)/             # Tab-based navigation (Home, Settings)
│   ├── theme-settings.tsx  # Theme selection screen
│   └── _layout.tsx         # Root layout with providers
├── components/             # Reusable UI components
│   ├── ui/                 # Theme cards, containers, tab bar
│   ├── themed-text.tsx     # Theme-aware text component
│   ├── themed-view.tsx     # Theme-aware view component
│   └── error-boundary.tsx  # Error boundary with fallback UI
├── theme/                  # Design system
│   ├── colors.ts           # Light/dark color palettes
│   ├── typography.ts       # Font sizes, weights, text styles
│   ├── spacing.ts          # Spacing tokens and helpers
│   ├── responsive.ts       # Responsive scaling utilities
│   └── hooks/              # useTheme, useThemeColor, useColorScheme
└── lib/                    # Test utilities and mocks
```

## Quick Start

```bash
# Install dependencies
bun install

# Start the app
bun start
```

## Development Scripts

| Command                   | Description |
| ------------------------- | ----------- |
| `bun start`               | Start Expo dev server |
| `bun run ios`             | Run on iOS |
| `bun run android`         | Run on Android |
| `bun run web`             | Run on Web |
| `bun test`                | Run unit tests |
| `bun run test:coverage`   | Run tests with coverage |
| `bun run lint`            | Run ESLint |
| `bun run typecheck`       | Run TypeScript type checking |
| `bun run run:knip`        | Detect unused code |
| `bun run format`          | Format code with Prettier |
| `bun run e2e:local`       | Run Maestro E2E tests locally |

## CI/CD

The project uses GitHub Actions (`.github/workflows/ci-cd.yml`) with the following pipeline:

1. **Secrets Scan** — GitLeaks scans for leaked credentials
2. **Lint & Test** — ESLint, TypeScript type-check, Knip, Jest with coverage
3. **E2E Tests** — Maestro tests (iOS/Android CI integration pending)
4. **Build & Publish** — EAS preview builds on push to `main`
