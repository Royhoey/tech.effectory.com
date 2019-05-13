const postcssPresetEnv = require('postcss-preset-env');
const autoprefixer = require('autoprefixer');
module.exports = {
  plugins: [
    postcssPresetEnv({ stage: 0, browsers: ['last 2 versions', 'IE 10'] }),
    autoprefixer({ grid: true, browsers: ['>1%'] })
  ]
}