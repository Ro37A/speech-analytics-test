const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, options) => {
  const isDev = options.mode === 'development';
  const outputPath = isDev ? path.resolve(__dirname, 'dev/build') : path.resolve(__dirname, 'dist/build');
  const filename = isDev ? 'bundle.js' : 'bundle.[hash].js';

  return {
    entry: './src/index.jsx',
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          include: path.resolve(__dirname, './src'),
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.wav$/,
          include: path.resolve(__dirname, './src'),
          loader: 'file-loader',
        },
        {
          test: /\.svg$/,
          include: path.resolve(__dirname, './src'),
          use: ['@svgr/webpack', 'file-loader'],
        },
        {
          oneOf: [
            {
              test: /\.css$/,
              include: [
                path.resolve(__dirname, './node_modules/normalize.css'),
                path.resolve(__dirname, './node_modules/rc-slider'),
              ],
              use: [
                'style-loader',
                {
                  loader: 'css-loader',
                  options: {
                    modules: false,
                  },
                },
                {
                  loader: 'postcss-loader',
                  options: {
                    plugins: [autoprefixer()],
                  },
                },
              ],
            },
            {
              test: /\.css$/,
              use: [
                'style-loader',
                {
                  loader: 'css-loader',
                  options: {
                    modules: true,
                    localIdentName: '[path][name]__[local]--[hash:base64:5]',
                  },
                },
                {
                  loader: 'postcss-loader',
                  options: {
                    plugins: [autoprefixer()],
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['*', '.js', '.jsx'],
    },
    output: {
      path: outputPath,
      publicPath: '/build/',
      filename,
    },
    devServer: {
      open: true,
      contentBase: path.join(__dirname, 'dev/'),
      writeToDisk: true,
      publicPath: '/build/',
      port: 3000,
      hotOnly: true,
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        alwaysWriteToDisk: true,
        template: './src/index.html',
        filename: '../index.html',
      }),
      new HtmlWebpackHarddiskPlugin(),
      new webpack.HotModuleReplacementPlugin(),
    ],
  };
};
