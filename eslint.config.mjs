import firebaseRulesPlugin from '@firebase/eslint-plugin-security-rules';

export default [
  {
    ignores: ['dist/**/*', 'android/**/*', 'node_modules/**/*', 'release-apk/**/*']
  },
  firebaseRulesPlugin.configs['flat/recommended']
];
