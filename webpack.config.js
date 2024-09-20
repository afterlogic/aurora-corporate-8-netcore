const 
  path = require('path'),
  webpack = require('webpack')
;

module.exports = {
  // entry: './static/js/_app-entry.js',
  entry: path.resolve(__dirname, './static/js/app.js'),
  output: {
    // path: path.join(__dirname, '/static/js'),
    path: path.resolve(__dirname, '/static/js'),
    filename: 'app.js',
    // chunkFilename: '[name].app.[chunkhash].js',
    chunkFilename: '[name].app.js',
    publicPath: '/static/js',
    pathinfo: true,
  },
  devServer: {
    hot: false,
    // static: {
    //   directory: path.join(__dirname, '/static/js'),
    //   publicPath: '/test/',
    // },
    client:  {
      logging: 'info',
    },
    watchFiles: [path.join(__dirname, './static/js/') + '/**/*'],
    allowedHosts: 'all',
  },
  mode: 'development', //none,production,development
  // stats: {
  //   source: false
  // },
  resolveLoader: {
    alias: {
      "replace-module-names-loader": path.join(__dirname, "./modules/CoreWebclient/gulp-tasks/replace-module-names-loader.js")
    }
  },
  resolve: {
    modules: [
      // path.resolve(__dirname, '../../../'),
      path.resolve(__dirname, './'),
      "node_modules"
    ]
  },
  module: {
    rules: [
      {
        test: /[\\\/]modernizr\.js$/,
        use: [
          'imports-loader?this=>window',
          'exports-loader?window.Modernizr'
        ]
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'replace-module-names-loader'
          }
        ],
      },
      {
        test: /(OpenPgpWebclient|OpenPgpFilesWebclient|CoreParanoidEncryptionWebclientPlugin|ComposeWordCounterPlugin|TwoFactorAuth).*\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    useBuiltIns: 'entry',
                    corejs: 'core-js@3'
                  }
                ]
              ],
              compact: false
            }
          }
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  plugins: [
    // new webpack.HashedModuleIdsPlugin(), // so that file hashes don't change unexpectedly
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    })
  ]
};