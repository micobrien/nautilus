const path = require('path')

module.exports = {
  mode: 'production',
  entry: './src/scripts.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: './js/build.js'
  },
  watch: true
}
