const TerserPlugin = require("terser-webpack-plugin");

module.exports = function override(config) {
  if (process.env.NODE_ENV === "production") {
    config.optimization.minimizer = [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
            passes: 3,
          },
          mangle: {
            properties: true,
          },
        },
      }),
    ];
  }
  return config;
};
