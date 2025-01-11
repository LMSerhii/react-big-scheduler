const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "../src/examples/index.tsx"),
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "../dist")
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: {
      "@mui/material": path.resolve(__dirname, "../node_modules/@mui/material"),
      "@mui/system": path.resolve(__dirname, "../node_modules/@mui/system"),
      "@mui/styles": path.resolve(__dirname, "../node_modules/@mui/styles"),
      "@emotion/react": path.resolve(
        __dirname,
        "../node_modules/@emotion/react"
      ),
      "@emotion/styled": path.resolve(
        __dirname,
        "../node_modules/@emotion/styled"
      )
    }
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "../public")
    },
    port: 3000,
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              presets: [
                "@babel/preset-env",
                ["@babel/preset-react", { runtime: "automatic" }],
                "@babel/preset-typescript"
              ]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "../public/index.html")
    })
  ]
};
