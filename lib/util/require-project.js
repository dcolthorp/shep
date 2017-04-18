'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (relativePath) {
  return require(projectPath(relativePath));
};

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function projectPath(relativePath) {
  return _path2.default.join(process.cwd(), relativePath);
}
module.exports = exports['default'];