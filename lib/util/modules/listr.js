'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = listr;

var _listr = require('listr');

var _listr2 = _interopRequireDefault(_listr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function listr(tasks, quiet, concurrent) {
  var renderer = quiet ? 'silent' : 'default';

  return new _listr2.default(tasks, { renderer, concurrent });
}
module.exports = exports['default'];