module.exports = {
  env: {
    browser: false,
    es2021: true,
    mocha: true,
    node: true,
  },
  plugins: ['@typescript-eslint'],
  extends: ['standard', 'plugin:prettier/recommended', 'plugin:node/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
  },
  'prettier.singleQuote': true,
  'prettier/prettier': ['error', { singleQuote: true, parser: 'flow' }],
  rules: {
    quotes: [2, 'single', { avoidEscape: true }],
    'node/no-unsupported-features/es-syntax': ['error', { ignores: ['modules'] }],
  },
};
