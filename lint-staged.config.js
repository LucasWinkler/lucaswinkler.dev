export default {
  '*.{ts,tsx,mts,cts}': ['eslint --fix', 'prettier --write'],
  '*.astro': ['eslint --fix', 'prettier --write'],
  '*.{js,mjs,cjs}': ['eslint --fix', 'prettier --write'],
  '*.css': 'prettier --write',
  '*.{json,md,yml,yaml}': 'prettier --write',
};
