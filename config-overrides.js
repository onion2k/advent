var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (config, env) => {
    config.plugins.push(new BundleAnalyzerPlugin());
    return config;
  }