module.exports = {
  globals: {
    'SyntheticEvent' : true,
    'document' : true,
    'window' : true,
    'redux-agnostic-connect': true,
  },
  env: {
    es6: true,
    jest: true
  },
  parser: 'babel-eslint',
  extends: [
    'airbnb',
    'plugin:import/recommended'
  ],
  plugins: [
    'babel',
    'import',
    'jsx-a11y',
    'flowtype',
    'jest',
    'react'
  ],
  'rules': {
    'arrow-parens': ['error', 'as-needed', { 'requireForBlockBody': false }],
    'no-return-assign': ['error', 'except-parens'],
    'import/no-unresolved': [2, { ignore: ['^@'] }],
    // should be 2, {ignorePackages: true} when next version (after 2.8.0) of eslint-plugin-import will be publishe
    'import/extensions': [0], 
    'no-param-reassign': ["error", { "ignorePropertyModificationsFor": ["item"] }],
    'import/no-extraneous-dependencies': 0,
    'import/prefer-default-export': 0,
    'no-multiple-empty-lines': [
      'error',
      {
        'max': 1,
        'maxEOF': 1
      }
    ],
    'no-underscore-dangle': 0,
    'react/jsx-filename-extension': [1, {
      'extensions': ['.js', '.jsx']
    }],
    'react/no-array-index-key': 'warn',
    'max-len': [2, 120, 4],
    'flowtype/boolean-style': [
      2,
      'boolean'
    ],
    'flowtype/define-flow-type': 1,
    'flowtype/generic-spacing': [
      2,
      'never'
    ],
    'flowtype/no-primitive-constructor-types': 2,
    'flowtype/no-weak-types': 2,
    'flowtype/object-type-delimiter': [
      2,
      'comma'
    ],
    'flowtype/require-parameter-type': [
      2,
      {
        'excludeArrowFunctions': true,
      }
    ],
    'flowtype/require-return-type': [
      2,
      'always',
      {
        'excludeArrowFunctions': true,
        'excludeMatching': [
          'render',
        ],
        'annotateUndefined': 'never'
      }
    ],
    'flowtype/require-valid-file-annotation': 2,
    'flowtype/semi': [
      2,
      'always'
    ],
    'flowtype/space-after-type-colon': [
      2,
      'always'
    ],
    'flowtype/space-before-generic-bracket': [
      2,
      'never'
    ],
    'flowtype/space-before-type-colon': [
      2,
      'never'
    ],
    // 'flowtype/type-id-match': [
    //   2,
    //   '^([A-Z][a-z0-9]+)$'
    // ],
    'flowtype/union-intersection-spacing': [
      2,
      'always'
    ],
    'flowtype/use-flow-type': 1,
    'flowtype/valid-syntax': 1
    // 'jest/no-disabled-tests': 'warn',
    // 'jest/no-focused-tests': 'error',
    // 'jest/no-identical-title': 'error',
    // 'jest/valid-expect': 'error'
  },
  'settings': {
    'flowtype': {
      'onlyFilesWithFlowAnnotation': false
    }
  }
}
