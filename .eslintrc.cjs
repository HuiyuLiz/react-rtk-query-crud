module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'standard-with-typescript',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended'
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname
  },
  plugins: ['react', '@typescript-eslint', 'react-hooks', 'prettier'],
  rules: {
    indent: [2, 2],
    'react/jsx-max-props-per-line': [2, { maximum: { single: 3, multi: 1 } }],
    'react/jsx-wrap-multilines': 2,
    semi: 2,
    'no-var': 'error',
    'no-undef': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto'
      }
    ],
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-no-target-blank': 'off',
    '@typescript-eslint/explicit-function-return-type': ['off'],
    '@typescript-eslint/no-non-null-assertion': 'off'
  },
  ignorePatterns: [".eslintrc.cjs", "vite.config.ts"]
}
