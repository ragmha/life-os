// https://docs.expo.dev/guides/using-eslint/
// eslint.config.js
import unicorn from 'eslint-plugin-unicorn'
import globals from 'globals'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import importPlugin from 'eslint-plugin-import'
import prettierPlugin from 'eslint-plugin-prettier'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import reactNativePlugin from 'eslint-plugin-react-native'
import unusedImportsPlugin from 'eslint-plugin-unused-imports'
import prettierConfig from 'eslint-config-prettier'

export default [
  // Ignore patterns (migrated from .eslintignore)
  {
    ignores: [
      'node_modules/',
      '.expo/',
      'dist/',
      'web-build/',
      '*.lock',
      '*.log',
      'expo-env.d.ts',
    ],
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parser: typescriptParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
      import: importPlugin,
      prettier: prettierPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'react-native': reactNativePlugin,
      'unused-imports': unusedImportsPlugin,
      unicorn: unicorn,
    },
    rules: {
      // Prettier integration
      'prettier/prettier': 'error',

      // Auto-remove unused imports
      'unused-imports/no-unused-imports': 'error',

      // Handle unused variables
      '@typescript-eslint/no-unused-vars': ['off'],
      'no-unused-vars': ['off'],
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],

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

      // React Native specific rules
      'react-native/no-unused-styles': 'warn',
      'react-native/no-inline-styles': 'warn',
      'react-native/no-color-literals': 'warn',
      'react-native/no-raw-text': [
        'warn',
        { skip: ['ThemedText', 'themed-text'] },
      ],

      // React specific rules
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react/jsx-curly-brace-presence': [
        'warn',
        { props: 'never', children: 'never' },
      ],

      // Performance rules
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // TypeScript specific rules
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'warn',

      // Unicorn rules (selected subset)
      'unicorn/better-regex': 'error',
      'unicorn/catch-error-name': 'error',
      'unicorn/error-message': 'error',
      'unicorn/filename-case': [
        'error',
        { case: 'kebabCase', ignore: ['_layout.tsx', '\\+not-found.tsx'] },
      ],
      'unicorn/no-array-for-each': 'error',
      'unicorn/prefer-array-find': 'error',
      'unicorn/prefer-array-flat-map': 'error',
      'unicorn/prefer-includes': 'error',
      'unicorn/prefer-string-slice': 'error',

      // Add prettier rules to avoid conflicts
      ...prettierConfig.rules,
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
          extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        },
      },
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: [
      '_layout.tsx',
      '\\+not-found.tsx',
      'app/_layout.tsx',
      'app/\\+not-found.tsx',
      'app/(tabs)/_layout.tsx',
    ],
    rules: {
      'unicorn/filename-case': 'off',
    },
  },
]
