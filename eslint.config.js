import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import eslintPluginAstro from 'eslint-plugin-astro';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const astroFiles = ['**/*.astro'];
const tsFiles = ['**/*.{ts,tsx,mts,cts}', '**/*.astro/*.ts', '**/*.astro/*.js'];
const importSortFiles = [...tsFiles, ...astroFiles];

const importSortGroups = [
  ['^\\u0000'],
  ['^node:'],
  ['^@(?!/)', '^[^@./\\u0000]'],
  ['^@/components', '^@/layouts', '^@/data', '^@/lib', '^@/types', '^@/assets', '^@/styles', '^@/pages', '^@/'],
  ['^\\.'],
  ['^.+\\u0000$'],
];

export default defineConfig(
  js.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  ...eslintPluginAstro.configs['jsx-a11y-recommended'],
  {
    files: astroFiles,
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: ['.astro'],
      },
    },
  },
  ...tseslint.configs.recommended.map(conf => ({
    ...conf,
    files: tsFiles,
  })),
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    files: importSortFiles,
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': ['warn', { groups: importSortGroups }],
      'simple-import-sort/exports': 'warn',
    },
  },
  {
    files: tsFiles,
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
  },
  {
    ignores: ['dist', 'node_modules', '.github', '.astro', '.cursor', '.fallow'],
  },
);
