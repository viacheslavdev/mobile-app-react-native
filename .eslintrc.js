import globals from 'globals';
import tseslintParser from '@typescript-eslint/parser';


export default {
  parser: tseslintParser,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended'
  ],
  plugins: [
    '@typescript-eslint',
    'react'
  ],
  settings: {
    react: {
      version: 'detect'
    },
    'import/resolver': {
      alias: {
        map: [
          ['@', './src']
        ],
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  },
  rules: {
    'react/react-in-jsx-scope': 'off', 
    '@typescript-eslint/no-unused-vars': 'warn',
    'react/prop-types': 'off'
  },
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  globals: {
    ...globals.browser
  }
};
