#!/usr/bin/env node

import { execSync } from 'child_process'
import { createInterface } from 'readline'
import { existsSync, mkdirSync } from 'fs'
import { homedir } from 'os'
import { join } from 'path'
import { readdirSync } from 'fs'

// Create readline interface for user input
const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
})

// Helper function to execute commands and print output
function runCommand(command) {
  try {
    console.log(`Running: ${command}`)
    const output = execSync(command, { encoding: 'utf8' })
    console.log(output)
    return output
  } catch (error) {
    console.error(`Error executing command: ${command}`)
    console.error(error.message)
    return null
  }
}

// Helper function to ask questions
function askQuestion(question) {
  return new Promise((resolve) => {
    readline.question(question, (answer) => {
      resolve(answer)
    })
  })
}

// Helper function to find files by pattern
function findFiles(pattern) {
  try {
    const dir = '.'
    const files = readdirSync(dir)
    return files.filter((file) => {
      // Simple pattern matching (e.g., "build-*.app" -> starts with "build-" and ends with ".app")
      const [prefix, suffix] = pattern.split('*')
      return file.startsWith(prefix) && file.endsWith(suffix)
    })
  } catch (error) {
    console.error(
      `Error finding files matching pattern ${pattern}:`,
      error.message,
    )
    return []
  }
}

// Check if Maestro is installed
async function checkMaestro() {
  console.log('🎹 Maestro Local Testing Setup')
  console.log('===============================')

  try {
    execSync('maestro --version', { stdio: 'ignore' })
    console.log('Maestro CLI already installed ✅')
  } catch (error) {
    console.log('Installing Maestro CLI...')
    runCommand('curl -Ls "https://get.maestro.mobile.dev" | bash')

    // Add to PATH in shell config
    const homeDir = homedir()
    const maestroPath = join(homeDir, '.maestro', 'bin')
    const exportLine = `export PATH="$PATH":"${maestroPath}"`

    // Add to .zshrc if it exists
    if (existsSync(join(homeDir, '.zshrc'))) {
      runCommand(`echo '${exportLine}' >> ~/.zshrc`)
    }

    // Add to .bashrc if it exists
    if (existsSync(join(homeDir, '.bashrc'))) {
      runCommand(`echo '${exportLine}' >> ~/.bashrc`)
    }

    console.log('Maestro CLI installed!')
    console.log(`Please restart your terminal or run: ${exportLine}`)

    // Add to current session
    process.env.PATH = `${process.env.PATH}:${maestroPath}`
  }
}

// Check available devices
async function checkDevices() {
  console.log('\nChecking available devices:')

  console.log('\niOS Simulators:')
  try {
    runCommand('xcrun simctl list devices booted')
  } catch (error) {
    console.error(
      'Could not list iOS simulators. Make sure you have Xcode installed.',
    )
  }

  console.log('\nAndroid Devices:')
  try {
    runCommand('adb devices')
  } catch (error) {
    console.error(
      'Could not list Android devices. Make sure you have Android SDK installed.',
    )
  }
}

// Build for iOS
async function buildIOS() {
  console.log('\nBuilding for iOS Simulator...')
  runCommand('bun run build:dev:ios')

  // Find the built app file
  const iosAppFiles = findFiles('build-*.app')

  if (iosAppFiles.length > 0) {
    console.log(`Found iOS app: ${iosAppFiles[0]}`)
    console.log('Installing app on iOS Simulator...')
    runCommand(`xcrun simctl install booted ./${iosAppFiles[0]}`)
    console.log('iOS build complete and installed! ✅')
  } else {
    console.log(
      'No iOS app file found. The build may have failed or the app file is in a different location.',
    )
    console.log(
      'You can manually install it with: xcrun simctl install booted /path/to/your/app.app',
    )
  }
}

// Build for Android
async function buildAndroid() {
  console.log('\nBuilding for Android Emulator...')
  runCommand('bun run build:dev:android')

  // Find the built APK file
  const androidApkFiles = findFiles('build-*.apk')

  if (androidApkFiles.length > 0) {
    console.log(`Found Android APK: ${androidApkFiles[0]}`)
    console.log('Installing app on Android Emulator...')
    runCommand(`adb install ./${androidApkFiles[0]}`)
    console.log('Android build complete and installed! ✅')
  } else {
    console.log(
      'No APK file found. The build may have failed or the APK file is in a different location.',
    )
    console.log(
      'You can manually install it with: adb install /path/to/your/app.apk',
    )
  }
}

// Run tests
async function runTests(platform) {
  if (platform === 'ios') {
    console.log('Running tests on iOS...')
    runCommand('bun run e2e:dev:ios')
  } else if (platform === 'android') {
    console.log('Running tests on Android...')
    runCommand('bun run e2e:dev:android')
  } else {
    console.log(
      `You can run tests later with 'bun run e2e:dev:ios' or 'bun run e2e:dev:android'`,
    )
  }
}

// Main function
async function main() {
  // Create scripts directory if it doesn't exist
  if (!existsSync('scripts')) {
    mkdirSync('scripts')
  }

  // Check Maestro installation
  await checkMaestro()

  // Check available devices
  await checkDevices()

  // Ask which platform to build for
  console.log('\nWhich platform would you like to build for?')
  console.log('1) iOS Simulator')
  console.log('2) Android Emulator')
  console.log('3) Both')
  const platformChoice = await askQuestion('Enter your choice (1-3): ')

  // Build based on choice
  switch (platformChoice) {
    case '1':
      await buildIOS()
      break
    case '2':
      await buildAndroid()
      break
    case '3':
      await buildIOS()
      await buildAndroid()
      break
    default:
      console.log('Invalid choice. Exiting.')
      process.exit(1)
  }

  // Ask if user wants to run tests now
  console.log('\nWould you like to run Maestro tests now?')
  console.log('1) Yes, on iOS')
  console.log('2) Yes, on Android')
  console.log("3) No, I'll run them later")
  const testChoice = await askQuestion('Enter your choice (1-3): ')

  // Run tests based on choice
  switch (testChoice) {
    case '1':
      await runTests('ios')
      break
    case '2':
      await runTests('android')
      break
    case '3':
      await runTests('none')
      break
    default:
      console.log('Invalid choice. Exiting.')
      process.exit(1)
  }

  console.log(
    '\n🎉 Setup complete! For more information on Maestro testing, see .maestro/LOCAL_TESTING.md',
  )

  // Close readline interface
  readline.close()
}

// Run the main function
main().catch((error) => {
  console.error('An error occurred:', error)
  process.exit(1)
})
