// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: [
    'expo',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
  ],
  plugins: ['unused-imports', 'import', 'prettier'],
  rules: {
    // Prettier integration
    'prettier/prettier': 'error',

    // Auto-remove unused imports
    'unused-imports/no-unused-imports': 'error',

    // Handle unused variables
    '@typescript-eslint/no-unused-vars': ['error'],
    'no-unused-vars': ['error'],

    // Import sorting and organization
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'object',
          'type',
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],

    // Fix the React Hook dependency warning
    'react-hooks/exhaustive-deps': 'warn',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
}
