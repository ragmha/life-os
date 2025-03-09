# Testing Maestro Locally

This guide will help you set up and run Maestro tests locally on your development machine.

## Prerequisites

- Node.js installed
- iOS Simulator or Android Emulator running
- EAS CLI installed

## Quick Setup

The easiest way to get started is to run the setup script:

```bash
bun run e2e:setup
```

This interactive script will:

1. Install Maestro CLI if needed
2. Check available devices
3. Guide you through building and installing the app
4. Help you run the tests

## Manual Setup

If you prefer to set things up manually, follow these steps:

### Step 1: Install Maestro CLI

```bash
curl -Ls "https://get.maestro.mobile.dev" | bash
```

Add Maestro to your PATH:

```bash
export PATH="$PATH":"$HOME/.maestro/bin"
```

### Step 2: Check Available Devices

For iOS:

```bash
xcrun simctl list devices booted
```

For Android:

```bash
adb devices
```

### Step 3: Build Development Client

#### For iOS Simulator

```bash
# Build for iOS Simulator
bun run build:dev:ios
```

This will create a `.app` file in your project directory.

#### For Android Emulator

```bash
# Build for Android Emulator
bun run build:dev:android
```

This will create an `.apk` file in your project directory.

### Step 4: Install the App

#### For iOS Simulator

```bash
# Extract the tar file if needed
tar -xvzf build-*.tar.gz

# Install on iOS Simulator
bun run install:ios
```

#### For Android Emulator

```bash
# Install on Android Emulator
bun run install:android
```

## Running Tests

### Debug Test

To verify that Maestro can find and launch your app:

```bash
bun run e2e:debug
```

This will launch your app, take screenshots, and log information about the app and device.

### Running All Tests

```bash
# Run all tests
bun run e2e:local
```

## Troubleshooting

### App Not Found

If Maestro can't find your app, make sure:

1. The `appId` in your Maestro test files matches the bundle identifier in `app.json`
2. The app is properly installed on the simulator/emulator
3. You have a running simulator/emulator

### Test Failures

If tests are failing:

1. Check that the UI elements you're asserting or tapping on actually exist
2. Try running the app manually to verify it works
3. Use `maestro studio` to help build your tests interactively

### Device Not Found

If Maestro can't find your device:

1. Make sure the simulator/emulator is running
2. Check available devices with:
   ```bash
   bun run e2e:devices
   ```

## Advanced Usage

### Recording Tests with Maestro Studio

Maestro Studio provides a UI for recording and editing tests:

```bash
maestro studio
```

### Running Specific Tests

To run a specific test file:

```bash
maestro test .maestro/home_screen.yaml
```

### Getting Maestro Information

To check your Maestro installation and available commands:

```bash
bun run e2e:info
```
