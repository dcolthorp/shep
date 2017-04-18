'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function (PATTERN, NODE_ENV) {
  var _pkg = (0, _load.pkg)(),
      shep = _pkg.shep;

  var buildCommand = shep && shep.buildCommand || 'webpack --bail';
  return (0, _exec2.default)(buildCommand, { env: _extends({}, process.env, { PATTERN, NODE_ENV }) }).catch({ code: 'ENOENT' }, function (e) {
    console.warn('No locally installed webpack found. Verify that webpack is installed');
    throw e;
  });
};

var _exec = require('./modules/exec');

var _exec2 = _interopRequireDefault(_exec);

var _load = require('./load');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];