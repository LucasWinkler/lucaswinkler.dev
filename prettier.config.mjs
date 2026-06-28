export default {
  plugins: ['prettier-plugin-astro'],
  printWidth: 120,
  semi: true,
  useTabs: false,
  tabWidth: 2,
  singleQuote: true,
  jsxSingleQuote: true,
  arrowParens: 'avoid',
  bracketSameLine: true,
  htmlWhitespaceSensitivity: 'ignore',
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
};
