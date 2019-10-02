module.exports = {
  root: true,
  extends: '@react-native-community',
  overrides: [
    {
      files: ['*.jsx'],
      parser: 'babel-eslint',
      plugins: ['flowtype'],
      rules: {
        'flowtype/define-flow-type': 1,
        'flowtype/use-flow-type': 1,
      },
    },
  ],
};
