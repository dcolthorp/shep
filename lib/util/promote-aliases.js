'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (funcs, env) {
  return _bluebird2.default.resolve(funcs).map(function (func) {
    return (0, _lambda.setAlias)(func, env);
  });
};

var _lambda = require('./aws/lambda');

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];