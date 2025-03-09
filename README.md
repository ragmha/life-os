# Life OS

## Quick Start

```bash
# Install dependencies
bun install

# Start the app
bun start
```

## Building the App

This project uses Expo Application Services (EAS) to handle builds. Build artifacts are not stored in Git.

### Development Builds

```bash
# iOS Simulator
bun run build:dev:ios

# Android Emulator
bun run build:dev:android
```

### Installing Development Builds

```bash
# iOS Simulator
bun run install:ios

# Android Emulator
bun run install:android
```

### Production Builds

Production builds are handled through EAS and our CI/CD pipeline:

```bash
# Build for internal distribution
eas build --platform all --profile preview

# Build for production
eas build --platform all --profile production
```

## Build Artifacts

Build artifacts (.app, .ipa, .apk, etc.) are excluded from Git via .gitignore. Instead:

- Development builds are created locally and installed directly on simulators/emulators
- CI/CD builds are stored as GitHub Actions artifacts
- Release builds are managed through EAS and can be downloaded from the EAS dashboard

## Git Hooks with Lefthook

This project uses [Lefthook](https://github.com/evilmartians/lefthook) to manage Git hooks. Lefthook automatically runs checks before commits and pushes to ensure code quality.

### Available Hooks

- **pre-commit**: Runs linting, type checking, and formatting on staged files
- **pre-push**: Runs tests before pushing to remote

### Commands

```bash
# Run pre-commit hooks manually
bun lefthook run pre-commit

# Run pre-push hooks manually
bun lefthook run pre-push

# Reinstall hooks (if needed)
bun lefthook:install

# Uninstall hooks
bun lefthook:uninstall
```

## E2E Testing

For end-to-end testing with Maestro, see [.maestro/README.md](.maestro/README.md).
