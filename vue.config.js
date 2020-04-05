const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  chainWebpack: config => {
    config
    .plugin('html')
    .tap(args => {
      args[0].title = 'Thoughtful Moose'
      return args
    })
  },
  configureWebpack: {
    plugins: [
      // new VueLoaderPlugin()
    ]
  }
}  