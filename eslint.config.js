import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier: prettierPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': 'warn',
      'prettier/prettier': 'error',
      '@typescript-eslint/no-explicit-any': 'off', // 关闭显式 any 报错
      '@typescript-eslint/no-unsafe-argument': 'off', // 关闭 any 作为参数报错
      '@typescript-eslint/no-unsafe-assignment': 'off', // 关闭 any 赋值报错
      '@typescript-eslint/no-unsafe-member-access': 'off', // 关闭 any 属性访问报错
    },
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    ignores: ['dist'],
  },
  prettierConfig,
];
