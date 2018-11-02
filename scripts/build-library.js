const rewire = require('rewire');
const defaults = rewire('./build.js');
let config = defaults.__get__('config');

config.optimization.splitChunks = {
    cacheGroups: {
        default: false,
    }
};

config.optimization.runtimeChunk = false;