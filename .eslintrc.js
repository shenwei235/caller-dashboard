// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true
    }
  },
  env: {
    browser: true,
  },
  globals: {
    Qiniu: true,
    plupload: true,
    $: true
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'semi': ['error', 'always'],
    'space-before-function-paren': 0,
    'no-tabs': 0,
    'eol-last': 0,
    'no-extend-native': 0,
    'indent': 0,
    'quotes': 0,
    'eqeqeq': 0,
    'no-useless-escape': 0
  }
}
