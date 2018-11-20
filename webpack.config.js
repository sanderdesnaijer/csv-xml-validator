const MiniCssExtractPlugin = require("mini-css-extract-plugin");
console.log(process.env.mode);
module.exports = {
  mode: "production",
  entry: ["babel-polyfill", "./src/App.tsx"],
  output: {
    filename: "bundle.js",
    path: __dirname + "/dist"
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"]
  },

  module: {
    rules: [
      { test: /\.tsx?$/, loader: "babel-loader" },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
      {
        test: /\.scss$/,
        use: [
          // process.env.NODE_ENV !== "production"
          //   ? "style-loader"
          //   : MiniCssExtractPlugin.loader,

          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      }
      // {
      //   test: /\.csv$/,
      //   loader: "csv-loader",
      //   options: {
      //     dynamicTyping: true,
      //     header: true,
      //     skipEmptyLines: true
      //   }
      // }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]

  // externals: {
  //   react: "React",
  //   "react-dom": "ReactDOM"
  // }
};
