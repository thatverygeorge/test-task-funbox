const postcssPresetEnv = require('postcss-preset-env');
const postcssFlexbugsFixes = require('postcss-flexbugs-fixes');
const postcssIE11Supports = require('postcss-ie11-supports');

module.exports = {
  map: true,
  plugins: [postcssPresetEnv(), postcssFlexbugsFixes(), postcssIE11Supports()],
};
