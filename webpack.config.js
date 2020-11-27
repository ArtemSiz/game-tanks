const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const conf = {
  entry: './src/ts/index.ts',
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
  plugins: [new HtmlWebpackPlugin()],
  devServer: {
    overlay: true,
  },
};

module.exports = (env, options) => {
  const production = options.mode === 'production';

  conf.devtool = production ? false : 'eval-sourcemap';

  return conf;
};
