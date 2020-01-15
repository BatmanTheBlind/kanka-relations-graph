module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
  ],
  rules: {
    'vue/no-v-html': 'off',
    'semi': ['error', 'never'],
    'no-console': ['error', { 'allow': ['log', 'warn', 'error'] }],
    'no-unused-vars': ['error', {
      'args': 'none'
    }],
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
