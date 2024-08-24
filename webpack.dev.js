// const path = require("path");
// const { merge } = require("webpack-merge");
// const common = require("./webpack.common.js");

// module.exports = merge([
//   common,
//   {
//     mode: "development",
//     devServer: {
//       contentBase: path.join(__dirname, "public"),
//       compress: true,
//       port: 3000,
//       historyApiFallback: true,
//     },
//   },
// ]);


const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devServer: {
    contentBase: path.join(__dirname, "public"),
    compress: true,
    port: 3000,
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.mjs'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
});
