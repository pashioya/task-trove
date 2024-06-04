// @ts-check

/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
  env: {
    es2021: true,
    browser: true,
    'react-native/react-native': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/strict',
    'plugin:@typescript-eslint/strict-type-checked',
    'plugin:@typescript-eslint/stylistic',
    'plugin:import/recommended',
    'universe/native',
  ],
  parserOptions: {
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  parser: '@typescript-eslint/parser',
  plugins: [
    'react',
    'react-native',
    'prettier',
    '@typescript-eslint',
    'promise',
    'react-hooks',
    'import',
  ],
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'promise/catch-or-return': 'error',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/consistent-type-imports': 'warn',
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    '@typescript-eslint/no-unsafe-enum-comparison': 'off',
    '@typescript-eslint/no-confusing-void-expression': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    'react-native/no-inline-styles': 'off',
    'no-duplicate-imports': 'error',
    'import/no-named-as-default': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'all',
        ignoreRestSiblings: false,
        caughtErrors: 'all',
      },
    ],

    'import/order': 0,
    'import/namespace': 0,
    'import/no-unresolved': [2, { ignore: ['^~'] }],
  },
  settings: {
    react: {
      version: 'detect',
    },
    paths: {
      '@/*': ['./*'],
      '~/*': ['*'],
    },
  },
};
