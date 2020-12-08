const path = require('path');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const conf = {
  entry: './src/index.ts',
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Game Tanks",
      template: "index.html"
    }),
    new CopyWebpackPlugin(
        [{
          from: "./assets/**/*",
          ignore: ['**/_*/**', '**/_*.*', '**/_*']
        }, {
          from: "./src/style/**"
        }]
    ),
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000
  },
};

module.exports = (env, options) => {
  const production = options.mode === 'production';

  conf.devtool = production ? false : 'inline-source-map';

  return conf;
};
