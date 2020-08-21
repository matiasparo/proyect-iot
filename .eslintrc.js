module.exports = {
    env: {
      node: true,
      es6: true,
    },
    root: true,
    parser: 'eslint/parser',
    plugins: ['eslint', 'import'],
    extends: [
      'eslint:recommended',
      'plugin:eslint/eslint-recommended',
      'plugin:eslint/recommended',
      'prettier/eslint',
      'plugin:import/errors',
      'plugin:import/warnings',
    ],
    rules: {
      'max-classes-per-file': ['error', 1],
      'no-console': 0,
      'no-new': 0,
      'no-nested-ternary': 0,
      'no-unused-vars': ['error', { varsIgnorePattern: '^_' }],
      'no-underscore-dangle': 0,
      'array-callback-return': 1,
      'no-return-assign': 0,
      'no-param-reassign': 0,
      'global-require': 0,
      // IMPORT
      'import/prefer-default-export': 0,
      'import/no-dynamic-require': 0,
      'import/named': 2,
      'import/namespace': 2,
      'import/default': 2,
      'import/export': 2,
      'import/no-unresolved': 0,
      'import/order': [
        'error',
        {
          'newlines-between': 'always',
          groups: ['external', 'internal', 'index', 'sibling', 'parent', 'builtin'],
        },
      ],
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: true,
          optionalDependencies: false,
          peerDependencies: false,
        },
      ],
    },
  };
  