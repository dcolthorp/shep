'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handler = exports.desc = exports.command = undefined;
exports.builder = builder;

var _generateWebpack = require('../../generate-webpack');

var _generateWebpack2 = _interopRequireDefault(_generateWebpack);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var command = exports.command = 'webpack';
var desc = exports.desc = 'Generates a webpack.config.js with default template';
function builder(yargs) {
  return yargs.pkgConf('shep', process.cwd()).describe('output', 'Output file').alias('output', 'o').default('output', 'webpack.config.js').example('shep generate webpack -o foo.js', 'Writes default webpack configuration to foo.js');
}

var handler = exports.handler = _generateWebpack2.default;