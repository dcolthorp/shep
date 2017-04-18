'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handler = exports.desc = exports.command = undefined;
exports.builder = builder;

var _build = require('../build');

var _build2 = _interopRequireDefault(_build);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var command = exports.command = 'build [functions]';
var desc = exports.desc = 'Builds functions and writes them to disk';
function builder(yargs) {
  return yargs.describe('quiet', 'Don\'t log anything').default('quiet', false).alias('q', 'quiet').example('shep build', 'Launch an interactive CLI').example('shep build beta', 'Build all functions with beta environment variables').example('shep build beta create-user', 'Build only the create-user function').example('shep build beta *-user', 'Build functions matching the pattern *-user');
}

var handler = exports.handler = _build2.default;