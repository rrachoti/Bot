const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: {
    app: './main.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist'),
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
  },
  module: {    
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            'js': 'babel-loader'            
          },
        },
      },
      // compiles all es6 to es5 in every file that ends in .js
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: [/node_modules/, /libs/],
      },
      {
        test: /\.png?$/,
        use: ['file-loader?name=/assets/[name].[ext]'],
      },
      {
        test: /semantic.min.css?$/,
        use: ['file-loader?name=/assets/libs/[name].[ext]'],
        include: [/libs/],
      },
      {
        test: /jquery.min.js?$/,
        use: ['file-loader?name=/assets/libs/[name].[ext]'],
        include: [/libs/],
      },
      {
        test: /semantic.js?$/,
        use: ['file-loader?name=/assets/libs/[name].[ext]'],
        include: [/libs/],
      },
      {
        test: /moment.min.js?$/,
        use: ['file-loader?name=/assets/libs/[name].[ext]'],
        include: [/libs/],
      },
      {
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader?name=/assets/fonts/[name].[ext]',
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader?name=/assets/styles/[name].[ext]',
            },
            {
              loader: 'sass-loader?name=/assets/styles/[name].[ext]',
            },
          ],
          // use style-loader in development
          fallback: 'style-loader',
        }),
      },
    ],
  },
  resolve: {    
    alias: {
      'vue': 'vue/dist/vue.common.js',
      'styles': path.resolve(__dirname, './src/css/'),
    },
  },
  externals: {
    jquery: 'jQuery',
  },
  devtool: 'cheap-module-source-map',
  // this webpack plugin creates an index.html inside the build folder. This allows for easy deployment
  // It also looks at template.html to see how the file should be built and what <style> tags to show...
  plugins: [
    new webpack.BannerPlugin('Rajkumar Rachoti'),
    new HtmlWebpackPlugin({
      template: '../template.html',
    }),
    new webpack.ProvidePlugin({
      Promise: 'es6-promise',
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new ExtractTextPlugin('/assets/styles.css'),
    new CopyWebpackPlugin([
      { from: '../web.config.js', to: '../dist' },
    ]),
  ],
};