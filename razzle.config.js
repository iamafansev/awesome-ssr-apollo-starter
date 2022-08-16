const path = require("path");
const LoadableWebpackPlugin = require("@loadable/webpack-plugin");

module.exports = {
  plugins: ["babel-ts"],
  options: {
    verbose: true,
  },
  modifyPaths(opts) {
    const { paths } = opts;
    paths.appServerIndexJs = path.join(paths.appPath, "src/ssr");
    paths.appClientIndexJs = path.join(paths.appPath, "src/client");
    return paths;
  },
  modifyWebpackConfig(opts) {
    const config = opts.webpackConfig;

    if (opts.env.target === "web") {
      const filename = path.resolve(__dirname, "build");

      config.plugins.push(
        new LoadableWebpackPlugin({
          outputAsset: false,
          writeToDisk: { filename },
        })
      );
    }

    return config;
  },
};
