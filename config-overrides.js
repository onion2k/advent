/*

Using react-app-rewired to get webpack-bundle-analyzer working with create-react-app without needing to eject, because CRA is nice and all but sometimes it's good to see under the bonnet.

Use `npm install -D react-app-rewired webpack-bundle-analyzer` to get this to work.

*/

var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (config, env) => {
    config.plugins.push(new BundleAnalyzerPlugin());
    return config;
}
