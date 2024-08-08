module.exports = {
  "**/*.{js,ts}": [
    "eslint src/** --fix"
    'prettier --write ./src/**',
  ],
}
