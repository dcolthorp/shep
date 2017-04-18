'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = run;

var _fs = require('../util/modules/fs');

var _templates = require('../new/templates');

function run(opts) {
  var output = opts.output;

  return (0, _fs.writeFile)(output, (0, _templates.webpack)());
}
module.exports = exports['default'];