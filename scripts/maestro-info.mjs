#!/usr/bin/env node

import { execSync } from 'child_process'

console.log('🎹 Maestro Information')
console.log('=====================')

// Helper function to execute commands and print output
function runCommand(command) {
  try {
    console.log(`\n> ${command}`)
    const output = execSync(command, { encoding: 'utf8' })
    console.log(output)
    return output
  } catch (error) {
    console.error(`Error executing command: ${command}`)
    console.error(error.message)
    return null
  }
}

// Check Maestro version
console.log('\nChecking Maestro version:')
runCommand('maestro --version')

// Check Maestro help
console.log('\nChecking available Maestro commands:')
runCommand('maestro --help')

// Check device information
console.log('\nChecking available devices:')
console.log('\n> iOS Simulators:')
try {
  runCommand('xcrun simctl list devices booted')
} catch (error) {
  console.error('Could not list iOS simulators')
}

console.log('\n> Android Devices:')
try {
  runCommand('adb devices')
} catch (error) {
  console.error('Could not list Android devices')
}

// Check start-device command
console.log('\nChecking start-device command options:')
runCommand('maestro start-device --help')

// Check if we can run tests
console.log('\nChecking test command options:')
runCommand('maestro test --help')

console.log('\n🎉 Maestro information gathering complete!')
