const path = require("path");
const LoadableWebpackPlugin = require("@loadable/webpack-plugin");
const WebpackConfigHelpers = require("razzle-dev-utils/WebpackConfigHelpers");

const Helpers = new WebpackConfigHelpers(process.cwd());

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

    config.module.rules[
      config.module.rules.findIndex(Helpers.makeLoaderFinder("file-loader"))
    ].exclude.push(/\.(svg)$/);

    config.module.rules.push({
      test: /\.svg$/i,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            icon: true,
          },
        },
      ],
    });

    if (opts.env.target === "web") {
      const filename = path.resolve(__dirname, "build");

      config.plugins.push(
        new LoadableWebpackPlugin({
          outputAsset: false,
          writeToDisk: { filename },
        })
      );
      
      config.performance = {
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
      };
    }

    return config;
  },
};
