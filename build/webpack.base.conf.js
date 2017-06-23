var webpack = require("webpack")
var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin') //新增

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: './src/main.js'
  },
  // entry: utils.getEntries('./src/views/**/*.js'), //修改成多入口
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    chunkFilename: utils.assetsPath('js/[name].[chunkhash].js'),
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'components':resolve('src/components'),
      'static':resolve('static'),
      'views':resolve('src/views'),
      'assets':resolve('src/assets'),
      'base':resolve('src/components/base'),
      'business':resolve('src/components/business'),
      'ued':resolve('src/components/ued')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {presets: ['es2015']},
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('common.js')
  ]
}

// var pages = utils.getEntries('./src/views/**/*.html', 1);
//
// for (var pathname in pages) {
//   // 生成html相关配置
//   var conf = {
//     filename: pathname + '.html', // html文件输出路径
//     template: pages[pathname],   // 模板路径
//     inject: true,                // js插入位置
//     minify: {
//       //压缩设置
//       //removeComments: true,
//       //collapseWhitespace: true,
//       //removeAttributeQuotes: true
//       // more options:
//       // https://github.com/kangax/html-minifier#options-quick-reference
//     },
//     // necessary to consistently work with multiple chunks via CommonsChunkPlugin
//     chunksSortMode: 'dependency'
//   };
//   pathname = pathname.split("/")[1];//去掉views
//   if (pathname in module.exports.entry) {
//     conf.inject = 'body';
//     //如果每个html没有进入这里的话，那么全部js将会插入html
//     conf.chunks = ['flexible', pathname, 'vendor', 'manifest', 'bootstrap'],
//       conf.hash = true;
//   }
//   module.exports.plugins.push(new HtmlWebpackPlugin(conf));
// }
