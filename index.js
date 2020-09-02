const path = require('path')
const fs = require('fs')
const logger = require('@parcel/logger')

module.exports = function (bundler) {
  const readAsset = (path) => {
    try {
      return fs.readFileSync(path, 'utf8')
    } catch (e) {
      logger.error('file is invalid')
      throw e
    }
  }

  const writeAsset = (name, replace = (x) => x) => {
    try {
      const replaced = replace(readAsset(name))

      fs.writeFileSync(name, replaced)
    } catch (error) {
      logger.error('there was an error in your replace')
      throw e
    }
  }

  const processAsset = async (bundle, processFn) => {
    const {name} = bundle

    if (name !== undefined) {
      const wrappingCode = await processFn({name, bundler})

      if (wrappingCode) {
        writeAsset(name, wrappingCode)
      }
    }

    bundle.childBundles.forEach((bundle) => {
      processAsset(bundle, processFn)
    })
  }

  bundler.on('bundled', async (bundle) => {
    try {
      const CWD = process.cwd()
      const processFn = require(path.join(CWD, '.parcel-plugin-replace.js'))

      if (processFn && typeof processFn === 'function') {
        await processAsset(bundle, processFn)
      }
    } catch (error) {
      logger.warn(
        'parcel-plugin-replace cannot work without a .parcel-plugin-replace.js in the root of your project!'
      )
    }
  })
}
