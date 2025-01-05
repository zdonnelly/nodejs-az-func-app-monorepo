// @ts-check
import stylistic from '@stylistic/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
  {
    plugins: {
      '@stylistic': stylistic,
    },
    files: ['**/*.[jt]s'],
    languageOptions: {
      parser: tsParser,
    },
    rules: {
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/quotes': ['error', 'single'],
    },
  },
];