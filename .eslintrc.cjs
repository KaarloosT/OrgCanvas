module.exports = {
  root: true,
  env: { node: true, browser: true, es2021: true },
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:react/recommended', 'plugin:jsx-a11y/recommended', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaFeatures: { jsx: true }, ecmaVersion: 2022, sourceType: 'module' },
  settings: { react: { version: 'detect' } },
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
    'import/prefer-default-export': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
  },
};
