const WebpackObfuscator = require("webpack-obfuscator");

module.exports = function override(config, env) {
  if (env === "production") {
    // Add JavaScript Obfuscator only for production builds
    config.plugins.push(
      new WebpackObfuscator(
        {
          rotateStringArray: true,
          selfDefending: true,
          debugProtection: true,
          debugProtectionInterval: 1000,
          stringArray: true,
          stringArrayThreshold: 0.75,
        },
        ["excluded_bundle_name.js"] // Exclude specific files from obfuscation if needed
      )
    );
  }

  return config;
};
