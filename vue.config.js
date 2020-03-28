const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  configureWebpack: {
    plugins: [
      new VueLoaderPlugin()
    ]
  }
}  