# Changelog

### Version 0.0.6 - December 20, 2018 ([NPM](https://www.npmjs.com/package/icon-sdk-js), [CDN](https://cdn.jsdelivr.net/gh/icon-project/icon-sdk-js@0.0.6/build/icon-sdk-js.web.min.js))

#### API Changes
  - Support Node and React-Native environment
  - Seperate build file (icon-sdk-js.node, icon-sdk-js.web)
  - Fix string escaping bug in Util.serialize()
  - Update unit test code

### Version 0.0.5 - November 21, 2018 ([NPM](https://www.npmjs.com/package/icon-sdk-js), [CDN](https://cdn.jsdelivr.net/gh/icon-project/icon-sdk-js@0.0.5/build/icon-sdk-js.min.js))

#### API Changes
  - Add coinType property in IconWallet.store() output

### Version 0.0.4 - November 13, 2018 ([NPM](https://www.npmjs.com/package/icon-sdk-js), [CDN](https://cdn.jsdelivr.net/gh/icon-project/icon-sdk-js@0.0.4/build/icon-sdk-js.min.js))

#### API Changes
  - Add function of makeTxHash(rawTransaction) in data/Util.
  - Add IconService.IconUtil property.
  - Modify `npm run quickstart:rebuild` script to fix destination path when build file is copied to node_modules in quickstart.