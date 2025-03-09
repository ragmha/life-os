# Maestro E2E Tests

This directory contains end-to-end tests using [Maestro](https://maestro.mobile.dev/).

## Getting Started

1. Install Maestro CLI:

   ```bash
   curl -Ls "https://get.maestro.mobile.dev" | bash
   ```

2. Add Maestro to your PATH:
   ```bash
   export PATH="$PATH":"$HOME/.maestro/bin"
   ```

## Running Tests Locally

To run all tests locally:

```bash
npm run e2e:local
# or
bun run e2e:local
```

To run a specific test:

```bash
maestro test .maestro/home_screen.yaml
```

## Writing Tests

Maestro tests are written in YAML. Here's a basic structure:

```yaml
appId: io.raghib.lifeos
---
- launchApp
- assertVisible: 'Text to look for'
- tapOn: 'Button to tap'
- takeScreenshot: screenshot-name
```

For more information on Maestro commands, see the [Maestro documentation](https://maestro.mobile.dev/api-reference/commands).

## CI/CD Integration

The tests are automatically run in CI/CD using GitHub Actions. The workflow is defined in `.github/workflows/ci-cd.yml`.

## EAS Build Integration

To build and run tests on EAS:

```bash
# Build for iOS
npm run e2e:build:ios

# Build for Android
npm run e2e:build:android

# Run tests on both platforms
npm run e2e:test
```
