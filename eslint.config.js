import js from '@eslint/js';
import globals from 'globals';
import prettierConfig from 'eslint-config-prettier';
export default [
  {
    ignores: ['dist/**', 'node_modules/**', '.vscode/**'],
  },
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
      'prefer-const': 'error',
      'no-var': 'error',
    },
  },
  prettierConfig,
];
