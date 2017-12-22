var utils = require('./utils')
var config = require('../config')
var needExtract, needSourceMap;

if (process.env.NODE_ENV === 'production') {
	needExtract = true;
	needSourceMap = config.build.productionSourceMap;
} else if (process.env.NODE_ENV === 'test') {
	needExtract = true;
	needSourceMap = config.cdn_test.productionSourceMap;
} else if (process.env.NODE_ENV === 'dev') {
	needExtract = true;
	needSourceMap = config.cdn_dev.productionSourceMap;
} else if (process.env.NODE_ENV === 'preview') {
	needExtract = true;
	needSourceMap = config.cdn_preview.productionSourceMap;
} else {
	needExtract = false;
	needSourceMap = config.dev.cssSourceMap;
}

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: needSourceMap,
    extract: needExtract
  })
}
