# parcel-plugin-replace

## Q:What is this thing solving?

Simple Parcel plugin that transforms output files.

## Install

```
npm i parcel-plugin-wrapper -D
```

## Usage

Create a `.parcel-plugin-replace.js` file in the root folder of your project.

#### Example 1, add some data coming from package.json:

```javascript
const path = require('path')

const yourAssetReplacer = async ({name, bundler}) => {
  // name = app.ere76r5e76r5e76r.js
  if (name.split('.').pop() === 'js') {
    return (assetText) => {
      return assetText.replace('abc', 'xyz')
    }
  }
}

module.exports = yourAssetReplacer
```
