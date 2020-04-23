const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// eslint-disable-next-line import/no-extraneous-dependencies
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './client/index.tsx',
  mode: 'development',
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      DEBUG: false
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Logify — Time Tracking App',
      template: 'assets/template.html',
      favicon: 'assets/favicon.png'
    })
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  devtool: 'sourcemap',
  watch: true,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      // handling our stylus files
      {
        test: /\.styl$/,
        use: ['style-loader', 'css-loader', 'stylus-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', 'json', 'css', 'sass']
  }
};
