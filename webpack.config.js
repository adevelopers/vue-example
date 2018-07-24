const path              = require('path');
const webpack           = require('webpack');

const PATHS = {
  app: path.join(__dirname, 'src'),
  // images:path.join(__dirname,'src/assets/'),
  build: path.join(__dirname, 'webpack_bundles')
};

const options = {
  host:'localhost',
  port:'1234'
};

module.exports = {
  mode: "development",
  entry: {
    app: PATHS.app
  },
  output: {
    path: PATHS.build,
    filename: 'bundle.js'
  },
  devServer: {
      historyApiFallback: true,
      hot: false,
      inline: true,
      stats: 'errors-only',
      host: options.host,
      port: options.port 
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.css$/,
                loader: 'css-loader'
            },
            {
                test: /\.scss$/,
                loader: 'sass-loader'
            },
            {
                test: /\.((ttf)|(woff)|(woff2)|(svg)|(eot))$/,
                loader: 'file-loader'
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
};