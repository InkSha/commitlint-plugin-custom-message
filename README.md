# commitlint-plugin-custom-message

This is commitlint plugin, through this, user can custom commitlint error message.

## Install

```bash
npm install --save-dev commitlint-plugin-custom-message @commitlint/cli @commitlint/config-conventional @commitlint/types @commitlint/rules
```

## Usage

```js
// commitlint.config.js

import buildCustomMessage from 'commitlint-plugin-custom-message'

export default {
  // ...
  plugins: [
    buildCustomMessage({
      // custom message rule key need add '-message' suffix
      'subject-empty-message': 'you need input subject',
      'type-empty-message': 'you need input commit type',
    }),
  ],
}

// > commitlint --config commitlint.config.js --edit .git/COMMIT_EDITMSG
//
// ⧗   input: test
// ✖   you need input subject [subject-empty]
// ✖   you need input commit type [type-empty]
//
// ✖   found 2 problems, 0 warnings
// ⓘ   Get help: https://github.com/conventional-changelog/commitlint/#what-is-commitlint
```
