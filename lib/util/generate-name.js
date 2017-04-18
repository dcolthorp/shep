'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (str) {
  var expandedStr = /^\/\s/.test(str) ? str.replace('/', 'root') : str;
  return {
    shortName: (0, _lodash2.default)(expandedStr),
    fullName: (0, _lodash2.default)(`${(0, _load.pkg)().name} ${expandedStr}`)
  };
};

var _load = require('./load');

var _lodash = require('lodash.kebabcase');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];