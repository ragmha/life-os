/** @type {import('knip').KnipConfig} */
module.exports = {
  // Entry points for the application
  entry: [
    'app/**/*.{ts,tsx}',
    'components/**/*.{ts,tsx}',
    'constants/**/*.{ts,tsx}',
    'hooks/**/*.{ts,tsx}',
    'src/**/*.{ts,tsx}',
  ],

  // Project files to analyze
  project: ['**/*.{ts,tsx}'],

  // Dependencies to ignore (React Native and Expo related dependencies that might be used indirectly)
  ignoreDependencies: [
    'expo-*',
    'react-native-*',
    'react-dom',
    'eslint-plugin-react',
  ],

  // Exports used in the same file that should be ignored
  ignoreExportsUsedInFile: true,

  // Files to ignore during analysis
  ignore: [
    // Test files
    '**/*.test.{ts,tsx}',
    '**/*.spec.{ts,tsx}',
    'test/**',
    'jest.config.js',
    'jest.setup.ts',

    // Build and config files
    'babel.config.js',
    'metro.config.js',
    'app.json',
    'eas.json',

    // Types
    'types/**',
    '**/*.d.ts',
  ],

  // Binaries that are used but not listed in package.json
  ignoreBinaries: ['maestro', 'eas', 'xcrun', 'adb'],
}
