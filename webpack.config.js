const { resolve } = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
module.exports = {
  mode: "development",
  entry: resolve(__dirname, "src/index.js"),
  output: {
    path: resolve(__dirname, "build"),
    filename: "index.js"
  },
  resolveLoader: {
    modules: ["node_modules", resolve(__dirname, "loaders")]
  },
  module: {
    rules: [
      {
        test: /.myjsx$/,
        use: ["babel-loader",
          "my-loader"
        ]
      },
      {
        test: /.css$/,
        use: ["css-loader"
        ]
      }
    ]
  }
  ,
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, "index.html")
    })

  ],
  devServer: {
    port: 4444
  }

}